import React,{useMemo} from 'react';
import type {Caption} from '@remotion/captions';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {colors,sans} from './Art';

type Page={startMs:number;endMs:number;words:Caption[]};
export const WordCaptions:React.FC<{captions:Caption[]}>=({captions})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const time=frame/fps*1000;
 const pages=useMemo(()=>{
  const result:Page[]=[];let page:Caption[]=[];let length=0;
  const flush=()=>{if(page.length){result.push({startMs:page[0].startMs,endMs:page[page.length-1].endMs,words:page});page=[];length=0;}};
  for(const word of captions){
   if(page.length&&(length+word.text.length>33||word.startMs-page[0].startMs>2200||word.startMs-page[page.length-1].endMs>450))flush();
   page.push(word);length+=word.text.length;
   if(word.pageBreakAfter||/[.!?;:]$/.test(word.text.trim()))flush();
  }
  flush();return result;
 },[captions]);
 const current=pages.find((p,i)=>time>=p.startMs&&time<Math.min(p.endMs+110,pages[i+1]?.startMs??Infinity));
 if(!current)return null;
 return <div style={{position:'absolute',left:85,right:145,top:1200,display:'flex',justifyContent:'center',flexWrap:'wrap',columnGap:9,rowGap:4,fontFamily:sans,fontSize:58,lineHeight:1.1,textAlign:'center',fontWeight:700,textTransform:'uppercase',color:'white',textShadow:'2px 3px 1px #191321,-2px -2px 1px #191321,2px -2px 1px #191321,-2px 2px 1px #191321'}}>
  {current.words.map(word=><span key={`${word.startMs}-${word.text}`} style={{color:time>=word.startMs&&time<word.endMs+25?colors.ink:'white'}}>{word.text.trim()}</span>)}
 </div>;
};
