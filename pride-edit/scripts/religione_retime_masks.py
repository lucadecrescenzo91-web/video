"""Map cut-source decoder indices to presentation time, preserving VFR join gaps."""
from pathlib import Path
import json,shutil,bisect,subprocess
p=Path(__file__).resolve().parents[1];media=p/'public/religione';old=media/'inverse-masks';out=media/'inverse-timed';out.mkdir(exist_ok=True)
r=subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_packets','-show_entries','packet=pts_time','-of','json',str(media/'source.mp4')])
pts=sorted(float(x['pts_time']) for x in json.loads(r)['packets'])
for f in old.glob('*.png'):
 i=int(f.stem)*2
 if i<len(pts):shutil.copyfile(f,out/f'{int(pts[i]*30+1e-4):05}.png')
windows=json.loads((old/'metadata.json').read_text())['windows'];available=sorted(int(x.stem) for x in out.glob('*.png'));duration=json.loads((p/'data/religione/final-edl.json').read_text())['duration']
for i in range(round(duration*30)+1):
 if any(a<=i/30<b for a,b in windows) and not (out/f'{i:05}.png').exists():
  k=bisect.bisect_left(available,i);near=min(available[max(0,k-1):min(len(available),k+1)],key=lambda j:abs(j-i));shutil.copyfile(out/f'{near:05}.png',out/f'{i:05}.png')
print('Timed masks ready:',len(list(out.glob('*.png'))))
