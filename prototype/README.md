# Sales Core — interactive React prototype

Mobile-first visual prototype inspired by the purple Tikapay mockup: light lavender surfaces, restrained violet accents, clear hierarchy, progressive disclosure and responsive desktop navigation.

## Run

Requires Node.js 20+ (22 recommended) and npm.

```sh
cd prototype
npm install
npm run dev
```

Open the local URL shown by Vite. For a production build: `npm run build`; for preview: `npm run preview`.

## Walkthrough

1. Home → Nota vocale: start/pause a simulated timer, confirm or use the sample note.
2. Analizza nota → switch between Riepilogo, Dettagli and Azioni; expand evidence, approve selected facts/actions, edit deadlines.
3. Save → customer dossier; navigate notes, facts and actions.
4. Azioni → filter open/due/completed, complete/reopen tasks, add manual tasks and accept assistant suggestions.
5. AI → two deterministic sample queries against the local demo state.

The recording and AI extraction are simulated, not actual microphone or model calls. Only the exact provided sample has fixture extraction; custom text is saved as a manual note. Multimodal capture now accepts image/PDF references and a synthetic document fixture; real file contents are not read, uploaded or retained. No CRM, real customer data, outbound messaging, network API or credentials. Local browser storage retains synthetic notes/tasks and accepted suggestions; clear the site data to reset. Date labels are demonstration buckets, not real reminders. This is a design prototype, not production security or a native mobile application. No external fonts are loaded.

## UX principles

One dominant action per screen, concise summary by default, detailed evidence on demand, explicit approval of proposed actions, touch-friendly controls, visible focus, reduced-motion preference, meaningful empty states. Desktop uses a sidebar and split action workspace; mobile uses bottom navigation. Italian interface matches the visual reference.

## Contextual sales journey (v3)

Home → daily briefing → visit preparation (objective, approach, questions and objections) → capture menu → voice/text/attachment review → dossier → action detail → editable proposal or follow-up draft. Use Bar Centrale and the synthetic document fixture to see simulated document extraction. Briefings and drafts use local facts and deterministic templates; visit times are fixtures. Draft edits persist locally and can be copied, but nothing is sent. Actual OCR, audio recording, LLMs, reminders and CRM integration remain out of scope.

AI loading states are now simulated with contextual skeletons and short delays. Reopening unchanged read-only context can reuse an in-memory completion; saved drafts appear immediately. No real LLM or OCR call is made.

## Usability walkthrough

Oggi → Prepara visita → Segna preparata → Acquisisci esito → review → Nota salvata → proposal/follow-up or dossier. The next visit advances only after a linked note is saved. One local draft can be resumed from Oggi or Capture. Search is available in the header. Dossier tabs: Panoramica, Storico, Attività. Edited drafts survive navigation on this browser, separate from explicit save. Use synthetic data only; no real audio, file contents or AI services.

## Interactive product tour

Open Esplora Sales Core from the header, Today or Assistant. First use offers an optional discovery dialog; choose the full tour or one of eight mini tours. Interact with the highlighted controls or use the guided button. Pause and resume from the current chapter, or exit and discard progress. Only the chapter index persists, not the demo session's temporary edits. The tour uses a separate in-memory workspace; ordinary data is not modified. Real file selection and clipboard export are disabled in the tour. Run `npm run test:tour` for the configuration tests, and `npm run build` for production compilation.
