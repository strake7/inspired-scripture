---
status: partial
phase: 01-stop-the-bleeding
source: [01-VERIFICATION.md]
started: 2026-05-09
updated: 2026-05-09
---

## Current Test

[awaiting human testing]

## Tests

### 1. Homepage H1 count in rendered output
expected: Build the site and confirm the rendered homepage HTML has exactly one `<h1>` tag
result: [pending]

### 2. Study page H1 count in rendered output
expected: Check a built study page (e.g., `out/bible-studies/job-1/index.html`) for exactly one `<h1>` tag
result: [pending]

### 3. Residual AdSense preconnect in _document.jsx
expected: `pages/_document.jsx` line 14 has `<link rel="preconnect" href="https://pagead2.googlesyndication.com" />` — this remnant should be removed
result: [pending]

## Summary

total: 3
passed: 0
issues: 0
pending: 3
skipped: 0
blocked: 0

## Gaps
