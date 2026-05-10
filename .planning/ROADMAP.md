# Roadmap: Inspired Scripture SEO Recovery

## Overview

This roadmap addresses the 94% drop in Google Search impressions by systematically fixing three categories of quality signals: ad density and metadata corruption (Phase 1), author trust and temporal signals (Phase 2), and internal linking with end-to-end verification (Phase 3). Each phase builds on the prior and delivers independently verifiable improvements. The goal is to remove every known algorithmic penalty trigger so Google re-evaluates the site as high-quality.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Stop the Bleeding** - Remove ads and fix all metadata/HTML corruption across 530+ pages
- [ ] **Phase 2: Build Trust Signals** - Add visible author attribution, credentials, and temporal metadata
- [ ] **Phase 3: Strengthen Structure & Verify** - Add internal cross-linking and validate all fixes end-to-end

## Phase Details

### Phase 1: Stop the Bleeding
**Goal**: Every page on the site renders with clean metadata, correct HTML structure, and zero ad interference so Google's next crawl sees no quality penalty triggers
**Depends on**: Nothing (first phase)
**Requirements**: ADS-01, META-01, META-02, META-03, META-04, HTML-01, HTML-02
**Success Criteria** (what must be TRUE):
  1. Study pages and homepage contain zero ad scripts or ad placements (no AdSense, no ad component renders)
  2. Every study page's og:title and structured data title renders without trailing whitespace or newline artifacts
  3. Meta descriptions for studies like Job begin with the first real sentence, not punctuation from the "Introduction" header
  4. Homepage structured data contains no SearchAction markup
  5. Every page (homepage, study pages) has exactly one H1 tag in the rendered HTML
**Plans**: TBD

### Phase 2: Build Trust Signals
**Goal**: Google can identify a real, credible author behind every study and see temporal freshness signals in both structured data and sitemap
**Depends on**: Phase 1
**Requirements**: EEAT-01, EEAT-02, EEAT-03, SITE-01
**Success Criteria** (what must be TRUE):
  1. Every study page displays a visible author byline with "John Edson" that links to the About page
  2. The About page presents John Edson's name, bio, credentials, and expertise in Bible study — visible to both users and crawlers
  3. Every study page's Article structured data includes datePublished and dateModified fields with valid ISO 8601 dates
  4. Every URL in sitemap.xml includes a lastmod date
**Plans**: TBD
**UI hint**: yes

### Phase 3: Strengthen Structure & Verify
**Goal**: Study pages link to related content (cross-linking within the site) and all fixes from Phases 1-2 are validated to work correctly across representative pages
**Depends on**: Phase 2
**Requirements**: SITE-02, SITE-03, VERIFY-01, VERIFY-02, VERIFY-03
**Success Criteria** (what must be TRUE):
  1. Every study page displays a "Related Studies" section with links to studies in the same topic or book
  2. Every study page displays links back to its parent topic page(s)
  3. A representative sample of pages (with video, without video, different description patterns) passes manual metadata inspection with no defects
  4. Structured data on study pages passes Google's Rich Results Test without errors or warnings
  5. A full production build completes with no regressions (no new warnings, no broken pages)
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Stop the Bleeding | 0/TBD | Not started | - |
| 2. Build Trust Signals | 0/TBD | Not started | - |
| 3. Strengthen Structure & Verify | 0/TBD | Not started | - |
