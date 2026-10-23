"""Align a supplied Italian script locally; generated reference speech is never used in the video."""
import argparse,ctypes,json,os
from pathlib import Path
import espeakng_loader
ctypes.CDLL(espeakng_loader.get_library_path(),mode=ctypes.RTLD_GLOBAL)
os.environ['ESPEAK_DATA_PATH']=espeakng_loader.get_data_path()
from aeneas.executetask import ExecuteTask
from aeneas.runtimeconfiguration import RuntimeConfiguration
from aeneas.task import Task

p=argparse.ArgumentParser();p.add_argument('--audio',required=True);p.add_argument('--text',required=True);p.add_argument('--output',required=True);a=p.parse_args()
out=Path(a.output).resolve();out.parent.mkdir(parents=True,exist_ok=True)
words=out.with_name('alignment-words.txt');words.write_text('\n'.join(Path(a.text).read_text().split()))
task=Task(config_string='task_language=ita|os_task_file_format=json|is_text_type=plain')
task.audio_file_path_absolute=str(Path(a.audio).resolve());task.text_file_path_absolute=str(words);task.sync_map_file_path_absolute=str(out)
ExecuteTask(task,rconf=RuntimeConfiguration('tts=espeak')).execute();task.output_sync_map_file()
j=json.loads(out.read_text())['fragments']
captions=[dict(text=(' ' if i else '')+x['lines'][0],startMs=round(float(x['begin'])*1000),endMs=round(float(x['end'])*1000),timestampMs=round((float(x['begin'])+float(x['end']))*500),confidence=None) for i,x in enumerate(j)]
out.with_name('captions.json').write_text(json.dumps(captions,ensure_ascii=False,indent=2))
print('Aligned',len(captions),'words; review timing before export.')
