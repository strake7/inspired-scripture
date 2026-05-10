---
phase: 01-stop-the-bleeding
verified: 2026-05-10T06:15:00Z
status: human_needed
score: 5/5
overrides_applied: 0
human_verification:
  - test: "View homepage HTML source and count H1 tags"
    expected: "Exactly one H1 tag: 'Welcome to Inspired Scripture' from the Heading component"
    why_human: "Homepage also renders dynamic topic/book content -- need to confirm no H1 leaks from Bootstrap components or other sources at runtime"
  - test: "View a study page HTML source (e.g., /bible-studies/job-1) and count H1 tags"
    expected: "Exactly one H1 tag from the Heading component with the study title; the study HTML content's H1 should be stripped by the regex"
    why_human: "The h1 strip regex operates on study.content but some edge-case study files may have multi-line or atypical H1 markup that the regex misses"
  - test: "Check that the preconnect to pagead2.googlesyndication.com in _document.jsx does not cause Google to flag the site as having ad infrastructure"
    expected: "Preconnect is a DNS hint only -- no ad scripts load, no ad content renders"
    why_human: "Cannot programmatically determine how Google's crawler interprets a preconnect to an AdSense domain"
---

# Phase 1: Stop the Bleeding Verification Report

**Phase Goal:** Every page on the site renders with clean metadata, correct HTML structure, and zero ad interference so Google's next crawl sees no quality penalty triggers
**Verified:** 2026-05-10T06:15:00Z
**Status:** human_needed
**Re-verification:** No -- initial verification

## Goal Achievement

### Observable Truths

Truths derived from ROADMAP.md Success Criteria (SC) merged with PLAN frontmatter must_haves.

