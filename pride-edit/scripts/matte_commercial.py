import cv2,numpy as np,onnxruntime as ort,time
from pathlib import Path
from PIL import Image
import argparse
p=argparse.ArgumentParser();p.add_argument('--model',required=True);args=p.parse_args()
root=Path(__file__).resolve().parents[1]/'public/nuovo03';out=root/'inverse-masks';out.mkdir(exist_ok=True)
cv2.setNumThreads(1);opt=ort.SessionOptions();opt.intra_op_num_threads=1;opt.inter_op_num_threads=1
s=ort.InferenceSession(args.model,sess_options=opt,providers=['CPUExecutionProvider'])
cap=cv2.VideoCapture(str(root/'source.mp4'));states=[np.zeros((1,1,1,1),np.float32) for _ in range(4)];i=0;count=0
while True:
 ok,bgr=cap.read()
 if not ok:break
 t=i/60
 if i%2==0 and (6<=t<14.5 or 21<=t<29):
  rgb=cv2.cvtColor(cv2.resize(bgr,(540,960)),cv2.COLOR_BGR2RGB);src=np.transpose(rgb.astype(np.float32)/255,(2,0,1))[None]
  _,pha,*states=s.run(None,dict(src=src,r1i=states[0],r2i=states[1],r3i=states[2],r4i=states[3],downsample_ratio=np.array([.375],np.float32)))
  alpha=np.clip(pha[0,0]*255,0,255).astype(np.uint8)
  rgba=np.full((650,540,4),255,np.uint8);rgba[:,:,3]=255-alpha[:650]
  Image.fromarray(rgba).save(out/f'{i//2:04}.png',compress_level=2);count+=1
  if count%100==0:print('Masks',count,flush=True)
 i+=1
print('Finished',count,flush=True)
