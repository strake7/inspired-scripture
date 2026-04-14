# Requirements: Inspired Scripture SEO Recovery

**Defined:** 2026-04-13
**Core Value:** Restore Google's trust in the site so that Bible study pages rank and receive organic search traffic again.

## v1 Requirements

### Metadata Quality

- [ ] **META-01**: Fix trailing newline in study titles (corrupts og:title, structured data, breadcrumbs across 530 pages)
- [ ] **META-02**: Fix description extraction capturing leading punctuation (". Job is the oldest...")
- [ ] **META-03**: Fix duplicate homepage title ("Inspired Scripture | Inspired Scripture")
- [ ] **META-04**: Remove false SearchAction structured data from homepage (claims /search exists)
- [ ] **META-05**: Clean newline artifacts from OG image alt text and Twitter card metadata

### HTML Structure

- [ ] **HTML-01**: Ensure single H1 per page on study pages
- [ ] **HTML-02**: Ensure single H1 per page on homepage

### Ad Hygiene

- [ ] **ADS-01**: Disable auto-ads so ad placement is explicitly controlled

### Verification

- [ ] **VERIFY-01**: Validate metadata fixes across representative sample of pages (with/without video, different description patterns)
- [ ] **VERIFY-02**: Validate structured data passes Google Rich Results Test
- [ ] **VERIFY-03**: Run build and confirm no regressions

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Ad Optimization

- **ADS-02**: Optimize ad placement count/positioning

### Performance

- **PERF-01**: Core Web Vitals audit and optimization

### Investigation

- **SEO-01**: Investigate Google algorithm update impact on religious content niche

## Out of Scope

| Feature | Reason |
|---------|--------|
| Content rewrites | Not a content quality issue |
| Redesign/UX | Focus is SEO signal recovery |
| Link building | Focus is on-page technical fixes |
| Hosting changes | Established on Cloudflare |
| Ad revenue optimization | Separate concern from SEO recovery |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ADS-01 | Phase 1 | Pending |
| META-01 | Phase 2 | Pending |
| META-02 | Phase 2 | Pending |
| META-03 | Phase 2 | Pending |
| META-04 | Phase 2 | Pending |
| META-05 | Phase 2 | Pending |
| HTML-01 | Phase 2 | Pending |
| HTML-02 | Phase 2 | Pending |
| VERIFY-01 | Phase 3 | Pending |
| VERIFY-02 | Phase 3 | Pending |
| VERIFY-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 11 total
- Mapped to phases: 11
- Unmapped: 0

---
*Requirements defined: 2026-04-13*
*Last updated: 2026-04-13 after roadmap creation*