| # | Truth | Source | Status | Evidence |
|---|-------|--------|--------|----------|
| 1 | Study pages and homepage contain zero ad scripts or ad placements (no AdSense, no ad component renders) | ROADMAP SC #1 | VERIFIED | `components/ad.jsx` deleted, `public/ads.txt` deleted, AdSense script removed from `components/scripts.jsx`, ad placements removed from `pages/index.jsx` and `pages/bible-studies/[slug].jsx`. `grep -r "adsbygoogle\|ad-slot\|ca-pub-\|ad-container" pages/ components/ public/` returns zero matches. Note: a `preconnect` to `pagead2.googlesyndication.com` remains in `pages/_document.jsx` line 14 (see Anti-Patterns). |
| 2 | Every study page's og:title and structured data title renders without trailing whitespace or newline artifacts | ROADMAP SC #2 | VERIFIED | `lib/studies.js` line 49: `study.title = stripHtml(fLine).trim()`. Title flows to `meta.jsx` line 29 (`fullTitle`), line 38 (`og:title`), line 51 (`og:image:alt`), and to `[slug].jsx` line 54 (`headline` in structured data) and line 99 (breadcrumb `name`). Test `trims trailing whitespace from title` passes with assertion `expect(study.title).not.toMatch(/\s$/)`. All 1061 tests pass. |
| 3 | Meta descriptions for studies like Job begin with the first real sentence, not punctuation from the "Introduction" header | ROADMAP SC #3 | VERIFIED | `lib/studies.js` line 14: regex `/(Introduction\|Background\|Overview)[.:;]?\s*(.+)/` with capture group `[2]` on line 16. Test `extracts description skipping Introduction period prefix` asserts description is `"Job is the oldest book in the Bible..."` not `". Job is the oldest..."`. Test passes. |
| 4 | Homepage structured data contains no SearchAction markup | ROADMAP SC #4 | VERIFIED | `grep -r "SearchAction\|potentialAction" pages/` returns zero matches. `pages/index.jsx` structured data object contains only `@type: WebSite`, `name`, `url`, `description`, `publisher` -- no `potentialAction` property. |
| 5 | Every page (homepage, study pages) has exactly one H1 tag in the rendered HTML | ROADMAP SC #5 | VERIFIED | Homepage: Hero `<h1>` demoted to `<p className="display-4">` (line 48), hero subtitle `<h2>` demoted to `<p className="h2">` (line 51). Only H1 source is `<Heading>Welcome to Inspired Scripture</Heading>` (line 64), which renders `<h1>` via `components/heading.jsx`. Study pages: `<Heading>{study.title}</Heading>` (line 168) is the only H1 source. Content rendered via `dangerouslySetInnerHTML` has defensive h1 strip regex on line 174: `/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i`. `grep "<h1" pages/index.jsx` returns zero matches (only `<Heading` found). |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `lib/studies.js` | Title trimming and description extraction fixes | VERIFIED | L1: Exists, 87 lines. L2: `.trim()` on line 49, regex `[.:;]?\s*` on line 14, capture group `[2]` on line 16. No TODO/FIXME. L3: Imported by `pages/bible-studies/[slug].jsx` (line 3), `pages/index.jsx` (line 6), and `lib/studies.spec.js` (line 4). |
| `lib/studies.spec.js` | Tests proving title trim and description extraction | VERIFIED | L1: Exists, 211 lines. L2: Contains `trims trailing whitespace from title` (line 72), `extracts description skipping Introduction period prefix` (line 89), existing title test uses `expect(study.title).toBe(` not `.trim().toBe(` (line 66). L3: Runs via `pnpm test` -- 1061 tests pass. |
| `components/scripts.jsx` | GA4-only script loading (no AdSense) | VERIFIED | L1: Exists, 23 lines. L2: Contains only GA4 gtag scripts (`googletagmanager.com/gtag/js`). No `pagead2.googlesyndication.com`, no `adsbygoogle`, no `ca-pub-`. L3: Imported by `components/layout.jsx` (line 4: `import Scripts from './scripts'`). |
| `pages/index.jsx` | Homepage without ads, without SearchAction, with single H1 | VERIFIED | L1: Exists, 229 lines. L2: No `import Ad`, no `data-ad-slot`, no `potentialAction`, no `SearchAction`, no `<h1>` tags. Hero uses `<p className="display-4">`. `<Heading>` is the sole H1 source. L3: Wired into Next.js pages router, `getStaticProps` calls `getAllTopics()` and `getAllStudies()`. |
| `pages/bible-studies/[slug].jsx` | Study page without ads, with single H1 | VERIFIED | L1: Exists, 201 lines. L2: No `import Ad`, no `import ReactDOMServer`, no `studyContentWithAd`. Uses `study.content` directly with defensive h1 strip regex. `<Heading>` is the sole H1 source. L3: Wired into Next.js dynamic route, `getStaticProps` calls `getStudyBySlug()`. |
| `components/ad.jsx` | DELETED | VERIFIED | File does not exist. `ls components/ad.jsx` returns exit code 1. |
| `public/ads.txt` | DELETED | VERIFIED | File does not exist. `ls public/ads.txt` returns exit code 1. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `lib/studies.js:49` | `components/meta.jsx:51` | `study.title` flows to `og:image:alt content={title}` | WIRED | `stripHtml(fLine).trim()` produces clean title -> passed as prop `title` to `meta.jsx` -> rendered in `og:image:alt` content. |
| `lib/studies.js:extractDescription` | `components/meta.jsx:30` | `study.description` flows to `meta description` | WIRED | `extractDescription()` returns clean description -> passed as prop `description` to `meta.jsx` -> rendered in `<meta name="description">`. |
| `components/layout.jsx` | `components/scripts.jsx` | `import Scripts from './scripts'` | WIRED | `layout.jsx` line 4 imports Scripts; GA4-only scripts render on every page. |
| `pages/index.jsx` | `components/ad.jsx` | Must NOT import Ad | VERIFIED (NEGATIVE) | `grep "import Ad" pages/index.jsx` returns zero matches. Ad component is deleted. |
| `pages/bible-studies/[slug].jsx` | `components/ad.jsx` | Must NOT import Ad | VERIFIED (NEGATIVE) | `grep "import Ad" pages/bible-studies/[slug].jsx` returns zero matches. Ad component is deleted. |

### Data-Flow Trace (Level 4)

