import React from 'react';
import {Audio,Video} from '@remotion/media';
import {AbsoluteFill,Img,Sequence,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {BackWord,Fonts,Paper,PrideStroke,Punch,colors,headline,sans} from './Art';
import pages from './religione-captions.json';
import audio from './religione-audio.json';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const inserts=[[9,19,0],[38,54,10],[60,66,26],[87,96,32],[122,131,41]];
const maskWindows=[[0,4.2],[25,31],[54,59],[99,105],[138,144]];
const zooms=[[0,.15,3.9,4.2,.07],[24.47,24.7,30.5,31,.045],[32,32.2,37.7,38,.07],[54,54.2,58.8,59.2,.06],[67,67.3,72.9,73.5,.055],[82,82.2,86.7,87,.045],[97,97.3,102.7,103,.04],[105,105.2,110.7,111,.065],[113,113.2,121.7,122,.055],[132,132.2,137.5,138,.04],[139,139.2,147.5,148,.045],[150,150.3,157.6,158,.065],[159,159.3,164.8,165.02,.07]];
const CaptionPages:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;const page=pages.find(x=>t>=x.start&&t<x.end);
 if(!page)return null;
 const inInsert=inserts.some(([a,b])=>t>=a+.12&&t<b-.12);const words=page.text.split(' ');
 return <div style={{position:'absolute',left:65,right:145,top:inInsert?1540:1092,minHeight:inInsert?126:78,padding:inInsert?'22px 24px':'8px 24px',borderRadius:15,background:'#191321',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:sans,fontSize:54,lineHeight:1.08,fontWeight:700,textAlign:'center',color:'white',translate:`0 ${interpolate(f,[page.start*fps,page.start*fps+5],[6,0],clamp)}px`}}><div>{words.map((w,i)=><React.Fragment key={i}><span style={{color:i===words.length-1?colors.ink:'white'}}>{w}</span>{i<words.length-1?' ':''}</React.Fragment>)}</div></div>;
};
const Behind:React.FC<{children:React.ReactNode}>=({children})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();if(!maskWindows.some(([a,b])=>f/fps>=a&&f/fps<b))return null;
 const mask=staticFile(`religione/inverse-timed/${String(Math.floor(f/2)).padStart(5,'0')}.png`);
 return <AbsoluteFill style={{height:480,maskImage:`url("${mask}")`,WebkitMaskImage:`url("${mask}")`,maskSize:'100% 100%',WebkitMaskSize:'100% 100%'}}><Img src={mask} style={{width:1,height:1,opacity:0}}/>{children}</AbsoluteFill>;
};
const Insert:React.FC<{trim:number}>=({trim})=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:interpolate(f,[0,7,durationInFrames-8,durationInFrames-1],[0,1,1,0],clamp)}}><Video src={staticFile('religione/inserts.mp4')} muted trimBefore={Math.round(trim*fps)} premountFor={fps} style={{width:'100%',height:'100%'}}/></AbsoluteFill>;
};
export const ReligioneEdit:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const showAroll=!inserts.some(([a,b])=>f>=Math.round(a*fps)+8&&f<Math.round(b*fps)-8);
 return <AbsoluteFill style={{backgroundColor:colors.dark,overflow:'hidden'}}>
  <Fonts/>
  {showAroll&&<AbsoluteFill style={{scale:1.02+Math.max(0,...zooms.map(([a,b,c,d,m])=>interpolate(f,[a*fps,b*fps,c*fps,d*fps],[0,m,m,0],clamp))),transformOrigin:'50% 57%'}}>
   <Video src={staticFile('religione/source.mp4')} muted premountFor={fps} style={{width:'100%',height:'100%'}}/>
   <Behind>
    <Sequence name="Testo dietro la figura" durationInFrames={Math.round(4.2*fps)} premountFor={fps}><BackWord text="TESTO" size={130} top={100} color={colors.lilac}/></Sequence>
    <Sequence name="Traduzione dietro la figura" from={25*fps} durationInFrames={6*fps} premountFor={fps}><BackWord text="TRADUZIONE" size={130} top={100}/></Sequence>
    <Sequence name="Testo: richiamo dietro la figura" from={54*fps} durationInFrames={5*fps} premountFor={fps}><BackWord text="TESTO" size={130} top={100} color={colors.lilac}/></Sequence>
    <Sequence name="Contesto di Romani dietro la figura" from={99*fps} durationInFrames={6*fps} premountFor={fps}><BackWord text="CONTESTO" size={130} top={100}/></Sequence>
    <Sequence name="Contesto nel finale" from={138*fps} durationInFrames={6*fps} premountFor={fps}><BackWord text="CONTESTO" size={130} top={100} color={colors.lilac}/></Sequence>
   </Behind>
  </AbsoluteFill>}
  <Sequence name="HyperFrames: contesto e documenti" from={9*fps} durationInFrames={10*fps} premountFor={fps}><Insert trim={0}/></Sequence>
  <Sequence name="HyperFrames: termini greci" from={38*fps} durationInFrames={16*fps} premountFor={fps}><Insert trim={10}/></Sequence>
  <Sequence name="HyperFrames: categorie antiche e moderne" from={60*fps} durationInFrames={6*fps} premountFor={fps}><Insert trim={26}/></Sequence>
  <Sequence name="HyperFrames: Romani 1" from={87*fps} durationInFrames={9*fps} premountFor={fps}><Insert trim={32}/></Sequence>
  <Sequence name="HyperFrames: Romani 2" from={122*fps} durationInFrames={9*fps} premountFor={fps}><Insert trim={41}/></Sequence>
  <CaptionPages/>
  <Sequence name="Hook originale" durationInFrames={Math.round(4.2*fps)} premountFor={fps}><Punch text={'LA BIBBIA\nNON ODIA I GAY'} label="Una lettura critica delle lettere di Paolo." size={91} top={1350} color={colors.ink}/></Sequence>
  <Sequence name="Precisazione approvata sui documenti" from={Math.round(19.3*fps)} durationInFrames={Math.round(5.05*fps)} premountFor={fps}><Paper text="Il richiamo al contesto non implica l’approvazione dottrinale delle relazioni omosessuali." label="CONTESTO ≠ CONSENSO" size={49} top={1330}/></Sequence>
  <Sequence name="Ingresso in Corinzi" from={Math.round(24.6*fps)} durationInFrames={Math.round(4.2*fps)} premountFor={fps}><Punch text="1 CORINZI 6:9" size={104} color={colors.lilac} top={1390}/></Sequence>
  <Sequence name="CTA originale integra, ricollocata al centro" from={Math.round(73.6*fps)} durationInFrames={472} premountFor={fps}>
   <AbsoluteFill style={{fontFamily:headline}}><Punch text="LUDARKS" label="Contro l’omofobia" top={1290} size={158}/><div style={{position:'absolute',left:85,right:145,top:1510,fontFamily:sans,fontSize:58,lineHeight:1.1,color:'white'}}>Seguimi e sostieni il video.</div><PrideStroke top={1620} width={820}/></AbsoluteFill>
  </Sequence>
  <Sequence name="Ingresso in Romani" from={Math.round(82*fps)} durationInFrames={4*fps} premountFor={fps}><Punch text="ROMANI 1:26–27" size={101} color={colors.lilac} top={1380}/></Sequence>
  <Sequence name="Conclusione etica originale" from={Math.round(151*fps)} durationInFrames={9901-Math.round(151*fps)} premountFor={fps}><Punch text={'UN VERSETTO NON È\nUNA LICENZA\nPER ODIARE.'} size={88} top={1300} prideAccent/><div style={{position:'absolute',left:85,right:145,top:1690,fontFamily:sans,fontSize:34,color:'white'}}>Rispetto e dignità per le persone LGBT+.</div></Sequence>
  <Audio src={staticFile('religione/source.mp4')} volume={audio.voiceGain} premountFor={fps}/>
  <Audio src={staticFile('religione/sfx/sound-design.wav')} premountFor={fps}/>
 </AbsoluteFill>;
};
