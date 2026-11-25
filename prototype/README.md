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

The recording and AI extraction are simulated, not actual microphone or model calls. Only the exact provided sample has fixture extraction; custom text is saved as a manual note. Photo capture is a visibly deferred feature. No CRM, real customer data, outbound messaging, network API or credentials. Local browser storage retains synthetic notes/tasks and accepted suggestions; clear the site data to reset. Date labels are demonstration buckets, not real reminders. This is a design prototype, not production security or a native mobile application. No external fonts are loaded.

## UX principles

One dominant action per screen, concise summary by default, detailed evidence on demand, explicit approval of proposed actions, touch-friendly controls, visible focus, reduced-motion preference, meaningful empty states. Desktop uses a sidebar and split action workspace; mobile uses bottom navigation. Italian interface matches the visual reference.
