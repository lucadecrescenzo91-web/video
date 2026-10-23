import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {appear,bounce,colors,headline,PrideStroke,sans} from './Art';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;

export const Brand:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames)}}>
  <div style={{position:'absolute',left:85,top:1360,fontFamily:sans,fontSize:34,letterSpacing:3,color:'white',textShadow:'2px 3px 0 #191321'}}>CONTRO L’OMOFOBIA</div>
  <div style={{position:'absolute',left:80,top:1420,fontFamily:headline,fontSize:118,color:colors.ink,rotate:'-3deg',scale:bounce(f,fps),transformOrigin:'left center',textShadow:'4px 5px 0 #191321'}}>LUDARKS</div>
  <div style={{position:'absolute',left:90,top:1570,fontFamily:sans,fontSize:46,color:'white',letterSpacing:3}}>SEGUI · SOSTIENI</div>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0}}><path d="M833 1535L796 1500C760 1465 799 1423 833 1460C867 1423 906 1465 870 1500Z" fill={colors.pink} style={{transformOrigin:'833px 1490px',scale:interpolate(f,[0,12,22,34,45,58],[.4,1.1,1,1.12,1,1],clamp)}}/></svg>
  <PrideStroke top={1640} width={720}/>
 </AbsoluteFill>;
};

export const DefinitionPoint:React.FC<{word:string;detail:string;index:string;icon:'power'|'speech'|'violence'|'lock'}>=({word,detail,index,icon})=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames)}}>
  <div style={{position:'absolute',left:85,top:1408,fontFamily:sans,fontSize:44,color:colors.lilac}}>{index}</div>
  <div style={{position:'absolute',left:175,top:1385,fontFamily:headline,fontSize:110,lineHeight:1.1,color:'white',textShadow:'4px 5px 0 #191321',translate:`0 ${(1-bounce(f,fps))*45}px`}}>{word}</div>
  <div style={{position:'absolute',left:180,top:1530,fontFamily:sans,fontSize:49,color:colors.ink,letterSpacing:2}}>{detail}</div>
  <svg width="120" height="120" viewBox="0 0 100 100" style={{position:'absolute',right:145,top:1398,scale:bounce(f,fps,5)}}>
   <circle cx="50" cy="50" r="46" fill={colors.dark} stroke={colors.lilac} strokeWidth="2"/>
   {icon==='power'&&<g stroke={colors.ink} strokeWidth="5" fill="none"><path d="M23 35L50 20L77 35Z M22 77H78 M28 40V70M44 40V70M60 40V70M75 40V70"/></g>}
   {icon==='speech'&&<g stroke={colors.ink} strokeWidth="5" fill="none"><path d="M22 28H78V65H47L30 78V65H22Z"/><path d="M37 39L63 55M63 39L37 55" stroke={colors.red}/></g>}
   {icon==='violence'&&<path d="M55 15L29 52H47L39 84L75 41H55Z" fill={colors.red}/>}
   {icon==='lock'&&<g stroke={colors.ink} strokeWidth="5" fill="none"><rect x="27" y="43" width="46" height="37" rx="6"/><path d="M35 43V31A15 15 0 0 1 65 31V43M50 56V68"/></g>}
  </svg>
 </AbsoluteFill>;
};

export const DataList:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames)}}>
  {['ARGOMENTAZIONI','DATI','FONTI'].map((word,i)=><div key={word} style={{position:'absolute',left:95,right:140,top:1370+i*100,fontFamily:headline,fontSize:i===0?82:90,lineHeight:1.05,color:i===2?colors.ink:'white',opacity:interpolate(f,[i*.85*fps,i*.85*fps+7],[0,1],clamp),translate:`${(1-bounce(f,fps,i*.85*fps))*70}px 0`,textShadow:'3px 4px 0 #191321'}}><span style={{color:colors.ink,fontSize:53,marginRight:25}}>✓</span>{word}</div>)}
 </AbsoluteFill>;
};

