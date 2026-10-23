import React from 'react';
import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';
import {Fonts,appear,bounce,colors,headline,sans} from './Art';

export const DateStamp:React.FC<{year:string;detail:string;accent?:string}>=({year,detail,accent=colors.ink})=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames),fontFamily:sans}}>
  <Fonts/>
  <div style={{position:'absolute',left:85,right:145,top:1400,display:'flex',gap:24,alignItems:'center',rotate:'-2deg',scale:bounce(f,fps),transformOrigin:'left center'}}>
   <div style={{background:accent,color:colors.dark,padding:'12px 24px',fontFamily:headline,fontSize:111,lineHeight:1.1,boxShadow:'7px 7px 0 #191321'}}>{year}</div>
   <div style={{fontSize:49,lineHeight:1.05,color:'white',whiteSpace:'pre-line',textShadow:'3px 3px 0 #191321'}}>{detail}</div>
  </div>
 </AbsoluteFill>;
};
