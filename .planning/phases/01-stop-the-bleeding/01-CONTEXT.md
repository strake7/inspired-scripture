# Phase 1: Stop the Bleeding - Context

**Gathered:** 2026-05-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Remove all ads and fix all metadata/HTML corruption across 530+ study pages, homepage, and topic pages. Every page should render with clean metadata, correct HTML structure, and zero ad interference so Google's next crawl sees no quality penalty triggers.

</domain>

<decisions>
## Implementation Decisions

### Ad Removal
- **D-01:** Clean-slate removal — strip ALL ad infrastructure including the Ad component (`components/ad.jsx`), AdSense script loading (`components/scripts.jsx`), ad insertion logic in study pages and homepage, and `public/ads.txt`. Do not preserve scaffolding for v2 — ads will be re-added fresh when the time comes.

### Title Newlines
- **D-02:** Trim the output of `stripHtml()` in `lib/studies.js:49` to remove trailing `\n` from study titles. This fixes og:title, structured data, breadcrumbs, and OG image alt text across all 530+ pages.

### Description Extraction
- **D-03:** Fix `extractDescription()` in `lib/studies.js:9-29` to skip the "Introduction." prefix punctuation. Descriptions should start with the first real sentence of content, not with a period or colon from the section header.

### SearchAction
- **D-04:** Remove the false `potentialAction` SearchAction block from homepage structured data in `pages/index.jsx:27-35`. Do not replace with an alternative — just remove it.

### Homepage H1
- **D-05:** Keep the Heading component "Welcome to Inspired Scripture" as the single H1. Demote the hero section heading ("Inspired Scripture") to a different element (e.g., `<p>` with display styling or `<span>`).

### Study Page H1
- **D-06:** Ensure study pages render exactly one H1. The Heading component in the template renders the study title as H1. If the study HTML content (`_studies/*.html`) also contains an H1 on its first line, handle the duplication — either strip the content H1 or change the Heading component to render a different element for study pages.

### OG Image Alt Text
- **D-07:** Fixed automatically by D-02 — once titles are trimmed, og:image:alt in `components/meta.jsx:51` will render cleanly.

### Claude's Discretion
- Exact approach for study page H1 deduplication (strip from content vs. change Heading component behavior)
- Whether to keep the `components/scripts.jsx` file for GA4 only, or inline the GA4 script elsewhere
- How to restyle the hero heading after demotion from H1

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Strategy
- `docs/plans/2026-05-09-seo-recovery-strategy.md` — Full recovery strategy with diagnosis, phases, and file-level change list

### Requirements
- `.planning/REQUIREMENTS.md` — ADS-01, META-01 through META-04, HTML-01, HTML-02

</canonical_refs>

<code_context>
## Existing Code Insights

### Key Files to Modify
- `components/ad.jsx` — AdSense ad unit component (DELETE)
- `components/scripts.jsx` — Loads AdSense + GA4 scripts (remove AdSense, keep GA4)
- `lib/studies.js:49` — Title extraction with trailing newline bug
- `lib/studies.js:9-29` — Description extraction with punctuation bug
- `pages/index.jsx:27-35` — False SearchAction structured data
- `pages/index.jsx:58` — Hero h1 to demote
- `pages/index.jsx:72` — Heading component (keep as H1)
- `pages/index.jsx:165` — Ad placement with auto-ads
- `pages/bible-studies/[slug].jsx:39` — Ad placement with auto-ads
- `pages/bible-studies/[slug].jsx:182` — Heading component rendering H1
- `components/meta.jsx:51` — og:image:alt uses title (fixed by title trim)
- `public/ads.txt` — AdSense verification file (DELETE)

### Established Patterns
- Study data loads at build time via `getStaticProps()` — all fixes propagate to 530+ pages automatically
- `stripHtml()` in `lib/utils.js` strips HTML tags but doesn't trim whitespace
- Heading component (`components/heading.jsx`) is a simple h1 wrapper used across pages
- Study content rendered via `dangerouslySetInnerHTML` — first line is always `<h1>` title

### Integration Points
- `components/layout.jsx` imports Scripts component — will need update if Scripts changes
- Study page template (`pages/bible-studies/[slug].jsx`) injects ad before first h2 in content string

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-stop-the-bleeding*
*Context gathered: 2026-05-09*
