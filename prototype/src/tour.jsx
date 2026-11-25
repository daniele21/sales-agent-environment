import React,{createContext,useState,useEffect,useLayoutEffect,useRef} from 'react';
import {createPortal} from 'react-dom';
import {Route,CalendarDays,Target,Mic,Image,FileText,Mail,Database,Sparkles,ArrowRight,ArrowLeft,CheckCircle2,X,Play,Pause,ChevronRight,ShieldCheck} from 'lucide-react';
import {TOURS,getTour,getStep,validProgress,advanceTour} from './tour-config.js';
export const TourSandboxContext=createContext(false);
const icons={route:Route,calendar:CalendarDays,target:Target,mic:Mic,image:Image,file:FileText,mail:Mail,database:Database,sparkles:Sparkles};
const progressKey='sales-core-tour-progress-v1',seenKey='sales-core-tour-intro-v1';
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function store(key,value){try{if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,JSON.stringify(value))}catch{}}
export function DiscoveryCenter({progress,onStart,onClose,finished}){
 const ref=useRef(null);
 useEffect(()=>{const before=document.activeElement;ref.current?.querySelector('button')?.focus();function key(e){if(e.key==='Escape'){e.preventDefault();onClose()}if(e.key==='Tab'){const nodes=[...ref.current.querySelectorAll('button:not(:disabled)')];if(!nodes.length)return;if(e.shiftKey&&document.activeElement===nodes[0]){e.preventDefault();nodes.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===nodes.at(-1)){e.preventDefault();nodes[0].focus()}}}document.addEventListener('keydown',key);return()=>{document.removeEventListener('keydown',key);before?.focus()}},[]);
 const paused=validProgress(progress)?getTour(progress.id):null;
 return createPortal(<div className="tour-discovery-overlay" onClick={onClose}><section ref={ref} className="tour-discovery" role="dialog" aria-modal="true" aria-label="Esplora Sales Core" onClick={e=>e.stopPropagation()}><div className="tour-discovery-head"><div className="tour-logo"><Sparkles size={24}/></div><button className="tour-close" aria-label="Chiudi esplorazione" onClick={onClose}><X size={20}/></button></div>{finished?<div className="tour-finish"><span><CheckCircle2 size={38}/></span><h1>Tour completato!</h1><p>Hai esplorato {finished.title.toLowerCase()}. Le attività della demo non hanno modificato il workspace.</p><button className="primary" onClick={onClose}>Inizia a esplorare <ArrowRight size={17}/></button></div>:<><div className="eyebrow">GUIDA INTERATTIVA</div><h1>Scopri Sales Core</h1><p>Vivi una giornata commerciale, direttamente nell’interfaccia. Tutto avviene in un ambiente dimostrativo separato.</p>{paused&&<button className="tour-resume" onClick={()=>onStart(paused.id,progress.index)}><Play size={20}/><span><strong>Riprendi {paused.title.toLowerCase()}</strong><small>Passaggio {progress.index+1} di {paused.steps.length} · ripartenza dal capitolo</small></span><ChevronRight size={18}/></button>}<button className="tour-main-start" onClick={()=>onStart('full',0)}><Route size={25}/><span><strong>Una giornata con Sales Core</strong><small>Tour completo · 3–5 min indicativi</small></span><ArrowRight size={19}/></button></>}<div className="tour-discovery-section"><h2>Esplora una funzionalità</h2><div className="tour-mini-grid">{TOURS.slice(1).map(t=>{const I=icons[t.icon];return <button key={t.id} onClick={()=>onStart(t.id,0)}><I size={21}/><strong>{t.title}</strong><small>{t.description}</small><span>{t.minutes} <ChevronRight size={13}/></span></button>})}</div></div><div className="tour-safe"><ShieldCheck size={17}/> Solo dati sintetici · nessun invio, microfono o API reale.</div><button className="secondary" onClick={onClose}>Esplora liberamente</button></section></div>,document.body)
}
export function TourWorkspace({renderApp}){
 const [progress,setProgress]=useState(()=>{const p=read(progressKey,null);return validProgress(p)?p:null});
 const [session,setSession]=useState(null),[center,setCenter]=useState(()=>!read(seenKey,false)),[finished,setFinished]=useState(null),[run,setRun]=useState(0);
 useEffect(()=>{store(progressKey,progress)},[progress]);
 const active=session&&session.index<getTour(session.id).steps.length;
 function closeCenter(){store(seenKey,true);setCenter(false);setFinished(null)}
 function start(id,index=0){const p={id,index};if(!validProgress(p))return;store(seenKey,true);setRun(v=>v+1);setProgress(p);setSession({...p,revision:0});setFinished(null);setCenter(false)}
 function pause(){if(active)setProgress({id:session.id,index:session.index});setSession(null);setCenter(false);setFinished(null)}
 function exit(){setProgress(null);setSession(null);setCenter(false);setFinished(null)}
 function event(name){setSession(old=>old?advanceTour(old,name):old)}
 function back(){setSession(old=>old&&old.index>0?{...old,index:old.index-1,revision:old.revision+1}:old)}
 function skip(){setSession(old=>old?{...old,index:old.index+1,revision:old.revision+1}:old)}
 useEffect(()=>{if(!session)return;const t=getTour(session.id);if(session.index>=t.steps.length){setProgress(null);setFinished(t);setSession(null);setCenter(true)}else setProgress({id:session.id,index:session.index})},[session]);
 const model=active?{step:getStep(session.id,session.index),index:session.index,total:getTour(session.id).steps.length,revision:session.revision,onEvent:event,onBack:back,onSkip:skip,onPause:pause,onExit:exit}:null;
 return <><TourSandboxContext.Provider value={!!active}><React.Fragment key={active?'tour-'+run:'normal'}>{renderApp({tour:model,onDiscover:()=>{setFinished(null);setCenter(true)}})}</React.Fragment></TourSandboxContext.Provider>{center&&!active&&<DiscoveryCenter progress={progress} onStart={start} onClose={closeCenter} finished={finished}/>}</>
}
export function TourCoach({tour,onGuide,busy}){
 const [rect,setRect]=useState(null),[ready,setReady]=useState(false),[confirm,setConfirm]=useState(false);
 const panel=useRef(null);
 useLayoutEffect(()=>{
   let frame=0,scrolled=false;let observed=null;
   const resize=new ResizeObserver(()=>schedule());
   function measure(){
     const target=document.querySelector('[data-tour="'+tour.step.target+'"]')||(tour.step.id==='analyze'?document.querySelector('[data-tour="processing"]'):null)||(tour.step.id==='document'?document.querySelector('[data-tour="attachments"]'):null);
     if(target!==observed){resize.disconnect();observed=target;if(target)resize.observe(target)}
     if(!target||!target.getClientRects().length){setRect(null);setReady(false);return}
     if(!scrolled){scrolled=true;target.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})}
     const r=target.getBoundingClientRect();setRect({top:Math.max(4,r.top-6),left:Math.max(4,r.left-6),width:Math.min(window.innerWidth-8,r.width+12),height:Math.min(window.innerHeight-8,r.height+12),center:r.top+r.height/2});setReady(!target.disabled);
   }
   function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(measure)}
   const observer=new MutationObserver(schedule);observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['disabled','class','data-tour']});window.addEventListener('resize',schedule);window.addEventListener('scroll',schedule,true);window.visualViewport?.addEventListener('resize',schedule);schedule();
   return()=>{cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();window.removeEventListener('resize',schedule);window.removeEventListener('scroll',schedule,true);window.visualViewport?.removeEventListener('resize',schedule)}
 },[tour.step.id,tour.revision]);
 useEffect(()=>{setConfirm(false)},[tour.step.id]);
 const above=rect&&rect.center>window.innerHeight*.55;
 return createPortal(<div className="tour-layer"><div className="tour-spotlight" aria-hidden="true" style={rect?{top:rect.top,left:rect.left,width:rect.width,height:rect.height}: {display:'none'}}/><aside ref={panel} className={'tour-coach '+(above?'tour-top':'tour-bottom')} aria-label="Guida interattiva" role="region"><div className="tour-coach-head"><span className="tour-sandbox-tag"><ShieldCheck size={14}/> DEMO ISOLATA</span><span className="tour-count">{tour.index+1} / {tour.total}</span><button className="tour-close" aria-label="Metti in pausa il tour" onClick={tour.onPause}><Pause size={17}/></button></div><div className="tour-progress" role="progressbar" aria-label="Avanzamento tour" aria-valuenow={tour.index+1} aria-valuemin={0} aria-valuemax={tour.total}><span style={{width:((tour.index+1)/tour.total*100)+'%'}}/></div><div key={tour.step.id} className="tour-copy" aria-live="polite"><h2>{tour.step.title}</h2><p>{tour.step.body}</p></div>{confirm?<div className="tour-confirm"><p>Terminare il tour e cancellarne i progressi?</p><button className="secondary" onClick={()=>setConfirm(false)}>Continua tour</button><button className="primary" onClick={tour.onExit}>Termina</button></div>:<><div className="tour-controls"><button className="tour-back" onClick={tour.onBack} disabled={tour.index===0} aria-label="Passaggio precedente"><ArrowLeft size={18}/></button><button className="primary" disabled={busy||!ready} onClick={onGuide}>{busy?'Elaborazione…':tour.step.guide}<ArrowRight size={16}/></button></div><div className="tour-footer"><button onClick={()=>setConfirm(true)}>Esci</button><button onClick={tour.onSkip} disabled={busy}>Salta passaggio</button></div></>}</aside></div>,document.body)
}
