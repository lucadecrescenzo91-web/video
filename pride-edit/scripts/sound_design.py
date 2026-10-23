import argparse,json
from pathlib import Path
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter,sosfilt
p=argparse.ArgumentParser();p.add_argument('--events');p.add_argument('--duration',type=float,default=112.684);p.add_argument('--out',default='public/sfx');a=p.parse_args()
rate=48000;rng=np.random.default_rng(42);out=Path(a.out);out.mkdir(parents=True,exist_ok=True)
def noise(t,lo,hi):return sosfilt(butter(3,[lo,hi],btype='bandpass',fs=rate,output='sos'),rng.normal(size=len(t)))
def save(name,x):
 x=x/(max(abs(x))+1e-9)*.7;wavfile.write(str(out/(name+'.wav')),rate,(x*32767).astype(np.int16))
t=np.arange(round(rate*.38))/rate;save('sweep',noise(t,450,6000)*np.sin(np.pi*t/.38)**2)
t=np.arange(round(rate*.1))/rate;save('tick',noise(t,1000,6200)*np.exp(-t*85)+.15*np.sin(2*np.pi*1100*t)*np.exp(-t*100))
t=np.arange(round(rate*.55))/rate;ph=2*np.pi*(78*t+72*.045*(1-np.exp(-t/.045)));save('impact',np.sin(ph)*np.exp(-t*10)+.13*noise(t,230,2100)*np.exp(-t*48))
t=np.arange(round(rate*.17))/rate;save('pop',np.sin(2*np.pi*(320*t-650*t*t))*np.exp(-t*28)+.13*noise(t,600,3200)*np.exp(-t*65))
t=np.arange(round(rate*.32))/rate;save('scratch',noise(t,350,4300)*np.sin(2*np.pi*18*t)*np.exp(-t*8))
t=np.arange(round(rate*.25))/rate;save('error',np.sin(2*np.pi*190*t)*np.exp(-t*12)+.4*np.sin(2*np.pi*285*t)*np.exp(-t*13))
if a.events:
 events=json.loads(Path(a.events).read_text());mix=np.zeros(round(a.duration*rate),np.float64)
 for e in events:
  _,x=wavfile.read(str(out/(e['sound']+'.wav')));x=x.astype(float)/32768*e['gain'];start=round(e['time']*rate);n=min(len(x),len(mix)-start)
  if n>0:mix[start:start+n]+=x[:n]
 if max(abs(mix))>=.9:raise RuntimeError('Sound-design gain too high')
 wavfile.write(str(out/'sound-design.wav'),rate,(np.stack([mix,mix],axis=1)*32767).astype(np.int16))
 print('Rendered',len(events),'effects; peak dBFS',20*np.log10(max(abs(mix))+1e-12))
else:print('Six original effects generated; timing awaits transcript')
