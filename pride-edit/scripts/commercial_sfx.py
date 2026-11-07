"""Original non-musical sound design: dry clicks, ink swishes and low impacts."""
from pathlib import Path
import json,numpy as np
from scipy.io import wavfile
from scipy.signal import butter,sosfilt
rate=48000; duration=38.65; rng=np.random.default_rng(3003)
root=Path(__file__).resolve().parents[1];dest=root/'public/nuovo03/sfx';dest.mkdir(parents=True,exist_ok=True)
def noise(t,lo,hi):return sosfilt(butter(3,[lo,hi],btype='bandpass',fs=rate,output='sos'),rng.normal(size=len(t)))
def sound(kind):
 d={'snap':.09,'ink':.22,'slam':.28,'stamp':.14,'zip':.22,'needle':.32}[kind];t=np.arange(round(rate*d))/rate
 if kind=='snap':x=noise(t,1100,9000)*np.exp(-t*80)
 elif kind=='ink':x=noise(t,250,6200)*np.sin(np.pi*t/d)**2
 elif kind=='slam':x=np.sin(2*np.pi*(56*t+3*(1-np.exp(-t*22))))*np.exp(-t*21)+.14*noise(t,300,7000)*np.exp(-t*70)
 elif kind=='stamp':x=noise(t,200,2600)*np.exp(-t*45)+.16*np.sin(2*np.pi*130*t)*np.exp(-t*40)
 elif kind=='needle':x=noise(t,700,4700)*(.6+.4*np.sin(2*np.pi*120*t))**2*np.sin(np.pi*t/d)**2
 else:x=noise(t,700,8000)*np.sin(np.pi*t/d)**2*np.linspace(.3,1,len(t))
 x*=np.minimum(t/.002,1)*np.minimum((d-t)/.015,1);return x/(max(abs(x))+1e-9)
events=[]
def add(time,kind,gain):events.append(dict(time=time,sound=kind,gain=gain))
for t,c in [(3.12,'ink'),(6.18,'zip'),(11.35,'ink'),(14.85,'zip'),(18.75,'ink'),(21.31,'zip'),(25.59,'ink'),(28.92,'zip'),(32.16,'ink'),(35.32,'zip')]:add(t,c,.08)
for t,g in [(0.03,.07),(1.1,.15),(3.82,.1),(6.38,.09),(11.62,.08),(15.68,.12),(17.26,.14),(18.96,.08),(21.5,.07),(23.45,.08),(25.8,.1),(27.32,.09),(30.33,.1),(33.44,.1),(35.9,.12),(36.12,.11),(38.1,.06)]:add(t,'slam',g)
for t in [3.32,7.18,8.0,12.2,13.15,20.9,22.0,24.0,26.25,29.18,31.2,34.65,35.48,37.02]:add(t,'snap',.042)
for t in [11.52,15.05,16.64,25.73,32.32,35.5]:add(t,'stamp',.055)
for t in [.56,11.88,23.82,32.68]:add(t,'snap',.03)
add(6.78,'needle',.025)
mix=np.zeros(round(rate*duration))
for e in events:
 x=sound(e['sound'])*e['gain'];a=round(e['time']*rate);n=min(len(x),len(mix)-a);mix[a:a+n]+=x[:n]
stereo=np.column_stack([mix,mix]);wavfile.write(dest/'commercial.wav',rate,(stereo*32767).astype(np.int16))
(root/'data/sound-events-03.json').write_text(json.dumps(sorted(events,key=lambda e:e['time']),indent=2))
print(len(events),'effects, peak',20*np.log10(abs(mix).max()))
