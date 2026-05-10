# CLAUDE.md

Inspired Scripture (inspiredscripture.com) — a statically exported Next.js site publishing Bible study commentaries by John Edson. See [ARCHITECTURE.md](ARCHITECTURE.md) for codebase structure and [CONTRIBUTING.md](CONTRIBUTING.md) for commands, setup, and workflow.

## Running and Observing the Site

1. **Start the dev server** with `pnpm start` in the background. Site runs at `http://localhost:4000`.
2. **Use Playwright MCP** to navigate pages, take screenshots, and read console output.
3. **Build validation**: Run `pnpm build` to catch static generation errors. Read output carefully — warnings about missing videoSrc or unmatched slugs indicate content gaps.
4. **Tests**: Run `pnpm test` to validate study parsing and topic organization.

### What to check with Playwright

- Navigate to study pages (`/bible-studies/{slug}`) and verify video embeds load
- Check topic pages (`/topics/{slug}`) for correct study groupings
- Take screenshots to compare visual output before/after changes
- Read browser console for errors or warnings
- Spot-check navigation dropdowns in the layout for completeness

## Key Conventions

- Study slugs: `{book}-{chapter}` (e.g., `psalm-37`, `1-samuel-15`)
- Study content in `_studies/*.html`; metadata in `lib/study_metadata.yml` — joined by slug
- Video embeds: `https://www.youtube.com/embed/{VIDEO_ID}` via `videoSrc` in metadata
- All routes statically generated — no API routes, no SSR

## Finding Opportunities

Look in `docs/projects/active/` for tracked improvement projects. When investigating the codebase or site, watch for:

- **Content gaps**: Studies in `_studies/` without a `videoSrc` in `study_metadata.yml`, or videos on the YouTube channel not yet linked in metadata
- **SEO**: Missing or weak meta descriptions, structured data issues, broken OG images (see `docs/projects/active/seo-opportunities.md`)
- **Build health**: Warnings during `pnpm build`, unused or orphaned study files, metadata referencing nonexistent slugs
- **UX issues**: Broken navigation, layout problems on study pages, missing images in `public/{slug}/media/`
- **Code quality**: Outdated dependencies, test coverage gaps, lint warnings

When you find an opportunity, check if it fits an existing project in `docs/projects/active/`. If not, create a new doc there describing the issue, impact, and proposed fix.

## YouTube Channel Sync

New videos are posted at https://www.youtube.com/@inspiredscripture/videos. To sync:
1. Check the channel for videos not yet in `lib/study_metadata.yml`
2. Add the embed URL as `videoSrc` for the matching study slug
3. Verify the embed loads on the dev server

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Inspired Scripture SEO Recovery (Revised)**

An SEO recovery project for inspiredscripture.com, a statically exported Next.js site publishing Bible study commentaries by John Edson. The site experienced a 94% drop in Google Search impressions (1.7M → 100K) and clicks (41K → 2K) starting June 2025. The original recovery plan (April 2026) focused narrowly on metadata bugs and was never executed. This revised approach broadens scope to address the three most likely algorithmic factors: ad density, E-E-A-T trust signals, and site structure.

**Core Value:** Restore Google's trust in the site so that Bible study pages rank and receive organic search traffic again.

### Constraints

