# Codebase Structure

**Analysis Date:** 2026-05-09

## Directory Layout

```
inspired-scripture/
├── _studies/                # ~700 HTML study files + converter script
├── components/              # Shared React components (5 files)
├── core-web-vitals-issues/  # Empty — placeholder for CWV investigation
├── docs/                    # Project documentation and plans
│   └── plans/               # Improvement plans (SEO, etc.)
├── lib/                     # Data-access layer (studies, topics, utils)
├── pages/                   # Next.js Pages Router
│   ├── bible-studies/       # Dynamic study pages ([slug].jsx)
│   └── topics/              # Dynamic topic pages ([slug].jsx)
├── public/                  # Static assets (~699 study media dirs + root files)
│   ├── {slug}/media/        # Study-specific images (from Pandoc conversion)
│   ├── favicon.ico          # Site favicon
│   ├── robots.txt           # Search engine directives
│   ├── sitemap.xml          # Generated sitemap (pre-build)
│   ├── ads.txt              # AdSense verification
│   └── welcome-span.jpg     # Hero/OG image
├── scripts/                 # Build-time generators
├── .github/workflows/       # CI pipeline (gated.yml)
├── out/                     # Build output (gitignored)
├── node_modules/            # Dependencies (gitignored)
├── middleware.js             # URL case normalization
├── next.config.js            # Static export config
├── package.json              # Dependencies and scripts
├── pnpm-lock.yaml            # Lockfile
├── styles.css                # Global styles
├── babel.config.js           # Babel config (for Jest)
├── eslint.config.js          # ESLint flat config
├── .prettierrc.js            # Prettier config
├── ARCHITECTURE.md           # Codebase architecture docs
├── CONTRIBUTING.md           # Developer setup and workflow
├── CLAUDE.md                 # AI assistant instructions
└── README.md                 # Project overview
```

## Directory Purposes

**`_studies/`:**
- Purpose: Source of truth for all Bible study content
- Contains: ~700 HTML files (one per study), converter shell script, source .docx files (gitignored)
- Key files: `converter_fns.sh` (Pandoc conversion functions), any `{book}-{chapter}.html` file
- Naming: `{book}-{chapter}.html` or `{book}-{chapter}.{suffix}.html` (e.g., `genesis-1a.1.html`, `psalm-37.html`, `1-samuel-15.html`)
- Note: First line of each HTML file is the `<h1>` title; remainder is the study body

**`lib/`:**
- Purpose: Data-access layer -- all filesystem reads and YAML parsing
- Contains: Study/topic loaders, canonical book list, utility helpers, YAML data files, test specs
- Key files:
  - `studies.js` -- `getAllStudies()`, `getStudyBySlug()`, `getStudyMetadata()`, `extractDescription()`
  - `topics.js` -- `getAllTopics()`, `getTopicBySlug()`
  - `books.js` -- `ORDERED_BOOKS` constant array (21 books, Genesis through Ecclesiastes)
  - `utils.js` -- `stripHtml()`, `truncate()`, `partitionArray()`
  - `study_metadata.yml` -- maps study slugs to `videoSrc` and `videoPublishedAt`
  - `topic-index.yml` -- hierarchical topic > section > study mapping (15 topics, ~71KB)
  - `studies.spec.js` -- tests for study parsing
  - `topics.spec.js` -- tests for topic organization

**`pages/`:**
- Purpose: Next.js Pages Router -- defines all site routes
- Contains: Page components using `getStaticProps`/`getStaticPaths` for static generation
- Key files:
  - `index.jsx` -- homepage (topics grid + book listing)
  - `bible-studies/[slug].jsx` -- individual study page (video + content + navigation)
  - `topics/[slug].jsx` -- topic page (sections with study links)
  - `about.jsx` -- static about/mission page
  - `_app.js` -- global app wrapper (imports Bootstrap CSS, FontAwesome styles)
  - `_document.jsx` -- custom HTML document (preconnects, favicon, viewport meta)

**`components/`:**
- Purpose: Shared presentational React components
- Contains: Layout shell, SEO meta, analytics scripts, ad unit, heading
- Key files:
  - `layout.jsx` -- page shell with sticky navbar, topic/book dropdowns, Google CSE search
  - `meta.jsx` -- `<Head>` with title, description, canonical, OG/Twitter tags, JSON-LD
  - `scripts.jsx` -- GA4 and AdSense script tags
  - `ad.jsx` -- AdSense ad unit component
  - `heading.jsx` -- simple `<h1>` wrapper

**`public/`:**
- Purpose: Static assets served as-is by the web server
- Contains: ~699 study media directories, root static files
- Key files: `favicon.ico`, `welcome-span.jpg`, `robots.txt`, `sitemap.xml`, `ads.txt`
- Study media: `public/{slug}/media/` contains images extracted during Pandoc conversion
- Some study directories contain loose image files (SHA-based filenames) instead of a `media/` subdirectory

**`scripts/`:**
- Purpose: Build-time generators that run before `next build`
- Contains: Sitemap generator
- Key files: `generate-sitemap.mjs` -- reads study files and topic YAML, outputs `public/sitemap.xml`

**`docs/plans/`:**
- Purpose: Project improvement plans and strategy documents
- Contains: SEO-related plans
- Key files: `2026-03-29-seo-opportunities.md`, `2026-05-09-seo-recovery-strategy.md`

**`.github/workflows/`:**
- Purpose: GitHub Actions CI pipeline
- Contains: Single workflow for PR gating
- Key files: `gated.yml` -- runs `pnpm install`, `pnpm test`, `pnpm lint` on PRs to master

## Key File Locations

