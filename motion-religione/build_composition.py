from pathlib import Path
import html
root=Path(__file__).parent
scenes=[
 dict(id='context',start=0,duration=10.25,headline='CONTESTO STORICO',body='<div class="tags"><span class="pill">LINGUA</span><span class="pill">GENERE LETTERARIO</span></div>',source='Dei Verbum, n. 12',detail='Pontificia Commissione Biblica, L’interpretazione della Bibbia nella Chiesa (1993), I.F'),
 dict(id='lexicon',start=10,duration=16.25,eyebrow='TRADURRE È ANCHE INTERPRETARE.',headline='1 CORINZI 6:9',body='<div class="card" data-hold><h2>malakoí</h2><p>Letteralmente: «molli, morbidi».</p><p class="accent">Il senso nel passo è discusso.</p></div><div class="card" data-hold><h2>arsenokoîtai</h2><p>Termine raro. Interpretazioni differenti.</p><p class="accent">Il significato preciso e l’ambito di applicazione sono discussi.</p></div>'),
 dict(id='bridge',start=26,duration=6.25,headline='PAROLE ANTICHE ≠ CATEGORIE MODERNE',body='<div class="symbol"><svg viewBox="0 0 200 150" width="180" height="135"><path d="M30 48H170M30 100H170M130 15L70 135" fill="none" stroke="#ff5857" stroke-width="15" stroke-linecap="round"/></svg></div><p class="large">L’equivalenza con l’identità omosessuale moderna non è automatica.</p>'),
 dict(id='romans1',start=32,duration=9.25,headline='ROMANI 1:26–27',body='<div class="card" data-hold><p class="large">L’idolatria è parte del contesto del capitolo.</p></div><div class="card" data-hold><p class="large accent">Il passo parla anche di desiderio reciproco tra uomini.</p></div>'),
 dict(id='romans2',start=41,duration=9,headline='ROMANI 2:1',body='<div class="symbol"><svg viewBox="0 0 220 180" width="220" height="180"><path d="M110 20V155M50 155H170M30 55H190M55 55L25 110Q55 145 85 110ZM165 55L135 110Q165 145 195 110Z" fill="none" stroke="#c6a6ff" stroke-width="8" stroke-linejoin="round"/></svg></div><p class="verdict">IL GIUDIZIO RIGUARDA ANCHE CHI GIUDICA.</p>')]
css='''@font-face{font-family:LudarksDisplay;src:url(assets/fonts/Anton.ttf)}@font-face{font-family:LudarksSans;src:url(assets/fonts/Barlow.ttf)}*{box-sizing:border-box;margin:0}html,body{width:1080px;height:1920px;overflow:hidden;background:#191321;color:white}#main{width:1080px;height:1920px;position:relative;overflow:hidden;font-family:LudarksSans}.clip{position:absolute;inset:0;width:100%;height:100%;background:#191321;overflow:hidden}.scene-content{width:100%;height:100%;padding:180px 110px 290px 85px;display:flex;flex-direction:column;justify-content:center;gap:34px}.eyebrow{color:#c6a6ff;font-size:32px;letter-spacing:3px}.headline{font-family:LudarksDisplay;font-size:112px;line-height:1.1;letter-spacing:-1px;color:#efff38;max-width:880px}.tags{display:flex;flex-direction:column;gap:25px}.pill{font-family:LudarksDisplay;font-size:77px;color:white;padding:26px 28px;border:3px solid #c6a6ff;max-width:880px}.card{padding:32px;background:#2c2236;border-left:8px solid #c6a6ff;display:flex;flex-direction:column;gap:18px;max-width:880px}.card h2{font-family:LudarksDisplay;font-size:111px;line-height:1.12;color:#c6a6ff}.card p{font-size:54px;line-height:1.12}.accent{color:#efff38}.large{font-size:63px;line-height:1.14;max-width:880px}.source{font-size:40px;color:#efff38;line-height:1.15}.detail{font-size:34px;color:white;line-height:1.2}.symbol{display:flex;justify-content:center;padding:22px}.verdict{font-family:LudarksDisplay;font-size:109px;line-height:1.12;max-width:880px}.rail{position:absolute;left:0;top:150px;bottom:220px;width:13px;background:#c6a6ff}.pride{position:absolute;left:85px;right:110px;bottom:220px;display:flex;gap:0;height:9px}.pride i{flex:1}#bridge .headline{font-size:99px}#romans1 .headline{font-size:103px}'''
parts=[]
for i,s in enumerate(scenes):
 content=''
 if s.get('eyebrow'):content+=f'<p class="eyebrow">{html.escape(s["eyebrow"])}</p>'

 if s['id']=='context':content+='<svg class="book" viewBox="0 0 360 180" width="360" height="180"><path d="M180 40Q90 0 20 25V150Q95 125 180 165Q265 125 340 150V25Q265 0 180 40V165" fill="none" stroke="#c6a6ff" stroke-width="7"/><path class="bookline" d="M50 55Q105 42 150 66M50 84Q105 71 150 95M210 66Q265 42 310 55M210 95Q265 71 310 84" fill="none" stroke="#efff38" stroke-width="6" stroke-dasharray="800"/></svg>'
 title=html.escape(s['headline']).replace('≠','<span style="font-family:Arial,sans-serif">≠</span>')
 content+=f'<h1 class="headline">{title}</h1>'+s['body']
 if s.get('source'):content+=f'<p class="source">{html.escape(s["source"])}</p><p class="detail">{html.escape(s["detail"])}</p>'
 parts.append(f'<section id="{s["id"]}" class="clip" data-start="{s["start"]}" data-duration="{s["duration"]}" data-track-index="{i%2}" style="z-index:{i+1}"><div class="rail" data-layout-ignore></div><div class="scene-content">{content}</div><div class="pride" data-layout-ignore>'+''.join(f'<i style="background:{c}"></i>' for c in ['#ed403c','#ff9c35','#f6e547','#57bf73','#4297f2','#a674de'])+'</div></section>')
