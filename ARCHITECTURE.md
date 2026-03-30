# Architecture

This document describes the high-level architecture of Inspired Scripture
(inspiredscripture.com). If you want to familiarize yourself with the codebase,
you are in the right place.

## Bird's Eye View

Inspired Scripture is a **statically exported Next.js site** that publishes
Bible study commentaries by John Edson. There is no server at runtime — the
build reads ~700 HTML study files and two YAML metadata files, generates static
HTML for every route, and the result is deployed to Netlify.

The core data flow is:

```
_studies/*.html  ──┐
                   ├──▶  lib/  ──▶  pages/  ──▶  out/  (static HTML)
lib/*.yml  ────────┘
```

## Codemap

### `_studies/`

~700 HTML files, one per study. These are converted from Word documents via
Pandoc (see `_studies/converter_fns.sh`). Each file's first line is the title;
the rest is the study body with inline HTML. Filenames encode the book and
chapter: `genesis-1a.html`, `psalm-37.html`, `1-samuel-15.html`.

This directory is the **source of truth for study content**. Everything else
references it by slug (filename without extension).

### `lib/`

Data-access layer. All content loading and parsing lives here.

- `studies.js` — reads `_studies/` at build time, parses filenames into
  book/chapter, extracts title/content, and merges with metadata. Exports
  `getAllStudies()` and `getStudyBySlug()`.
- `study_metadata.yml` — maps study slugs to YouTube embed URLs (`videoSrc`).
  This is the only place video associations are defined.
- `topics.js` — parses `topic-index.yml` into a flat list of topics, each with
  sections of studies. Exports `getAllTopics()` and `getTopicBySlug()`.
- `topic-index.yml` — hierarchical topic → section → study mapping. Defines the
  15 theological topics shown on the site.
- `books.js` — canonical ordered list of Bible books covered by the site.
- `utils.js` — small helpers: `stripHtml()`, `partitionArray()`.

### `pages/`

Next.js Pages Router. Every page uses `getStaticProps`/`getStaticPaths` for
static generation — there are no API routes or server-side rendering.

- `index.jsx` — homepage. Renders topic cards and a book-by-book study listing.
- `bible-studies/[slug].jsx` — individual study page. Embeds YouTube video (if
  present in metadata), renders study HTML content, shows navigation to
  adjacent studies.
- `topics/[slug].jsx` — topic page. Lists studies grouped by section.
- `about.jsx` — static about page.
- `_app.js` — global wrapper: imports Bootstrap CSS, FontAwesome, global styles.
- `_document.jsx` — custom HTML document: meta tags, preconnects, favicon.

### `components/`

Shared React components, all presentational:

- `layout.jsx` — page shell with navbar (includes hardcoded topic/book
  dropdowns for navigation, Google search bar).
- `meta.jsx` — SEO: Open Graph, Twitter Cards, JSON-LD structured data.
- `scripts.jsx` — Google Analytics (GA4) and AdSense script tags.
- `ad.jsx` — AdSense ad unit.
- `heading.jsx` — heading wrapper.

### `middleware.js`

Redirects uppercase URLs to lowercase (e.g. `/Genesis-1` → `/genesis-1`).

### `scripts/`

Build-time generators. `generate-sitemap.mjs` produces `public/sitemap.xml`
with all study, topic, and static page URLs. Runs before `next build`.

### `public/`

Static assets served as-is. Study images live under `public/{study-slug}/media/`.
Also contains `favicon.ico`, hero image, `robots.txt`, `ads.txt`, and the
generated `sitemap.xml`.

## Cross-Cutting Concerns

**Content pipeline.** Studies start as Word documents, get converted to HTML via
Pandoc, and land in `_studies/`. This pipeline runs manually, not as part of the
build. See [CONTRIBUTING.md](CONTRIBUTING.md) for conversion instructions.

**Static export.** `next.config.js` sets `output: 'export'`, so `next build`
produces a fully static `out/` directory. No Node.js runtime is needed in
production. This constraint means no API routes, no ISR, no server components.

**SEO and structured data.** The `meta.jsx` component generates JSON-LD
(`Article`, `VideoObject`, `BreadcrumbList`, `WebSite`) for every page type.
The sitemap generator and `robots.txt` complete the SEO surface.

**Monetization.** Google AdSense is integrated via `ad.jsx` and `scripts.jsx`.
Ads appear on study and index pages.

## Architectural Invariants

- All routes are statically generated at build time. There is no runtime server.
- Study content is always HTML in `_studies/`; metadata is always in
  `lib/study_metadata.yml`. These two sources are joined by slug.
- The `lib/` layer is the only code that touches the filesystem or parses YAML.
  Pages and components receive plain JS objects via props.
