import React,{useEffect,useState} from 'react';
import {Sparkles} from 'lucide-react';

// Prototype-only latency. Cache completed read-only simulations in memory;
// cancellation on unmount or context change prevents stale completions.
// A real provider will replace this timer with abortable request state.
const completed=new Set();
export function useDemoReady(key,enabled=true,delay=1000,cache=true){
 const [readyKey,setReadyKey]=useState(null);
 const ready=readyKey===key||(cache&&completed.has(key));
 useEffect(()=>{
   if(!enabled||ready)return;
   const timer=setTimeout(()=>{
     if(cache){completed.add(key);if(completed.size>64)completed.delete(completed.values().next().value)}
     setReadyKey(key);
   },delay);
   return()=>clearTimeout(timer);
 },[key,enabled,delay,cache,ready]);
 return ready;
}
export function Skeleton({width='100%',shape='line'}){
 return <span aria-hidden="true" className={'skeleton skeleton-'+shape} style={{width:shape==='square'?undefined:width}}/>;
}
export function SkeletonLines({widths=['100%','80%','55%']}){
 return <div className="skeleton-lines" aria-hidden="true">{widths.map((width,i)=><Skeleton key={i} width={width}/>)}</div>;
}
export function LoadingContent({label,variant='',children}){
 return <div className={'ai-loading '+variant} role="status" aria-live="polite" aria-label={label+' (simulazione)'}>
   <div className="ai-loading-label"><Sparkles size={14}/><span>{label}…</span><span className="ai-demo-marker">Demo</span></div>
   <div className="skeleton-body" aria-hidden="true">{children}</div>
 </div>;
}
