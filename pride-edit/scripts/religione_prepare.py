from pathlib import Path
import json,subprocess
root=Path('/workspace/video-assets/religione');project=Path('/workspace/video/pride-edit');out=project/'public/religione';out.mkdir(parents=True,exist_ok=True)
# Keep the disputed interpretations and all biblical/ecclesial references, as requested.
parts=[(0,4.199,'Hook'),(127.708,147.981,'Contesto e documenti ecclesiali'),(18.326,34.485,'Corinzi e termini greci'),(36.642,69.602,'Argomentazione integrale sui termini'),(10.45675,18.326,'CTA originale al centro'),(69.602,113.529,'Romani 1 e citazione di Romani 2'),(117.828,127.708,'Lettura dei due capitoli insieme'),(147.981,177.72,'Conclusione originale')]
segments=[];cursor=0;paths=[]
for i,(a,b,label) in enumerate(parts):
 frames=round((b-a)*60);dur=frames/60;path=root/f'edit-{i:02}.mkv';paths.append(path)
 segments.append(dict(sourceStart=a,sourceEnd=a+dur,outputStart=cursor/60,outputEnd=(cursor+frames)/60,frames=frames,label=label));cursor+=frames
 subprocess.run(['ffmpeg','-y','-v','error','-threads','2','-filter_threads','1','-ss',str(a),'-i',str(root/'originale.mp4'),'-t',str(dur),'-vf','fps=60','-c:v','libx264','-preset','veryfast','-crf','16','-g','60','-threads','2','-pix_fmt','yuv420p','-af',f'atrim=duration={dur},apad=whole_dur={dur}','-c:a','pcm_s16le','-ar','48000','-ac','2',str(path)],check=True)
 print('Prepared segment',i,label,frames,flush=True)
(root/'concat.txt').write_text('\n'.join("file '"+str(p)+"'" for p in paths)+'\n')
subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(root/'concat.txt'),'-c:v','copy','-c:a','aac','-b:a','192k','-movflags','+faststart',str(out/'source.mp4')],check=True)
data=dict(status='approved_texts_preserve_full_argument',sourceDuration=177.723991,frames=cursor,duration=cursor/60,segments=segments,cuts='Redundant opening invitation, pronunciation aside, repeated trap/judgement explanation. No disputed references removed.')
(project/'data/religione/final-edl.json').write_text(json.dumps(data,ensure_ascii=False,indent=2));print('Edited master ready',cursor,cursor/60,flush=True)
