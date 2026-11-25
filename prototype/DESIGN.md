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
