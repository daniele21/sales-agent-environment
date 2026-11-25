// Declarative tour definition. Events come from real workspace actions.
const CORE_STEPS=[
 {id:'daily',title:'Inizia la tua giornata',body:'Il briefing raccoglie le visite e gli impegni. Aprilo per capire dove concentrarti.',target:'daily-card',event:'daily-open',guide:'Apri briefing'},
 {id:'agenda',title:'Scegli la prossima visita',body:'Tocca Prepara accanto a Bar Centrale: il contesto è già disponibile.',target:'visit-prepare',event:'visit-open',guide:'Prepara visita'},
 {id:'visit',title:'Arriva preparato',body:'Esplora la strategia suggerita, le domande e le possibili obiezioni. Poi passa alla raccolta dell’esito.',target:'approach',event:'capture-menu',guide:'Acquisisci esito'},
 {id:'capture-menu',title:'Un solo punto di acquisizione',body:'Voce, testo, foto e documenti convergono nella stessa revisione. Prova la nota vocale.',target:'voice-choice',event:'capture-open',guide:'Registra nota'},
 {id:'voice',title:'Racconta com’è andata',body:'Il timer e la waveform simulano la registrazione. Tocca il check per ottenere la trascrizione di esempio.',target:'recording',event:'transcript-ready',guide:'Termina nota'},
 {id:'document',title:'Aggiungi un documento',body:'Allega la scheda dimostrativa alla stessa nota. Nessun file reale è necessario.',target:'demo-document',event:'attachment-added',guide:'Aggiungi demo'},
 {id:'analyze',title:'Lascia lavorare l’assistente',body:'Avvia l’analisi e osserva gli skeleton di caricamento. Il risultato è una simulazione.',target:'analyze',event:'review-ready',guide:'Analizza nota'},
 {id:'review',title:'Mantieni il controllo',body:'Controlla riepilogo, evidenze e azioni. Puoi deselezionare ciò che non vuoi salvare.',target:'review',event:'note-saved',guide:'Approva e salva'},
 {id:'success',title:'Passa subito all’azione',body:'Il salvataggio aggiorna il dossier e crea gli impegni approvati. Apri la proposta collegata.',target:'success-proposal',event:'proposal-open',guide:'Prepara proposta'},
 {id:'proposal',title:'Prepara una proposta commerciale',body:'La bozza usa il contesto raccolto. Modifica il testo e salvalo; le condizioni restano da verificare.',target:'draft-body',event:'proposal-saved',guide:'Salva bozza'},
 {id:'followup',title:'Scrivi un follow-up intelligente',body:'Riprendi gli impegni dell’incontro in un messaggio modificabile. Non viene inviato nulla.',target:'draft-body',event:'followup-saved',guide:'Salva follow-up'},
 {id:'memory',title:'Una memoria che cresce',body:'Nello storico ritrovi fatti confermati, note ed evidenze. Consulta i dettagli prima di proseguire.',target:'memory-facts',event:'memory-seen',guide:'Continua'},
 {id:'assistant',title:'Interroga la memoria commerciale',body:'Prova una domanda sulle azioni di oggi. In questa demo le risposte sono deterministiche.',target:'assistant-prompt',event:'answer-ready',guide:'Prova domanda'},
 {id:'answer',title:'Dalle informazioni alle decisioni',body:'La risposta si basa sui task del workspace dimostrativo. Hai visto come ritrovare gli impegni commerciali.',target:'assistant-answer',event:'answer-seen',guide:'Completa'}
];
const NAV_STEPS=[
 {
  "id": "home-clients",
  "title": "Parti da Oggi",
  "body": "Apri Clienti dalla navigazione principale.",
  "target": "nav-accounts",
  "event": "nav-accounts",
  "guide": "Apri Clienti",
  "screen": "home",
  "next": "accounts"
 },
 {
  "id": "home-actions",
  "title": "Parti da Oggi",
  "body": "Apri Azioni per trovare gli impegni e i materiali da preparare.",
  "target": "nav-actions",
  "event": "nav-actions",
  "guide": "Apri Azioni",
  "screen": "home",
  "next": "actions"
 },
 {
  "id": "home-assistant",
  "title": "Parti da Oggi",
  "body": "Apri Assistente dalla navigazione principale.",
  "target": "nav-assistant",
  "event": "nav-assistant",
  "guide": "Apri Assistente",
  "screen": "home",
  "next": "assistant"
 },
 {
  "id": "client-select",
  "title": "Scegli il cliente",
  "body": "Apri il dossier di Bar Centrale dall’elenco clienti.",
  "target": "account-bar",
  "event": "account-open",
  "guide": "Apri Bar Centrale",
  "screen": "accounts",
  "next": "account"
 },
 {
  "id": "client-visit",
  "title": "Prepara l’incontro",
  "body": "Dal dossier puoi preparare una visita.",
  "target": "account-prepare",
  "event": "visit-open",
  "guide": "Prepara visita",
  "screen": "account",
  "next": "visit"
 },
 {
  "id": "client-capture",
  "title": "Acquisisci dal dossier",
  "body": "Nuova nota apre le modalità con il cliente già associato.",
  "target": "account-capture",
  "event": "capture-menu",
  "guide": "Nuova nota",
  "screen": "account",
  "next": "capture-menu"
 },
 {
  "id": "document-choice",
  "title": "Scegli Documento",
  "body": "Apri la modalità di acquisizione documentale.",
  "target": "document-choice",
  "event": "document-open",
  "guide": "Documento",
  "screen": "capture-menu",
  "next": "capture"
 },
 {
  "id": "client-activity",
  "title": "Apri le attività",
  "body": "La scheda Attività contiene impegni e materiali.",
  "target": "tab-activity",
  "event": "tab-Attività",
  "guide": "Apri Attività",
  "screen": "account",
  "next": "activity"
 },
 {
  "id": "new-proposal",
  "title": "Crea la proposta",
  "body": "Seleziona Nuova proposta per preparare una bozza.",
  "target": "new-proposal",
  "event": "proposal-open",
  "guide": "Nuova proposta",
  "screen": "activity",
  "next": "proposal"
 },
 {
  "id": "followup-task",
  "title": "Apri l’impegno",
  "body": "Apri Richiamare Bar Centrale dalla lista delle azioni.",
  "target": "followup-task",
  "event": "task-open",
  "guide": "Apri azione",
  "screen": "actions",
  "next": "task-detail"
 },
 {
  "id": "followup-link",
  "title": "Prepara il messaggio",
  "body": "Nel dettaglio azione, apri Messaggio di follow-up.",
  "target": "task-followup",
  "event": "followup-open",
  "guide": "Prepara follow-up",
  "screen": "task-detail",
  "next": "followup"
 },
 {
  "id": "proposal-back",
  "title": "Torna alla nota salvata",
  "body": "La freccia indietro riporta alla conferma.",
  "target": "draft-back",
  "event": "proposal-back",
  "guide": "Torna alla nota",
  "screen": "proposal",
  "next": "success"
 },
 {
  "id": "success-followup",
  "title": "Prepara il follow-up",
  "body": "Apri il messaggio collegato alla nota.",
  "target": "success-followup",
  "event": "followup-open",
  "guide": "Apri follow-up",
  "screen": "success",
  "next": "followup"
 },
 {
  "id": "followup-back",
  "title": "Torna alla nota salvata",
  "body": "Rientra nella conferma per aprire il dossier.",
  "target": "draft-back",
  "event": "followup-back",
  "guide": "Torna alla nota",
  "screen": "followup",
  "next": "success"
 },
 {
  "id": "success-dossier",
  "title": "Ritrova il contesto",
  "body": "Apri il dossier cliente dalla conferma.",
  "target": "success-dossier",
  "event": "account-open",
  "guide": "Apri dossier",
  "screen": "success",
  "next": "account"
 },
 {
  "id": "client-history",
  "title": "Apri lo storico",
  "body": "Seleziona Storico per vedere note e fatti.",
  "target": "tab-history",
  "event": "tab-Storico",
  "guide": "Apri Storico",
  "screen": "account",
  "next": "memory"
 },
 {
  "id": "memory-assistant",
  "title": "Passa all’assistente",
  "body": "Usa la navigazione principale.",
  "target": "nav-assistant",
  "event": "nav-assistant",
  "guide": "Apri Assistente",
  "screen": "memory",
  "next": "assistant"
 },
 {
  "id": "visit-finish",
  "title": "Il briefing è pronto",
  "body": "Consulta obiettivo, strategia e domande. Segna la visita come preparata.",
  "target": "approach",
  "event": "visit-prepared",
  "guide": "Segna preparata",
  "screen": "visit",
  "next": "visit",
  "action": "visit-prepared"
 }
];
const META={"daily":["home","daily","daily-open"],"agenda":["daily","visit","visit-prepare"],"visit":["visit","capture-menu","visit-outcome"],"capture-menu":["capture-menu","capture","voice-choice"],"voice":["capture","capture","transcript-demo"],"document":["capture","capture","demo-document"],"analyze":["capture","review","analyze"],"review":["review","success","approve"],"success":["success","proposal","success-proposal"],"proposal":["proposal","proposal","save-material"],"followup":["followup","followup","save-material"],"memory":["memory","memory",null],"assistant":["assistant","answer","ask-today"],"answer":["answer","answer",null]};
export const STEPS=[...CORE_STEPS.map(s=>{const [screen,next,action]=META[s.id];return {...s,screen,next,action}}),...NAV_STEPS];
export const TOURS=[
 {id:'full',title:'Una giornata con Sales Core',description:'Dalla preparazione della visita al follow-up.',icon:'route',minutes:'4–6 min',steps:['daily','agenda','visit','capture-menu','voice','document','analyze','review','success','proposal','proposal-back','success-followup','followup','followup-back','success-dossier','client-history','memory','memory-assistant','assistant','answer']},
 {id:'daily',title:'Organizza la giornata',description:'Briefing e agenda.',icon:'calendar',minutes:'1 min',steps:['daily','agenda']},
 {id:'visit',title:'Prepara una visita',description:'Strategia, domande e obiezioni.',icon:'target',minutes:'1 min',steps:['home-clients','client-select','client-visit','visit-finish']},
 {id:'capture',title:'Acquisisci informazioni',description:'Voce, analisi e approvazione.',icon:'mic',minutes:'1–2 min',steps:['home-clients','client-select','client-capture','capture-menu','voice','document','analyze','review']},
 {id:'document',title:'Analizza un documento',description:'Allegato e revisione unificata.',icon:'image',minutes:'1 min',steps:['home-clients','client-select','client-capture','document-choice','document','analyze','review']},
 {id:'proposal',title:'Prepara una proposta',description:'Bozza commerciale modificabile.',icon:'file',minutes:'1 min',steps:['home-clients','client-select','client-activity','new-proposal','proposal']},
 {id:'followup',title:'Crea un follow-up',description:'Messaggio contestuale.',icon:'mail',minutes:'1 min',steps:['home-actions','followup-task','followup-link','followup']},
 {id:'memory',title:'Esplora la memoria',description:'Note, fatti ed evidenze.',icon:'database',minutes:'1 min',steps:['home-clients','client-select','client-history','memory']},
 {id:'assistant',title:'Usa l’assistente',description:'Interroga i dati commerciali.',icon:'sparkles',minutes:'1 min',steps:['home-assistant','assistant','answer']}
];
export const getTour=id=>TOURS.find(t=>t.id===id);
export const getStep=(id,index)=>STEPS.find(s=>s.id===getTour(id)?.steps[index]);
export function validProgress(value){const tour=getTour(value?.id);return !!tour&&Number.isInteger(value.index)&&value.index>=0&&value.index<tour.steps.length}
export function advanceTour(session,event){const step=getStep(session.id,session.index);if(!step||step.event!==event)return session;return {...session,index:session.index+1}}
