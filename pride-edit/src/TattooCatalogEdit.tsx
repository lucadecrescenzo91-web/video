import React,{useMemo} from 'react';
import {Audio,Video} from '@remotion/media';
import type {Caption} from '@remotion/captions';
import {AbsoluteFill,Img,Sequence,interpolate,useCurrentFrame,useVideoConfig,staticFile} from 'remotion';
import {Fonts} from './Art';
import captions from './captions-04.json';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;

const CatalogCaptions:React.FC<{words:Caption[]}>=({words})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const ms=f/fps*1000;
 const pages=useMemo(()=>{
  const pages:{start:number;end:number;words:Caption[]}[]=[];let page:Caption[]=[];let chars=0;
  const flush=()=>{if(page.length)pages.push({start:page[0].startMs,end:page[page.length-1].endMs,words:page});page=[];chars=0;};
  for(const w of words){if(page.length&&(chars+w.text.length>27||w.startMs-page[0].startMs>1350||w.startMs-page[page.length-1].endMs>270))flush();page.push(w);chars+=w.text.length;if(/[.!?]$/.test(w.text.trim()))flush();}flush();return pages;
 },[words]);
 const p=pages.find((p,i)=>ms>=p.start&&ms<Math.min(p.end+80,pages[i+1]?.start??Infinity));
 if(!p)return null;
 const top=ms>=29100?1165:ms>=21500&&ms<24700?1550:ms>=9100&&ms<14900?1370:1290;
 return <div style={{position:'absolute',top,left:95,right:135,display:'flex',justifyContent:'center',flexWrap:'wrap',gap:'5px 10px',fontFamily:'Barlow, sans-serif',fontSize:ms>=4800&&ms<9100?66:59,fontWeight:800,lineHeight:1.1,textAlign:'center',textTransform:'uppercase',filter:'drop-shadow(0 4px 2px #0006)'}}>
  {p.words.map(w=><span key={w.startMs+w.text} style={{color:ms>=w.startMs&&ms<w.endMs?'#111111':'#fff6e5',background:ms>=w.startMs&&ms<w.endMs?'#f4ff58':'#111111ee',padding:'5px 8px',borderRadius:3,scale:ms>=w.startMs&&ms<w.endMs?1.035:1}}>{w.text.trim()}</span>)}
 </div>;
};

const HyperFramesOverlay:React.FC=()=>{
 const frame=useCurrentFrame();
 return <Img src={staticFile(`nuovo04/overlays/frame_${String(frame+1).padStart(6,'0')}.png`)} style={{width:'100%',height:'100%',position:'absolute',inset:0}}/>;
};

export const TattooCatalogEdit:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const zooms=[[0,.18,.8,1,.035],[3.8,4.1,4.55,4.75,.065],[4.82,4.98,5.65,5.9,.045],[7.68,7.85,8.85,9.08,.055],[10.25,10.4,11.1,11.4,.03],[13.3,13.5,14.55,14.8,.04],[16.4,16.6,18.25,18.55,.04],[18.74,18.86,19.68,19.9,.07],[20.04,20.15,20.6,20.76,.065],[21.0,21.12,21.38,21.52,.07],[22.2,22.4,23,23.15,.055],[23.7,23.85,24.5,24.72,.065],[26.25,26.4,27.1,27.4,.035],[29.15,29.35,31.28,31.5,.035]];
 return <AbsoluteFill style={{background:'#111111',overflow:'hidden'}}>
  <Fonts/>
  <Sequence name="Sorgente integrale e sottotitoli approvati" durationInFrames={1877} premountFor={fps}>
   <AbsoluteFill style={{scale:1+Math.max(0,...zooms.map(([a,b,c,d,z])=>interpolate(f,[a*fps,b*fps,c*fps,d*fps],[0,z,z,0],clamp))),transformOrigin:t>=18.7&&t<19.9?'40% 45%':t>=20&&t<20.8?'65% 45%':'50% 48%'}}>
    <Video src={staticFile('nuovo04/source.mp4')} volume={0.9} premountFor={fps} style={{width:'100%',height:'100%'}}/>
   </AbsoluteFill>
   <Sequence name="HyperFrames: titoli, flash tattoo e transizioni" durationInFrames={1877} premountFor={fps}><HyperFramesOverlay/></Sequence>
   <CatalogCaptions words={captions}/>
  </Sequence>
  <Audio src={staticFile('nuovo04/sfx/sound-design.wav')} volume={0.65} premountFor={fps}/>
 </AbsoluteFill>;
};
