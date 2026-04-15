# Bilingual QA Prompt Templates

Status: canonical prompt asset template set  
Date: 2026-04-15  
Owner: PCA with QAS, DAA, and KDGA support  
Confidentiality: proprietary internal framework; no external publishing approved  

## Asset Control Record

- Prompt Set Name: Bilingual QA Prompt Templates
- Purpose: parity-sensitive QA prompts for multilingual surfaces
- Allowed Model Class: approved QA-capable model classes only
- Allowed Tools: read-only or QA-approved tools plus evidence-viewing tools for the active repository
- Forbidden Behaviors: assuming translation equivalence without evidence, ignoring layout effects, ignoring disclosure mismatches between languages
- Expected Output Structure: parity findings, evidence quality, release recommendation, required remediation
- Rollback Reference: prior approved bilingual QA prompt set version
- Evaluation Set Reference: multilingual parity evaluation set
- Last Approved Date: 2026-04-15
- Last Reviewed Date: 2026-04-15

## Prompt 1

Prompt ID: PRM-QA-BILINGUAL-001-TEMPLATE  
Prompt Name: Bilingual Surface Parity Review

```text
Review this multilingual build surface for parity across the approved languages. Check semantic parity, structural parity, disclosure parity, state parity, and UI-fit parity where text length or language direction could affect behavior. Do not assume the source language is correct if the product behavior differs between languages. Return critical, material, and minor findings, followed by parity confidence, evidence gaps, and required remediation before advancement.
```

## Prompt 2

Prompt ID: PRM-QA-BILINGUAL-002-TEMPLATE  
Prompt Name: Bilingual Regression and Post-Fix Validation

```text
Review this changed multilingual surface after implementation or repair. Verify that the fix resolves the reported issue in every required language and does not introduce new layout, truncation, copy-state, validation, or disclosure regressions. Confirm whether screenshots, traces, or runnable evidence prove parity rather than implying it. Return critical, material, and minor findings, followed by validation outcome and release recommendation.
```
