# Role-Specific Review Prompt Templates

Status: canonical prompt asset template set  
Date: 2026-04-15  
Owner: PCA with QAS, KDGA, and PRGA oversight  
Confidentiality: proprietary internal framework; no external publishing approved  

## Asset Control Record

- Prompt Set Name: Role-Specific Review Prompt Templates
- Purpose: bounded review prompts for distinct control roles rather than generic approval language
- Allowed Model Class: approved review-capable model classes only
- Allowed Tools: read-only or review-approved tools unless the review packet explicitly authorizes more
- Forbidden Behaviors: self-review as final approval, unbounded redesign during review, vague pass language without evidence analysis
- Expected Output Structure: findings grouped by severity, evidence quality assessment, release recommendation, required remediation
- Rollback Reference: prior approved role-review prompt set version
- Evaluation Set Reference: role-review evaluation set
- Last Approved Date: 2026-04-15
- Last Reviewed Date: 2026-04-15

## Shared Review Output Contract

Every review prompt below should return:

- critical findings
- material findings
- minor findings
- evidence quality assessment
- reviewer recommendation: approve, approve with required fixes, block, or escalate

## Prompt 1

Prompt ID: PRM-REVIEW-ENG-001-TEMPLATE  
Prompt Name: Engineering Build Review

```text
Review this implementation as an independent engineering reviewer. Verify the build against objective, scope, exclusions, acceptance criteria, changed surfaces, and evidence package. Identify logic defects, regression risk, brittle implementation choices, missing edge-state handling, and undocumented workarounds. Do not redesign the task unless a defect or scope conflict requires it. Return findings grouped as critical, material, and minor, followed by evidence quality, reviewer recommendation, and exact required remediation.
```

## Prompt 2

Prompt ID: PRM-REVIEW-ARCH-001-TEMPLATE  
Prompt Name: Architecture Boundary Review

```text
Review this build for architecture boundary discipline. Verify repository context, module boundaries, integration points, dependency choices, ownership clarity, and whether the implementation stayed inside the approved build class. Identify boundary leakage, coupling risk, hidden downstream work, and any change that should have triggered reclassification or specialist activation. Return findings grouped as critical, material, and minor, followed by reviewer recommendation and escalation requirements if any.
```

## Prompt 3

Prompt ID: PRM-REVIEW-A11Y-001-TEMPLATE  
Prompt Name: Accessibility Review

```text
Review this changed surface for accessibility risk. Check semantics, keyboard access, focus management, labeling, state announcements, error clarity, contrast-sensitive areas, and responsive behavior where the changed surface could fail real users. Flag missing evidence if accessibility-sensitive behavior changed without proof. Return findings grouped as critical, material, and minor, followed by evidence quality and reviewer recommendation.
```

## Prompt 4

Prompt ID: PRM-REVIEW-SEC-001-TEMPLATE  
Prompt Name: Security Review

```text
Review this build for security, privacy, and data-integrity risk within the approved scope. Check auth boundaries, permission assumptions, secret handling, third-party integration behavior, input handling, logging exposure, and changes that could affect confidentiality or user trust. Identify any condition that should block advancement or trigger exceptional escalation. Return findings grouped as critical, material, and minor, followed by reviewer recommendation and required controls.
```

## Prompt 5

Prompt ID: PRM-REVIEW-DRA-001-TEMPLATE  
Prompt Name: Deployment Readiness Review

```text
Review this build for deployment readiness. Verify build evidence, runtime assumptions, configuration changes, migration risk, rollback posture, preview validation, observability coverage, and whether release controls are complete. Identify any missing deployment evidence, environment ambiguity, or unsafe release dependency. Return findings grouped as critical, material, and minor, followed by evidence quality and release recommendation.
```

## Prompt 6

Prompt ID: PRM-REVIEW-QA-001-TEMPLATE  
Prompt Name: QA Evidence Review

```text
Review this evidence package as a QA control reviewer. Check that the tests, traces, screenshots, reports, reproduction steps, and failure evidence actually support the claimed fix or feature. Identify evidence gaps, non-reproducible claims, weak regression coverage, and any mismatch between claimed outcome and proof. Return findings grouped as critical, material, and minor, followed by evidence quality and reviewer recommendation.
```
