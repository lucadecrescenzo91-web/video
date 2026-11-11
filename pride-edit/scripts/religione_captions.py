"""Map the source's existing caption pages onto the editorial timeline; no invented narration."""
from pathlib import Path
import json,re,difflib
base=Path('/workspace/video-assets/religione');p=Path(__file__).resolve().parents[1]
raw=json.loads((base/'ocr-pages.json').read_text());edl=json.loads((p/'data/religione/final-edl.json').read_text());clean=[]
fix={
 'ODIAIGAY,':'ODIA I GAY,','COME T STATA':'COME È STATA','ASCOLTA TEMI FINO IN':'ASCOLTATEMI FINO IN','IN ALCUPRE BIBBIE':'IN ALCUNE BIBBIE','MA PAGLO NON':'MA PAOLO NON','MA FAOLO NON':'MA PAOLO NON','OMOSESSUALE, CRIT NASCE':'OMOSESSUALE, CHE NASCE','BENSÌ LUTILIZZA DUE':'BENSÌ UTILIZZA DUE','TERMIFI GRECI TECNICI,':'TERMINI GRECI TECNICI,','OVVERO MALACOL E':'OVVERO MALAKOÍ E','OVVERO MALACCHI E':'OVVERO MALAKOÍ E','ARSENOCOETAI.':'ARSENOKOÎTAI.','MALACOI YVUOL DIRE':'MALAKOÍ VUOL DIRE','INDICAVA UOMINI VIZIONSI,':'INDICAVA UOMINI VIZIOSI,','ARSENOCOETAI! È UNA':'ARSENOKOÎTAI È UNA','PROBABILMENTE COGNATA IN':'PROBABILMENTE CONIATA IN','ABUSI, NONA':'ABUSI, NON A','AGYSI, NONA':'ABUSI, NON A','TRA ABULTI CONSENZIENTI.':'TRA ADULTI CONSENZIENTI.','INON UNA TRADUZIONE':'NON UNA TRADUZIONE','ALTRI CSONDANMNI TE':'ALTRI CONDANNI TE','NEL PUNI ARE IL':'NEL PUNTARE IL','SE TUTI':'SE TU TI','LE PERSO LEBT':'LE PERSONE LGBT','I LA STESSA CHIESA':'LA STESSA CHIESA','COME DE VERBUM':'COME DEI VERBUM','USARLE :CGME LICENZA':'USARLE COME LICENZA','GONTROLLARE I CORPI':'CONTROLLARE I CORPI','CHI È LEBT':'CHI È LGBT','CHI £ LGBT':'CHI È LGBT','PRIN A CHI ODIARE':'PRIMA CHI ODIARE'}
for x in raw:
 t=' '.join(x['text'].upper().split()).replace('|','I').strip()
 if t in ['I','2'] or len(t)<2:continue
 t=fix.get(t,t)
 if clean and (t==clean[-1]['text'] or difflib.SequenceMatcher(None,t,clean[-1]['text']).ratio()>.88) and x['start']-clean[-1]['end']<.3:
  clean[-1]['end']=x['end'];continue
 clean.append(dict(start=x['start'],end=x['end'],text=t))
out=[]
for seg in edl['segments']:
 for x in clean:
  a=max(x['start'],seg['sourceStart']);b=min(x['end'],seg['sourceEnd'])
  if b-a>.07:
   out.append(dict(start=round(seg['outputStart']+a-seg['sourceStart'],4),end=round(seg['outputStart']+b-seg['sourceStart'],4),text=x['text']))
out=[x for x in out if x['text'] not in ['DEL VIDEO','FONDO'] and not (73.6<=x['start']<81.47 and x['text']=='PARTIAMO DAI CORINZI,')]
(p/'src/religione-captions.json').write_text(json.dumps(out,ensure_ascii=False,indent=2))
(p/'data/religione/source-caption-pages.json').write_text(json.dumps(clean,ensure_ascii=False,indent=2))
print('Mapped',len(out),'caption pages, retaining the source’s arguments.')
