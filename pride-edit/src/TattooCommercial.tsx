import React,{useEffect,useMemo,useState} from 'react';
import {Audio,Video} from '@remotion/media';
import type {Caption} from '@remotion/captions';
import {AbsoluteFill,Img,Sequence,cancelRender,continueRender,delayRender,Easing,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import captions from './captions-03.json';
import {TattooFlash,TattooNeedle} from './TattooGraphics';

const C={red:'#ff342d',yellow:'#f4ff58',cream:'#fff6e5',black:'#111111',blue:'#3d7eff'};
const limit={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const heavy='Archivo Black, sans-serif';
const body='Barlow, sans-serif';
const ink=(f:number,fps:number,delay=0)=>spring({frame:f-delay,fps,config:{damping:19,stiffness:280,mass:.7}});
const out=(f:number,n:number)=>interpolate(f,[0,6,n-7,n-1],[0,1,1,0],limit);

const CommercialFonts:React.FC=()=>{
 const [handle]=useState(()=>delayRender('Commercial fonts'));
 useEffect(()=>{Promise.all([
  new FontFace('Archivo Black',`url(${staticFile('fonts/commercial/ArchivoBlack.ttf')})`).load(),
  new FontFace('Barlow',`url(${staticFile('fonts/Barlow.ttf')})`).load(),
 ]).then(fs=>{fs.forEach(font=>document.fonts.add(font));continueRender(handle);}).catch(cancelRender);},[handle]);
 return null;
};

// A single source template controls the caption word highlighting.
const CommercialCaptions:React.FC<{words:Caption[]}>=({words})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps*1000;
 const pages=useMemo(()=>{
  const result:{start:number;end:number;words:Caption[]}[]=[];let group:Caption[]=[];let chars=0;
  const flush=()=>{if(group.length)result.push({start:group[0].startMs,end:group[group.length-1].endMs,words:group});group=[];chars=0;};
  for(const w of words){if(group.length&&(chars+w.text.length>28||w.startMs-group[0].startMs>1250||w.startMs-group[group.length-1].endMs>250))flush();group.push(w);chars+=w.text.length;if(/[.!?]$/.test(w.text))flush();}flush();return result;
 },[words]);
 const p=pages.find((p,i)=>t>=p.start&&t<Math.min(p.end+90,pages[i+1]?.start??Infinity));
 if(!p)return null;
 return <div style={{position:'absolute',top:t>=6100&&t<8950?1120:1260,left:100,right:130,display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'4px 10px',fontFamily:body,fontWeight:800,fontSize:59,lineHeight:1.14,textAlign:'center',textTransform:'uppercase',filter:'drop-shadow(0 3px 2px #0008)'}}>
  {p.words.map(w=><span key={w.startMs+w.text} style={{background:t>=w.startMs&&t<w.endMs?C.yellow:'#111e',color:t>=w.startMs&&t<w.endMs?C.black:C.cream,padding:'4px 7px',borderRadius:3,scale:t>=w.startMs&&t<w.endMs?1.035:1}}>{w.text.trim()}</span>)}
 </div>;
};

// Preserve the baked-in source lettering. All transitions occupy the outside edges.
export const EdgeFlash:React.FC<{color?:string}>=({color=C.red})=>{
 const f=useCurrentFrame();const {durationInFrames:n}=useVideoConfig();
 const p=interpolate(f,[0,n*.35,n-1],[0,1,0],limit);
 return <AbsoluteFill style={{pointerEvents:'none'}}>
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
   <path d={`M0 0H1080V${100*p}L0 ${35*p}Z`} fill={color}/>
   <path d={`M0 1920H1080V${1920-100*p}L0 ${1920-35*p}Z`} fill={C.yellow}/>
   <path d={`M0 0V1920L${95*p} 1560L${30*p} 550Z`} fill={color}/>
   <path d={`M1080 0V1920L${1080-80*p} 1460L${1080-24*p} 460Z`} fill={C.blue}/>
   {[0,1,2,3].map(i=><path key={i} d={`M${-100+i*90+f*16} 1860l150 -35`} stroke={C.black} strokeWidth={14} opacity={p}/>)}
  </svg>
 </AbsoluteFill>;
};

const HookAccents:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames:n}=useVideoConfig();
 return <AbsoluteFill style={{opacity:out(f,n)}}>
  <div style={{position:'absolute',top:1550,left:96,right:250,fontFamily:heavy,color:C.cream,fontSize:58,lineHeight:1.08,letterSpacing:-2,translate:`${interpolate(f,[0,12],[-100,0],limit)}px 0`,background:C.black,padding:'20px 24px',rotate:'-2deg'}}><span style={{fontSize:39,letterSpacing:2}}>SCEGLI IL TUO</span><br/>PROSSIMO TATTOO</div>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0}}>
   <path d="M160 500L115 460M150 560L90 560M170 620L120 655M900 500L945 460M930 570L995 570M910 640L960 680" fill="none" stroke={C.yellow} strokeWidth={17} strokeLinecap="square" opacity={interpolate(f,[.85*fps,1.08*fps],[0,1],limit)} strokeDasharray="70" strokeDashoffset={interpolate(f,[.85*fps,1.15*fps],[70,0],limit)}/>
   <path d="M95 1500v-95h85M985 1500v-95h-85" fill="none" stroke={C.red} strokeWidth={10} style={{scale:ink(f,fps),transformOrigin:'540px 1450px'}}/>
  </svg>
 </AbsoluteFill>;
};

