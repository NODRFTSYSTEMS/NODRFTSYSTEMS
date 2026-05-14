# PharmacyOS — Discovery & Feasibility Packet
**Classification:** Internal — Proprietary
**Date:** 2026-05-12
**Owner:** SAA + Founder
**Product:** PharmacyOS (NoDrftSystems proprietary)
**Purpose:** Licensing qualification and configuration scoping instrument. Used for every PharmacyOS licensing prospect conversation. The completed packet is required before any SOW is written.

---

## How to Use This Packet

This packet is completed by the NoDrftSystems team during or after a qualification call with the pharmacy prospect. It serves three functions:

1. **Product Fit Assessment** — determine which engagement mode applies (Licensed Deployment / Licensed + Configured / Custom Build)
2. **Configuration Scope** — identify what needs to be adjusted from the standard feature set
3. **SOW Constraints** — feed the output directly into the SOW scoping session

**When to use:** Required before any PharmacyOS license agreement, Configuration SOW, or Custom OS Build SOW is issued.
**Facilitator:** MOA or PMA — routes to SAA for technical assessment after completion.
**Output:** Completed packet → SAA product fit recommendation → Founder review → Feasibility verdict → SOW

---

## Section 0 — Product Fit Assessment

Complete this section first. The output determines the engagement path.

