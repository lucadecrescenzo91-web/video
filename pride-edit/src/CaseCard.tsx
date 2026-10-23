import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {Fonts,appear,bounce,colors,headline,sans} from './Art';

export const CaseCard:React.FC<{number:string;name:string;role:string}>=({number,name,role})=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames),fontFamily:sans}}>
  <Fonts/>
  <div style={{position:'absolute',left:82,right:145,top:1385,padding:'26px 30px',background:colors.dark,borderLeft:`9px solid ${colors.ink}`,rotate:'-2deg',translate:`${interpolate(f,[0,14],[-130,0],{extrapolateRight:'clamp'})}px 0`,boxShadow:'8px 8px 0 #c6a6ff55'}}>
   <div style={{fontSize:29,letterSpacing:5,color:colors.lilac}}>CASO {number} / 03</div>
   <div style={{fontFamily:headline,fontSize:name.length>14?91:105,lineHeight:1.12,color:'white',marginTop:12,scale:bounce(f,fps),transformOrigin:'left center'}}>{name}</div>
   <div style={{fontSize:35,color:colors.ink,marginTop:12,letterSpacing:2}}>{role}</div>
  </div>
 </AbsoluteFill>;
};
