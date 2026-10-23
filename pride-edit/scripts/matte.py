import argparse,json,time
from pathlib import Path
import cv2,numpy as np,onnxruntime as ort
from PIL import Image
p=argparse.ArgumentParser();p.add_argument('--input',required=True);p.add_argument('--model',required=True);p.add_argument('--out',required=True);a=p.parse_args()
cv2.setNumThreads(1)
opts=ort.SessionOptions();opts.intra_op_num_threads=2;opts.inter_op_num_threads=1
s=ort.InferenceSession(a.model,sess_options=opts,providers=['CPUExecutionProvider'])
out=Path(a.out);out.mkdir(parents=True,exist_ok=True)
inverse=out.parent/'inverse-masks';inverse.mkdir(exist_ok=True)
cap=cv2.VideoCapture(a.input);states=[np.zeros((1,1,1,1),np.float32) for _ in range(4)]
i=0;j=0;start=time.time();heads=[]
while True:
 ok,bgr=cap.read()
 if not ok:break
 if i%2==0:
  rgb=cv2.cvtColor(cv2.resize(bgr,(540,960)),cv2.COLOR_BGR2RGB)
  src=np.transpose(rgb.astype(np.float32)/255,(2,0,1))[None]
  _,pha,*states=s.run(None,dict(src=src,r1i=states[0],r2i=states[1],r3i=states[2],r4i=states[3],downsample_ratio=np.array([.375],np.float32)))
  alpha=np.clip(pha[0,0]*255,0,255).astype(np.uint8)
  rgba=np.full((960,540,4),255,np.uint8);rgba[:,:,3]=alpha
  Image.fromarray(rgba).save(out/f'{j:04}.png',compress_level=2)
  rgba[:,:,3]=255-alpha
  Image.fromarray(rgba).save(inverse/f'{j:04}.png',compress_level=2)
  rows=np.where((alpha[:700,80:460]>170).sum(axis=1)>18)[0]
  heads.append(int(rows[0])*2 if len(rows) else 300)
  if j in [0,60,600,1800,3000]:
   check=(rgb*(alpha[:,:,None]/255)+np.array([95,40,160])*(1-alpha[:,:,None]/255)).astype(np.uint8)
   Image.fromarray(check).save(out.parent/f'matte-check-{j}.jpg')
  j+=1
  if j%300==0:print(f'{j} masks, {time.time()-start:.1f}s',flush=True)
 i+=1
cap.release();(out/'metadata.json').write_text(json.dumps({'fps':30,'count':j,'headTop':heads}))
print(f'Finished {j} masks from {i} frames',flush=True)