const BlackFridayAccent:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames:n}=useVideoConfig();
 return <AbsoluteFill style={{opacity:out(f,n)}}>
  <div style={{position:'absolute',top:1535,left:90,right:130,color:C.black,background:C.yellow,padding:'18px 22px',fontFamily:heavy,fontSize:58,rotate:'-2deg',translate:`${interpolate(f,[0,12],[950,0],limit)}px 0`}}>NON PERDERE L'EVENTO!</div>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0}}><path d="M150 350v-55h80M920 350v-55h-80M150 670v55h80M920 670v55h-80" fill="none" stroke={C.red} strokeWidth={12} style={{scale:ink(f,fps),transformOrigin:'540px 500px'}}/></svg>
 </AbsoluteFill>;
};

const BehindLettering:React.FC<{text:string;sub?:string;color?:string}>=({text,sub,color=C.yellow})=>{
 const local=useCurrentFrame();const {fps,durationInFrames:n}=useVideoConfig();
 return <AbsoluteFill style={{opacity:out(local,n)}}>
  <div style={{position:'absolute',top:text.length>6?380:495,left:65,right:65,fontFamily:heavy,fontSize:text.length>6?152:230,letterSpacing:-10,lineHeight:.95,color,WebkitTextStroke:'2px #111',textShadow:'9px 9px 0 #111',translate:`${interpolate(local,[0,14],[220,0],{...limit,easing:Easing.out(Easing.cubic)})}px 0`,scale:ink(local,fps)}}>{text}</div>
  {sub&&<div style={{position:'absolute',top:200,left:95,color:C.cream,fontFamily:body,fontSize:46,fontWeight:800,letterSpacing:4}}>{sub}</div>}
 </AbsoluteFill>;
};

const BehindMask:React.FC<{children:React.ReactNode}>=({children})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 if(!((t>=8.98&&t<11.18)||(t>=11.6&&t<14.4)))return null;
 const mask=staticFile(`nuovo03/inverse-masks/${String(Math.floor(f/2)).padStart(4,'0')}.png`);
 return <AbsoluteFill style={{height:1300,maskImage:`url("${mask}")`,WebkitMaskImage:`url("${mask}")`,maskSize:'100% 100%',WebkitMaskSize:'100% 100%'}}><Img src={mask} style={{position:'absolute',width:1,height:1,opacity:0}}/>{children}</AbsoluteFill>;
};