**Entry Points:**
- `pages/index.jsx`: Homepage -- renders topics and book-by-book study listing
- `pages/bible-studies/[slug].jsx`: Individual study page -- primary content page
- `pages/topics/[slug].jsx`: Topic page -- study collection by theological theme
- `pages/_app.js`: Global wrapper -- CSS imports, FontAwesome config
- `pages/_document.jsx`: HTML document -- preconnects, favicon, viewport
- `middleware.js`: Request middleware -- lowercase URL redirect

**Configuration:**
- `next.config.js`: Static export (`output: 'export'`)
- `package.json`: Dependencies, scripts (`dev`, `build`, `start`, `test`, `lint`)
- `eslint.config.js`: ESLint flat config with Next.js + Prettier
- `.prettierrc.js`: Prettier settings (no semicolons, single quotes, trailing commas)
- `babel.config.js`: Babel config for Jest (next/babel + @babel/preset-env)
- `.tool-versions`: Python 3.11.9 (for asdf version manager)

**Core Logic:**
- `lib/studies.js`: Study loading, slug parsing, metadata merging, description extraction
- `lib/topics.js`: Topic loading and slug lookup
- `lib/books.js`: Canonical ordered list of Bible books
- `lib/utils.js`: HTML stripping, string truncation, array partitioning
- `scripts/generate-sitemap.mjs`: Sitemap generation

**Content Data:**
- `lib/study_metadata.yml`: Study slug to video URL/date mapping
- `lib/topic-index.yml`: Topic > section > study hierarchy (15 topics)
- `_studies/*.html`: Raw study content files (~700 files)

**Testing:**
- `lib/studies.spec.js`: Tests for study parsing and description extraction
- `lib/topics.spec.js`: Tests for topic organization

**Styles:**
- `styles.css`: Global styles -- study content formatting, video embed, sidebar, print styles, ad container

## Naming Conventions

**Files:**
- Page components: `kebab-case.jsx` (e.g., `[slug].jsx`) or `camelCase.jsx` (e.g., `about.jsx`)
- Components: `lowercase.jsx` (e.g., `layout.jsx`, `meta.jsx`, `ad.jsx`)
- Library modules: `lowercase.js` (e.g., `studies.js`, `topics.js`, `utils.js`)
- Test files: `{module}.spec.js` co-located with source (e.g., `lib/studies.spec.js`)
- YAML data: `kebab-case.yml` (e.g., `study_metadata.yml`, `topic-index.yml`) -- note inconsistency: `study_metadata` uses underscores while `topic-index` uses hyphens
- Study HTML files: `{book}-{chapter}.html` (e.g., `psalm-37.html`, `1-samuel-15.html`, `genesis-1a.1.html`)
- Build scripts: `kebab-case.mjs` (e.g., `generate-sitemap.mjs`)

**Directories:**
- Pages use `kebab-case` (e.g., `bible-studies/`, `topics/`)
- Public media dirs match study slug (e.g., `public/genesis-1a.1/media/`)

**Exports:**
- Components use `default export` (e.g., `export default function Layout`)
- Library functions use named exports (e.g., `export function getAllStudies`)
- Constants use named exports with UPPER_SNAKE_CASE (e.g., `export const ORDERED_BOOKS`)

## Where to Add New Code

**New Study Content:**
- HTML file: `_studies/{book}-{chapter}.html`
- Video metadata: Add entry in `lib/study_metadata.yml` keyed by slug
- Images: Place in `public/{slug}/media/`
- Topic mapping: Add entry in `lib/topic-index.yml` under appropriate topic and section

**New Page Route:**
- Static page: Create `pages/{route-name}.jsx` with no `getStaticPaths`
- Dynamic page: Create `pages/{route-name}/[slug].jsx` with both `getStaticPaths` and `getStaticProps`
- Import `Layout` from `../../components/layout` and wrap content
- Pass `meta` prop to Layout with `title`, `description`, `canonical`, and `structuredData`

**New Shared Component:**
- Create `components/{name}.jsx` with a default export
- Use React-Bootstrap components for UI consistency
- Import in page files as needed

**New Data Source or Loader:**
- Add to `lib/` directory
- Follow pattern: named export functions, read filesystem/YAML, return plain JS objects
- Add tests as `lib/{module}.spec.js`

**New Build Script:**
- Add to `scripts/` as `.mjs` (ES modules)
- Add to `package.json` build command chain if it needs to run pre-build

**New Bible Book:**
- Add book name to `ORDERED_BOOKS` array in `lib/books.js`
- Add book entry in `navBooks` object in `components/layout.jsx` (hardcoded navbar)

**New Test:**
- Co-locate with source: `lib/{module}.spec.js`
- Use Jest with `describe`/`it` blocks
- Run with `pnpm test`

## Special Directories

**`out/`:**
- Purpose: Static build output from `next build`
- Generated: Yes (by Next.js static export)
- Committed: No (gitignored)
- Contains: Flat HTML files for every route, `_next/` with JS/CSS bundles

**`_studies/`:**
- Purpose: Source study HTML content
- Generated: Partially -- HTML files are generated from .docx via Pandoc, then manually placed
- Committed: Yes (HTML files committed; .docx and .doc files gitignored)

**`public/`:**
- Purpose: Static assets served directly
- Generated: `sitemap.xml` is generated pre-build; media directories are from Pandoc conversion
- Committed: Yes

**`.next/`:**
- Purpose: Next.js build cache
- Generated: Yes
- Committed: No (gitignored)

**`core-web-vitals-issues/`:**
- Purpose: Placeholder directory for Core Web Vitals investigation
- Generated: No
- Committed: Yes (currently empty)

---

*Structure analysis: 2026-05-09*
