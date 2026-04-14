# Roadmap: Inspired Scripture SEO Recovery

## Overview

This project restores Google's trust in inspiredscripture.com by fixing the technical quality signals causing a 94% drop in search impressions. Phase 1 addresses ad density (the most timeline-correlated signal), Phase 2 fixes all metadata and HTML structure bugs across 530+ pages via code-level changes, and Phase 3 verifies the fixes render correctly across representative pages and pass structured data validation.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Ad Hygiene** - Disable auto-ads to restore controlled ad density
- [ ] **Phase 2: Metadata & HTML Fixes** - Fix all broken metadata and HTML structure across the site
- [ ] **Phase 3: Verification** - Validate fixes across representative pages and confirm no regressions

## Phase Details

### Phase 1: Ad Hygiene
**Goal**: Pages serve only explicitly placed ads, eliminating auto-injected ad clutter that degrades page experience signals
**Depends on**: Nothing (first phase)
**Requirements**: ADS-01
**Success Criteria** (what must be TRUE):
  1. Study pages display only the manually placed ad (before first h2), not additional auto-injected ads
  2. Homepage displays only the manually placed ad, not additional auto-injected ads
  3. AdSense auto-ads configuration is disabled in the site code
**Plans**: TBD

### Phase 2: Metadata & HTML Fixes
**Goal**: Every page on the site emits clean, correct metadata and has valid HTML heading structure
**Depends on**: Phase 1
**Requirements**: META-01, META-02, META-03, META-04, META-05, HTML-01, HTML-02
**Success Criteria** (what must be TRUE):
  1. Study page titles contain no trailing newlines or whitespace artifacts (visible in og:title, breadcrumb structured data, and document title)
  2. Meta descriptions begin with a word, not punctuation (no leading ". " or similar)
  3. Homepage document title reads "Inspired Scripture" (not duplicated with pipe separator)
  4. Homepage structured data contains no SearchAction claiming a /search endpoint exists
  5. Every page has exactly one H1 element (study pages and homepage)
**Plans**: TBD

### Phase 3: Verification
**Goal**: Confirmed confidence that all fixes render correctly at scale and pass external validation tools
**Depends on**: Phase 2
**Requirements**: VERIFY-01, VERIFY-02, VERIFY-03
**Success Criteria** (what must be TRUE):
  1. A representative sample of study pages (with video, without video, different description patterns) all show correct metadata in rendered HTML
  2. Structured data from at least 3 representative pages passes Google Rich Results Test validation
  3. Full site build (`pnpm build`) completes with no new warnings or errors
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Ad Hygiene | 0/0 | Not started | - |
| 2. Metadata & HTML Fixes | 0/0 | Not started | - |
| 3. Verification | 0/0 | Not started | - |
