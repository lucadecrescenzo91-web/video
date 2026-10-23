import React from 'react';
import {Video} from '@remotion/media';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {BackWord,Fonts,Punch} from './Art';

// Internal three-second style proof, not the finished edit or a transcript.
export const StyleCheck:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const mask=staticFile(`masks/${String(Math.floor(f/2)).padStart(4,'0')}.png`);
 return <AbsoluteFill style={{backgroundColor:'#191321'}}>
  <Fonts/>
  <Video src={staticFile('source.mp4')} premountFor={fps} style={{width:'100%',height:'100%'}}/>
  <BackWord text="LGBT+" size={230} top={300} rainbow/>
  <Img src={mask} style={{position:'absolute',width:1,height:1,opacity:0}}/>
  <AbsoluteFill style={{maskImage:`url("${mask}")`,WebkitMaskImage:`url("${mask}")`,maskSize:'100% 100%',WebkitMaskSize:'100% 100%'}}>
   <Video src={staticFile('source.mp4')} muted premountFor={fps} style={{width:'100%',height:'100%'}}/>
  </AbsoluteFill>
  <Punch text="PARLIAMONE." label="PROVA VISIVA DELLO STILE" top={1430} size={120} prideAccent/>
 </AbsoluteFill>;
};
