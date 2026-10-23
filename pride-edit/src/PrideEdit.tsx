import React from 'react';
import {Audio,Video} from '@remotion/media';
import {AbsoluteFill,Img,Sequence,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {BackWord,Comparison,Fonts,Paper,Punch,Sweep,colors} from './Art';
import {Brand,DataList,DefinitionPoint,Evidence,OneVsAll,TransFreedom} from './Scenes';
import {WordCaptions} from './WordCaptions';
import captions from './captions.json';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const behindWindows=[[0,2.45],[15.8,24.8],[34.65,37.8],[47.35,50.95],[53.8,58.8],[59.5,63.1],[77.5,80.6],[90.5,94.0],[105.15,108.05],[110.15,112.667]];
const zooms=[
 [0,.18,1.8,2.5,.115],[15.8,16.05,24.6,24.9,.06],[24.95,25.12,27.8,28.35,.13],
 [28.65,28.85,33.7,34.0,.065],[34.6,34.8,37.7,38.0,.085],[38.9,39.15,41.7,42.2,.09],
 [43.45,43.7,46.0,46.45,.06],[47.6,47.8,50.8,51.15,.09],[51.4,51.6,53.4,53.8,.05],
 [54.0,54.7,58.4,59.0,.04],[59.6,59.9,62.8,63.1,.06],[63.55,63.7,66.5,67.0,.07],
 [67.2,67.5,70.4,71.0,.05],[74.2,74.5,76.8,77.2,.07],[77.76,77.94,79.8,80.6,.105],
 [84.55,84.7,86.7,87.2,.075],[90.8,91.0,93.5,94.0,.09],[94.2,94.4,97.9,98.3,.065],
 [99.0,99.3,102.25,102.6,.055],[102.8,103.0,105.1,105.5,.055],
 [105.55,105.8,108.2,108.8,.095],[110.25,110.45,112.65,112.67,.115],
];
const Behind:React.FC<{children:React.ReactNode}>=({children})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const seconds=f/fps;
 if(!behindWindows.some(([start,end])=>seconds>=start&&seconds<end))return null;
 const mask=staticFile(`inverse-masks/${String(Math.min(3379,Math.floor(f/2))).padStart(4,'0')}.png`);
 return <AbsoluteFill style={{maskImage:`url("${mask}")`,WebkitMaskImage:`url("${mask}")`,maskSize:'100% 100%',WebkitMaskSize:'100% 100%'}}><Img src={mask} style={{position:'absolute',width:1,height:1,opacity:0}}/>{children}</AbsoluteFill>;
};

