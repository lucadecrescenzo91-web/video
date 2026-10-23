import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {Fonts,appear,bounce,colors,sans} from './Art';

export const PublicPrivate:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames),fontFamily:sans}}>
  <Fonts/>
  <div style={{position:'absolute',left:85,right:145,top:1400,display:'grid',gridTemplateColumns:'1fr 85px 1fr',alignItems:'center',gap:10,rotate:'-2deg'}}>
   <div style={{padding:24,background:colors.dark,border:`2px solid ${colors.lilac}`,translate:`${interpolate(f,[0,14],[-100,0],{extrapolateRight:'clamp'})}px 0`}}>
    <svg width="62" height="62" viewBox="0 0 64 64"><path d="M7 22L32 7l25 15M9 55h46M16 26v24m16-24v24m16-24v24" fill="none" stroke={colors.lilac} strokeWidth="5"/></svg>
    <div style={{color:'white',fontSize:40,lineHeight:1.1}}>POLITICHE<br/>PUBBLICHE</div>
   </div>
   <svg width="85" height="110" viewBox="0 0 85 110" style={{scale:bounce(f,fps,8)}}><path d="M12 42H73M12 68H73M59 20L26 90" fill="none" stroke={colors.red} strokeWidth="9" strokeLinecap="round"/></svg>
   <div style={{padding:24,background:colors.dark,border:`2px solid ${colors.ink}`,translate:`${interpolate(f,[5,20],[100,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}px 0`}}>
    <svg width="62" height="62" viewBox="0 0 64 64"><path d="M9 31L32 10l23 21M16 26v29h32V26M28 55V39h10v16" fill="none" stroke={colors.ink} strokeWidth="5"/></svg>
    <div style={{color:colors.ink,fontSize:40,lineHeight:1.1}}>VITA<br/>PRIVATA</div>
   </div>
  </div>
 </AbsoluteFill>;
};
