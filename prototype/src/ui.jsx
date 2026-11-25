import React, {useState,useRef,useEffect,useLayoutEffect,useId} from 'react';
import {createPortal} from 'react-dom';
import {Check,ChevronDown,Search,X,Plus} from 'lucide-react';

// A shared, fully themed selection dialog. Native form values are retained via
// hidden inputs; no operating-system menu or additional runtime dependency.
export function Picker({label,options,value,defaultValue,onChange,name,searchable=false,onCreate,icon,variant=''}) {
 const [local,setLocal]=useState(defaultValue??options[0]?.value??'');
 const selected=value??local;
 const [open,setOpen]=useState(false),[query,setQuery]=useState(''),[creating,setCreating]=useState(false),[newName,setNewName]=useState('');
 const [geometry,setGeometry]=useState(null);
 const anchor=useRef(null),panel=useRef(null),search=useRef(null),createInput=useRef(null);
 const id=useId();
 const current=options.find(o=>o.value===selected);
 const visible=options.filter(o=>(o.label+' '+(o.description||'')).toLocaleLowerCase('it').includes(query.trim().toLocaleLowerCase('it')));
 function close(){setOpen(false);setCreating(false);anchor.current?.focus({preventScroll:true})}
 function choose(next){if(value===undefined)setLocal(next);onChange?.(next);close()}
 function begin(){setQuery('');setCreating(false);setNewName('');setOpen(true)}
 function add(){if(!newName.trim())return;const next=onCreate?.(newName);if(next)choose(next)}
 useLayoutEffect(()=>{
   if(!open)return;
   function position(){
     const r=anchor.current?.getBoundingClientRect();if(!r)return;
     const width=Math.min(Math.max(r.width,300),window.innerWidth-24);
     const below=window.innerHeight-r.bottom-16,above=r.top-16;
     const upward=below<300&&above>below;
     setGeometry({left:Math.max(12,Math.min(r.left,window.innerWidth-width-12)),width,maxHeight:Math.max(80,Math.min(520,upward?above:below)),...(upward?{bottom:window.innerHeight-r.top+7}:{top:r.bottom+7})});
   }
   position();window.addEventListener('resize',position);window.addEventListener('scroll',position,true);
   return()=>{window.removeEventListener('resize',position);window.removeEventListener('scroll',position,true)}
 },[open]);
 useEffect(()=>{
   if(!open)return;
   const prev=document.body.style.overflow;document.body.style.overflow='hidden';
   (search.current||panel.current?.querySelector('[data-current=true]')||panel.current?.querySelector('[data-option]')||panel.current)?.focus({preventScroll:true});
   return()=>{document.body.style.overflow=prev}
 },[open]);
 useEffect(()=>{if(creating)createInput.current?.focus()},[creating]);
 function key(e){
   if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close();return}
   if(e.key==='Tab'){
     const nodes=Array.from(panel.current?.querySelectorAll('button:not(:disabled),input:not([type=hidden])')||[]);
     if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];
     if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}return
   }
   if(creating)return;
   if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){
     const nodes=Array.from(panel.current?.querySelectorAll('[data-option]')||[]);if(!nodes.length)return;
     if((e.key==='Home'||e.key==='End')&&document.activeElement===search.current)return;
     e.preventDefault();const i=nodes.indexOf(document.activeElement);
     const next=e.key==='Home'?0:e.key==='End'?nodes.length-1:e.key==='ArrowDown'?(i+1)%nodes.length:(i<0?nodes.length-1:(i-1+nodes.length)%nodes.length);
     nodes[next]?.focus()
   }
 }
 return <div className={'picker-field '+variant}>
   {name&&<input type="hidden" name={name} value={selected}/>}
   <button type="button" ref={anchor} className={'picker-trigger '+(open?'is-open':'')} aria-label={label+': '+(current?.label||'Seleziona')} aria-haspopup="dialog" aria-expanded={open} aria-controls={open?id:undefined} onClick={()=>open?close():begin()}>
     {icon&&<span className="picker-trigger-icon">{icon}</span>}
     <span className="picker-trigger-copy"><small>{label}</small><strong>{current?.label||'Seleziona'}</strong></span>
     <ChevronDown className="picker-chevron" size={17}/>
   </button>
   {open&&createPortal(<div className="picker-layer" data-picker-layer="" onClick={close} onKeyDown={key}>
     <div className="picker-panel" id={id} ref={panel} role="dialog" aria-modal="true" aria-label={'Seleziona '+label.toLowerCase()} tabIndex={-1} style={geometry||{}} onClick={e=>e.stopPropagation()}>
       <div className="picker-grip" aria-hidden="true"/>
       <div className="picker-heading"><div><strong>{creating?'Nuovo cliente':label==='Cliente'?'Seleziona cliente':'Seleziona '+label.toLowerCase()}</strong><small>{creating?'Salvato solo nel workspace demo':label==='Cliente'?'Associa le informazioni al cliente corretto':'Scegli una delle opzioni'}</small></div><button type="button" className="picker-close" aria-label="Chiudi selettore" onClick={close}><X size={18}/></button></div>
       {creating?<div className="picker-create"><label htmlFor={id+'-name'}>Nome cliente</label><input id={id+'-name'} ref={createInput} value={newName} maxLength={100} placeholder="Es. Studio Rossi" onChange={e=>setNewName(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();e.stopPropagation();add()}}}/><div><button type="button" className="secondary" onClick={()=>{setCreating(false);requestAnimationFrame(()=>search.current?.focus())}}>Indietro</button><button type="button" className="primary" disabled={!newName.trim()} onClick={add}>Aggiungi cliente</button></div></div>:<>
       {searchable&&<div className="picker-search"><Search size={18}/><input ref={search} aria-label="Cerca cliente" placeholder="Cerca un cliente..." value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();if(visible.length===1)choose(visible[0].value)}}}/>{query&&<button type="button" aria-label="Cancella ricerca" onClick={()=>{setQuery('');search.current?.focus()}}><X size={15}/></button>}</div>}
       <div className="picker-options">{visible.length?visible.map(o=><button type="button" data-option="" data-current={o.value===selected} aria-pressed={o.value===selected} className={'picker-option '+(o.value===selected?'selected':'')} key={o.value} onClick={()=>choose(o.value)}>{o.initial&&<span className="picker-initial">{o.initial}</span>}<span className="picker-option-copy"><strong>{o.label}</strong>{o.description&&<small>{o.description}</small>}</span>{o.value===selected&&<Check size={18} className="picker-check"/>}</button>):<div className="picker-empty"><Search size={20}/><strong>Nessun risultato</strong><small>Prova un altro termine.</small></div>}</div>
       {onCreate&&<div className="picker-footer"><button type="button" onClick={()=>{setNewName(query.trim());setCreating(true)}}><span className="picker-add"><Plus size={17}/></span>Aggiungi nuovo cliente</button></div>}
       </>}
     </div>
   </div>,document.body)}
 </div>
}

export function ReviewCheckbox({checked,onChange,children}){
 return <label className="review-checkbox"><input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)}/><span className="review-check-visual" aria-hidden="true"><Check size={13} strokeWidth={2.7}/></span><strong>{children}</strong></label>
}
