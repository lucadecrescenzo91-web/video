import React from 'react';
import {Video} from '@remotion/media';
import {AbsoluteFill,Composition,staticFile,useVideoConfig} from 'remotion';
import {Fonts} from './Art';
import {StyleCheck} from './StyleCheck';
import {PrideEdit} from './PrideEdit';
import {IpocrisiaEdit} from './IpocrisiaEdit';
import {CaseCard} from './CaseCard';
import {DateStamp} from './DateStamp';
import {PublicPrivate} from './PublicPrivate';

const SourceReview:React.FC=()=>{
 const {fps}=useVideoConfig();
 return <AbsoluteFill style={{backgroundColor:'#191321'}}><Fonts/><Video src={staticFile('source.mp4')} premountFor={fps} style={{width:'100%',height:'100%'}}/></AbsoluteFill>;
};
const IpocrisiaOriginal:React.FC=()=>{
 const {fps}=useVideoConfig();
 return <AbsoluteFill><Video src={staticFile('nuovo02/source.mp4')} premountFor={fps} style={{width:'100%',height:'100%'}}/></AbsoluteFill>;
};

export const RemotionRoot:React.FC=()=> <>
 <Composition id="IpocrisiaEdit" component={IpocrisiaEdit} width={1080} height={1920} fps={60} durationInFrames={7715}/>
 <Composition id="IpocrisiaOriginal" component={IpocrisiaOriginal} width={1080} height={1920} fps={60} durationInFrames={7715}/>
 <Composition id="CaseHaggard" component={CaseCard} width={1080} height={1920} fps={60} durationInFrames={264} defaultProps={{number:'01',name:'TED HAGGARD',role:'PASTORE STATUNITENSE'}}/>
 <Composition id="CaseSzajer" component={CaseCard} width={1080} height={1920} fps={60} durationInFrames={186} defaultProps={{number:'02',name:'JÓZSEF SZÁJER',role:'EURODEPUTATO UNGHERESE'}}/>
 <Composition id="CasePaulk" component={CaseCard} width={1080} height={1920} fps={60} durationInFrames={294} defaultProps={{number:'03',name:'JOHN PAULK',role:'MOVIMENTO CRISTIANO «EX GAY»'}}/>
 <Composition id="DateStamp" component={DateStamp} width={1080} height={1920} fps={60} durationInFrames={282} defaultProps={{year:'2006',detail:'IL RACCONTO\nDI MIKE JONES'}}/>
 <Composition id="PublicPrivate" component={PublicPrivate} width={1080} height={1920} fps={60} durationInFrames={408}/>
 <Composition id="PrideEdit" component={PrideEdit} width={1080} height={1920} fps={60} durationInFrames={6760}/>
 <Composition id="SourceReview" component={SourceReview} width={1080} height={1920} fps={60} durationInFrames={6760}/>
 <Composition id="StyleCheck" component={StyleCheck} width={1080} height={1920} fps={60} durationInFrames={180}/>
</>;
