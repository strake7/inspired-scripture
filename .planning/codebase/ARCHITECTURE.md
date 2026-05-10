# Architecture

**Analysis Date:** 2026-05-09

## Pattern Overview

**Overall:** Static Site Generator (Jamstack) using Next.js Pages Router with static export

**Key Characteristics:**
- All pages are statically generated at build time via `getStaticProps`/`getStaticPaths`
- No server at runtime -- `next.config.js` sets `output: 'export'`, producing a flat `out/` directory
- Content is authored as HTML files (converted from Word docs via Pandoc), not Markdown or a CMS
- Data layer reads filesystem and YAML at build time; pages and components receive plain JS objects via props
- Deployed to Netlify as static files with no Node.js runtime

## Layers

**Content Layer (Source of Truth):**
- Purpose: Store raw study content and metadata
- Location: `_studies/*.html`, `lib/study_metadata.yml`, `lib/topic-index.yml`
- Contains: ~700 HTML study files (one per Bible chapter), YAML metadata mapping slugs to video URLs and publish dates, YAML topic index organizing studies into 15 theological topics
- Depends on: Nothing (manually authored/converted)
- Used by: Data-access layer (`lib/`)

**Data-Access Layer:**
- Purpose: Read, parse, and merge content from filesystem and YAML into plain JS objects
- Location: `lib/`
- Contains: Study loading (`lib/studies.js`), topic loading (`lib/topics.js`), canonical book list (`lib/books.js`), utility functions (`lib/utils.js`)
- Depends on: Content layer (`_studies/`, `lib/*.yml`), `fs` module, `yaml` package
- Used by: Pages (`pages/`)

**Page Layer:**
- Purpose: Define routes, fetch data via `getStaticProps`/`getStaticPaths`, render page components
- Location: `pages/`
- Contains: Homepage (`pages/index.jsx`), study pages (`pages/bible-studies/[slug].jsx`), topic pages (`pages/topics/[slug].jsx`), about page (`pages/about.jsx`), app wrapper (`pages/_app.js`), document (`pages/_document.jsx`)
- Depends on: Data-access layer (`lib/`), component layer (`components/`)
- Used by: Next.js build pipeline

**Component Layer:**
- Purpose: Shared presentational React components
- Location: `components/`
- Contains: Layout shell with navbar (`components/layout.jsx`), SEO meta tags (`components/meta.jsx`), analytics/ad scripts (`components/scripts.jsx`, `components/ad.jsx`), heading wrapper (`components/heading.jsx`)
- Depends on: `react-bootstrap`, `next/head`, `next/script`, `@fortawesome`
- Used by: Page layer

**Build Scripts:**
- Purpose: Pre-build generators
- Location: `scripts/`
- Contains: Sitemap generator (`scripts/generate-sitemap.mjs`)
- Depends on: Content layer (reads `_studies/` and `lib/topic-index.yml` directly)
- Used by: Build pipeline (`pnpm build` runs sitemap generation before `next build`)

## Data Flow

**Build-Time Static Generation:**

1. `pnpm build` triggers `node scripts/generate-sitemap.mjs && next build`
2. Sitemap script reads `_studies/*.html` filenames and `lib/topic-index.yml` to produce `public/sitemap.xml`
3. Next.js calls `getStaticPaths()` on dynamic pages to enumerate all slugs
4. Next.js calls `getStaticProps()` for each page, which invokes `lib/studies.js` or `lib/topics.js`
5. `lib/studies.js` reads HTML files from `_studies/`, extracts title (first line) and content (rest), parses slug into book/chapter via regex, merges with `lib/study_metadata.yml` for video URLs
6. `lib/topics.js` reads `lib/topic-index.yml` and flattens the hierarchical YAML into topic objects with sections and study references
7. Page components receive plain JS objects as props and render to static HTML
8. Output lands in `out/` directory as flat HTML files ready for deployment

**Study Content Pipeline (Manual, Pre-Build):**

1. Author writes study in Word (.docx)
2. Pandoc converts .docx to HTML via `_studies/converter_fns.sh` (`convert_all_docx`)
3. HTML file is placed in `_studies/` with slug-based filename (e.g., `genesis-1a.1.html`)
4. Images extracted by Pandoc land in `public/{slug}/media/`
5. Video URL and publish date are manually added to `lib/study_metadata.yml` keyed by slug

**Study Data Merging:**

1. `getStudyBySlug()` reads the HTML file, extracts title from line 1, content from remainder
2. Slug is parsed via regex: `/{book}-{chapter}.{suffix}/` to extract book name, chapter number, suffix
3. Description is auto-extracted: tries Introduction/Background/Overview header match, then first paragraph with 50+ chars; throws build error if neither found
4. Study metadata (videoSrc, videoPublishedAt) is merged from `lib/study_metadata.yml` by slug key

**State Management:**
- No client-side state management library
- All data is passed as props at build time via `getStaticProps`
- No API routes or client-side data fetching
- Navigation uses standard `<a>` tags and Next.js `<Link>` components