**Pharmacy overview (one paragraph):**
[Describe the pharmacy's operation — size, type, current software, primary workflows, volume, regulatory context.]

**Five most critical workflow requirements:**
1. ___
2. ___
3. ___
4. ___
5. ___

**PharmacyOS P0 feature match:**

| Prospect Requirement | PharmacyOS P0 Coverage | Match? |
|---|---|---|
| Multi-role access (pharmacist, tech, cashier, manager, admin) | ✓ Full RBAC — 5 roles standard | — |
| Prescription intake and dispensing workflow | ✓ Full workflow with pharmacist sign-off gate | — |
| Inventory management with expiry tracking | ✓ Full inventory engine + expiry alerts | — |
| Retail POS (cash, card, insurance) | ✓ Multi-payment POS included | — |
| Patient record management | ✓ JDPA-compliant patient module | — |
| AI Rx scanner (image to structured data) | ✓ AI job queue — Rx scanner active | — |
| Reporting and exports | ✓ Role-scoped dashboards + export | — |
| NHF / insurer billing logic | ✓ NHF/insurer claim workflow | — |
| Supplier management | ✓ Supplier module included | — |
| Audit trail (append-only, full history) | ✓ Core Layer 1 primitive | — |
| [Prospect-specific requirement] | [Coverage assessment] | — |

**Product Fit Assessment Output:**

| Mode | Criteria | Recommended? |
|---|---|---|
| **Licensed Deployment** | 90%+ of P0 features match; no structural workflow differences | ☐ |
| **Licensed + Configured** | 70–89% match; defined configuration adjustments documented in Section 12 | ☐ |
| **Custom OS Build** | <70% match or fundamental workflow differences not addressable by configuration | ☐ |

**Recommended engagement mode:** ___
**Assessed by (SAA):** ___
**Date:** ___

---

## Section 1 — Pharmacy Operating Model

| Field | Response |
|---|---|
| Pharmacy name | |
| Ownership structure (sole proprietor, partnership, company) | |
| Number of locations | |
| Operating hours | |
| Current pharmacy management software | |
| Reason for replacing current system | |
| Total staff count | |
| Monthly prescription volume (approximate) | |
| Monthly OTC/retail sales volume (approximate) | |
| Primary product categories (Rx, OTC, generics, specialty, controlled) | |
| Delivery or home service offered? | |

---

## Section 2 — Staff Roles & Permission Requirements

For each role, document what the staff member needs to do and what they must NOT be able to do without authorization.

**Pharmacist (licensed — primary clinical authority):**
- Can do: ___
- Cannot do without override: ___
- Number of pharmacists: ___

**Pharmacy Technician:**
- Can do: ___
- Cannot do without pharmacist approval: ___
- Number of technicians: ___

**Cashier:**
- Can do: ___
- Cannot do: ___
- Number of cashiers: ___

**Manager / Owner:**
- Can do: ___
- Override authority for: ___

**Admin (system-level, back-office):**
- Can do: ___
- Access limitations: ___

**Approval chain for exceptions:**
(e.g., out-of-stock override, partial dispense, pricing adjustment)
___

**Does the pharmacy have rotating or shared pharmacist coverage? (affects sign-off workflow):** ___

---

## Section 3 — Prescription Lifecycle

Document the full Rx journey from intake to dispense.

| Step | Current Process | PharmacyOS Expected Behavior |
|---|---|---|
| Rx intake method (walk-in / phone / e-Rx) | | |
| Rx verification (manual / system check) | | |
| Drug interaction check required? | | |
| Pharmacist review step — when triggered? | | |
| Dispense confirmation — who signs off? | | |
| Label printing — automatic or manual? | | |
| Patient counseling documentation required? | | |
| Refill request workflow | | |
| Partial fill handling | | |
| Controlled substance additional steps | | |
| Rx hold / pending status | | |
| Rejected Rx handling | | |

**Controlled substances handled? (Y/N):** ___
If yes: what categories, what register requirements apply?

---

## Section 4 — Inventory & Expiry Control

| Field | Response |
|---|---|
| Number of unique SKUs (approximate) | |
| Current stock count method (manual, system, barcode scanner) | |
| Barcode scanner available? (Y/N; type if yes) | |
| Expiry tracking requirement — near-expiry alert threshold (days) | |
| Near-expiry action required (quarantine, return, discount) | |
| Cold storage / refrigerated items? (Y/N) | |
| Number of active suppliers | |
| Reorder method (manual PO, auto-suggest, supplier portal) | |
| Return to supplier workflow | |
| Wastage / expired stock disposal process | |
| Dead stock reporting required? | |

---

## Section 5 — Insurance, NHF & Subsidy Handling

| Field | Response |
|---|---|
| NHF (National Health Fund) participation? (Y/N) | |
| NHF claim submission method (current) | |
| Other active insurers / health schemes | |
| Insurance billing workflow (current process) | |
| Co-payment collection at POS? | |
| Insurance rejection handling process | |
| Claim reconciliation cadence (daily / weekly / monthly) | |
| Subsidy programs participation (GAS, CDAP, other) | |
| Subsidy claim documentation required? | |

---

## Section 6 — Reporting & Export Requirements

| Field | Response |
|---|---|
| Daily reports required (list) | |
| Weekly reports required (list) | |
| Monthly reports required (list) | |
| Regulatory reports required (list + frequency) | |
| Pharmacy board reporting obligations | |
| Ministry of Health reporting (if applicable) | |
| Audit export format required (CSV / PDF / specific template) | |
| Data retention period required by regulation | |
| Who needs report access (roles) | |
| External accountant / auditor data access required? | |

---

## Section 7 — Compliance Expectations

| Field | Response |
|---|---|
| Subject to Jamaica Data Protection Act 2020? (Y/N) | |
| Data controller or data processor role (or both) | |
| Patient consent workflow — how is consent currently collected? | |
| Consent records — how currently stored? | |
| Controlled Drug Register obligations (if applicable) | |
| Pharmacy Council of Jamaica compliance requirements | |
| Ministry of Health licensing conditions affecting software | |
| Any active regulatory audit or inspection history relevant to system? | |
| Privacy policy published to patients? (Y/N) | |
| Breach notification procedure currently in place? (Y/N) | |

---

## Section 8 — Data Handling & Retention

| Data Type | Classification | Who Can Access | Retention Period | Deletion/Anonymization Rule |
|---|---|---|---|---|
| Patient personal information | Sensitive personal data (JDPA) | Pharmacist, Manager | [Per JDPA schedule] | [Per JDPA policy] |
| Prescription records | Sensitive / regulated | Pharmacist, Technician, Manager | [Per pharmacy board requirement] | |
| Transaction records | Financial | Manager, Admin | [Per accounting requirement] | |
| Employee records | Personal data | Manager, Admin | [Per labour law] | |
| Supplier records | Business data | Manager, Admin | [Per business practice] | |
| Audit logs | Governance | Admin, Founder (system) | Permanent (append-only) | Never deleted |

**Is patient data currently stored digitally? (Y/N):** ___
**If yes, where:** ___
**Data migration required from current system? (Y/N):** ___

---

## Section 9 — Hardware Environment & Connectivity

| Field | Response |
|---|---|
| POS terminal type / model | |
| Receipt printer (thermal / inkjet; connected via USB / network / Bluetooth) | |
| Barcode scanner in use? (Y/N; model) | |
| Label printer for dispensing labels? (Y/N; model) | |
| Internet connection type (fibre / cable / LTE / unreliable) | |
| Internet reliability (outages per week; average downtime) | |
| Tablet or mobile device access required? (Y/N; device type) | |
| Number of active workstations / terminals at the counter | |
| Existing network equipment (router, switch; any restrictions) | |
| Cloud storage already in use? (Y/N; which) | |

---

## Section 10 — Downtime & Offline Contingencies

| Field | Response |
|---|---|
| What must remain operational if internet drops? | |
| Current downtime procedure (pen and paper, cached system, etc.) | |
| Acceptable offline data gap before sync required | |
| Recovery sync tolerance — how long can the system be out before it is a business emergency? | |
| Is offline POS capability required? (Y/N) | |
| Data reconciliation after reconnect — who reviews / approves? | |

---

## Section 11 — Pilot Readiness Criteria

| Field | Response |
|---|---|
| Target go-live date | |
| Parallel run period with existing system required? (Y/N; duration) | |
| Staff available for training before go-live? (Y/N; how many days available) | |
| Test data available (sample prescriptions, product catalog) for UAT? (Y/N) | |
| Acceptance sign-off authority (name and role) | |
| Minimum feature set required for go-live (vs. full feature set) | |
| Known blackout dates (holidays, regulatory submissions) to avoid for launch | |

---

## Section 12 — Must-Have vs Phase-Two Feature Triage

*Complete this table with the client. Be specific — every P0 item becomes an SOW acceptance criterion.*

| Feature | Phase | Client Confirmed Priority | Layer (1/2/3) | Notes |
|---|---|---|---|---|
| Multi-role login and RBAC | P0 | — | 1 | Standard — included |
| Prescription intake and dispensing | P0 | — | 2 | Standard — included |
| Pharmacist sign-off gate | P0 | — | 2 | Standard — included |
| Inventory management | P0 | — | 1 | Standard — included |
| Retail POS (cash + card) | P0 | — | 2 | Standard — included |
| NHF / insurance billing | P0 | — | 2 | Standard — included |
| Patient record management (JDPA) | P0 | — | 3 | Standard — included |
| Audit log (full history) | P0 | — | 1 | Standard — included |
| Reporting + exports | P0 | — | 1 | Standard — included |
| AI Rx scanner | P0 | — | 2 | Standard — included |
| Supplier management | P0 | — | 1 | Standard — included |
| [Additional feature requested] | P0 / P1 / P2 | — | — | |
| [Additional feature requested] | P0 / P1 / P2 | — | — | |
| [Additional feature requested] | P0 / P1 / P2 | — | — | |

**Configuration items identified (items requiring Licensed + Configured mode):**
1. ___
2. ___
3. ___

**Custom build triggers identified (items that cannot be addressed by configuration):**
1. ___

---

## Section 13 — Licensing & Commercial Expectations

| Field | Response |
|---|---|
| Budget range confirmed with decision maker | |
| Preferred license term (annual / 2-year / 3-year) | |
| Number of locations to be licensed initially | |
| Expansion timeline (additional locations in 12–24 months) | |
| Decision timeline (when must a decision be made) | |
| Decision authority (who signs the contract) | |
| Other vendors being evaluated | |
| Primary concern about making a switch | |
| Systems Assurance Retainer discussed? (Y/N; response) | |

---

## Packet Completion Checklist

Before routing to SAA for product fit assessment:

- [ ] Section 0 five critical requirements listed
- [ ] Section 0 P0 feature match table completed
- [ ] Sections 1–13 all fields answered or marked N/A with reason
- [ ] Configuration items in Section 12 identified and listed
- [ ] Section 13 decision authority confirmed (not just a contact — the signer)
- [ ] Facilitator name and date recorded at top of packet

**Route to:** SAA for product fit assessment → Founder for feasibility verdict → PMA for SOW scoping

---

*Classification: Internal — Proprietary | Not for client distribution in this form*
*Owner: SAA + Founder | Product: PharmacyOS | Version: 1.0 — 2026-05-12*
