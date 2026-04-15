# Privacy and Disclosure QA Prompt Templates

Status: canonical prompt asset template set  
Date: 2026-04-15  
Owner: PCA with QAS, PRGA, KDGA, and TACA support  
Confidentiality: proprietary internal framework; no external publishing approved  

## Asset Control Record

- Prompt Set Name: Privacy and Disclosure QA Prompt Templates
- Purpose: control prompts for trust-sensitive surfaces where omission risk is material
- Allowed Model Class: approved QA-capable model classes only
- Allowed Tools: read-only or QA-approved tools plus evidence-viewing tools for the active repository
- Forbidden Behaviors: paraphrasing mandatory disclosures without approval, approving trust-sensitive flows without evidence, treating omission risk as minor polish
- Expected Output Structure: trust findings, omission-risk assessment, escalation requirement, release recommendation
- Rollback Reference: prior approved privacy and disclosure QA prompt set version
- Evaluation Set Reference: privacy-disclosure evaluation set
- Last Approved Date: 2026-04-15
- Last Reviewed Date: 2026-04-15

## Prompt 1

Prompt ID: PRM-QA-PRIVACY-001-TEMPLATE  
Prompt Name: Privacy and Consent Surface Review

```text
Review this surface for privacy, consent, and data-collection clarity. Check whether the user can understand what is being collected, why it is being collected, what action they are taking, and whether the UI or copy hides meaningful consequences. Flag missing privacy language, weak consent framing, misleading defaults, and any case where escalation is required before release. Return critical, material, and minor findings, followed by omission-risk assessment and reviewer recommendation.
```

## Prompt 2

Prompt ID: PRM-QA-DISCLOSURE-001-TEMPLATE  
Prompt Name: Disclosure Clarity and Omission-Risk Review

```text
Review this trust-sensitive build surface for disclosure adequacy. Check visibility, clarity, timing, placement, wording consistency, and whether the disclosure is understandable at the point of user decision. Identify hidden complexity, misleading brevity, contradiction with surrounding copy, and any disclosure that becomes weaker because of layout or interaction changes. Return critical, material, and minor findings, followed by release recommendation and required escalation if the disclosure posture is unsafe.
```
