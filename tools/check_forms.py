#!/usr/bin/env python3
"""Offline safeguard for Yakir Li forms. Does NOT test Google Forms delivery."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = {
    "parents": "https://forms.gle/7eRk3rNXaiQVjGLB9",
    "volunteers": "https://forms.gle/ahSZVd6EmDSEDSpr7",
    "grandparents": "https://forms.gle/2uMikARD47gepYtYA",
    "memorial": "https://forms.gle/zPN8mnVpLRy5kgzs9",
    "contact": "https://forms.gle/xws9C5CZQajKypWSA",
}
issues = []
for lang in ("he", "en"):
    for page, target in EXPECTED.items():
        body = (ROOT / "src" / lang / f"{page}.html").read_text(encoding="utf-8")
        if target not in body:
            issues.append(f"Missing {page} Google Form link in {lang}")
    for page in ("contact", "lectures"):
        body = (ROOT / "src" / lang / f"{page}.html").read_text(encoding="utf-8")
        if f'data-mailto-form="{page}"' not in body:
            issues.append(f"Missing native form marker: {lang}/{page}")
        if not re.search(r'<input[^>]+required[^>]+autocomplete="name"', body):
            issues.append(f"Missing name validation: {lang}/{page}")
        if 'type="checkbox"' not in body or 'required' not in body:
            issues.append(f"Missing consent requirement: {lang}/{page}")

layout = (ROOT / "templates" / "layout.html").read_text(encoding="utf-8")
if EXPECTED["contact"] not in layout:
    issues.append("Missing footer newsletter registration link")
backend = (ROOT / "tools" / "site-forms-backend.gs").read_text(encoding="utf-8")
notifier = (ROOT / "tools" / "google-form-email-notify.gs").read_text(encoding="utf-8")
for name, data in [("site backend", backend), ("Google Forms notifier", notifier)]:
    for token in ("ALERT_EMAIL", "טופס חדש מהאתר", 'dir="rtl"'):
        if token not in data:
            issues.append(f"{name} missing {token}")
if "YAKIRLI_FORMS_ENDPOINT" not in (ROOT / "build.py").read_text(encoding="utf-8"):
    issues.append("Missing configurable backend endpoint")
print("\n".join(issues) if issues else "OK: form mapping and notification templates checked")
raise SystemExit(1 if issues else 0)
