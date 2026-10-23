import React from 'react';
import {Video} from '@remotion/media';
import {AbsoluteFill,Composition,staticFile,useVideoConfig} from 'remotion';
import {Fonts} from './Art';
import {StyleCheck} from './StyleCheck';
import {PrideEdit} from './PrideEdit';

const SourceReview:React.FC=()=>{
 const {fps}=useVideoConfig();
 return <AbsoluteFill style={{backgroundColor:'#191321'}}><Fonts/><Video src={staticFile('source.mp4')} premountFor={fps} style={{width:'100%',height:'100%'}}/></AbsoluteFill>;
};

export const RemotionRoot:React.FC=()=> <>
 <Composition id="PrideEdit" component={PrideEdit} width={1080} height={1920} fps={60} durationInFrames={6760}/>
 <Composition id="SourceReview" component={SourceReview} width={1080} height={1920} fps={60} durationInFrames={6760}/>
 <Composition id="StyleCheck" component={StyleCheck} width={1080} height={1920} fps={60} durationInFrames={180}/>
</>;