## Key Abstractions

**Study:**
- Purpose: Represents a single Bible study (one chapter/passage)
- Examples: `lib/studies.js` (`getStudyBySlug`, `getAllStudies`)
- Pattern: Plain JS object with fields: `slug`, `title`, `content`, `description`, `book`, `chapter`, `suffix`, `chapterLabel`, `videoSrc`, `videoPublishedAt`
- Slug format: `{book}-{chapter}` or `{book}-{chapter}.{suffix}` (e.g., `psalm-37`, `genesis-1a.1`)

**Topic:**
- Purpose: Represents a theological topic grouping studies into sections
- Examples: `lib/topics.js` (`getAllTopics`, `getTopicBySlug`)
- Pattern: Plain JS object with fields: `name`, `slug`, `sections[]` where each section has `name` and `studies[]`
- Slug derived from topic name: lowercased, spaces replaced with hyphens

**Layout:**
- Purpose: Page shell wrapping all pages with navbar and meta tags
- Examples: `components/layout.jsx`
- Pattern: Accepts `children` and `meta` props; renders `<Meta>`, `<Scripts>`, `<Navbar>`, then children
- Note: Navbar topic/book lists are hardcoded (intentional debt documented in source)

## Entry Points

**Homepage (`pages/index.jsx`):**
- Location: `pages/index.jsx`
- URL: `/`
- Triggers: `getStaticProps` calls `getAllTopics()` and `getAllStudies()`
- Responsibilities: Renders topic cards grid, book-by-book study listing with sidebar, hero section, WebSite structured data

**Study Page (`pages/bible-studies/[slug].jsx`):**
- Location: `pages/bible-studies/[slug].jsx`
- URL: `/bible-studies/{slug}`
- Triggers: `getStaticPaths` enumerates all study slugs; `getStaticProps` calls `getStudyBySlug()` and filters studies for same book
- Responsibilities: Renders YouTube video embed (if videoSrc exists), study HTML content with injected ad, chapter navigation dropdown, print button, Article/VideoObject/BreadcrumbList structured data

**Topic Page (`pages/topics/[slug].jsx`):**
- Location: `pages/topics/[slug].jsx`
- URL: `/topics/{slug}`
- Triggers: `getStaticPaths` enumerates all topic slugs; `getStaticProps` calls `getTopicBySlug()`
- Responsibilities: Renders topic sections with ordered lists of study links, CollectionPage/BreadcrumbList structured data

**About Page (`pages/about.jsx`):**
- Location: `pages/about.jsx`
- URL: `/about`
- Triggers: Static page, no dynamic data
- Responsibilities: Mission statement, social media links, GitHub link

**Middleware (`middleware.js`):**
- Location: `middleware.js`
- Triggers: Every incoming request
- Responsibilities: Redirects uppercase URLs to lowercase equivalents

## Error Handling

**Strategy:** Build-time validation with fail-fast behavior

**Patterns:**
- `extractDescription()` in `lib/studies.js` throws a build error if no suitable description can be extracted from a study, forcing the author to fix the content
- Study pages render `<ErrorPage statusCode={404} />` if `router.isFallback` is false and no study slug is found (though with `fallback: false` this path is unlikely to be reached at runtime)
- `getStudyBySlug()` silently returns a study without book/chapter fields if the slug regex fails to match, rather than throwing
- AdSense initialization errors are caught and logged to console in `components/ad.jsx`
- No global error boundary; unhandled errors surface as Next.js default error pages

## Cross-Cutting Concerns

**SEO and Structured Data:**
- `components/meta.jsx` generates `<title>`, `<meta description>`, canonical URL, Open Graph tags, Twitter Cards, and JSON-LD structured data for every page
- Each page type provides its own structured data schema: WebSite (homepage), Article + VideoObject (study pages), CollectionPage (topic pages)
- `scripts/generate-sitemap.mjs` produces `public/sitemap.xml` pre-build
- `public/robots.txt` allows all crawlers and references the sitemap

**Logging:**
- `console.debug` for non-critical warnings (e.g., study slug without book value)
- `console.warn` for unrecognized book names during build
- `console.log` for ad initialization errors
- No structured logging framework

**Validation:**
- Description extraction validates that every study has a meaningful meta description at build time
- No schema validation on YAML files
- No runtime validation (static site)

**Monetization:**
- Google AdSense integrated via `components/ad.jsx` and `components/scripts.jsx`
- Ads injected into study content before the first `<h2>` tag via string replacement in `pages/bible-studies/[slug].jsx`
- Ads hidden during print via CSS `@media print`

**Analytics:**
- Google Analytics 4 (GA4) with measurement ID `G-49NRM2V6SJ` loaded via `components/scripts.jsx`
- Google Custom Search Engine embedded in navbar via `components/layout.jsx`

---

*Architecture analysis: 2026-05-09*
