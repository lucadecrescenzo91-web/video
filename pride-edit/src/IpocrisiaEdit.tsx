import React from 'react';
import {Audio,Video} from '@remotion/media';
import {AbsoluteFill,Img,Sequence,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {BackWord,Comparison,Fonts,Paper,PrideStroke,Punch,Sweep,colors,headline,sans} from './Art';
import {Brand} from './Scenes';
import {CaseCard} from './CaseCard';
import {DateStamp} from './DateStamp';
import {PublicPrivate} from './PublicPrivate';
import {WordCaptions} from './WordCaptions';
import captions from './captions-02.json';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const windows=[[0,2.8],[10.6,15.2],[20.5,22],[42.95,49.95],[67.9,74.85],[89.4,93.2],[103.95,109.45],[124.2,128.59]];
const zooms=[
 [0,.2,2.55,2.95,.09],[2.6,2.9,7.4,7.8,.04],[10.6,10.9,14.8,15.2,.075],
 [20.48,20.65,21.9,22.05,.08],[22.1,22.4,26.1,26.5,.045],
 [30.7,30.9,34.8,35.3,.07],[35.85,36.1,38.7,39.1,.06],[39.3,39.5,42.6,43.0,.045],
 [43.0,43.2,49.7,50.0,.07],[50,50.2,53,53.3,.035],[53.6,53.8,58.6,59,.06],
 [59,59.15,61.0,61.3,.08],[68,68.3,74.5,74.9,.07],[74.9,75.1,79.8,80.1,.04],
 [82,82.2,85.8,86.1,.06],[89.4,89.7,92.9,93.3,.045],[93.3,93.5,97.5,97.9,.05],
 [97.9,98,98.6,98.9,.1],[101.4,101.6,103.6,104,.06],[104,104.3,109.1,109.5,.085],
 [109.5,109.65,114.6,115,.045],[119.4,119.7,123.8,124.2,.04],[124.2,124.5,128.4,128.59,.1],
];

const Behind02:React.FC<{children:React.ReactNode}>=({children})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 if(!windows.some(([a,b])=>f/fps>=a&&f/fps<b))return null;
 const mask=staticFile(`nuovo02/inverse-masks/${String(Math.min(3857,Math.floor(f/2))).padStart(4,'0')}.png`);
 return <AbsoluteFill style={{height:840,maskImage:`url("${mask}")`,WebkitMaskImage:`url("${mask}")`,maskSize:'100% 100%',WebkitMaskSize:'100% 100%'}}><Img src={mask} style={{position:'absolute',width:1,height:1,opacity:0}}/>{children}</AbsoluteFill>;
};

