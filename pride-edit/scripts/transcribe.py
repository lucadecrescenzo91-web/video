import argparse,json,os
from pathlib import Path
import torch,whisper
p=argparse.ArgumentParser();p.add_argument('--audio',required=True);p.add_argument('--model',default='small');p.add_argument('--models',required=True);p.add_argument('--output',required=True);a=p.parse_args()
torch.set_num_threads(3)
model=whisper.load_model(a.model,device='cpu',download_root=a.models)
r=model.transcribe(a.audio,language='it',fp16=False,word_timestamps=True,temperature=0,beam_size=5,condition_on_previous_text=False,verbose=False)
Path(a.output).write_text(json.dumps(r,ensure_ascii=False,indent=2))
for s in r['segments']:print(f"[{s['start']:.2f}–{s['end']:.2f}] {s['text']}",flush=True)
words=[{'text':w['word'],'startMs':round(w['start']*1000),'endMs':round(w['end']*1000),'timestampMs':round((w['start']+w['end'])*500),'confidence':w.get('probability')} for s in r['segments'] for w in s.get('words',[])]
Path(a.output).with_name('captions.json').write_text(json.dumps(words,ensure_ascii=False,indent=2))
