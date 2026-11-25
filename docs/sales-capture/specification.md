# Sales Capture — Product specification

Status: proposal, first implementation focus.

## Job to be done

When I finish a customer visit, I want to dictate what happened in about a minute, without filling forms, so the system preserves the information, identifies what matters, and helps me act on it before I forget.

Capture is not merely speech-to-text. Its output is a reviewed update to sales memory and a set of actionable proposals. It must work without CRM integration.

## User experience

1. Start from Today, a customer dossier, or a global capture control. Account context is optional at recording time.
2. Record a post-visit self-dictated note (proposed cap: 120 seconds; validate with users), or type/paste text. Show elapsed time, stop/discard, and draft status. Never record in background or record the customer by default. A safe interrupted draft can be resumed or discarded; recording while driving is not an intended interaction.
3. Persist the draft before processing. Show transcription progress and allow transcript correction. If offline, retain the draft securely and visibly queue processing; text entry remains available. No silent cloud upload; explain the processing mode.
4. Resolve the account using selected context, exact identifiers and permitted candidate matching. If ambiguous, ask the user to choose or create a draft account. Do not silently create or merge entities. Support a single primary account per capture in v1; split mixed-account notes before committing.
5. Show an editable analysis: summary, new facts, changed or contradictory facts, needs, objections, product interest, commitments, suggested actions and open questions. Cite the transcript spans. Use labels for reported facts vs AI inference vs recommendation.
6. Review changes and action proposals individually or approve the valid set. Highlight unresolved dates, identities and conflicts. Save the note and selected changes without forcing acceptance of all suggestions. A rejected suggestion must not become a fact.
7. Show confirmation, linked dossier updates and approved internal tasks/reminders. Allow correction/undo via an auditable revision. Reopening or retrying does not duplicate actions.

## Mobile information architecture

- Today: quick capture, next meetings, open commitments and due tasks.
- Capture: record/stop or type; audio permission handling, review transcript and retry.
- Review: short summary first, changes grouped by category, actions with owner/due date, missing info, evidence on demand.
- Dossier: account and locations, contacts, opportunities, chronological interactions, confirmed facts and outstanding questions.
- Actions: due, upcoming, completed, snoozed; link each task to originating note.
- Chat: later Copilot capability, not necessary for v1 Capture.

Optimize one-handed use, large touch targets, readable hierarchy, reduced motion, accessibility labels, meaningful progress and no misleading completion. Avoid forcing the sales rep through CRM fields. Review must be editable and fast.

## Functional requirements

| ID | Requirement | MVP |
|---|---|---|
| SC-01 | Audio/text capture; local recoverable draft, explicit stop/delete | Yes |
| SC-02 | Transcription, language metadata, editable transcript and version history | Yes |
| SC-03 | Account association; ambiguity resolution and draft creation | Yes |
| SC-04 | Evidence-backed extraction of structured commercial observations | Yes |
| SC-05 | Explainable sales analysis and missing-information suggestions | Yes |
| SA-01 | Extract explicit commitments, recommend next steps, propose internal tasks/reminders | Yes |
| SC-06 | Selective approval, conflict resolution, idempotent persistence, audit | Yes |
| SC-07 | View historical captures and consolidated account dossier | Yes |
| SC-08 | Retry/resume, error visibility, permission and data retention controls | Yes |
| SA-02 | List, complete and snooze approved tasks; due-date handling | Yes (minimal) |
| SC-09 | Photos/documents and OCR | Later |
| SC-10 | Multiple accounts per capture, advanced multilingual and offline inference | Later / evaluate |

## Extraction categories

General: organization, locations, roles, contacts mentioned, encounter type, factual needs, current solution, process, pain points, customer statements, commercial constraints, interest, objections, decision process, next steps and missing information.

Product-specific observations use a versioned vertical schema, with core fields remaining stable. No fabricated contact info, price, volumes or certainty. Preserve qualifiers such as “about”, “maybe” and negation. Treat a sales rep's statement as a report, not externally verified truth.

## Illustrative Tikapay scenario (synthetic)

Recorded Wednesday 25 November 2026, Europe/Rome:
> Lo studio ha tre sedi. Il titolare dice che gli interventi di implantologia costano sui 3-4 mila euro. Usa già un finanziamento bancario ma lamenta le tempistiche. È interessato a Tifin. Gli ho promesso una presentazione entro venerdì e di richiamarlo martedì prossimo con il socio. Vuole chiarire i costi.

Expected report: three locations (reported); approximate ticket EUR 3,000–4,000 for the mentioned interventions, not average revenue; existing bank financing; slow processing as reported pain point; Tifin interest; pricing objection or question; owner and partner roles, identities unverified.

Expected analysis: potential multi-site opportunity; existing competitor/supplier and unclear pricing are possible blockers; no claim about actual conversion or approved pricing. Questions: financing volumes, current terms, decision authority.

Expected action proposals: prepare/send presentation (human task, no automated send) due Friday 27 November; reminder to call Tuesday 1 December; prepare approved cost information; verify partner role. Resolve relative dates using recorded time and timezone, never current processing date; no invented time of day.

After review: approved observations and tasks appear in the same account dossier and action list; rejected ones are retained only as appropriate audit metadata, not active truth.

## Non-goals and guardrails

No live meeting recording, calling prospect, sending mail, WhatsApp/LinkedIn automation, negotiation, financial eligibility determination, or storing patient/card data. No autonomous CRM mutations or external integrations. Access only permitted account/tenant context; do not insert full note payloads into logs. Provider and retention decisions must be reviewed before personal data is used. A missing datum is not zero, false, or inferred. The representative controls final content.

## Open decisions before pilot

Validate recording cap, target languages, mobile form factor/native vs web, offline expectations, data retention, transcription quality in noisy environments, access roles, approved product playbooks and which low-risk internal actions could later be automated. Select implementation stack after evaluating the capture slice, not beforehand.
