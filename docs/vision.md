# Product vision — Agentic Sales Core

Status: proposed product direction | Initial validation: Tikapay

## Problem and opportunity

Field sales professionals acquire valuable information during visits and calls, often faster than they can enter it into business systems. Notes remain fragmented, follow-ups are forgotten, preparation is repetitive, and managers have limited visibility into the reasons opportunities progress or stall. A CRM stores records but typically depends on people to maintain them.

Our hypothesis: a mobile-first assistant that captures knowledge immediately after an interaction and converts it into verified, actionable context creates recurring value regardless of the CRM or industry.

## Product thesis

The core is an intelligent operating layer for B2B sales, not a CRM replacement, generic chatbot, lead database, or autonomous seller. It should support three recurring moments: prepare for an encounter, capture what happened, and act on commitments. A complete feedback loop makes later preparation better.

Primary users: field representatives and account managers; secondary users: sales leaders and sales operations, subject to access rights. The customer benefits indirectly from more relevant preparation and reliable follow-up.

## Funnel coverage

| Stage | Agentic capabilities | Intended outcome |
|---|---|---|
| Prospecting | Natural-language research, account enrichment, authorized source evidence, territory suggestions | Relevant accounts |
| Qualification | Product fit, explainable prioritization, information gaps, re-evaluation | Focus on meaningful opportunities |
| Preparation | Account briefing, previous interactions, discovery questions and objections | Better meetings |
| Field interaction | Post-visit voice/text capture, structured evidence, entity resolution, insights | Less data entry and knowledge loss |
| Follow-up | Commitment tracking, next best action, task/reminder proposals, communication drafts | Fewer missed commitments |
| Negotiation/closing | Objection analysis, approved product knowledge, blockers, checklist and draft proposals | Better human decisions |
| Retention/expansion | Recurring contact suggestions, dissatisfaction signals, cross-sell hypotheses | Stronger relationships |

The funnel is not necessarily linear; one account can have multiple product opportunities and return to an earlier stage.

## Product initiatives

- Sales Capture: understand incoming material and produce reliable commercial observations.
- Sales Action: turn commitments and recommendations into managed internal actions.
- Sales Copilot: retrieve and reason across customer memory and approved business knowledge.
- Sales Discovery: find and qualify organizations and opportunities using permitted sources.
- Sales Intelligence: aggregate evidence across interactions to improve playbooks and surface trends.

## What makes it agentic

The system assembles relevant context, identifies an intent, selects bounded capabilities, generates a typed proposal, validates it against policies and evidence, and executes only allowed internal effects. It can react to a new capture or an upcoming due date. A summarizer alone does not satisfy this vision. Agentic behavior does not imply an unconstrained multi-agent swarm.

## Horizontal core and vertical packs

Core concepts: account, location, contact, interaction, observation, product, opportunity, commitment, task, evidence, recommendation and approved business knowledge.

A tenant-specific configuration supplies vocabulary, product catalog, extraction schema extensions, scoring rubric, discovery questions, playbooks and action templates. Tikapay's illustrative pack includes Tifin (installments), TiPOS (smartphone payments), Tipago and TiCassa. Different products and locations may have separate opportunities. Product statements and commercial terms must come from approved knowledge, not model guesses. Other B2B sectors can reuse the same core.

## Differentiation and success

Our potential advantage is cumulative, attributable sales memory plus a closed action loop; models and transcription alone are replaceable. Reusable domain contracts and a configurable vertical pack reduce adaptation costs. Daily usage, time saved per visit, evidence-backed field accuracy, commitment recall, follow-up completion and opportunity progression are validation metrics, not claims of achieved results.

## Boundaries

No autonomous outbound voice, ambient/customer recording by default, unauthorized scraping or mass messaging, autonomous negotiation or promises. External drafts remain drafts. No automated credit eligibility or financial advice. Store business-relevant information only, especially around merchants in health-related sectors; do not collect patient or payment credentials. Open-source-first for infrastructure and frameworks, model-provider neutral, no assumption that the product itself is open-source. CRM and channel integrations are separate future work.
