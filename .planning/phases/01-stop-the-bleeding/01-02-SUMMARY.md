---
phase: 01-stop-the-bleeding
plan: 02
status: complete
started: 2026-05-09
completed: 2026-05-09
deviations: 1
---

## Summary

Removed all ad infrastructure and fixed HTML structure/metadata issues on homepage and study pages.

## Tasks Completed

| # | Task | Status |
|---|------|--------|
| 1 | Remove all ad infrastructure | Done |
| 2 | Fix homepage SearchAction, homepage H1, and study page H1 | Done |

## Key Changes

### Task 1: Remove all ad infrastructure
- Deleted `components/ad.jsx` (AdSense ad unit component)
- Deleted `public/ads.txt` (AdSense publisher verification)
- Removed AdSense script from `components/scripts.jsx` (GA4 preserved)
- Removed ad import and placement from `pages/index.jsx`
- Removed ad import, ReactDOMServer import, and ad injection from `pages/bible-studies/[slug].jsx`
- Cleaned up dead ad CSS rules from `styles.css`

### Task 2: Fix SearchAction, homepage H1, and study page H1
- Removed false `SearchAction` structured data from homepage
- Demoted hero `<h1>` to `<p>` with `display-4` styling on homepage
- Demoted hero `<h2>` subtitle to `<p>` with `h2` class on homepage
- Added defensive h1 strip regex in study page to prevent duplicate H1

## Deviations

1. **Rule 2 (unplanned improvement):** Cleaned up dead ad-related CSS rules in `styles.css` (`.ad-container` styles). These were orphaned by the ad component deletion and would be dead code.

## Commits

- `4561e6b` feat(01-02): remove all ad infrastructure
- `414ef74` fix(01-02): fix SearchAction, homepage H1, and study page H1

## key-files

### created
- (none)

### modified
- components/scripts.jsx
- pages/index.jsx
- pages/bible-studies/[slug].jsx
- styles.css

### deleted
- components/ad.jsx
- public/ads.txt

## Self-Check: PASSED

- [x] Zero ad references in source files
- [x] GA4 analytics preserved
- [x] No SearchAction in structured data
- [x] Homepage has single H1
- [x] Study pages have single H1
- [x] Build passes