export const Evidence:React.FC<{question?:boolean}>=({question=false})=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames)}}>
  <div style={{position:'absolute',left:85,top:1365,fontFamily:sans,fontSize:34,letterSpacing:3,color:'white',textShadow:'2px 3px 0 #191321'}}>{question?'EFFETTI COLLATERALI?':'DATI E FONTI'}</div>
  <div style={{position:'absolute',left:75,right:140,top:1435,fontFamily:headline,fontSize:question?150:95,lineHeight:1.1,color:question?colors.pink:colors.ink,rotate:'-3deg',scale:bounce(f,fps),transformOrigin:'left center',textShadow:'4px 5px 0 #191321'}}>{question?'QUALI?':'STUDI\nVERIFICABILI.'}</div>
  <svg width="145" height="160" viewBox="0 0 130 145" style={{position:'absolute',right:140,top:1410,rotate:'5deg',scale:bounce(f,fps,7)}}>
   <rect x="10" y="8" width="78" height="112" rx="6" fill={colors.dark} stroke="white" strokeWidth="4"/>
   <path d="M27 32H70M27 48H70M27 64H60" stroke={colors.lilac} strokeWidth="4"/>
   <circle cx="84" cy="96" r="27" fill={colors.dark} stroke={colors.ink} strokeWidth="6"/><path d="M103 116L125 140" stroke={colors.ink} strokeWidth="8" strokeLinecap="round"/>
   {question&&<text x="84" y="110" textAnchor="middle" fill={colors.pink} fontSize="38" fontFamily="Arial">?</text>}
  </svg>
 </AbsoluteFill>;
};

export const TransFreedom:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();const flag=['#6ed7ee','#f5a8ba','#fff','#f5a8ba','#6ed7ee'];
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames)}}>
  <div style={{position:'absolute',left:85,top:1365,fontFamily:sans,fontSize:34,color:'white',letterSpacing:3}}>UNA PERSONA TRANS</div>
  <div style={{position:'absolute',left:75,top:1420,fontFamily:headline,fontSize:109,color:colors.ink,lineHeight:1.1,scale:bounce(f,fps),transformOrigin:'left center',textShadow:'4px 5px 0 #191321'}}>LIBERA DI<br/>RACCONTARSI.</div>
  {flag.map((c,i)=><div key={i} style={{position:'absolute',left:85,top:1680+i*5,width:interpolate(f,[i*3,25+i*3],[0,650],clamp),height:5,background:c}}/>)}
 </AbsoluteFill>;
};

export const OneVsAll:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{opacity:appear(f,durationInFrames)}}>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0}}>
   <g style={{transformOrigin:'245px 1460px',scale:bounce(f,fps)}}><circle cx="245" cy="1420" r="36" fill={colors.lilac}/><path d="M193 1520Q193 1470 245 1470Q297 1470 297 1520" stroke={colors.lilac} strokeWidth="20" fill="none" strokeLinecap="round"/></g>
   {[0,1,2,3,4,5].map((i)=><g key={i} style={{opacity:interpolate(f,[10+i*3,17+i*3],[0,1],clamp)}}><circle cx={630+(i%3)*98} cy={1410+Math.floor(i/3)*92} r="20" fill={i%2===0?colors.ink:colors.lilac}/><path d={`M${603+(i%3)*98} ${1461+Math.floor(i/3)*92}Q${630+(i%3)*98} ${1422+Math.floor(i/3)*92} ${657+(i%3)*98} ${1461+Math.floor(i/3)*92}`} fill="none" stroke={i%2===0?colors.ink:colors.lilac} strokeWidth="13" strokeLinecap="round"/></g>)}
  </svg>
  <div style={{position:'absolute',left:442,top:1410,fontFamily:sans,fontSize:140,color:colors.red}}>≠</div>
  <div style={{position:'absolute',left:100,top:1590,fontFamily:headline,fontSize:60,color:'white',textShadow:'3px 3px 0 #191321'}}>UNA STORIA</div>
  <div style={{position:'absolute',left:610,top:1590,fontFamily:headline,fontSize:60,color:colors.ink,textShadow:'3px 3px 0 #191321'}}>TUTTE</div>
 </AbsoluteFill>;
};