Not applicable -- this phase modifies data-layer extraction (title trim, description regex) and removes ad infrastructure. No new dynamic data rendering was introduced. Title and description data flows verified through key links above.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Tests pass | `pnpm test` | 2 suites, 1061 tests, all passing | PASS |
| No ad references in source | `grep -r "adsbygoogle\|ad-slot" components/ pages/ public/` | Zero matches | PASS |
| No SearchAction in pages | `grep -r "SearchAction" pages/` | Zero matches | PASS |
| GA4 preserved | `grep "googletagmanager.com/gtag/js" components/scripts.jsx` | 1 match (line 11) | PASS |
| Title trim in place | `grep "stripHtml.*\.trim()" lib/studies.js` | Match at line 49 | PASS |
| Commits exist | `git log --oneline a3b2b5b ca84555 4561e6b 414ef74` | All 4 commits verified | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| ADS-01 | 01-02 | Remove all ad placements from study pages and homepage | SATISFIED | `ad.jsx` deleted, `ads.txt` deleted, AdSense script removed from `scripts.jsx`, ad imports/placements removed from `index.jsx` and `[slug].jsx`. Zero ad references in `grep` scan. |
| META-01 | 01-01 | Fix trailing newline in study titles | SATISFIED | `stripHtml(fLine).trim()` on line 49 of `studies.js`. Test verifies `not.toMatch(/\s$/)`. |
| META-02 | 01-01 | Fix description extraction to skip "Introduction." prefix punctuation | SATISFIED | Regex `[.:;]?\s*` on line 14 of `studies.js`, capture group `[2]` on line 16. Test verifies description starts with "Job is the oldest..." |
| META-03 | 01-02 | Remove false SearchAction structured data from homepage | SATISFIED | `potentialAction` block removed from `pages/index.jsx`. `grep "SearchAction" pages/` returns zero matches. |
| META-04 | 01-01 | Clean newline artifacts from OG image alt text and Twitter card metadata | SATISFIED | `og:image:alt` in `meta.jsx` line 51 uses `content={title}` which now receives trimmed title from `studies.js`. Twitter image alt on line 70 also uses `content={title}`. |
| HTML-01 | 01-02 | Ensure single H1 per page on homepage | SATISFIED | Hero `<h1>` demoted to `<p>`, hero `<h2>` demoted to `<p>`. Only `<Heading>` component renders H1. |
| HTML-02 | 01-02 | Ensure single H1 per page on study pages | SATISFIED | Defensive h1 strip regex on line 174 of `[slug].jsx`. `<Heading>` component is sole H1 source. |

All 7 Phase 1 requirements from REQUIREMENTS.md traceability table are accounted for. No orphaned requirements.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `pages/_document.jsx` | 14 | `<link rel="preconnect" href="https://pagead2.googlesyndication.com" />` -- remnant preconnect to AdSense CDN | WARNING | Does not load ad scripts or render ads, but signals to browsers and potentially crawlers that the site expects to connect to AdSense infrastructure. Should be removed for clean separation. Not in scope of either plan (planning gap, not execution gap). |

### Human Verification Required

### 1. Homepage H1 count in rendered output

**Test:** Run `pnpm build`, then open a built homepage HTML file and search for `<h1` tags
**Expected:** Exactly one `<h1>` tag containing "Welcome to Inspired Scripture"
**Why human:** The homepage renders dynamic content (topic cards, book sections) through React Bootstrap components. While source-level inspection shows only one `<Heading>` component, the rendered output should be confirmed to ensure no H1 tags leak from other components.

### 2. Study page H1 count in rendered output

**Test:** Run `pnpm build`, open a built study page (e.g., `out/bible-studies/job-1/index.html`) and search for `<h1` tags
**Expected:** Exactly one `<h1>` tag containing the study title. The study content's original `<h1>` should be stripped by the regex.
**Why human:** The defensive h1 strip regex `/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i` matches `<h1>` at the start of content. Some study files may have atypical markup (multiline attributes, nested tags) that the regex misses.

### 3. Residual AdSense preconnect impact

**Test:** Review `pages/_document.jsx` line 14 and decide whether the `preconnect` to `pagead2.googlesyndication.com` should be removed
**Expected:** Developer removes the preconnect line as cleanup
**Why human:** Cannot determine programmatically whether Google's crawler treats a preconnect hint to an AdSense domain as a quality signal. The preconnect does not load ads, but it is a remnant that should be reviewed.

### Gaps Summary

No blocking gaps found. All 5 ROADMAP success criteria are verified at the code level. All 7 requirements (ADS-01, META-01, META-02, META-03, META-04, HTML-01, HTML-02) are satisfied.

One warning-level anti-pattern found: a residual `preconnect` to the AdSense CDN domain in `pages/_document.jsx` line 14. This is a planning gap (the file was not in scope of either plan) rather than an execution gap. It does not load ad scripts or render ads, but should be cleaned up.

Three items require human verification: confirming rendered H1 counts on homepage and study pages, and deciding on the AdSense preconnect cleanup.

---

_Verified: 2026-05-10T06:15:00Z_
_Verifier: Claude (gsd-verifier)_
