# External Integrations

**Analysis Date:** 2026-05-09

## APIs & External Services

**Google Analytics (GA4):**
- Purpose: Site traffic analytics and user behavior tracking
- Measurement ID: `G-49NRM2V6SJ`
- Implementation: Google Tag Manager script loaded via `next/script` in `components/scripts.jsx`
- Auth: None required (client-side only, public measurement ID)
- Loaded: On every page via `components/scripts.jsx` (included in `components/layout.jsx`)

**Google AdSense:**
- Purpose: Display advertising for monetization
- Publisher ID: `ca-pub-5795179986208929`
- Implementation: AdSense script loaded via `next/script` in `components/scripts.jsx`; ad units rendered via `components/ad.jsx`
- Ad Slot: `2205708236` (used on homepage and injected into study content)
- Ad component: `components/ad.jsx` -- uses `useEffect` to push to `window.adsbygoogle` array
- Study pages inject an ad before the first `<h2>` in study content (`pages/bible-studies/[slug].jsx` line 44)

**Google Custom Search Engine (CSE):**
- Purpose: Site search functionality embedded in the navigation bar
- CSE ID: `36dcdc8b2b66146f8`
- Implementation: CSE script loaded in `components/layout.jsx` via `next/script`; renders `<div className="gcse-search">` widget
- Auth: None required (client-side, public CSE ID)

**YouTube:**
- Purpose: Embedded Bible study videos on individual study pages
- Implementation: Standard YouTube embed iframes (`https://www.youtube.com/embed/{VIDEO_ID}`)
- Video URLs stored in: `lib/study_metadata.yml` as `videoSrc` field per study slug
- Rendered in: `pages/bible-studies/[slug].jsx` (responsive iframe with 16:9 aspect ratio)
- Preconnect hint: `<link rel="preconnect" href="https://www.youtube.com" />` in `pages/_document.jsx`
- YouTube channel: `https://www.youtube.com/channel/UCNqjGYi58K4RQZ5dl4mvcNQ` (linked on About page)
- YouTube thumbnail images used for OG images: `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg`

## Data Storage

**Databases:**
- None. This is a fully static site with no database.

**Content Storage:**
- Study HTML files: `_studies/*.html` (706 files including some `.docx` source files)
- Study metadata: `lib/study_metadata.yml` (YAML keyed by study slug, contains `videoSrc` and `videoPublishedAt`)
- Topic index: `lib/topic-index.yml` (YAML defining topic categories, sections, and study references)
- Book ordering: `lib/books.js` (static array of Bible book names in canonical order)

**File Storage:**
- Static assets served from `public/` directory
- Per-study media directories: `public/{study-slug}/media/` (images referenced in study HTML)
- Site-wide images: `public/welcome-span.jpg` (hero image, OG default)

**Caching:**
- None. Static export means all content is pre-rendered at build time.

## Authentication & Identity

**Auth Provider:**
- None. The site is public with no user accounts or authentication.

## Monitoring & Observability

**Error Tracking:**
- None. No error tracking service (e.g., Sentry) is integrated.

**Logs:**
- Build-time: `console.debug` and `console.warn` in `lib/studies.js` for missing book values and unrecognized books
- Client-side: `console.log` in `components/ad.jsx` for AdSense initialization errors
- No structured logging framework

**Analytics:**
- Google Analytics GA4 (see above)

## CI/CD & Deployment

**CI Pipeline:**
- GitHub Actions: `.github/workflows/gated.yml`
- Triggers: Pull requests to `master` branch + manual dispatch
- Steps: Install (`pnpm install`), Test (`pnpm test`), Lint (`pnpm lint`)
- Runner: `ubuntu-latest`
- Node version: 20 (via `actions/setup-node@v4`)
- pnpm setup: `pnpm/action-setup@v4`
- Note: CI does NOT run `pnpm build` -- only tests and lint

**Hosting:**
- Platform not explicitly configured (no `vercel.json`, `netlify.toml`, or similar)
- Static export output: `out/` directory
- Site URL: `https://inspiredscripture.com`
- Domain preconnects configured in `pages/_document.jsx`: YouTube, Google Analytics, Google Tag Manager, Google AdSense

**Deployment Process:**
- Not automated in the repository. Build produces `out/` which must be deployed to a static host.

## SEO & Structured Data

**Sitemap:**
- Generated at build time by `scripts/generate-sitemap.mjs`
- Output: `public/sitemap.xml`
- Includes: Static pages (home, about), all study pages, all topic pages

**Robots.txt:**
- Static file: `public/robots.txt`
- Allows all crawlers, references sitemap at `https://inspiredscripture.com/sitemap.xml`

**Meta Tags:**
- Managed by `components/meta.jsx`
- Supports: title, description, canonical URL, Open Graph (type, image, dimensions, locale), Twitter Card, article metadata (published/modified time, author), JSON-LD structured data

**Structured Data (JSON-LD):**
- Homepage (`pages/index.jsx`): `WebSite` schema with `SearchAction`
- Study pages (`pages/bible-studies/[slug].jsx`): `Article` + `VideoObject` (when video present) + `BreadcrumbList` + `Person` (author) + `Organization` (publisher)
- Topic pages (`pages/topics/[slug].jsx`): `CollectionPage` + `BreadcrumbList`

## Social Media Presence

**Linked accounts (from `pages/about.jsx`):**
- Facebook: `https://www.facebook.com/inspiredscripture`
- Facebook Group: `https://www.facebook.com/groups/inspiredscript`
- Twitter: `https://twitter.com/johninspireword`
- Instagram: `https://www.instagram.com/inspiredscripture/`
- Pinterest: `https://www.pinterest.com/inspiredscripture/`
- LinkedIn: `https://www.linkedin.com/in/john-inspire-093b12269`
- YouTube: `https://www.youtube.com/channel/UCNqjGYi58K4RQZ5dl4mvcNQ`
- GitHub: `https://github.com/strake7/inspired-scripture`

## Environment Configuration

**Required env vars:**
- None. All service IDs are hardcoded.

**Secrets location:**
- No secrets required for the static site build or deployment.
- Google service IDs (Analytics, AdSense, CSE) are public client-side identifiers, hardcoded in components.

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: 2026-05-09*
