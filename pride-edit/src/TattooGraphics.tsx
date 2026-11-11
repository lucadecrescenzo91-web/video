import React from 'react';
import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';

const cream='#fff6e5',black='#111111',red='#ff342d',yellow='#f4ff58',blue='#3d7eff';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
type Motif='heart'|'butterfly'|'rose'|'spark'|'duo';
type ArtProps={motif:Motif;left?:number;top?:number;size?:number;angle?:number};

// Each illustration is authored vector artwork; line drawing, fills and accents
// follow the composition frame rather than CSS animation or external images.
const Trace:React.FC<{d:string;delay?:number;width?:number;color?:string}>=({d,delay=0,width=6,color=black})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const offset=interpolate(f,[delay*fps,(delay+.55)*fps],[1,0],clamp);
 return <g fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path d={d} stroke={cream} strokeWidth={width+12} pathLength={1} strokeDasharray={1} strokeDashoffset={offset}/>
  <path d={d} stroke={color} strokeWidth={width} pathLength={1} strokeDasharray={1} strokeDashoffset={offset}/>
 </g>;
};

const Heart:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <>
  <path d="M120 195C98 175 42 137 39 94C35 45 95 31 120 72C145 31 205 45 201 94C198 137 142 175 120 195Z" fill={red} opacity={interpolate(f,[.32*fps,.7*fps],[0,1],clamp)}/>
  <Trace d="M120 195C98 175 42 137 39 94C35 45 95 31 120 72C145 31 205 45 201 94C198 137 142 175 120 195Z"/>
  <Trace d="M64 91C63 73 79 65 92 77" delay={.18} width={7} color={cream}/>
  <path d="M173 21L187 30L93 213L77 221L78 202Z" fill={cream} opacity={interpolate(f,[.5*fps,.78*fps],[0,1],clamp)}/>
  <Trace d="M173 21L187 30L93 213L77 221L78 202ZM159 37L191 54M169 18L182 5L198 14L185 31" delay={.36} width={5}/>
  <Trace d="M20 38L27 25L34 38L47 45L34 52L27 65L20 52L7 45M211 161V187M198 174H224" delay={.55} width={4} color={yellow}/>
 </>;
};

const Butterfly:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <>
  <g opacity={interpolate(f,[.3*fps,.7*fps],[0,1],clamp)}>
   <path d="M116 116C72 28 8 14 23 82C29 107 64 133 106 142C65 121 19 139 44 179C61 206 101 190 117 143" fill={cream}/>
   <path d="M124 116C168 28 232 14 217 82C211 107 176 133 134 142C175 121 221 139 196 179C179 206 139 190 123 143" fill={cream}/>
   <path d="M101 111Q49 51 49 81Q55 103 101 123M139 111Q191 51 191 81Q185 103 139 123" fill={red}/>
   <path d="M96 149Q52 143 61 165Q75 180 102 158M144 149Q188 143 179 165Q165 180 138 158" fill={blue}/>
  </g>
  <Trace d="M116 116C72 28 8 14 23 82C29 107 64 133 106 142C65 121 19 139 44 179C61 206 101 190 117 143M124 116C168 28 232 14 217 82C211 107 176 133 134 142C175 121 221 139 196 179C179 206 139 190 123 143"/>
  <Trace d="M117 101Q120 87 124 101L125 151Q120 176 115 151ZM118 99Q102 67 92 75M122 99Q138 67 148 75" delay={.15} width={5}/>
  <Trace d="M101 111Q49 51 49 81Q55 103 101 123M139 111Q191 51 191 81Q185 103 139 123M96 149Q52 143 61 165Q75 180 102 158M144 149Q188 143 179 165Q165 180 138 158" delay={.4} width={3}/>
  <Trace d="M33 212H51M42 203V221M196 20V42M185 31H207" delay={.65} width={4} color={yellow}/>
 </>;
};

const Rose:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <>
  <g opacity={interpolate(f,[.3*fps,.75*fps],[0,1],clamp)}>
   <path d="M119 31C146 17 167 37 168 55C199 51 217 82 198 104C213 134 186 158 161 151C146 178 110 183 91 161C61 175 30 153 37 125C10 107 25 70 51 68C49 39 79 23 97 35Z" fill={red}/>
   <path d="M116 178Q58 151 52 186Q79 212 115 191M121 202Q167 158 191 183Q177 218 121 216" fill={yellow}/>
  </g>
  <Trace d="M119 31C146 17 167 37 168 55C199 51 217 82 198 104C213 134 186 158 161 151C146 178 110 183 91 161C61 175 30 153 37 125C10 107 25 70 51 68C49 39 79 23 97 35Z"/>
  <Trace d="M99 57Q147 43 165 87Q149 122 117 127Q81 119 72 88Q77 63 99 57ZM107 77Q135 65 146 88Q134 111 112 105Q97 99 107 77ZM57 92Q58 138 95 144M169 118Q153 150 126 156" delay={.18} width={5}/>
  <Trace d="M119 174L117 232M116 178Q58 151 52 186Q79 212 115 191M121 202Q167 158 191 183Q177 218 121 216M58 183L109 186M179 186L129 210" delay={.4} width={5}/>
  <Trace d="M207 143L214 130L221 143L234 150L221 157L214 170L207 157L194 150" delay={.6} width={4} color={blue}/>
 </>;
};

