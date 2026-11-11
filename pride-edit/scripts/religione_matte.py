from pathlib import Path
import json,time
import cv2,numpy as np,onnxruntime as ort
from PIL import Image
p=Path(__file__).resolve().parents[1];out=p/'public/religione/inverse-masks';out.mkdir(parents=True,exist_ok=True)
windows=[(0,4.2),(25,31),(54,59),(99,105),(138,144)]
cv2.setNumThreads(1);opts=ort.SessionOptions();opts.intra_op_num_threads=2;opts.inter_op_num_threads=1
model=ort.InferenceSession('/workspace/video-assets/models/rvm.onnx',sess_options=opts,providers=['CPUExecutionProvider'])
cap=cv2.VideoCapture(str(p/'public/religione/source.mp4'));f=0;states=None;last=-100;n=0;start=time.monotonic()
while True:
 ok,bgr=cap.read()
 if not ok:break
 sec=f/60;active=any(a<=sec<b for a,b in windows);warm=any(max(0,a-.45)<=sec<b for a,b in windows)
 if f%2==0 and warm:
  if f-last>2:states=[np.zeros((1,1,1,1),np.float32) for _ in range(4)]
  rgb=cv2.cvtColor(cv2.resize(bgr,(540,960)),cv2.COLOR_BGR2RGB);src=rgb.astype(np.float32).transpose(2,0,1)[None]/255
  _,pha,*states=model.run(None,dict(src=src,r1i=states[0],r2i=states[1],r3i=states[2],r4i=states[3],downsample_ratio=np.array([.375],np.float32)));last=f
  if active:
   alpha=(np.clip(pha[0,0,:240],0,1)*255).astype(np.uint8);rgba=np.full((240,540,4),255,np.uint8);rgba[:,:,3]=255-alpha
   Image.fromarray(rgba).save(out/f'{f//2:05}.png',compress_level=2);n+=1
   if n%150==0:print(n,'header masks',round(time.monotonic()-start,1),'seconds',flush=True)
 f+=1
cap.release();(out/'metadata.json').write_text(json.dumps(dict(sourceFrames=f,fps=30,maskHeight=480,windows=windows,count=n)))
print('Finished',n,'masks from',f,'frames',flush=True)
