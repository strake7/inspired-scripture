# Requirements: Inspired Scripture SEO Recovery (Revised)

**Defined:** 2026-05-09
**Core Value:** Restore Google's trust in the site so that Bible study pages rank and receive organic search traffic again.

## v1 Requirements

### Ad Hygiene

- [ ] **ADS-01**: Remove all ad placements from study pages and homepage to eliminate ad density as a quality signal issue (ads will be reintroduced in v2 with controlled placement)

### Metadata Quality

- [ ] **META-01**: Fix trailing newline in study titles so og:title, structured data, and breadcrumbs render cleanly across all 530+ pages
- [ ] **META-02**: Fix description extraction to skip "Introduction." prefix punctuation
- [ ] **META-03**: Remove false SearchAction structured data from homepage (claims /search exists but no such page)
- [ ] **META-04**: Clean newline artifacts from OG image alt text and Twitter card metadata

### HTML Structure

- [ ] **HTML-01**: Ensure single H1 per page on homepage (currently has 2: hero h1 + Heading component)
- [ ] **HTML-02**: Ensure single H1 per page on study pages (Heading component + potential H1 in study HTML content)

### Author & Trust (E-E-A-T)

- [ ] **EEAT-01**: Add visible author byline to study page template (name + link to /about)
- [ ] **EEAT-02**: Overhaul About page with John Edson's name, bio, credentials, and expertise signals
- [ ] **EEAT-03**: Add datePublished and dateModified to Article structured data on study pages

### Site Structure

- [ ] **SITE-01**: Add lastmod dates to sitemap entries in generate-sitemap.mjs
- [ ] **SITE-02**: Add "Related Studies" section to study pages (sourced from same topic or book)
- [ ] **SITE-03**: Add topic backlinks from study pages to their parent topic pages

### Verification

- [ ] **VERIFY-01**: Validate metadata fixes across representative sample of pages (with/without video, different description patterns)
- [ ] **VERIFY-02**: Validate structured data passes Rich Results Test format
- [ ] **VERIFY-03**: Run build and confirm no regressions

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Ad Reintroduction

- **ADS-02**: Re-add ads with controlled placement after SEO recovery stabilizes (explicit positions, limited density, no auto-ads)

### Performance

- **PERF-01**: Core Web Vitals audit and optimization

### Content Quality

- **CONTENT-01**: Audit thin studies (under 250 lines) for consolidation or enrichment
- **CONTENT-02**: Add alt text to images missing descriptions across study HTML files

### Investigation

- **SEO-02**: Investigate Google algorithm update impact on religious content niche

## Out of Scope

| Feature | Reason |
|---------|--------|
| Content rewrites | Not a content quality issue |
| Redesign/UX overhaul | Focus is SEO signal recovery |
| Link building / off-page SEO | Focus is on-page technical fixes |
| Hosting changes | Established on Cloudflare |
| Ad revenue optimization during recovery | Ads removed entirely in v1; reintroduction deferred to v2 after rankings stabilize |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ADS-01 | Phase 1 | Pending |
| META-01 | Phase 1 | Pending |
| META-02 | Phase 1 | Pending |
| META-03 | Phase 1 | Pending |
| META-04 | Phase 1 | Pending |
| HTML-01 | Phase 1 | Pending |
| HTML-02 | Phase 1 | Pending |
| EEAT-01 | Phase 2 | Pending |
| EEAT-02 | Phase 2 | Pending |
| EEAT-03 | Phase 2 | Pending |
| SITE-01 | Phase 2 | Pending |
| SITE-02 | Phase 3 | Pending |
| SITE-03 | Phase 3 | Pending |
| VERIFY-01 | Phase 3 | Pending |
| VERIFY-02 | Phase 3 | Pending |
| VERIFY-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0

---
*Requirements defined: 2026-05-09*
*Last updated: 2026-05-09 after initial definition*
