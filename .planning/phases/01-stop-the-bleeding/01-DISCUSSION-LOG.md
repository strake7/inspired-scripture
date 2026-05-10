# Phase 1: Stop the Bleeding - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-09
**Phase:** 01-stop-the-bleeding
**Areas discussed:** Ad removal depth, Homepage structure, SearchAction handling

---

## Ad Removal Depth

| Option | Description | Selected |
|--------|-------------|----------|
| Strip all ad infrastructure | Remove Ad component, scripts, ads.txt — clean slate for v2 | ✓ |
| Disable rendering only | Keep components/scripts but don't render — preserve scaffolding for v2 | |

**User's choice:** Clean slate — strip everything
**Notes:** Ads will be reintroduced fresh in v2 after SEO recovery stabilizes. No need to preserve scaffolding.

---

## Homepage Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Keep hero h1 "Inspired Scripture" | Demote Heading component to h2 | |
| Keep Heading "Welcome to Inspired Scripture" | Demote hero to non-heading element | ✓ |

**User's choice:** Keep "Welcome to Inspired Scripture" as H1
**Notes:** Hero section heading will be restyled as a non-heading element.

---

## SearchAction Handling

| Option | Description | Selected |
|--------|-------------|----------|
| Remove entirely | Delete the potentialAction block, no replacement | ✓ |
| Replace with WebSite schema | Keep WebSite structured data without SearchAction | |

**User's choice:** Remove — no replacement needed
**Notes:** No /search page exists; no point in any search-related structured data.

---

## Claude's Discretion

- Study page H1 deduplication approach
- GA4 script handling after AdSense removal
- Hero heading restyle approach

## Deferred Ideas

None — discussion stayed within phase scope.
