import React, {useEffect,useState} from 'react';
import {AbsoluteFill,cancelRender,continueRender,delayRender,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';

export const colors={ink:'#efff38',pink:'#ff65c8',lilac:'#c6a6ff',red:'#ff5857',dark:'#191321'};
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const headline='Anton, sans-serif';
export const sans='Barlow, Arial, sans-serif';
export const pride=['#ed403c','#ff9c35','#f6e547','#57bf73','#4297f2','#a674de'];
export const appear=(frame:number,duration:number)=>interpolate(frame,[0,5,duration-8,duration-1],[0,1,1,0],clamp);
export const bounce=(frame:number,fps:number,delay=0)=>spring({frame:frame-delay,fps,config:{damping:17,stiffness:210}});

export const Fonts:React.FC=()=>{
 const [handle]=useState(()=>delayRender('Local fonts'));
 useEffect(()=>{Promise.all([
  new FontFace('Anton',`url(${staticFile('fonts/Anton.ttf')})`).load(),
  new FontFace('Barlow',`url(${staticFile('fonts/Barlow.ttf')})`).load(),
 ]).then(fonts=>{fonts.forEach(font=>document.fonts.add(font));continueRender(handle);}).catch(cancelRender);},[handle]);
 return null;
};

export const PrideStroke:React.FC<{top?:number;left?:number;width?:number}>=({top=1600,left=85,width=850})=>{
 const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();
 return <svg width={width} height={80} viewBox="0 0 850 80" style={{position:'absolute',left,top,opacity:appear(f,durationInFrames)}}>
  {pride.map((color,i)=><path key={color} d={`M7 ${18+i*7}Q430 ${-12+i*7} 840 ${18+i*7}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray="850" strokeDashoffset={interpolate(f,[i*2,22+i*2],[850,0],clamp)}/>) }
 </svg>;
};

export const BackWord:React.FC<{text:string;top?:number;size?:number;color?:string;angle?:number;rainbow?:boolean}>=({text,top=280,size=200,color=colors.ink,angle=-4,rainbow=false})=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames)}}>
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(25,19,33,.32),transparent 70%)'}}/>
  <div style={{position:'absolute',left:40,right:40,top,fontFamily:headline,fontSize:size,lineHeight:1.07,textAlign:'center',letterSpacing:-2,color,rotate:`${angle}deg`,
   translate:`${(1-bounce(f,fps))*100}px 0`,scale:interpolate(f,[0,9,18],[1.09,.995,1],clamp),textShadow:'0 5px 0 rgba(0,0,0,.18)'}}>{text}</div>
  {rainbow&&<svg width="1080" height="1920" style={{position:'absolute',inset:0}}>
   {pride.map((c,i)=><path key={c} d={`M-70 ${710+i*18}Q150 ${130+i*18} 1090 ${430+i*18}`} stroke={c} strokeWidth="12" fill="none" opacity=".78" strokeDasharray="1600" strokeDashoffset={interpolate(f,[i*2,35+i*2],[1600,0],clamp)} />)}
  </svg>}
 </AbsoluteFill>;
};

export const Punch:React.FC<{text:string;label?:string;color?:string;angle?:number;size?:number;top?:number;prideAccent?:boolean}>=({text,label,color=colors.ink,angle=-3,size=132,top=1410,prideAccent=false})=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames),fontFamily:headline}}>
  {label&&<div style={{position:'absolute',left:85,top:top-68,fontFamily:sans,fontSize:31,color:'white',letterSpacing:4,textShadow:'2px 3px 0 #191321'}}>{label}</div>}
  <div style={{position:'absolute',left:75,right:130,top,color,fontSize:size,lineHeight:1.1,whiteSpace:'pre-line',rotate:`${angle}deg`,scale:bounce(f,fps),transformOrigin:'left center',textShadow:'4px 5px 0 #191321'}}>{text}</div>
  {prideAccent&&<PrideStroke top={top+text.split("\n").length*size*1.15+15} width={820}/>}
 </AbsoluteFill>;
};

export const Paper:React.FC<{text:string;label?:string;strike?:boolean;sub?:string;top?:number;size?:number}>=({text,label,strike=false,sub,top=1390,size=76})=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames)}}>
  <div style={{position:'absolute',left:84,right:140,top,padding:'24px 32px 30px',background:colors.dark,color:'white',border:`3px solid ${colors.lilac}`,boxShadow:'10px 10px 0 rgba(198,166,255,.45)',rotate:'2deg',scale:bounce(f,fps),fontFamily:sans}}>
   {label&&<div style={{fontSize:25,color:colors.lilac,letterSpacing:4,marginBottom:12}}>{label}</div>}
   <div style={{fontSize:size,lineHeight:1.05,whiteSpace:'pre-line'}}>{text}</div>
   {strike&&<svg viewBox="0 0 850 300" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}><path d="M0 260L850 20" stroke={colors.red} strokeWidth="13" strokeLinecap="round" strokeDasharray="900" strokeDashoffset={interpolate(f,[.8*fps,1.1*fps],[900,0],clamp)}/></svg>}
  </div>
  {sub&&<div style={{position:'absolute',left:90,right:140,top:top+250,fontFamily:headline,fontSize:72,color:colors.ink,rotate:'-3deg',scale:bounce(f,fps,Math.round(.9*fps)),transformOrigin:'left center',textShadow:'3px 4px 0 #191321'}}>{sub}</div>}
 </AbsoluteFill>;
};

export const Comparison:React.FC<{first:string;second:string;symbol?:string;prideAccent?:boolean;firstSize?:number;secondSize?:number}>=({first,second,symbol='≠',prideAccent=false,firstSize=87,secondSize=84})=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames),fontFamily:headline}}>
  <div style={{position:'absolute',left:80,right:140,top:1380,color:'white',fontSize:firstSize,lineHeight:1.12,rotate:'-2deg',translate:`${(1-bounce(f,fps))*-120}px 0`}}>{first}</div>
  <div style={{position:'absolute',left:90,top:1480,fontFamily:sans,fontSize:125,color:colors.red,scale:bounce(f,fps,8)}}>{symbol}</div>
  <div style={{position:'absolute',left:220,right:130,top:1510,color:colors.ink,fontSize:secondSize,lineHeight:1.1,translate:`${(1-bounce(f,fps,12))*120}px 0`}}>{second}</div>
  {prideAccent&&<PrideStroke top={1640}/>}
 </AbsoluteFill>;
};

export const Sweep:React.FC<{rainbow?:boolean}>=({rainbow=false})=>{
 const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{pointerEvents:'none',overflow:'hidden'}}>
  <div style={{position:'absolute',width:330,top:-300,bottom:-300,rotate:'-18deg',
   translate:`${interpolate(f,[0,durationInFrames-1],[-900,1750],clamp)}px 0`,
   opacity:interpolate(f,[0,4,durationInFrames-5,durationInFrames-1],[0,1,1,0],clamp),
   background:rainbow?'linear-gradient(90deg,transparent,rgba(255,96,196,.32),rgba(255,230,65,.28),rgba(87,191,115,.22),rgba(66,151,242,.25),transparent)':'linear-gradient(90deg,transparent,rgba(198,166,255,.22),rgba(239,255,56,.32),transparent)'}}/>
 </AbsoluteFill>;
};