export const StencilDeck:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames:n}=useVideoConfig();
 return <AbsoluteFill style={{opacity:out(f,n)}}>
  <svg width={1080} height={1920} style={{position:'absolute',inset:0}}>
   <path d="M95 1560h85v-80M900 1480v80h85" fill="none" stroke={C.yellow} strokeWidth={9} strokeDasharray="180" strokeDashoffset={interpolate(f,[0,25],[180,0],limit)}/>
  </svg>
  <div style={{position:'absolute',left:100,right:130,top:1470,perspective:1000}}>
   <div style={{background:C.cream,color:C.black,border:`4px solid ${C.black}`,padding:'24px 30px',boxShadow:`12px 12px 0 ${C.red}`,rotate:`${interpolate(f,[0,18],[-16,-2],limit)}deg`,scale:ink(f,fps),transformOrigin:'left center'}}>
    <div style={{fontFamily:body,fontSize:37,fontWeight:800,letterSpacing:5,marginBottom:7}}>CREATI PER QUESTO EVENTO</div>
    <div style={{fontFamily:heavy,fontSize:77,letterSpacing:-4}}>STENCIL SPECIALI</div>
    <svg viewBox="0 0 800 28" width="100%" height={28}><path d="M0 14h800" stroke={C.red} strokeWidth={8} strokeDasharray="800" strokeDashoffset={interpolate(f,[14,38],[800,0],limit)}/></svg>
   </div>
  </div>
 </AbsoluteFill>;
};

const OfferAccents:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames:n}=useVideoConfig();
 return <AbsoluteFill style={{opacity:out(f,n)}}>
  <svg width={1080} height={1920} style={{position:'absolute',inset:0}}>
   <path d="M175 230v-70h90M920 230v-70h-90" fill="none" stroke={C.yellow} strokeWidth={12}/>
   <path d="M140 580h800" fill="none" stroke={C.yellow} strokeWidth={12} strokeDasharray="800" strokeDashoffset={interpolate(f,[0,.28*fps],[800,0],limit)}/>
  </svg>
  <div style={{position:'absolute',top:1510,left:90,right:130,background:C.black,color:C.cream,padding:'24px 30px',fontFamily:heavy,fontSize:73,letterSpacing:-4,rotate:'-2deg',scale:ink(f,fps)}}>{f<1.62*fps?'SCEGLI IL TUO FLASH.':'MEGLIO IN DUE.'}<svg width={55} height={55} viewBox="0 0 55 55" style={{marginLeft:15,verticalAlign:'middle',color:C.yellow}}><path d="M8 46L45 9M12 9H45V42" fill="none" stroke="currentColor" strokeWidth={6}/></svg></div>
 </AbsoluteFill>;
};

export const BenefitCallout:React.FC<{text:string;number:string;accent?:string}>=({text,number,accent=C.yellow})=>{
 const f=useCurrentFrame();const {durationInFrames:n}=useVideoConfig();
 return <AbsoluteFill style={{opacity:out(f,n)}}>
  <div style={{position:'absolute',left:90,right:130,top:1495,translate:`${interpolate(f,[0,14],[180,0],{...limit,easing:Easing.out(Easing.cubic)})}px 0`,fontFamily:heavy,color:C.cream}}>
   <div style={{display:'flex',alignItems:'center',gap:18,marginBottom:15}}><span style={{fontFamily:body,color:C.black,background:accent,fontWeight:800,fontSize:40,padding:'5px 16px'}}>{number}</span><div style={{height:5,background:accent,width:interpolate(f,[0,24],[0,690],limit)}}/></div>
   <div style={{fontSize:78,lineHeight:1.05,letterSpacing:-4,textShadow:'3px 4px 0 #111',whiteSpace:'pre-line'}}>{text}</div>
  </div>
 </AbsoluteFill>;
};

const LimitedFlash:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames:n}=useVideoConfig();
 return <AbsoluteFill style={{opacity:out(f,n)}}>
  <div style={{position:'absolute',top:1455,left:92,right:132,padding:'25px 30px',background:C.red,color:C.cream,rotate:'-3deg',scale:ink(f,fps)}}>
   <div style={{fontFamily:body,fontSize:39,fontWeight:800,letterSpacing:4}}>POSTI + FLASH</div>
   <div style={{fontFamily:heavy,fontSize:105,letterSpacing:-7}}>LIMITATI.</div>
   <div style={{height:8,background:'#1115',marginTop:14}}><div style={{height:'100%',width:`${interpolate(f,[0,n-1],[100,25],limit)}%`,background:C.yellow}}/></div>
  </div>
 </AbsoluteFill>;
};

