# Inspired Scripture SEO Recovery (Revised)

## What This Is

An SEO recovery project for inspiredscripture.com, a statically exported Next.js site publishing Bible study commentaries by John Edson. The site experienced a 94% drop in Google Search impressions (1.7M → 100K) and clicks (41K → 2K) starting June 2025. The original recovery plan (April 2026) focused narrowly on metadata bugs and was never executed. This revised approach broadens scope to address the three most likely algorithmic factors: ad density, E-E-A-T trust signals, and site structure.

## Core Value

Restore Google's trust in the site so that Bible study pages rank and receive organic search traffic again.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Disable AdSense auto-ads so ad placement is explicitly controlled (single manual ad per page)
- [ ] Fix trailing newline in all study page titles (corrupts og:title, structured data, breadcrumbs)
- [ ] Fix meta descriptions starting with punctuation (". Job is the oldest...")
- [ ] Remove false SearchAction structured data pointing to nonexistent /search page
- [ ] Fix multiple H1 tags on study pages and homepage
- [ ] Add visible author byline to study pages (name + link to /about)
- [ ] Overhaul About page with author bio, credentials, and expertise signals
- [ ] Add datePublished/dateModified to Article structured data
- [ ] Add lastmod dates to sitemap entries
- [ ] Add "Related Studies" section to study pages (same topic or book)
- [ ] Add topic backlinks from study pages
- [ ] Verify fixes across representative sample of pages
- [ ] Validate structured data passes Rich Results Test format

### Out of Scope

- Content rewrites or new study creation — not a content quality issue
- Domain or hosting migration — site is established on Cloudflare
- Redesign or UX overhaul — focus is strictly on SEO signal recovery
- Link building or off-page SEO — focus is on-page technical fixes
- Ad revenue optimization — separate concern from SEO recovery
- Core Web Vitals audit — deferred to future work

## Context

- Site is a statically exported Next.js 16 site (`output: 'export'`) hosted on Cloudflare
- 530+ bible study pages, 179 topic pages, 2 static pages (home, about)
- Ads added Jan–March 2025 (homepage + injected before first h2 on study pages). AdSense auto-ads enabled, resulting in ~4+ ads per page
- May 2025: Next.js upgrade, migration from Netlify to Cloudflare
- June 2025: Impressions began declining gradually
- November 2025: SEO overhaul added structured data, OG tags, canonical URLs — but introduced newline bug in titles and description extraction issues
- Google Search Console shows no crawl errors or manual actions — this is an algorithmic quality signal issue
- Title newline bug: `lib/studies.js:49` — `stripHtml(fLine)` doesn't trim trailing `\n`
- Description bug: `lib/studies.js:9-29` — regex captures punctuation after "Introduction" header
- E-E-A-T gap: Author "John Edson" in schema markup but invisible on pages; About page has no author name, credentials, bio, or photo
- Internal linking: Study pages are isolated — no cross-links to related studies or topics
- Sitemap: Generated but lacks `lastmod` dates

## Constraints

- **Tech stack**: Next.js with static export, no server-side capabilities
- **Content**: Study HTML files in `_studies/` cannot be bulk-reformatted — fixes must work with existing content structure
- **Verification lag**: SEO improvements take weeks/months to reflect in Search Console — success criteria must include both technical verification and long-term monitoring

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Broaden scope beyond metadata bugs | Original narrow plan was never executed; 94% drop requires addressing multiple algorithmic factors, not just metadata | — Pending |
| Address ads + metadata + E-E-A-T + structure | Three distinct algorithmic quality signals identified: ad density, trust/authority, site structure | — Pending |
| Fix metadata bugs via code-level changes | Fixing in lib/studies.js and components propagates to all 530+ pages at build time | — Pending |
| Require visible author attribution | Schema-only author is a trust mismatch; Google needs visible E-E-A-T signals | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-09 after initialization*