- **Tech stack**: Next.js with static export, no server-side capabilities
- **Content**: Study HTML files in `_studies/` cannot be bulk-reformatted — fixes must work with existing content structure
- **Verification lag**: SEO improvements take weeks/months to reflect in Search Console — success criteria must include both technical verification and long-term monitoring
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- JavaScript (ES Modules + CommonJS) - All application code (`.js`, `.jsx`, `.mjs`)
- YAML - Content metadata (`lib/study_metadata.yml`, `lib/topic-index.yml`)
- HTML - Study content files (`_studies/*.html`)
- CSS - Styling (`styles.css`, Bootstrap CSS)
## Runtime
- Node.js v22.18.0 (local development)
- Node.js v20 (CI via `.github/workflows/gated.yml`)
- `.tool-versions` specifies `python 3.11.9` (likely for unrelated tooling; not used by the app)
- pnpm 9.15.9 (declared in `package.json` `packageManager` field)
- Lockfile: `pnpm-lock.yaml` present
## Frameworks
- Next.js `^16.1.5` - Static site generator with Pages Router
- React `19.1.0` - UI rendering
- React DOM `19.1.0` - DOM rendering
- React Bootstrap `^2.10.6` - Pre-built Bootstrap components (Navbar, Card, Row, Col, Dropdown, etc.)
- Bootstrap `^5.3.3` - CSS framework, imported globally in `pages/_app.js`
- Bootstrap Icons `^1.0.0` - Icon set (imported as CSS)
- Jest `^29.7.0` - Test runner (no separate config file; config via `package.json` scripts)
- Babel Jest `^29.7.0` - Jest transformer for JSX/ES modules
- Babel `@babel/core ^7.12.9` + `@babel/preset-env ^7.12.7` - Transpilation
- ESLint `^9.26.0` - Linting (flat config in `eslint.config.js`)
- Prettier `^3.0.3` - Code formatting
## Key Dependencies
- `next ^16.1.5` - Core framework; static export produces the entire site
- `react 19.1.0` / `react-dom 19.1.0` - UI rendering (pinned exact versions)
- `yaml ^2.7.1` - Parses YAML metadata files (`study_metadata.yml`, `topic-index.yml`) at build time
- `react-bootstrap ^2.10.6` - Used in every page/component for layout and UI elements
- `@fortawesome/fontawesome-svg-core ^6.4.0` - Icon rendering engine
- `@fortawesome/free-brands-svg-icons 6.7.2` - Brand icons (Facebook, YouTube, GitHub, etc.) used on About page
- `@fortawesome/free-solid-svg-icons ^6.4.0` - Solid icons
- `@fortawesome/react-fontawesome ^0.2.0` - React bindings for FontAwesome
- `@popperjs/core ^2.11.8` - Tooltip/popover positioning (Bootstrap dependency)
## Configuration
- No `.env` files are committed (`.gitignore` excludes `.env*`)
- No environment variables are required at runtime -- the site is fully static
- Google Analytics ID (`G-49NRM2V6SJ`) and AdSense publisher ID (`ca-pub-5795179986208929`) are hardcoded in `components/scripts.jsx` and `components/ad.jsx`
- Google Custom Search Engine ID (`36dcdc8b2b66146f8`) is hardcoded in `components/layout.jsx`
- `next.config.js` - Single setting: `output: 'export'`
- `babel.config.js` - Presets for Next.js and current Node target
- `eslint.config.js` - Flat config with Next.js rules + Prettier integration
- `.prettierrc.js` - Formatting preferences
- `pnpm build` runs `node scripts/generate-sitemap.mjs && next build`
- Sitemap generation happens first (`scripts/generate-sitemap.mjs`), writing to `public/sitemap.xml`
- Then `next build` performs static export to `out/` directory
## NPM Scripts
## Platform Requirements
- Node.js >= 20 (CI uses 20; local uses 22)
- pnpm 9.x (enforced via `packageManager` field)
- Static file hosting only (no Node.js server required)
- Output directory: `out/`
- Site URL: `https://inspiredscripture.com`
- Hosting platform: Not explicitly configured (no Vercel/Netlify/AWS config files present)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Library modules: `camelCase.js` (e.g., `lib/studies.js`, `lib/topics.js`, `lib/utils.js`)
- Constants/data modules: `camelCase.js` (e.g., `lib/books.js`)
- React components: `camelCase.jsx` (e.g., `components/layout.jsx`, `components/meta.jsx`)
- Pages: `camelCase.jsx` for static pages (e.g., `pages/about.jsx`), `[slug].jsx` for dynamic routes
- Test files: `moduleName.spec.js` co-located with source (e.g., `lib/studies.spec.js`)
- Scripts: `kebab-case.mjs` for standalone Node scripts (e.g., `scripts/generate-sitemap.mjs`)
- YAML data: `snake_case.yml` or `kebab-case.yml` (e.g., `lib/study_metadata.yml`, `lib/topic-index.yml`)
- Use `camelCase` for all functions: `getStudyBySlug()`, `getAllStudies()`, `extractDescription()`
- Getter pattern: prefix with `get` for data retrieval functions (`getStudySlugs()`, `getStudyMetadata()`, `getTopicBySlug()`)
- Exported functions use named exports in `lib/`: `export function getAllStudies()`
- React components use default exports: `export default function Layout()`
- Helper/render functions inside components are plain functions or arrow functions: `const renderStudyVideo = () => ...`
- Use `camelCase` for all variables: `realSlug`, `fullPath`, `studiesByBook`
- Constants use `UPPER_SNAKE_CASE`: `ORDERED_BOOKS`, `MAX_DESCRIPTION_LENGTH`, `SITE_URL`
- Regex patterns assigned to `camelCase` variables: `const slugRegex = ...`
- No TypeScript types. The codebase is plain JavaScript (`.js` / `.jsx`). `@types/jest` is installed for IDE type hints in tests only.
## Code Style
- Prettier enforced via ESLint integration
- Config in `.prettierrc.js`:
- ESLint 9 with flat config in `eslint.config.js`
- Extends `eslint-config-next` and `eslint-config-prettier`
- `eslint-plugin-prettier` runs Prettier as an ESLint rule (`'prettier/prettier': 'error'`)
- `react/no-unescaped-entities` disabled (study content contains apostrophes and quotes)
- Run with: `pnpm lint`
## Import Organization
- None configured. All imports use relative paths (e.g., `../../lib/studies`, `../components/layout`).
- `lib/` and `pages/` use ES modules (`import`/`export`)
- Config files use CommonJS (`module.exports`): `next.config.js`, `babel.config.js`, `.prettierrc.js`, `eslint.config.js`
- Standalone scripts use ES modules with `.mjs` extension: `scripts/generate-sitemap.mjs`
## Error Handling
- Build-time errors throw with descriptive messages to fail the build deliberately:
- Client-side errors use try/catch with `console.log`:
- 404 handling in dynamic pages uses `useRouter` fallback check:
- Script/sitemap generation uses `.catch()` with `process.exit(1)`:
## Logging
- `console.debug()` for informational build-time messages: `console.debug('Ignoring ${x.slug} - no book value defined')`
- `console.warn()` for build-time data integrity warnings: `console.warn('Book ${book} is not recognized...')`
- `console.log()` for swallowed client-side errors (AdSense)
- `console.error()` for fatal script failures
- `console.log()` with emoji for build script success messages: `console.log('... Sitemap generated with...')`
## Comments
- Document intentional tech debt with `/** Intentional debt: ... */` explaining the reason and future fix path (see `components/layout.jsx` line 7)
- Use inline comments for non-obvious regex or parsing logic
- CSS comments explain workarounds for content-specific styling issues (see `styles.css` line 39)
- YAML data files have a header comment explaining their purpose (see `lib/study_metadata.yml` line 1)
- Not used. No JSDoc annotations anywhere in the codebase.
## Function Design
- Use default parameter values: `fields = []`, `ogType = 'website'`
- Destructure props in component signatures: `{ children, meta = { title, description } }`
- Study field-loading uses a `fields` array pattern to control which data gets loaded:
- Data functions return plain JS objects or arrays of objects
- Components return JSX
- Utility functions return primitives (strings, arrays)
## Module Design
- `lib/` modules use named exports for all public functions: `export function getAllStudies()`, `export function getStudyBySlug()`
- `lib/books.js` exports a single named constant: `export const ORDERED_BOOKS`
- Components use default exports: `export default function Layout()`
- Pages export the component as default, plus named exports for `getStaticProps` and `getStaticPaths`
- None. Each module is imported directly by path.
## Component Patterns
- Bootstrap utility classes for layout and spacing (`className="py-5"`, `className="d-flex flex-wrap"`)
- Inline `style={{}}` objects for one-off styling
- Global CSS in `styles.css` for site-wide overrides and study content styling
- No CSS modules, no styled-components, no Tailwind
- All data loading happens in `getStaticProps()` / `getStaticPaths()` at build time
- Props flow down: page -> Layout -> child components
- No client-side data fetching, no React context, no state management library
- `useRouter()` used only for fallback checks in dynamic pages
- `useEffect()` used only in `Ad` component for AdSense initialization
- Study content is raw HTML rendered via `dangerouslySetInnerHTML`:
## Data Conventions
- Format: `{book}-{chapter}` (e.g., `psalm-37`, `genesis-1a.1`, `1-samuel-15`)
- Derived from HTML filenames in `_studies/` by stripping `.html`
- Parsed by regex: `/(?<book>\d[\s-][a-zA-Z]+|[a-zA-Z]+)[\s-(chapter)]+(?<chapter>[\d]+)[\s-\.]?(?<suffix>.*)/i`
- `lib/study_metadata.yml`: keyed by slug, values are objects with `videoSrc` and `videoPublishedAt`
- `lib/topic-index.yml`: hierarchical structure of topic -> section -> study name/slug pairs
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- All pages are statically generated at build time via `getStaticProps`/`getStaticPaths`
- No server at runtime -- `next.config.js` sets `output: 'export'`, producing a flat `out/` directory
- Content is authored as HTML files (converted from Word docs via Pandoc), not Markdown or a CMS
- Data layer reads filesystem and YAML at build time; pages and components receive plain JS objects via props
- Deployed to Netlify as static files with no Node.js runtime
## Layers
- Purpose: Store raw study content and metadata
- Location: `_studies/*.html`, `lib/study_metadata.yml`, `lib/topic-index.yml`
- Contains: ~700 HTML study files (one per Bible chapter), YAML metadata mapping slugs to video URLs and publish dates, YAML topic index organizing studies into 15 theological topics
- Depends on: Nothing (manually authored/converted)
- Used by: Data-access layer (`lib/`)
- Purpose: Read, parse, and merge content from filesystem and YAML into plain JS objects
- Location: `lib/`
- Contains: Study loading (`lib/studies.js`), topic loading (`lib/topics.js`), canonical book list (`lib/books.js`), utility functions (`lib/utils.js`)
- Depends on: Content layer (`_studies/`, `lib/*.yml`), `fs` module, `yaml` package
- Used by: Pages (`pages/`)
- Purpose: Define routes, fetch data via `getStaticProps`/`getStaticPaths`, render page components
- Location: `pages/`
- Contains: Homepage (`pages/index.jsx`), study pages (`pages/bible-studies/[slug].jsx`), topic pages (`pages/topics/[slug].jsx`), about page (`pages/about.jsx`), app wrapper (`pages/_app.js`), document (`pages/_document.jsx`)
- Depends on: Data-access layer (`lib/`), component layer (`components/`)
- Used by: Next.js build pipeline
- Purpose: Shared presentational React components
- Location: `components/`
- Contains: Layout shell with navbar (`components/layout.jsx`), SEO meta tags (`components/meta.jsx`), analytics/ad scripts (`components/scripts.jsx`, `components/ad.jsx`), heading wrapper (`components/heading.jsx`)
- Depends on: `react-bootstrap`, `next/head`, `next/script`, `@fortawesome`
- Used by: Page layer
- Purpose: Pre-build generators
- Location: `scripts/`
- Contains: Sitemap generator (`scripts/generate-sitemap.mjs`)
- Depends on: Content layer (reads `_studies/` and `lib/topic-index.yml` directly)
- Used by: Build pipeline (`pnpm build` runs sitemap generation before `next build`)
## Data Flow
- No client-side state management library
- All data is passed as props at build time via `getStaticProps`
- No API routes or client-side data fetching
- Navigation uses standard `<a>` tags and Next.js `<Link>` components
## Key Abstractions
- Purpose: Represents a single Bible study (one chapter/passage)
- Examples: `lib/studies.js` (`getStudyBySlug`, `getAllStudies`)
- Pattern: Plain JS object with fields: `slug`, `title`, `content`, `description`, `book`, `chapter`, `suffix`, `chapterLabel`, `videoSrc`, `videoPublishedAt`
- Slug format: `{book}-{chapter}` or `{book}-{chapter}.{suffix}` (e.g., `psalm-37`, `genesis-1a.1`)
- Purpose: Represents a theological topic grouping studies into sections
- Examples: `lib/topics.js` (`getAllTopics`, `getTopicBySlug`)
- Pattern: Plain JS object with fields: `name`, `slug`, `sections[]` where each section has `name` and `studies[]`
- Slug derived from topic name: lowercased, spaces replaced with hyphens
- Purpose: Page shell wrapping all pages with navbar and meta tags
- Examples: `components/layout.jsx`
- Pattern: Accepts `children` and `meta` props; renders `<Meta>`, `<Scripts>`, `<Navbar>`, then children
- Note: Navbar topic/book lists are hardcoded (intentional debt documented in source)
## Entry Points
- Location: `pages/index.jsx`
- URL: `/`
- Triggers: `getStaticProps` calls `getAllTopics()` and `getAllStudies()`
- Responsibilities: Renders topic cards grid, book-by-book study listing with sidebar, hero section, WebSite structured data
- Location: `pages/bible-studies/[slug].jsx`
- URL: `/bible-studies/{slug}`
- Triggers: `getStaticPaths` enumerates all study slugs; `getStaticProps` calls `getStudyBySlug()` and filters studies for same book
- Responsibilities: Renders YouTube video embed (if videoSrc exists), study HTML content with injected ad, chapter navigation dropdown, print button, Article/VideoObject/BreadcrumbList structured data
- Location: `pages/topics/[slug].jsx`
- URL: `/topics/{slug}`
- Triggers: `getStaticPaths` enumerates all topic slugs; `getStaticProps` calls `getTopicBySlug()`
- Responsibilities: Renders topic sections with ordered lists of study links, CollectionPage/BreadcrumbList structured data
- Location: `pages/about.jsx`
- URL: `/about`
- Triggers: Static page, no dynamic data
- Responsibilities: Mission statement, social media links, GitHub link
- Location: `middleware.js`
- Triggers: Every incoming request
- Responsibilities: Redirects uppercase URLs to lowercase equivalents
## Error Handling
- `extractDescription()` in `lib/studies.js` throws a build error if no suitable description can be extracted from a study, forcing the author to fix the content
- Study pages render `<ErrorPage statusCode={404} />` if `router.isFallback` is false and no study slug is found (though with `fallback: false` this path is unlikely to be reached at runtime)
- `getStudyBySlug()` silently returns a study without book/chapter fields if the slug regex fails to match, rather than throwing
- AdSense initialization errors are caught and logged to console in `components/ad.jsx`
- No global error boundary; unhandled errors surface as Next.js default error pages
## Cross-Cutting Concerns
- `components/meta.jsx` generates `<title>`, `<meta description>`, canonical URL, Open Graph tags, Twitter Cards, and JSON-LD structured data for every page
- Each page type provides its own structured data schema: WebSite (homepage), Article + VideoObject (study pages), CollectionPage (topic pages)
- `scripts/generate-sitemap.mjs` produces `public/sitemap.xml` pre-build
- `public/robots.txt` allows all crawlers and references the sitemap
- `console.debug` for non-critical warnings (e.g., study slug without book value)
- `console.warn` for unrecognized book names during build
- `console.log` for ad initialization errors
- No structured logging framework
- Description extraction validates that every study has a meaningful meta description at build time
- No schema validation on YAML files
- No runtime validation (static site)
- Google AdSense integrated via `components/ad.jsx` and `components/scripts.jsx`
- Ads injected into study content before the first `<h2>` tag via string replacement in `pages/bible-studies/[slug].jsx`
- Ads hidden during print via CSS `@media print`
- Google Analytics 4 (GA4) with measurement ID `G-49NRM2V6SJ` loaded via `components/scripts.jsx`
- Google Custom Search Engine embedded in navbar via `components/layout.jsx`
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