const BioBooking:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames:n}=useVideoConfig();
 return <AbsoluteFill style={{opacity:out(f,n)}}>
  <div style={{position:'absolute',left:94,right:134,top:1490,color:C.black,background:C.yellow,padding:'22px 28px',translate:`0 ${interpolate(f,[0,14],[120,0],limit)}px`,boxShadow:`10px 10px 0 ${C.black}`}}>
   <div style={{fontFamily:body,fontSize:39,fontWeight:800,letterSpacing:5}}>NON ASPETTARE.</div>
   <div style={{fontFamily:heavy,fontSize:83,lineHeight:1.03,letterSpacing:-4}}>PRENOTA <svg width={66} height={66} viewBox="0 0 66 66" style={{verticalAlign:'middle',rotate:`${interpolate(f,[0,fps],[0,-20],limit)}deg`}}><path d="M10 55L55 10M15 10H55V50" fill="none" stroke="currentColor" strokeWidth={7}/></svg></div>
   <div style={{fontFamily:body,fontSize:54,fontWeight:800,marginTop:8}}>DAL LINK IN BIO</div>
  </div>
 </AbsoluteFill>;
};

const SaveDate:React.FC=()=>{
 const f=useCurrentFrame();const {fps,durationInFrames:n}=useVideoConfig();
 return <AbsoluteFill style={{opacity:out(f,n)}}>
  <div style={{position:'absolute',left:90,right:130,top:1650,display:'flex',alignItems:'center',gap:22,padding:'18px 23px',background:C.red,border:`5px solid ${C.black}`,boxShadow:`10px 10px 0 ${C.yellow}`,rotate:`${interpolate(f,[0,18],[-7,-1.5],limit)}deg`,scale:ink(f,fps),transformOrigin:'50% 100%'}}>
   <svg width={102} height={110} viewBox="0 0 102 110" style={{flexShrink:0}}>
    <rect x="6" y="19" width="90" height="82" rx="12" fill={C.yellow} stroke={C.black} strokeWidth="6"/>
    <path d="M7 43H95M28 8V29M74 8V29" fill="none" stroke={C.black} strokeWidth="7" strokeLinecap="round"/>
    <path d="M28 69L44 84L74 54" fill="none" stroke={C.black} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={interpolate(f,[9,31],[1,0],limit)}/>
   </svg>
   <div style={{fontFamily:heavy,fontSize:72,lineHeight:1.05,letterSpacing:-4,color:C.cream,whiteSpace:'nowrap'}}>SALVA <span style={{color:C.yellow}}>LA DATA.</span></div>
  </div>
 </AbsoluteFill>;
};

const CommentFinal:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{opacity:interpolate(f,[0,6],[0,1],limit)}}>
  <div style={{position:'absolute',left:90,right:130,top:1490,background:C.black,color:C.cream,padding:'25px 26px',borderLeft:`12px solid ${C.red}`,scale:ink(f,fps),transformOrigin:'50% 100%'}}>
   <div style={{fontFamily:body,fontSize:40,fontWeight:800,color:C.yellow,letterSpacing:3}}>VUOI TUTTI I DETTAGLI?</div>
   <div style={{fontFamily:heavy,fontSize:60,lineHeight:1.08,letterSpacing:-3,marginTop:10,paddingRight:50}}>SCRIVI IL COMMENTO.<span style={{color:C.red,fontFamily:'Arial, sans-serif',position:'absolute',right:25,top:74}}> ↓</span></div>
  </div>
  <svg width={1080} height={1920} style={{position:'absolute',inset:0}}>
   <path d="M110 260v-100h130M970 860v100H840" fill="none" stroke={C.yellow} strokeWidth={10} strokeDasharray="240" strokeDashoffset={interpolate(f,[0,.4*fps],[240,0],limit)}/>
   {[0,1,2].map(i=><path key={i} d={`M${280+i*210} 1770l40 40l40-40`} fill="none" stroke={i===1?C.red:C.yellow} strokeWidth={13} opacity={interpolate(f,[i*3,15+i*3],[0,1],limit)} style={{translate:`0 ${Math.sin(f/fps*6)*5}px`}}/>)}
  </svg>
  <div style={{position:'absolute',left:90,top:180,fontFamily:body,fontWeight:800,fontSize:32,letterSpacing:4,color:C.cream,textShadow:'2px 2px 0 #111'}}>ASHURA TATTOO / BLACK FRIDAY</div>
 </AbsoluteFill>;
};