export const IpocrisiaEdit:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{backgroundColor:colors.dark,overflow:'hidden'}}>
  <Fonts/>
  <Sequence name="Parlato originale integrale" durationInFrames={7715} premountFor={fps}>
   <AbsoluteFill style={{scale:1.025+Math.max(0,...zooms.map(([a,b,c,d,m])=>interpolate(f,[a*fps,b*fps,c*fps,d*fps],[0,m,m,0],clamp))),transformOrigin:'50% 57%'}}>
    <Video src={staticFile('nuovo02/source.mp4')} volume={0.97} premountFor={fps} style={{width:'100%',height:'100%'}}/>
    <Behind02>
     <Sequence name="Ipocrisia dietro la figura" durationInFrames={Math.round(2.8*fps)} premountFor={fps}><BackWord text="IPOCRISIA." size={188} top={355} color={colors.red}/></Sequence>
     <Sequence name="In segreto dietro la figura" from={Math.round(10.6*fps)} durationInFrames={Math.round(4.6*fps)} premountFor={fps}><BackWord text="IN SEGRETO." size={166} top={365} color={colors.lilac}/></Sequence>
     <Sequence name="Tre casi dietro la figura" from={Math.round(20.5*fps)} durationInFrames={Math.round(1.5*fps)} premountFor={fps}><BackWord text="3 CASI." size={240} top={330}/></Sequence>
     <Sequence name="Il problema è l’ipocrisia" from={Math.round(42.95*fps)} durationInFrames={Math.round(7*fps)} premountFor={fps}><BackWord text="IPOCRISIA." size={188} top={355} color={colors.red}/></Sequence>
     <Sequence name="Contraddizione pubblica e privata" from={Math.round(67.9*fps)} durationInFrames={Math.round(6.95*fps)} premountFor={fps}><BackWord text="CONTRADDIZIONE" size={114} top={420} color={colors.lilac}/></Sequence>
     <Sequence name="Non cambiato dietro la figura" from={Math.round(89.4*fps)} durationInFrames={Math.round(3.8*fps)} premountFor={fps}><BackWord text="NON CAMBIATO." size={136} top={390}/></Sequence>
     <Sequence name="Non è una colpa: Pride" from={Math.round(103.95*fps)} durationInFrames={Math.round(5.5*fps)} premountFor={fps}><BackWord text="NON È UNA COLPA" size={119} top={420} rainbow/></Sequence>
     <Sequence name="Responsabilità dietro la figura" from={Math.round(124.2*fps)} durationInFrames={7715-Math.round(124.2*fps)} premountFor={fps}><BackWord text="RESPONSABILITÀ" size={118} top={420} rainbow/></Sequence>
    </Behind02>
   </AbsoluteFill>
   <WordCaptions captions={captions}/>
   <Sequence name="Apertura: il doppio standard" durationInFrames={Math.round(2.8*fps)} premountFor={fps}><Punch text="DUE PESI. DUE MISURE." size={85} label="OGGI PARLIAMO DI" color="white" top={1440}/></Sequence>
   <Sequence name="Il dito puntato" from={Math.round(3.1*fps)} durationInFrames={Math.round(3.7*fps)} premountFor={fps}><Punch text="SEMPRE A GIUDICARE." size={83} label="GLI ALTRI." color={colors.lilac}/></Sequence>
   <Sequence name="Lo standard imposto" from={Math.round(7*fps)} durationInFrames={Math.round(3.4*fps)} premountFor={fps}><Paper text="«LO STANDARD»" label="CHI LO DECIDE?" top={1400}/></Sequence>
   <Sequence name="Precisazione: alcuni casi" from={Math.round(10.65*fps)} durationInFrames={Math.round(4.5*fps)} premountFor={fps}><Punch text="IN ALCUNI CASI." size={104} color="white" label="NON STIAMO GENERALIZZANDO."/></Sequence>
   <Sequence name="Ludarks: contro l’omofobia" from={Math.round(15.35*fps)} durationInFrames={Math.round(4.7*fps)} premountFor={fps}><Brand/></Sequence>
   <Sequence name="Tre casi celebri" from={Math.round(20.55*fps)} durationInFrames={Math.round(1.45*fps)} premountFor={fps}><Punch text="CELEBRI." size={154} color="white"/></Sequence>
   <Sequence name="Caso 01: Ted Haggard" from={Math.round(22.05*fps)} durationInFrames={Math.round(4.4*fps)} premountFor={fps}><CaseCard number="01" name="TED HAGGARD" role="PASTORE STATUNITENSE"/></Sequence>
   <Sequence name="Contrario al matrimonio egualitario" from={Math.round(27.5*fps)} durationInFrames={Math.round(3.1*fps)} premountFor={fps}><Paper text={'CONTRO IL MATRIMONIO\nTRA PERSONE DELLO STESSO SESSO'} label="LA POSIZIONE PUBBLICA" top={1380} size={54}/></Sequence>
   <Sequence name="2006: il racconto di Mike Jones" from={Math.round(30.8*fps)} durationInFrames={Math.round(4.7*fps)} premountFor={fps}><DateStamp year="2006" detail={'IL RACCONTO\nDI MIKE JONES'}/></Sequence>
   <Sequence name="Negazione e ammissione" from={Math.round(35.9*fps)} durationInFrames={Math.round(3.2*fps)} premountFor={fps}><Comparison first="PRIMA NEGÒ" second="POI AMMISE" symbol="→" firstSize={100} secondSize={101}/></Sequence>
   <Sequence name="2011: dichiarazione riportata nel parlato" from={Math.round(39.35*fps)} durationInFrames={Math.round(3.55*fps)} premountFor={fps}><DateStamp year="2011" detail={'«PROBABILMENTE\nBISESSUALE»'} accent={colors.lilac}/></Sequence>
   <Sequence name="La contraddizione del primo caso" from={Math.round(43.05*fps)} durationInFrames={Math.round(6.8*fps)} premountFor={fps}><PublicPrivate/></Sequence>
   <Sequence name="Caso 02: József Szájer" from={Math.round(50*fps)} durationInFrames={Math.round(3.1*fps)} premountFor={fps}><CaseCard number="02" name="JÓZSEF SZÁJER" role="EURODEPUTATO UNGHERESE"/></Sequence>
   <Sequence name="Novembre 2020, Bruxelles" from={Math.round(53.65*fps)} durationInFrames={Math.round(3.2*fps)} premountFor={fps}><DateStamp year="2020" detail={'NOVEMBRE\nBRUXELLES'}/></Sequence>
   <Sequence name="Restrizioni anti-Covid" from={Math.round(57.0*fps)} durationInFrames={Math.round(1.8*fps)} premountFor={fps}><Punch text="RESTRIZIONI VIOLATE." size={85} color={colors.red}/></Sequence>
   <Sequence name="Ammissione e dimissioni" from={Math.round(58.95*fps)} durationInFrames={Math.round(2.25*fps)} premountFor={fps}><Punch text={'AMMISSIONE.\nDIMISSIONI.'} size={105} color="white" top={1375}/></Sequence>
   <Sequence name="Il modello promosso in politica" from={Math.round(62.1*fps)} durationInFrames={Math.round(5.6*fps)} premountFor={fps}><Paper text={'MATRIMONIO:\n«UN UOMO E UNA DONNA»'} label="IL MODELLO POLITICO SOSTENUTO" top={1370}/></Sequence>
   <Sequence name="La contraddizione del secondo caso" from={Math.round(68.0*fps)} durationInFrames={Math.round(6.75*fps)} premountFor={fps}><PublicPrivate/></Sequence>
   <Sequence name="Caso 03: John Paulk" from={Math.round(74.95*fps)} durationInFrames={Math.round(4.9*fps)} premountFor={fps}><CaseCard number="03" name="JOHN PAULK" role="MOVIMENTO CRISTIANO «EX GAY»"/></Sequence>
   <Sequence name="La promessa delle terapie di conversione" from={Math.round(80.2*fps)} durationInFrames={Math.round(5.65*fps)} premountFor={fps}><Paper text={'«TERAPIE\nDI CONVERSIONE»'} label="LA PROMESSA DI CAMBIARE LE PERSONE" strike top={1360}/></Sequence>
   <Sequence name="La presunta prova vivente" from={Math.round(86.1*fps)} durationInFrames={Math.round(3.1*fps)} premountFor={fps}><Paper text="«PROVA VIVENTE»" label="VENIVA PRESENTATO COSÌ" top={1400}/></Sequence>
   <Sequence name="L’orientamento non era cambiato" from={Math.round(89.45*fps)} durationInFrames={Math.round(3.7*fps)} premountFor={fps}><Punch text={'IL SUO ORIENTAMENTO\nNON ERA CAMBIATO.'} size={76} color="white" top={1390}/></Sequence>
   <Sequence name="2013: rinnega le pratiche e chiede scusa" from={Math.round(93.25*fps)} durationInFrames={Math.round(4.55*fps)} premountFor={fps}><DateStamp year="2013" detail={'RINNEGA LE PRATICHE.\nCHIEDE SCUSA.'} accent={colors.lilac}/></Sequence>
   <Sequence name="Pausa ironica: e meno male" from={Math.round(97.9*fps)} durationInFrames={Math.round(.85*fps)} premountFor={fps}><Punch text="E MENO MALE." size={110} color={colors.lilac}/></Sequence>
   <Sequence name="Il messaggio che colpevolizzava" from={Math.round(101.4*fps)} durationInFrames={Math.round(2.55*fps)} premountFor={fps}><Paper text="«IL PROBLEMA SEI TU»" label="IL MESSAGGIO DI QUELLE CAMPAGNE" strike top={1390}/></Sequence>
   <Sequence name="L’orientamento non è una colpa" from={Math.round(104.0*fps)} durationInFrames={Math.round(2.55*fps)} premountFor={fps}><Punch text="DA CORREGGERE? NO." size={89} color="white" prideAccent/></Sequence>
   <Sequence name="L’omofobia è il problema" from={Math.round(106.65*fps)} durationInFrames={Math.round(2.75*fps)} premountFor={fps}><Comparison first="OMOFOBIA" second="CURA" firstSize={110} secondSize={124}/></Sequence>
   <Sequence name="Attenzione: evitare gli stereotipi" from={Math.round(109.5*fps)} durationInFrames={Math.round(.7*fps)} premountFor={fps}><Punch text="ATTENZIONE." size={120} color={colors.ink}/></Sequence>
   <Sequence name="Omofobo non equivale a gay represso" from={Math.round(110.25*fps)} durationInFrames={Math.round(4.55*fps)} premountFor={fps}><Comparison first="OMOFOBO" second="GAY REPRESSO" firstSize={110} secondSize={86}/></Sequence>
   <Sequence name="Rispettare l’accettazione e il coming out" from={Math.round(115.05*fps)} durationInFrames={Math.round(4.2*fps)} premountFor={fps}>
    <AbsoluteFill style={{fontFamily:headline}}><Punch text={'ACCETTARSI:\nNESSUNA DERISIONE.'} size={81} top={1365} color="white"/><div style={{position:'absolute',left:85,right:145,top:1580,fontFamily:sans,fontSize:40,color:colors.ink}}>COMING OUT: NESSUN OBBLIGO.</div><PrideStroke top={1640} width={820}/></AbsoluteFill>
   </Sequence>
   <Sequence name="Il potere comporta responsabilità" from={Math.round(119.5*fps)} durationInFrames={Math.round(4.45*fps)} premountFor={fps}><Punch text={'POTERE PUBBLICO.\nCOMUNITÀ. LEGGI.'} label="LE SCELTE HANNO CONSEGUENZE." size={86} color="white" top={1375}/></Sequence>
   <Sequence name="Finale: assumersi le proprie responsabilità" from={Math.round(124.3*fps)} durationInFrames={7715-Math.round(124.3*fps)} premountFor={fps}><Punch text={'DELLE PROPRIE\nSCELTE.'} size={105} color={colors.ink} top={1390} prideAccent/></Sequence>
   <Sequence name="Transizione al primo caso" from={Math.round(21.82*fps)} durationInFrames={18} premountFor={fps}><Sweep/></Sequence>
   <Sequence name="Transizione al secondo caso" from={Math.round(49.78*fps)} durationInFrames={18} premountFor={fps}><Sweep/></Sequence>
   <Sequence name="Transizione al terzo caso" from={Math.round(74.7*fps)} durationInFrames={18} premountFor={fps}><Sweep/></Sequence>
   <Sequence name="Transizione al punto centrale" from={Math.round(103.8*fps)} durationInFrames={18} premountFor={fps}><Sweep rainbow/></Sequence>
   <Sequence name="Transizione alla precisazione" from={Math.round(109.3*fps)} durationInFrames={16} premountFor={fps}><Sweep/></Sequence>
   <Sequence name="Transizione al finale" from={Math.round(124.05*fps)} durationInFrames={18} premountFor={fps}><Sweep rainbow/></Sequence>
  </Sequence>
  <Audio src={staticFile('nuovo02/sfx/sound-design.wav')} premountFor={fps}/>
 </AbsoluteFill>;
};
