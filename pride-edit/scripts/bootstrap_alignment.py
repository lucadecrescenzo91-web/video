"""Build the optional local aligner inside /workspace, retaining package verification."""
import argparse,hashlib,json,os,subprocess,sys,tarfile,tempfile,urllib.request
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--target',required=True);a=p.parse_args();target=Path(a.target).resolve();target.mkdir(parents=True,exist_ok=True)
subprocess.run([sys.executable,'-m','pip','install','--target',str(target),'espeakng-loader==0.2.4','numpy','lxml','BeautifulSoup4'],check=True)
with urllib.request.urlopen('https://pypi.org/pypi/aeneas-ng/1.7.4.0/json') as r:meta=json.load(r)
package=next(x for x in meta['urls'] if x['packagetype']=='sdist')
with urllib.request.urlopen(package['url']) as r:data=r.read()
if hashlib.sha256(data).hexdigest()!=package['digests']['sha256']:raise RuntimeError('Package integrity check failed')
with tempfile.TemporaryDirectory(prefix='align-build-') as temp:
 archive=Path(temp)/'source.tar.gz';archive.write_bytes(data)
 with tarfile.open(archive) as t:t.extractall(temp,filter='data')
 source=next(Path(temp).glob('aeneas_ng-*'));setup=source/'setup.py'
 # Festival is optional and unused. Upstream 1.7.4.0 unconditionally links it on Linux.
 setup.write_text(setup.read_text().replace('if not IS_WINDOWS:\n    EXTENSIONS.append(EXTENSION_CFW)','# Optional Festival backend omitted in this local build.'))
 task_env=os.environ.copy();task_env['CC']='gcc';task_env['CXX']='g++';task_env['LIBRARY_PATH']=str(target/'espeakng_loader')
 subprocess.run([sys.executable,'-m','pip','install','--no-deps','--target',str(target),str(source)],env=task_env,check=True)
print('Local alignment tools installed:',target)