export const TattooCommercial:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const zooms=[[.85,1.08,1.53,1.74,.06],[3.72,3.87,4.48,4.68,.035],[6.35,6.55,7.6,7.85,.035],[10.2,10.45,11.2,11.5,.035],[15.55,15.78,16.25,16.5,.035],[17.1,17.3,17.9,18.18,.05],[20.5,20.7,21.2,21.4,.035],[24,24.2,25.3,25.6,.035],[27.25,27.4,27.8,28,.05],[30.3,30.45,32.05,32.22,.04],[35.45,35.65,38.65,38.8,.035]];
 return <AbsoluteFill style={{background:C.black,overflow:'hidden'}}>
  <CommercialFonts/>
  <Sequence name="Video originale integrale + grafica sincronizzata" durationInFrames={2319} premountFor={fps}>
   <AbsoluteFill style={{scale:1+Math.max(0,...zooms.map(([a,b,c,d,z])=>interpolate(f,[a*fps,b*fps,c*fps,d*fps],[0,z,z,0],limit))),transformOrigin:'50% 48%'}}>
    <Video src={staticFile('nuovo03/source.mp4')} premountFor={fps} volume={0.9} style={{width:'100%',height:'100%'}}/>
    <BehindMask>
     <Sequence name="Data dietro la figura" from={Math.round(8.98*fps)} durationInFrames={Math.round(2.2*fps)} premountFor={fps}><BehindLettering text="29.11" sub="GIUGLIANO IN CAMPANIA"/></Sequence>
     <Sequence name="Stencil dietro la figura" from={Math.round(11.6*fps)} durationInFrames={Math.round(2.8*fps)} premountFor={fps}><BehindLettering text="FLASH." color={C.cream}/></Sequence>
    </BehindMask>
   </AbsoluteFill>
   <CommercialCaptions words={captions}/>
   <Sequence name="Hook: amplifica l’offerta originale senza coprirla" durationInFrames={Math.round(3.12*fps)} premountFor={fps}><HookAccents/></Sequence>
   <Sequence name="Lancio Black Friday: cornici e payoff" from={Math.round(3.28*fps)} durationInFrames={Math.round(1.4*fps)} premountFor={fps}><BlackFridayAccent/></Sequence>
   <Sequence name="Catalogo: stencil speciali" from={Math.round(11.5*fps)} durationInFrames={Math.round(3.33*fps)} premountFor={fps}><StencilDeck/></Sequence>
   <Sequence name="Offerte: evidenzia le scritte esistenti" from={Math.round(15*fps)} durationInFrames={Math.round(3.78*fps)} premountFor={fps}><OfferAccents/></Sequence>
   <Sequence name="Beneficio 01: piccolo tatuaggio" from={Math.round(18.9*fps)} durationInFrames={Math.round(2.43*fps)} premountFor={fps}><BenefitCallout number="01" text={'AGGIUNGI UN\nPICCOLO TATUAGGIO'}/></Sequence>
   <Sequence name="Beneficio 02: collezione" from={Math.round(21.44*fps)} durationInFrames={Math.round(1.85*fps)} premountFor={fps}><BenefitCallout number="02" text={'UN NUOVO\nDETTAGLIO.'} accent={C.blue}/></Sequence>
   <Sequence name="Beneficio 03: insieme" from={Math.round(23.36*fps)} durationInFrames={Math.round(2.24*fps)} premountFor={fps}><BenefitCallout number="03" text={'UN’ESPERIENZA\nDA CONDIVIDERE.'} accent={C.red}/></Sequence>
   <Sequence name="Disponibilità limitata" from={Math.round(25.72*fps)} durationInFrames={Math.round(2.16*fps)} premountFor={fps}><LimitedFlash/></Sequence>
   <Sequence name="Prenotazione dal link in bio" from={Math.round(29.1*fps)} durationInFrames={Math.round(3.08*fps)} premountFor={fps}><BioBooking/></Sequence>
   <Sequence name="Salva la data: preserva data e ora originali" from={Math.round(32.3*fps)} durationInFrames={Math.round(2.98*fps)} premountFor={fps}><SaveDate/></Sequence>
   <Sequence name="Finale: valorizza il commento Black Friday già presente" from={Math.round(35.47*fps)} durationInFrames={2319-Math.round(35.47*fps)} premountFor={fps}><CommentFinal/></Sequence>
   <Sequence name="Flash illustrato: cuore old school nell’hook" from={Math.round(.4*fps)} durationInFrames={Math.round(2.65*fps)} premountFor={fps}><TattooFlash motif="heart" left={850} top={1530} size={155} angle={9}/></Sequence>
   <Sequence name="Macchinetta: traccia d’inchiostro" from={Math.round(6.4*fps)} durationInFrames={Math.round(2.45*fps)} premountFor={fps}><TattooNeedle left={765} top={1570} size={220}/></Sequence>
   <Sequence name="Flash illustrato: farfalla stencil" from={Math.round(11.62*fps)} durationInFrames={Math.round(3*fps)} premountFor={fps}><TattooFlash motif="butterfly" left={65} top={940} size={190} angle={-12}/></Sequence>
   <Sequence name="Flash illustrato: rosa tattoo" from={Math.round(11.9*fps)} durationInFrames={Math.round(2.72*fps)} premountFor={fps}><TattooFlash motif="rose" left={850} top={930} size={165} angle={12}/></Sequence>
   <Sequence name="Ago e dettaglio: un nuovo piccolo tatuaggio" from={Math.round(19*fps)} durationInFrames={Math.round(2.24*fps)} premountFor={fps}><TattooFlash motif="spark" left={835} top={950} size={175} angle={5}/></Sequence>
   <Sequence name="Flash illustrato: cuore trafitto" from={Math.round(21.48*fps)} durationInFrames={Math.round(1.78*fps)} premountFor={fps}><TattooFlash motif="heart" left={76} top={880} size={160} angle={-10}/></Sequence>
   <Sequence name="Flash illustrato: due cuori senza scritte" from={Math.round(23.55*fps)} durationInFrames={Math.round(1.95*fps)} premountFor={fps}><TattooFlash motif="duo" left={825} top={930} size={190} angle={8}/></Sequence>
   <Sequence name="Transizione ingresso studio" from={Math.round(3.12*fps)} durationInFrames={12} premountFor={fps}><EdgeFlash/></Sequence>
   <Sequence name="Transizione data evento" from={Math.round(6.18*fps)} durationInFrames={16} premountFor={fps}><EdgeFlash color={C.yellow}/></Sequence>
   <Sequence name="Transizione stencil" from={Math.round(11.35*fps)} durationInFrames={16} premountFor={fps}><EdgeFlash color={C.blue}/></Sequence>
   <Sequence name="Transizione offerte" from={Math.round(14.85*fps)} durationInFrames={16} premountFor={fps}><EdgeFlash/></Sequence>
   <Sequence name="Transizione beneficio" from={Math.round(18.75*fps)} durationInFrames={14} premountFor={fps}><EdgeFlash color={C.yellow}/></Sequence>
   <Sequence name="Transizione dettaglio" from={Math.round(21.31*fps)} durationInFrames={14} premountFor={fps}><EdgeFlash color={C.blue}/></Sequence>
   <Sequence name="Transizione disponibilità" from={Math.round(25.59*fps)} durationInFrames={16} premountFor={fps}><EdgeFlash/></Sequence>
   <Sequence name="Transizione prenotazione" from={Math.round(28.92*fps)} durationInFrames={16} premountFor={fps}><EdgeFlash color={C.yellow}/></Sequence>
   <Sequence name="Transizione calendario" from={Math.round(32.16*fps)} durationInFrames={14} premountFor={fps}><EdgeFlash color={C.blue}/></Sequence>
   <Sequence name="Transizione chiusura" from={Math.round(35.32*fps)} durationInFrames={14} premountFor={fps}><EdgeFlash/></Sequence>
  </Sequence>
  <Audio src={staticFile('nuovo03/sfx/commercial.wav')} premountFor={fps}/>
 </AbsoluteFill>;
};
