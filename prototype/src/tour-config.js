// Declarative tour definition. Events come from real workspace actions.
export const STEPS=[
 {id:'daily',title:'Inizia la tua giornata',body:'Il briefing raccoglie le visite e gli impegni. Aprilo per capire dove concentrarti.',target:'daily-card',event:'daily-open',guide:'Apri briefing'},
 {id:'agenda',title:'Scegli la prossima visita',body:'Tocca Prepara accanto a Bar Centrale: il contesto è già disponibile.',target:'visit-prepare',event:'visit-open',guide:'Prepara visita'},
 {id:'visit',title:'Arriva preparato',body:'Esplora la strategia suggerita, le domande e le possibili obiezioni. Poi passa alla raccolta dell’esito.',target:'approach',event:'capture-menu',guide:'Acquisisci esito'},
 {id:'capture-menu',title:'Un solo punto di acquisizione',body:'Voce, testo, foto e documenti convergono nella stessa revisione. Prova la nota vocale.',target:'voice-choice',event:'capture-open',guide:'Registra nota'},
 {id:'voice',title:'Racconta com’è andata',body:'Il timer e la waveform simulano la registrazione. Tocca il check per ottenere la trascrizione di esempio.',target:'recording',event:'transcript-ready',guide:'Termina nota'},
 {id:'document',title:'Aggiungi un documento',body:'Allega la scheda dimostrativa alla stessa nota. Nessun file reale è necessario.',target:'demo-document',event:'attachment-added',guide:'Aggiungi demo'},
 {id:'analyze',title:'Lascia lavorare l’assistente',body:'Avvia l’analisi e osserva gli skeleton di caricamento. Il risultato è una simulazione.',target:'analyze',event:'review-ready',guide:'Analizza nota'},
 {id:'review',title:'Mantieni il controllo',body:'Controlla riepilogo, evidenze e azioni. Puoi deselezionare ciò che non vuoi salvare.',target:'approve',event:'note-saved',guide:'Approva e salva'},
 {id:'success',title:'Passa subito all’azione',body:'Il salvataggio aggiorna il dossier e crea gli impegni approvati. Apri la proposta collegata.',target:'success-proposal',event:'proposal-open',guide:'Prepara proposta'},
 {id:'proposal',title:'Prepara una proposta commerciale',body:'La bozza usa il contesto raccolto. Modifica il testo e salvalo; le condizioni restano da verificare.',target:'save-material',event:'proposal-saved',guide:'Salva bozza'},
 {id:'followup',title:'Scrivi un follow-up intelligente',body:'Riprendi gli impegni dell’incontro in un messaggio modificabile. Non viene inviato nulla.',target:'save-material',event:'followup-saved',guide:'Salva follow-up'},
 {id:'memory',title:'Una memoria che cresce',body:'Nello storico ritrovi fatti confermati, note ed evidenze. Consulta i dettagli prima di proseguire.',target:'memory-facts',event:'memory-seen',guide:'Continua'},
 {id:'assistant',title:'Interroga la memoria commerciale',body:'Prova una domanda sulle azioni di oggi. In questa demo le risposte sono deterministiche.',target:'assistant-prompt',event:'answer-ready',guide:'Prova domanda'},
 {id:'answer',title:'Dalle informazioni alle decisioni',body:'La risposta si basa sui task del workspace dimostrativo. Hai esplorato l’intero ciclo commerciale.',target:'assistant-answer',event:'answer-seen',guide:'Completa'}
];
export const TOURS=[
 {id:'full',title:'Una giornata con Sales Core',description:'Dalla preparazione della visita al follow-up.',icon:'route',minutes:'3–5 min',steps:STEPS.map(s=>s.id)},
 {id:'daily',title:'Organizza la giornata',description:'Briefing e agenda.',icon:'calendar',minutes:'30 sec',steps:['daily','agenda']},
 {id:'visit',title:'Prepara una visita',description:'Strategia, domande e obiezioni.',icon:'target',minutes:'30 sec',steps:['visit']},
 {id:'capture',title:'Acquisisci informazioni',description:'Voce, analisi e approvazione.',icon:'mic',minutes:'1–2 min',steps:['capture-menu','voice','document','analyze','review']},
 {id:'document',title:'Analizza un documento',description:'Allegato e revisione unificata.',icon:'image',minutes:'1 min',steps:['document','analyze','review']},
 {id:'proposal',title:'Prepara una proposta',description:'Bozza commerciale modificabile.',icon:'file',minutes:'1 min',steps:['success','proposal']},
 {id:'followup',title:'Crea un follow-up',description:'Messaggio contestuale.',icon:'mail',minutes:'30 sec',steps:['followup']},
 {id:'memory',title:'Esplora la memoria',description:'Note, fatti ed evidenze.',icon:'database',minutes:'30 sec',steps:['memory']},
 {id:'assistant',title:'Usa l’assistente',description:'Interroga i dati commerciali.',icon:'sparkles',minutes:'30 sec',steps:['assistant','answer']}
];
export const getTour=id=>TOURS.find(t=>t.id===id);
export const getStep=(id,index)=>STEPS.find(s=>s.id===getTour(id)?.steps[index]);
export function validProgress(value){const tour=getTour(value?.id);return !!tour&&Number.isInteger(value.index)&&value.index>=0&&value.index<tour.steps.length}
export function advanceTour(session,event){const step=getStep(session.id,session.index);if(!step||step.event!==event)return session;return {...session,index:session.index+1}}
