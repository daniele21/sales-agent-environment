# Sales Capture — Acceptance and evaluation plan

Status: proposed validation gates; no benchmarks have been run.

## Test matrix

| Case | Expected outcome |
|---|---|
| Clear note with known account | Correct association; cited observations and proposed actions |
| Unknown or ambiguous account | User selection or unassigned draft; no silent link or creation |
| Two accounts in one note | Ask to split/resolve before applying |
| Noisy or interrupted audio | Recover draft, show error or uncertain transcript, allow correction |
| Text-only / offline draft | Capture usable; pending processing clearly shown; retry after connectivity |
| Negation and estimates | Preserve meaning, approximate ranges and unknowns |
| Relative due date / timezone | Use capture time; ask if ambiguous; no invented time |
| Contradiction with history | Show proposed change and both sources; no overwrite without review |
| Explicit promise vs suggestion | Label separately; no task until approved |
| Duplicate submission, approval or retry | No duplicate note revision, observation or task |
| Edited transcript after analysis | Invalidate stale evidence and proposals; re-evaluate |
| Simultaneous edits | Version conflict handled with fresh review |
| Model timeout or malformed JSON | Bounded retry, visible failure, resume checkpoint |
| Prompt injection in note | Treat as data, no arbitrary tool execution or instructions |
| Cross-tenant/unauthorized access | Deny retrieval and mutation; no leakage in derived outputs |
| Sensitive or irrelevant detail | Minimize or flag for removal; no card/patient data retained by design |
| External contact request | Draft/human task only; never send or call |

## Evaluation corpus

Build a versioned synthetic Italian corpus of 60–100 short notes initially, with representative clean/noisy transcription, ambiguity, multiple product categories, objections, commitments, negation, estimates, dates, duplicate scenarios and adversarial content. Add audio generated or recorded by consenting testers; no real customer data in repository fixtures. Annotate expected observations, evidence spans, commitments, dates, identity decisions, permissible actions and unacceptable hallucinations. Split development and held-out sets; use human reviewers and log disagreement.

Measure transcription separately (word error rate and critical business token accuracy) and downstream extraction on both gold and ASR transcripts. Report field-level precision/recall/F1, evidence alignment, action precision/recall, due-date accuracy, abstention and correction rates by case type. Model-graded judgments only supplement deterministic and human checks.

## Proposed gates, not measured guarantees

- Zero unauthorized external communications, cross-tenant accesses, or writes without required approval in the release test suite.
- Zero duplicates in deterministic replay tests; every saved fact has source and approval trail.
- 100% valid persisted domain objects and evidence references; invalid output never silently persisted.
- Initial held-out targets to refine after baseline: >=95% precision for critical facts, >=90% explicit commitment recall, >=95% unambiguous due-date accuracy, and >=95% evidence attribution accuracy. Report counts and confidence intervals where useful; no aggregate metric waives critical failures.
- Proposed UX target: median post-visit capture and review under two minutes for a typical short note, excluding unusual recording or network delays; separately measure capture duration, processing latency and active review time. Validate with field reps.
- Compare baseline manual note entry against assisted capture: completion time, field completeness, correction burden and follow-up adherence. Record cost per capture and p50/p95 processing latency; thresholds after representative testing.

## Pilot protocol

Start with scripted synthetic encounters and 3–5 representative sales users if available; gather qualitative feedback and repeated-use behavior. Only introduce real data after tenant access, retention, approved provider terms, deletion and operational security are reviewed. Measure adoption and follow-up completion over a baseline period; distinguish correlation from causal improvement. Avoid using activity metrics as employee surveillance.

## Definition of done for v1

A representative can capture voice or text, recover from failure, correct transcript, associate an account, inspect evidence-backed facts and analysis, approve selected changes and tasks, and find the outputs in a dossier and task list. The entire flow has a local fixture mode with no external service dependency; optional real model integration has explicit opt-in and evaluation. Core acceptance and privacy gates are satisfied and documented; remaining decisions are tracked.
