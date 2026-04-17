#!/usr/bin/env python3
"""
Registry Consistency Validator

Validates that the approved agent registry, skill-pack manifest, and
on-disk department skill folders remain synchronized.

Run from repository root:
    python 01_system/operations/scripts/validate-registry-consistency.py

Exit codes:
    0 = all checks passed
    1 = count mismatch or missing/extra skill detected
"""

import os
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[3]
REGISTRY_PATH = REPO_ROOT / "01_system/registry/final-approved-department-and-agent-registry.md"
MANIFEST_PATH = REPO_ROOT / "03_agent-skills/manifest/skill-pack-manifest.yaml"
SKILL_PACK_ROOT = REPO_ROOT / "03_agent-skills/department-skill-pack"


def parse_registry_counts(registry_path: Path) -> dict:
    """Extract department names and agent counts from the registry count table."""
    text = registry_path.read_text(encoding="utf-8")
    counts = {}
    total = None
    for line in text.splitlines():
        m = re.match(r"\| ([^|]+) \| (\d+) \|", line)
        if m:
            name = m.group(1).strip()
            value = int(m.group(2).strip())
            if "Total" in name:
                total = value
            else:
                counts[name] = value
    return counts, total


def parse_registry_agents(registry_path: Path) -> list:
    """Extract all agent codes from the registry tables."""
    text = registry_path.read_text(encoding="utf-8")
    agents = []
    for line in text.splitlines():
        m = re.match(r"\| ([A-Z]{2,}(?:-[A-Z])?) \|", line)
        if m:
            agents.append(m.group(1))
    return agents


def parse_manifest_skill_ids(manifest_path: Path) -> list:
    """Extract all skill_id values from the manifest YAML."""
    text = manifest_path.read_text(encoding="utf-8")
    skills = re.findall(r"^  - skill_id: (.+)$", text, re.MULTILINE)
    return [s.strip() for s in skills]


def parse_manifest_counts(manifest_path: Path) -> dict:
    """Extract the top-level count fields from the manifest."""
    text = manifest_path.read_text(encoding="utf-8")
    counts = {}
    for key in ("approved_working_architecture_agents", "live_skill_pack_count"):
        m = re.search(rf"^{key}: (\d+)", text, re.MULTILINE)
        if m:
            counts[key] = int(m.group(1))
    return counts


def scan_disk_skill_folders(skill_pack_root: Path) -> list:
    """Walk the department-skill-pack tree and collect leaf folder names."""
    skills = []
    for dept_dir in skill_pack_root.iterdir():
        if not dept_dir.is_dir():
            continue
        for skill_dir in dept_dir.iterdir():
            if skill_dir.is_dir() and (skill_dir / "SKILL.md").exists():
                skills.append(skill_dir.name)
    return sorted(skills)


def expected_skill_id_from_code(code: str, canonical_name: str) -> str:
    """Generate the expected skill folder/skill_id from agent code and canonical name."""
    code_part = code.lower()
    name_part = canonical_name.lower().replace(",", "").replace(" & ", "-").replace(" ", "-")
    return f"{code_part}-{name_part}"


def parse_registry_agent_details(registry_path: Path) -> list:
    """Return list of (code, canonical_name, department) tuples."""
    text = registry_path.read_text(encoding="utf-8")
    agents = []
    current_dept = None
    dept_map = {
        "supervisor-layer": "supervisor-layer",
        "revenue-sales": "revenue-sales",
        "marketing-content": "marketing-content",
        "delivery-build": "delivery-build",
        "quality-compliance": "quality-compliance",
        "client-success": "client-success",
        "finance-bookkeeping": "finance-bookkeeping",
        "strategic-intelligence": "strategic-intelligence",
        "people-roles-governance": "people-roles-governance",
        "specialist-pool": "specialist-pool",
    }
    for line in text.splitlines():
        dept_match = re.match(r"### (.+)", line)
        if dept_match:
            dept_raw = dept_match.group(1).strip().lower().replace(",", "").replace(" & ", "-").replace(" ", "-")
            current_dept = dept_map.get(dept_raw, dept_raw)
            continue
        m = re.match(r"\| ([A-Z]{2,}(?:-[A-Z])?) \| \[?[^|]+\]? \| ([^|]+) \|", line)
        if m and current_dept:
            agents.append((m.group(1).strip(), m.group(2).strip(), current_dept))
    return agents