export const PrideEdit:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{backgroundColor:colors.dark,overflow:'hidden'}}>
  <Fonts/>
  <Sequence name="Parlato integrale e grafica sincronizzata" durationInFrames={6760} premountFor={fps}>
   <AbsoluteFill style={{scale:1.025+Math.max(0,...zooms.map(([a,b,c,d,m])=>interpolate(frame,[a*fps,b*fps,c*fps,d*fps],[0,m,m,0],clamp))),transformOrigin:'50% 57%'}}>
    <Video name="Originale integrale" src={staticFile('source.mp4')} premountFor={fps} style={{width:'100%',height:'100%'}}/>
    <Behind>
    <Sequence name="Fascista? Dietro la figura" durationInFrames={Math.round(2.45*fps)} premountFor={fps}><BackWord text="FASCISTA?" size={202} top={310} color={colors.red}/></Sequence>
    <Sequence name="Definizione: fascismo dietro la figura" from={Math.round(15.8*fps)} durationInFrames={Math.round(9*fps)} premountFor={fps}><BackWord text="FASCISMO" size={186} top={300} color={colors.red}/></Sequence>
    <Sequence name="Fonti dietro la figura" from={Math.round(34.65*fps)} durationInFrames={Math.round(3.15*fps)} premountFor={fps}><BackWord text="FONTI." size={240} top={310}/></Sequence>
    <Sequence name="Fatti? Dietro la figura" from={Math.round(47.35*fps)} durationInFrames={Math.round(3.6*fps)} premountFor={fps}><BackWord text="FATTI?" size={248} top={315} color={colors.lilac}/></Sequence>
    <Sequence name="Libera dietro la figura" from={Math.round(53.8*fps)} durationInFrames={Math.round(5*fps)} premountFor={fps}><BackWord text="LIBERA." size={232} top={300} color="#7eddf0"/></Sequence>
    <Sequence name="Una non tutte: dietro la figura" from={Math.round(59.5*fps)} durationInFrames={Math.round(3.6*fps)} premountFor={fps}><BackWord text="TUTTE?" size={235} top={310} color={colors.lilac}/></Sequence>
    <Sequence name="Diritti dietro la figura, accento Pride" from={Math.round(77.5*fps)} durationInFrames={Math.round(3.1*fps)} premountFor={fps}><BackWord text="DIRITTI" size={225} top={310} rainbow/></Sequence>
    <Sequence name="LGBTQIA+ dietro la figura" from={Math.round(90.5*fps)} durationInFrames={Math.round(3.5*fps)} premountFor={fps}><BackWord text="LGBTQIA+" size={178} top={320} rainbow/></Sequence>
    <Sequence name="Significato dietro la figura" from={Math.round(105.15*fps)} durationInFrames={Math.round(2.9*fps)} premountFor={fps}><BackWord text="SIGNIFICATO" size={142} top={310}/></Sequence>
    <Sequence name="Argomenti dietro la figura" from={Math.round(110.15*fps)} durationInFrames={6760-Math.round(110.15*fps)} premountFor={fps}><BackWord text="ARGOMENTI." size={159} top={315} color={colors.pink}/></Sequence>
    </Behind>
   </AbsoluteFill>
   <WordCaptions captions={captions}/>
   <Sequence name="Apertura: una domanda" durationInFrames={Math.round(2.45*fps)} premountFor={fps}><Punch text="SAI COSA SIGNIFICA?" size={83} label="LE PAROLE CONTANO." top={1450} color="white"/></Sequence>
   <Sequence name="Chiarire il concetto: accento ironico" from={Math.round(8.3*fps)} durationInFrames={Math.round(2*fps)} premountFor={fps}><Punch text="CHIARIAMO." size={125} color={colors.lilac}/></Sequence>
   <Sequence name="Ludarks: identità e sostegno" from={Math.round(11.35*fps)} durationInFrames={Math.round(4.4*fps)} premountFor={fps}><Brand/></Sequence>
   <Sequence name="Potere concentrato" from={Math.round(18.3*fps)} durationInFrames={Math.round(2.05*fps)} premountFor={fps}><DefinitionPoint index="01" word="POTERE" detail="CONCENTRATO" icon="power"/></Sequence>
   <Sequence name="Repressione del dissenso" from={Math.round(20.35*fps)} durationInFrames={Math.round(1.45*fps)} premountFor={fps}><DefinitionPoint index="02" word="DISSENSO" detail="REPRESSO" icon="speech"/></Sequence>
   <Sequence name="Violenza politica" from={Math.round(21.8*fps)} durationInFrames={Math.round(1.5*fps)} premountFor={fps}><DefinitionPoint index="03" word="VIOLENZA" detail="POLITICA" icon="violence"/></Sequence>
   <Sequence name="Libertà limitate" from={Math.round(23.3*fps)} durationInFrames={Math.round(1.5*fps)} premountFor={fps}><DefinitionPoint index="04" word="LIBERTÀ" detail="LIMITATE" icon="lock"/></Sequence>
   <Sequence name="Rottura ironica della definizione" from={Math.round(25.0*fps)} durationInFrames={Math.round(3.1*fps)} premountFor={fps}><Punch text="NON C’ENTRA." label="CON QUELLO CHE FACCIO." size={112} color={colors.red}/></Sequence>
   <Sequence name="Criticare non è censurare" from={Math.round(29.0*fps)} durationInFrames={Math.round(5*fps)} premountFor={fps}><Comparison first="CRITICARE" second="CENSURARE" firstSize={102} secondSize={96}/></Sequence>
   <Sequence name="Argomentazioni, dati, fonti" from={Math.round(34.65*fps)} durationInFrames={Math.round(3.2*fps)} premountFor={fps}><DataList/></Sequence>
   <Sequence name="Effetti collaterali? Quali?" from={Math.round(38.8*fps)} durationInFrames={Math.round(4.1*fps)} premountFor={fps}><Evidence question/></Sequence>
   <Sequence name="Richiesta di studi verificabili" from={Math.round(43.45*fps)} durationInFrames={Math.round(2.9*fps)} premountFor={fps}><Evidence/></Sequence>
   <Sequence name="Opinione non equivale a verità" from={Math.round(47.6*fps)} durationInFrames={Math.round(3.3*fps)} premountFor={fps}><Comparison first="OPINIONE" second="VERITÀ" firstSize={107} secondSize={107}/></Sequence>
   <Sequence name="Una contraddizione evidente" from={Math.round(51.45*fps)} durationInFrames={Math.round(2.15*fps)} premountFor={fps}><Punch text="CONTRADDIZIONE." size={84} color={colors.pink}/></Sequence>
   <Sequence name="Persona trans: libertà di raccontarsi" from={Math.round(54.0*fps)} durationInFrames={Math.round(4.8*fps)} premountFor={fps}><TransFreedom/></Sequence>
   <Sequence name="Una storia non rappresenta tutte" from={Math.round(59.5*fps)} durationInFrames={Math.round(3.6*fps)} premountFor={fps}><OneVsAll/></Sequence>
   <Sequence name="Propaganda: etichetta contestata" from={Math.round(63.55*fps)} durationInFrames={Math.round(3.15*fps)} premountFor={fps}><Paper text="«PROPAGANDA LGBT»" label="UN’ETICHETTA" strike sub="NON È QUESTO." top={1370}/></Sequence>
   <Sequence name="Testimonianza non è verità assoluta" from={Math.round(67.16*fps)} durationInFrames={Math.round(3.6*fps)} premountFor={fps}><Comparison first="TESTIMONIANZA" second="VERITÀ ASSOLUTA" firstSize={83} secondSize={82}/></Sequence>
   <Sequence name="Evitare la strumentalizzazione" from={Math.round(74.2*fps)} durationInFrames={Math.round(3.1*fps)} premountFor={fps}><Punch text="NON STRUMENTALIZZARE." size={74} label="LA STORIA DI UNA PERSONA" color="white" top={1450}/></Sequence>
   <Sequence name="Diritti e dignità" from={Math.round(77.76*fps)} durationInFrames={Math.round(2.8*fps)} premountFor={fps}><Punch text="E DIGNITÀ." label="MIGLIAIA DI PERSONE." color={colors.ink} size={128} prideAccent/></Sequence>
   <Sequence name="Etichetta comunista" from={Math.round(84.3*fps)} durationInFrames={Math.round(1.32*fps)} premountFor={fps}><Paper text="«COMUNISTA»" label="LE ETICHETTE" strike top={1400}/></Sequence>
   <Sequence name="Etichetta sinistroide" from={Math.round(85.62*fps)} durationInFrames={Math.round(1.2*fps)} premountFor={fps}><Paper text="«SINISTROIDE»" label="LE ETICHETTE" strike top={1400}/></Sequence>
   <Sequence name="Definizione politica ed economica" from={Math.round(87.25*fps)} durationInFrames={Math.round(2.65*fps)} premountFor={fps}><Punch text={'TEORIA POLITICA\nED ECONOMICA.'} label="UNA DEFINIZIONE PRECISA." size={85} color="white" top={1400}/></Sequence>
   <Sequence name="Difendere LGBT non assegna una posizione politica" from={Math.round(90.8*fps)} durationInFrames={Math.round(3.15*fps)} premountFor={fps}><Punch text={'NON\nAUTOMATICAMENTE.'} size={101} color={colors.ink} top={1380}/></Sequence>
   <Sequence name="Sinistroide: un insulto" from={Math.round(94.15*fps)} durationInFrames={Math.round(3.8*fps)} premountFor={fps}><Paper text="«SINISTROIDE»" label="LIQUIDARE QUALCUNO" strike sub="UN INSULTO." top={1370}/></Sequence>
   <Sequence name="Criticare disinformazione non rende fascisti" from={Math.round(99.2*fps)} durationInFrames={Math.round(3.35*fps)} premountFor={fps}><Comparison first="CRITICARE" second="ESSERE FASCISTA" firstSize={107} secondSize={80}/></Sequence>
   <Sequence name="Difendere una minoranza non assegna etichette" from={Math.round(102.8*fps)} durationInFrames={Math.round(2.55*fps)} premountFor={fps}><Comparison first="DIFENDERE UNA MINORANZA" second="ESSERE COMUNISTA" firstSize={62} secondSize={77}/></Sequence>
   <Sequence name="Le parole hanno un significato" from={Math.round(105.55*fps)} durationInFrames={Math.round(2.8*fps)} premountFor={fps}><Punch text={'LE PAROLE\nCONTANO.'} size={107} color={colors.ink} top={1375}/></Sequence>
   <Sequence name="Etichette non sono argomenti" from={Math.round(108.4*fps)} durationInFrames={Math.round(1.75*fps)} premountFor={fps}><Punch text="ETICHETTE ≠ ARGOMENTI" size={75} color="white" label="USARE LE PAROLE A CASO"/></Sequence>
   <Sequence name="Finale: zero argomenti" from={Math.round(110.15*fps)} durationInFrames={6760-Math.round(110.15*fps)} premountFor={fps}><Punch text={'ZERO\nARGOMENTI.'} size={124} color={colors.ink} top={1360} prideAccent/></Sequence>
   <Sequence name="Transizione alla definizione" from={Math.round(15.66*fps)} durationInFrames={18} premountFor={fps}><Sweep/></Sequence>
   <Sequence name="Transizione alle fonti" from={Math.round(34.4*fps)} durationInFrames={17} premountFor={fps}><Sweep/></Sequence>
   <Sequence name="Transizione alla libertà di raccontarsi" from={Math.round(53.65*fps)} durationInFrames={18} premountFor={fps}><Sweep rainbow/></Sequence>
   <Sequence name="Transizione a diritti e dignità" from={Math.round(77.55*fps)} durationInFrames={18} premountFor={fps}><Sweep rainbow/></Sequence>
   <Sequence name="Transizione alle definizioni politiche" from={Math.round(86.77*fps)} durationInFrames={17} premountFor={fps}><Sweep/></Sequence>
   <Sequence name="Transizione alla conclusione" from={Math.round(105.35*fps)} durationInFrames={18} premountFor={fps}><Sweep/></Sequence>
  </Sequence>
  <Audio src={staticFile('sfx/sound-design.wav')} premountFor={fps}/>
 </AbsoluteFill>;
};