const Spark:React.FC=()=> <>
 <path d="M113 25L134 90L198 111L134 132L113 198L92 132L27 111L92 90Z" fill={yellow}/>
 <Trace d="M113 25L134 90L198 111L134 132L113 198L92 132L27 111L92 90Z"/>
 <Trace d="M113 61V161M63 111H163" delay={.2} width={3}/>
 <Trace d="M187 158L196 183L222 192L196 201L187 227L178 201L152 192Z" delay={.4} width={4} color={red}/>
 <Trace d="M29 27V58M13 43H45M203 42V64M192 53H214" delay={.55} width={4}/>
 </>;

const Duo:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <>
  <g opacity={interpolate(f,[.25*fps,.65*fps],[0,1],clamp)}>
   <path d="M88 160C64 140 19 115 23 78C25 46 69 35 88 67C107 35 151 46 153 78C157 115 112 140 88 160Z" fill={red}/>
   <path d="M154 204C130 184 85 159 89 122C91 90 135 79 154 111C173 79 217 90 219 122C223 159 178 184 154 204Z" fill={yellow}/>
  </g>
  <Trace d="M88 160C64 140 19 115 23 78C25 46 69 35 88 67C107 35 151 46 153 78C157 115 112 140 88 160Z"/>
  <Trace d="M154 204C130 184 85 159 89 122C91 90 135 79 154 111C173 79 217 90 219 122C223 159 178 184 154 204Z" delay={.22}/>
  <Trace d="M46 81Q49 65 64 73M111 126Q117 109 129 119M191 41V70M176 55H206M37 181V208M24 195H51" delay={.5} width={4} color={cream}/>
 </>;
};

export const TattooFlash:React.FC<ArtProps>=({motif,left=780,top=950,size=190,angle=0})=>{
 const f=useCurrentFrame();const {fps,durationInFrames:n}=useVideoConfig();
 return <AbsoluteFill style={{pointerEvents:'none'}}>
  <svg width={size} height={size} viewBox="0 0 240 240" style={{position:'absolute',left,top,overflow:'visible',filter:'drop-shadow(4px 6px 0 #1118)',opacity:interpolate(f,[0,5,n-10,n-1],[0,1,1,0],clamp),scale:spring({frame:f,fps,config:{damping:15,stiffness:230}}),rotate:`${angle+Math.sin(f/fps*3)*2}deg`,translate:`0 ${Math.sin(f/fps*4)*4}px`}}>
   {motif==='heart'?<Heart/>:motif==='butterfly'?<Butterfly/>:motif==='rose'?<Rose/>:motif==='duo'?<Duo/>:<Spark/>}
  </svg>
 </AbsoluteFill>;
};

export const TattooNeedle:React.FC<{left?:number;top?:number;size?:number}>=({left=765,top=1570,size=220})=>{
 const f=useCurrentFrame();const {fps,durationInFrames:n}=useVideoConfig();
 const progress=interpolate(f,[.25*fps,1.45*fps],[0,1],clamp);
 return <AbsoluteFill style={{pointerEvents:'none'}}>
  <svg width={size} height={size*1.1} viewBox="0 0 240 264" style={{position:'absolute',left,top,overflow:'visible',filter:'drop-shadow(4px 6px 0 #1118)',opacity:interpolate(f,[0,6,n-10,n-1],[0,1,1,0],clamp),scale:spring({frame:f,fps,config:{damping:18,stiffness:240}})}}>
   <Trace d="M24 227Q49 197 82 215T147 225Q182 216 215 239" delay={.25} width={8}/>
   <g style={{translate:`${progress*65-25}px ${Math.sin(progress*Math.PI)*-15}px`,rotate:'27deg',transformOrigin:'120px 110px'}}>
    <path d="M102 24H144V142L128 188H118L102 142Z" fill={black} stroke={cream} strokeWidth={12} strokeLinejoin="round"/>
    <rect x="102" y="24" width="42" height="48" rx="10" fill={red} stroke={black} strokeWidth="5"/>
    <rect x="94" y="94" width="58" height="49" rx="9" fill={yellow} stroke={black} strokeWidth="6"/>
    <path d="M105 104H141M105 115H141M105 126H141M121 188V212M129 188V212M120 24V8H157" fill="none" stroke={cream} strokeWidth="5" strokeLinecap="round"/>
    <path d="M121 188V212M129 188V212" stroke={black} strokeWidth="3"/>
   </g>
   <circle cx={211} cy={241} r={interpolate(f,[1.2*fps,1.5*fps],[0,7],clamp)} fill={red} stroke={cream} strokeWidth={4}/>
  </svg>
 </AbsoluteFill>;
};