def main() -> int:
    errors = []

    # 1. Parse sources
    registry_counts, registry_total = parse_registry_counts(REGISTRY_PATH)
    registry_agents = parse_registry_agents(REGISTRY_PATH)
    registry_details = parse_registry_agent_details(REGISTRY_PATH)
    manifest_skills = parse_manifest_skill_ids(MANIFEST_PATH)
    manifest_counts = parse_manifest_counts(MANIFEST_PATH)
    disk_skills = scan_disk_skill_folders(SKILL_PACK_ROOT)

    computed_total = sum(registry_counts.values())

    print("=" * 60)
    print("NoDrftSystems Registry Consistency Validator")
    print("=" * 60)
    print()

    # 2. Count checks
    print("--- Department Counts ---")
    for dept, count in sorted(registry_counts.items()):
        print(f"  {dept}: {count}")
    print(f"  Computed total: {computed_total}")
    print(f"  Registry stated total: {registry_total}")
    if computed_total != registry_total:
        errors.append(f"Registry total mismatch: computed={computed_total}, stated={registry_total}")
    print()

    print("--- Manifest Counts ---")
    for key, value in manifest_counts.items():
        print(f"  {key}: {value}")
    if manifest_counts.get("approved_working_architecture_agents") != computed_total:
        errors.append(
            f"Manifest approved_working_architecture_agents mismatch: "
            f"manifest={manifest_counts.get('approved_working_architecture_agents')}, computed={computed_total}"
        )
    if manifest_counts.get("live_skill_pack_count") != len(disk_skills):
        errors.append(
            f"Manifest live_skill_pack_count mismatch: "
            f"manifest={manifest_counts.get('live_skill_pack_count')}, disk={len(disk_skills)}"
        )
    print()

    print("--- Skill Counts ---")
    print(f"  Registry agents: {len(registry_agents)}")
    print(f"  Manifest skills: {len(manifest_skills)}")
    print(f"  Disk skill folders: {len(disk_skills)}")
    if len(registry_agents) != len(manifest_skills):
        errors.append(
            f"Registry/Manifest count mismatch: registry={len(registry_agents)}, manifest={len(manifest_skills)}"
        )
    if len(registry_agents) != len(disk_skills):
        errors.append(
            f"Registry/Disk count mismatch: registry={len(registry_agents)}, disk={len(disk_skills)}"
        )
    print()

    # 3. Individual agent checks
    print("--- Individual Agent Coverage ---")
    expected_skill_ids = set()
    registry_codes = set()
    for code, canonical_name, dept in registry_details:
        registry_codes.add(code)
        expected = expected_skill_id_from_code(code, canonical_name)
        expected_skill_ids.add(expected)
        if expected not in manifest_skills:
            errors.append(f"Agent {code} ({canonical_name}) missing from manifest")
        if expected not in disk_skills:
            errors.append(f"Agent {code} ({canonical_name}) missing disk skill folder in {dept}/")
        # Check department placement on disk
        expected_path = SKILL_PACK_ROOT / dept / expected
        if not expected_path.exists():
            errors.append(f"Expected disk path missing: {expected_path.relative_to(REPO_ROOT)}")

    # Check for extra skills in manifest not in registry
    manifest_set = set(manifest_skills)
    disk_set = set(disk_skills)
    extras_manifest = manifest_set - expected_skill_ids
    extras_disk = disk_set - expected_skill_ids
    for extra in sorted(extras_manifest):
        errors.append(f"Extra skill in manifest not in registry: {extra}")
    for extra in sorted(extras_disk):
        errors.append(f"Extra skill folder on disk not in registry: {extra}")

    if not errors:
        print("  All agents covered in manifest and disk.")
    print()

    # 4. Skill folder anatomy checks
    print("--- Skill Folder Anatomy ---")
    anatomy_errors = 0
    for skill_id in sorted(disk_skills):
        # Find which department this skill is in
        skill_dir = None
        for dept_dir in SKILL_PACK_ROOT.iterdir():
            candidate = dept_dir / skill_id
            if candidate.exists():
                skill_dir = candidate
                break
        if skill_dir is None:
            continue
        required_files = [
            skill_dir / "SKILL.md",
            skill_dir / "agents/openai.yaml",
            skill_dir / "references/role-charter.md",
        ]
        for req in required_files:
            if not req.exists():
                anatomy_errors += 1
                errors.append(f"Missing required file: {req.relative_to(REPO_ROOT)}")
    if anatomy_errors == 0:
        print(f"  All {len(disk_skills)} skill folders have required anatomy.")
    print()

    # 5. Report
    print("=" * 60)
    if errors:
        print(f"RESULT: FAIL ({len(errors)} issue(s) found)")
        for e in errors:
            print(f"  - {e}")
        return 1
    else:
        print("RESULT: PASS")
        print("Registry, manifest, and disk skill packs are fully synchronized.")
        return 0


if __name__ == "__main__":
    sys.exit(main())