js=['window.__timelines=window.__timelines||{};const tl=gsap.timeline({paused:true});']
for i,s in enumerate(scenes):
 ident=s['id'];a=s['start'];
 if i:js.append(f'tl.from("#{ident}",{{x:1080,duration:.25,ease:"power2.inOut"}},{a});')
 selectors=[('.eyebrow',{'y':20}),('.headline',{'y':55}),('.pill',{'x':-70}),('.card',{'scale':.92}),('.symbol',{'rotation':-8,'scale':.8}),('.large',{'x':45}),('.verdict',{'y':55}),('.source',{'y':20}),('.detail',{'y':20})]
 for j,(sel,props) in enumerate(selectors):
  if sel[1:] not in (s['body']+(' headline eyebrow source detail' if s.get('source') else ' headline eyebrow')):continue
  # Restrict each selector to existing elements, deterministic by source order.
  props.update(opacity=0,duration=.42,stagger=.16,ease=['power3.out','back.out(1.2)','expo.out'][j%3])
  when=a+.3+j*.055
  if ident=='context' and sel=='.pill':props['stagger']=2.8
  if ident=='context' and sel=='.detail':when=a+6.1
  if ident=='lexicon' and sel=='.card':props['stagger']=9.6
  if ident=='romans1' and sel=='.card':props['stagger']=3.6
  if ident=='romans2' and sel=='.verdict':when=a+4.5
  import json
  js.append(f'if(document.querySelector("#{ident} {sel}"))tl.from("#{ident} {sel}",{json.dumps(props)},{when});')
 js.append(f'tl.from("#{ident} .rail",{{scaleY:0,transformOrigin:"top",duration:.55,ease:"expo.out"}},{a+.25});tl.from("#{ident} .pride",{{scaleX:0,transformOrigin:"left",duration:.55,ease:"power3.out"}},{a+s["duration"]-1.5});')
js.append('tl.from("#context .book",{scale:.8,opacity:0,duration:.55,ease:"back.out(1.3)"},.2);tl.from("#context .bookline",{strokeDashoffset:800,duration:2.4,ease:"power2.inOut"},1.4);');
js.append('window.__timelines.main=tl;')
page='<!doctype html><html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=1080,height=1920"><script src="assets/gsap.min.js"></script><style>'+css+'</style></head><body><main id="main" data-composition-id="main" data-start="0" data-duration="50" data-width="1080" data-height="1920" data-fps="60">'+''.join(parts)+'</main><script>'+''.join(js)+'</script></body></html>'
(root/'index.html').write_text(page)
print('5 animated inserts authored, 50-second reusable master')
