# Inspired Scripture SEO Recovery

## What This Is

An SEO recovery project for inspiredscripture.com, a statically exported Next.js site publishing Bible study commentaries by John Edson. The site experienced a 94% drop in Google Search impressions (1.7M → 100K) and clicks (41K → 2K) starting June 2025. This project systematically addresses the quality signals causing the decline.

## Core Value

Restore Google's trust in the site so that Bible study pages rank and receive organic search traffic again.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Reduce ad density to improve page experience signals
- [ ] Fix trailing newline in all 530 study page titles (corrupts og:title, structured data, breadcrumbs)
- [ ] Fix meta descriptions starting with punctuation (". Job is the oldest...")
- [ ] Fix duplicate homepage title ("Inspired Scripture | Inspired Scripture")
- [ ] Remove false SearchAction structured data pointing to nonexistent /search page
- [ ] Fix multiple H1 tags on study pages and homepage
- [ ] Audit and fix any remaining structured data issues
- [ ] Verify fixes across representative sample of pages

### Out of Scope

- Content rewrites or new study creation — not a content quality issue
- Domain or hosting migration — site is established on Cloudflare
- Redesign or UX overhaul — focus is strictly on SEO signal recovery
- Link building or off-page SEO — focus is on-page technical quality

## Context

- Site is a statically exported Next.js site (`output: 'export'`) hosted on Cloudflare
- 530 bible study pages, 179 topic pages, 2 static pages (home, about)
- Ads were added Jan–March 2025 (homepage + injected before first h2 on study pages). AdSense auto-ads enabled, resulting in ~4 ads per page
- May 2025: Next.js upgrade, migration from Netlify to Cloudflare
- June 2025: Impressions began declining gradually
- November 2025: SEO overhaul added structured data, OG tags, canonical URLs — but introduced the newline bug in titles and description extraction issues
- Google Search Console shows no crawl errors or manual actions — this is an algorithmic quality signal issue
- The title newline bug originates in `lib/studies.js:48` — title extraction includes `\n` and `stripHtml` doesn't trim
- Description bug originates in `lib/studies.js:13-16` — regex captures punctuation after "Introduction" header

## Constraints

- **Tech stack**: Next.js with static export, no server-side capabilities
- **Content**: Study HTML files in `_studies/` cannot be bulk-reformatted — fixes must work with existing content structure
- **Verification lag**: SEO improvements take weeks/months to reflect in Search Console — success criteria must include both technical verification and long-term monitoring

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Address ad density first | Most timeline-aligned with the decline onset; strongest quality signal | — Pending |
| Fix metadata bugs across all pages via code changes | Fixing at the code level (studies.js, meta.jsx) propagates to all 530+ pages at build time | — Pending |

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
*Last updated: 2026-04-13 after initialization*
