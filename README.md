# Agentic Sales Core

**A voice-first, context-aware operating layer for B2B sales.**

> Transform every sales interaction into durable knowledge, every insight into an opportunity, and every commitment into an actionable next step.

Status: product discovery and functional design. No production implementation yet.

## Vision

Sales professionals should spend their time selling, not manually maintaining records. Agentic Sales Core captures the information they acquire on the field, interprets it against customer history and business knowledge, and prepares the actions required to progress the relationship.

The core is horizontal, independent of any CRM, industry, data provider or model vendor. Tikapay (merchant acquisition and payment services) is the initial validation scenario, not a hard-coded product dependency.

## Product pillars

| Initiative | Outcome | Priority |
|---|---|---|
| Sales Capture | Turn post-visit voice/text notes into evidence-backed customer knowledge | P0 |
| Sales Action | Convert commitments and insights into tasks, reminders and next steps | P0 |
| Sales Copilot | Contextual briefings, Q&A, objection support and draft follow-ups | P1 |
| Sales Discovery | Research, enrichment, product fit and prospect prioritization | P1 |
| Sales Intelligence | Aggregate commercial patterns and learn from outcomes | P2 |

The first vertical slice is **capture → review → memory → action**. Mobile is the primary field interface; web supports review, knowledge and management.

## Documentation

- [Product vision](docs/vision.md)
- [Core functional architecture](docs/core-architecture.md)
- [Functional roadmap](docs/roadmap.md)
- [Sales Capture: product specification](docs/sales-capture/specification.md)
- [Sales Capture: domain model and processing](docs/sales-capture/domain-and-processing.md)
- [Sales Capture: acceptance and evaluation](docs/sales-capture/evaluation.md)

## Principles

- Open-source-first where suitable; commercial model APIs are allowed through provider-neutral interfaces.
- Deterministic workflows and bounded reasoning, rather than unconstrained autonomous agents.
- Source-grounded facts, explicit uncertainty, auditable revisions, tenant and user access boundaries.
- Human confirmation of ambiguous identity, consequential changes and external communications.
- No autonomous voice outreach, unsolicited automated messaging, autonomous negotiation or ambient recording.
- No CRM, channel, prospect-provider or deployment implementation in the current scope.

The roadmap is a proposed sequence of capabilities, not a delivery commitment. Specifications are working hypotheses to validate with users.
