# Visual design v2

The React prototype now uses a restrained enterprise visual language: ink-purple navigation, neutral surfaces, a saturated primary action, semantic status colours, and a consistent spacing/typography system. This is a refinement of the purple mockup, not a new brand.

- Home: daily briefing, real demo-state counters, prominent capture, concise priorities.
- Capture: focused dark recording surface, animated simulated waveform, explicit timer and progress, privacy disclosure, pause/confirm controls.
- Processing: cancelable three-stage simulated transition; no real ASR or AI calls.
- Review: selection counts, summary first, evidence and actions in separate views, explicit save.
- Actions: completion overview computed from local demo tasks, grouped deadlines, account context, priority, actionable suggestions, completion feedback.
- Desktop: dark sidebar and split workspace; mobile: persistent bottom bar with emphasized capture.
- Motion: short entrance/selection/modal transitions, state-specific recording animation, no decorative continuous animation outside the active capture/processing states. Reduced-motion CSS disables animations and transitions. Modal Escape, focus containment and restoration added; not a full accessibility audit.

The underlying fixture extraction and local demo data remain unchanged. No real microphone, external message, API, CRM, or reminder execution. Visual and build validation should be performed on mobile and desktop before calling this production-ready.

## Shared controls

All four native selects have been replaced by a reusable themed Picker. Desktop uses an anchored selection dialog; mobile uses a bottom sheet. Account search and local demo account creation are supported. Deadline options remain illustrative buckets, not actual calendar dates. Hidden form inputs retain the selected values; review checkboxes retain native semantics with a themed visual. Keyboard focus, Escape, arrow navigation and reduced motion are implemented; browser/accessibility testing remains necessary. No extra library dependency was introduced.

## Contextual sales experience v3

Daily briefing and visit preparation live in Today/Accounts; Capture opens one multimodal sheet; proposals and follow-up live in action detail and dossier. No new main navigation. Briefing uses synthetic visits and local task state, approach uses confirmed note facts and a deterministic playbook. Attachments share one review; only the synthetic Bar Centrale document has fixture extraction. Real files are represented by metadata only. Drafts are editable, stored locally and copyable; never sent. All new workflows are simulations and require browser validation.

## AI loading states

Reusable Skeleton, SkeletonLines and LoadingContent reserve the approximate structure of generated results. Home/daily brief, visit objective/approach/questions, contextual questions, suggestions, capture review preview, new proposal/follow-up and supported demo chat queries show explicitly labelled simulated latency. Agenda, tasks, navigation and saved drafts stay immediately available. Draft actions are disabled until generation finishes; capture and chat can be cancelled. Completed read-only demo states are cached in memory by context; effects clean up timers. No actual model request or token streaming. Reduced motion uses static placeholders; no fake percentage. Production should bind these UI states to actual requests, errors, retries and cancellation.

## Journey and discoverability

Today features the first unfinished synthetic visit; explicit preparation shifts the CTA to capture the outcome, and a saved linked capture marks that visit done. No inference from wall-clock or real calendar. Once visits are done, the next open task is highlighted. Post-capture confirmation counts distinct new facts and actually created tasks; relevant open tasks expose draft preparation. Account navigation is reduced to Panoramica, Storico and Attività. Local capture recovery preserves text, metadata, selections and elapsed demo timer, not audio or file contents; one draft at a time, explicit discard. Edited commercial draft text is recoverable separately from confirmed saves. Context hints can be dismissed persistently. Workspace search is local and groups customers, notes and tasks. Navigation and usability targets still need browser and user validation.
