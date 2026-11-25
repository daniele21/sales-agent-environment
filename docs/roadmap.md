# Functional roadmap

Status: proposed, outcome-gated. Priorities are not calendar estimates.

| Initiative | Priority | Core capabilities |
|---|---|---|
| Sales Capture | P0 | Mobile voice/text, transcription, structured observations, evidence, entity association, memory updates |
| Sales Action | P0 | Commitment extraction, task/reminder drafts, approval, next-step suggestion and due status |
| Sales Copilot | P1 | Customer dossier, contextual chat, pre-visit briefing, objections, follow-up drafts |
| Sales Discovery | P1 | Authorized account research, enrichment, product fit, missing information, ranking |
| Sales Intelligence | P2 | Aggregated objections, win/loss themes, coverage and follow-up patterns, cross-sell hypotheses |

## Milestone 0 — Functional foundations

Define domain contracts, event vocabulary, tenant configuration, approved knowledge schema, permission/approval matrix, and synthetic Italian examples. Implementations must be replaceable and fixture-testable without network access.

Exit: Capture and Action contracts agree on evidence, entity scope, action lifecycle, versioning and deduplication.

## Milestone 1 — Capture vertical slice (first focus)

Mobile-first short post-visit recording and typed notes; durable local draft; transcription; editable transcript; customer/account resolution; extraction; analysis; review; save approved observations; propose and approve internal tasks and reminders; dossier and note history; retry and error recovery.

Exit: Representative can capture a real-world-style encounter in one flow and find the resulting knowledge/actions without external CRM or service integrations. Evaluation and privacy gates in the Capture specification must be addressed before real-data pilot.

## Milestone 2 — Daily action loop

Task list, due and overdue views, commitment-to-task links, completion/snooze, proactive daily briefing, contextual dossier, questions to resolve gaps, draft follow-up messages (no send). Add cross-note reconciliation, duplicate handling and robust cross-device/offline sync if validated.

Exit: Representative can prepare, capture and follow up repeatedly; measure time saved, correction rate, and follow-up adherence.

## Milestone 3 — Copilot and Discovery

Contextual Q&A with citations, pre-meeting briefs, approved objection playbook, product-fit reasoning; authorized account research and prospect ranking when provider access is available. Distinguish fit from estimated conversion likelihood. No autonomous outreach.

Exit: Reviewers verify grounded recommendations and useful prioritized accounts; evaluate costs, coverage, and error rates against baselines.

## Milestone 4 — Sales Intelligence

Aggregate recurrent objections, customer needs, conversion blockers and expansion signals, with permitted manager views and traceability to source evidence. Evaluate results against confirmed outcomes; do not infer individual conversion probabilities until sufficient calibration data exists.

Exit: Managers can identify actionable patterns with evidence and privacy boundaries; demonstrate value beyond individual note capture.

## Scope and dependencies

Capture → validated memory → Action → Copilot; Discovery can proceed independently after a minimal account/product model exists. Intelligence needs accumulated validated data. Keep integration and deployment work outside this functional roadmap. OCR/photos and multi-account capture are candidates after the core flow; no roadmap item authorizes outbound AI calls or external autonomous execution.

## Initial backlog

| ID | Story | Priority | Dependency |
|---|---|---|---|
| SC-01 | Capture audio or text and recover draft | P0 | Domain contracts |
| SC-02 | Transcribe and edit with versions | P0 | SC-01 |
| SC-03 | Resolve account, contact and opportunity | P0 | SC-02, memory |
| SC-04 | Extract typed observations with evidence | P0 | SC-02, SC-03 |
| SC-05 | Generate commercial analysis and gaps | P0 | SC-04, business knowledge |
| SA-01 | Extract commitments and propose tasks/reminders | P0 | SC-04 |
| SC-06 | Review, correct, approve and commit atomically | P0 | SC-04, SC-05, SA-01 |
| SC-07 | Retrieve note and dossier history | P0 | SC-06 |
| SC-08 | Retry, audit, evaluation and isolation | P0 | All capture stages |
| SA-02 | Task lifecycle and due/overdue view | P0 | SA-01, SC-06 |
| CP-01 | Grounded Q&A and briefing | P1 | SC-07, SA-02 |
| SD-01 | Research and fit assessment | P1 | Account model and approved sources |
| SI-01 | Evidence-backed aggregate insights | P2 | Validated history |

See [Capture specification](sales-capture/specification.md), [domain and processing](sales-capture/domain-and-processing.md), and [evaluation](sales-capture/evaluation.md).
