# Coding Conventions

**Analysis Date:** 2026-05-09

## Naming Patterns

**Files:**
- Library modules: `camelCase.js` (e.g., `lib/studies.js`, `lib/topics.js`, `lib/utils.js`)
- Constants/data modules: `camelCase.js` (e.g., `lib/books.js`)
- React components: `camelCase.jsx` (e.g., `components/layout.jsx`, `components/meta.jsx`)
- Pages: `camelCase.jsx` for static pages (e.g., `pages/about.jsx`), `[slug].jsx` for dynamic routes
- Test files: `moduleName.spec.js` co-located with source (e.g., `lib/studies.spec.js`)
- Scripts: `kebab-case.mjs` for standalone Node scripts (e.g., `scripts/generate-sitemap.mjs`)
- YAML data: `snake_case.yml` or `kebab-case.yml` (e.g., `lib/study_metadata.yml`, `lib/topic-index.yml`)

**Functions:**
- Use `camelCase` for all functions: `getStudyBySlug()`, `getAllStudies()`, `extractDescription()`
- Getter pattern: prefix with `get` for data retrieval functions (`getStudySlugs()`, `getStudyMetadata()`, `getTopicBySlug()`)
- Exported functions use named exports in `lib/`: `export function getAllStudies()`
- React components use default exports: `export default function Layout()`
- Helper/render functions inside components are plain functions or arrow functions: `const renderStudyVideo = () => ...`

**Variables:**
- Use `camelCase` for all variables: `realSlug`, `fullPath`, `studiesByBook`
- Constants use `UPPER_SNAKE_CASE`: `ORDERED_BOOKS`, `MAX_DESCRIPTION_LENGTH`, `SITE_URL`
- Regex patterns assigned to `camelCase` variables: `const slugRegex = ...`

**Types:**
- No TypeScript types. The codebase is plain JavaScript (`.js` / `.jsx`). `@types/jest` is installed for IDE type hints in tests only.

## Code Style

**Formatting:**
- Prettier enforced via ESLint integration
- Config in `.prettierrc.js`:
  - No semicolons (`semi: false`)
  - Single quotes (`singleQuote: true`)
  - Trailing commas everywhere (`trailingComma: 'all'`)
  - 80 character print width (`printWidth: 80`)
  - 2-space indentation (`tabWidth: 2`)

**Linting:**
- ESLint 9 with flat config in `eslint.config.js`
- Extends `eslint-config-next` and `eslint-config-prettier`
- `eslint-plugin-prettier` runs Prettier as an ESLint rule (`'prettier/prettier': 'error'`)
- `react/no-unescaped-entities` disabled (study content contains apostrophes and quotes)
- Run with: `pnpm lint`

## Import Organization

**Order:**
1. Node built-ins: `import fs from 'fs'`, `import { join } from 'path'`
2. External packages: `import YAML from 'yaml'`, `import { Container } from 'react-bootstrap'`
3. Next.js modules: `import Script from 'next/script'`, `import Head from 'next/head'`
4. Local modules: `import { getAllStudies } from '../../lib/studies'`
5. Local components: `import Layout from '../../components/layout'`

**Path Aliases:**
- None configured. All imports use relative paths (e.g., `../../lib/studies`, `../components/layout`).

**Module System:**
- `lib/` and `pages/` use ES modules (`import`/`export`)
- Config files use CommonJS (`module.exports`): `next.config.js`, `babel.config.js`, `.prettierrc.js`, `eslint.config.js`
- Standalone scripts use ES modules with `.mjs` extension: `scripts/generate-sitemap.mjs`

## Error Handling

**Patterns:**
- Build-time errors throw with descriptive messages to fail the build deliberately:
  ```javascript
  throw new Error(
    `Could not extract description for study "${title?.trim()}". Add an Introduction/Background/Overview section or a <p> with 50+ characters.`
  )
  ```
- Client-side errors use try/catch with `console.log`:
  ```javascript
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (err) {
    console.log(err)
  }
  ```
- 404 handling in dynamic pages uses `useRouter` fallback check:
  ```javascript
  if (!router.isFallback && !study?.slug) {
    return <ErrorPage statusCode={404} />
  }
  ```
- Script/sitemap generation uses `.catch()` with `process.exit(1)`:
  ```javascript
  generateSitemap().catch((error) => {
    console.error('Error generating sitemap:', error)
    process.exit(1)
  })
  ```

## Logging

**Framework:** `console` (no logging library)

**Patterns:**
- `console.debug()` for informational build-time messages: `console.debug('Ignoring ${x.slug} - no book value defined')`
- `console.warn()` for build-time data integrity warnings: `console.warn('Book ${book} is not recognized...')`
- `console.log()` for swallowed client-side errors (AdSense)
- `console.error()` for fatal script failures
- `console.log()` with emoji for build script success messages: `console.log('... Sitemap generated with...')`

## Comments

**When to Comment:**
- Document intentional tech debt with `/** Intentional debt: ... */` explaining the reason and future fix path (see `components/layout.jsx` line 7)
- Use inline comments for non-obvious regex or parsing logic
- CSS comments explain workarounds for content-specific styling issues (see `styles.css` line 39)
- YAML data files have a header comment explaining their purpose (see `lib/study_metadata.yml` line 1)

**JSDoc/TSDoc:**
- Not used. No JSDoc annotations anywhere in the codebase.

## Function Design

**Size:** Functions are small, typically under 30 lines. The largest function bodies are in `getStudyBySlug()` (~30 lines) and `getStaticProps()` in page files.

**Parameters:**
- Use default parameter values: `fields = []`, `ogType = 'website'`
- Destructure props in component signatures: `{ children, meta = { title, description } }`
- Study field-loading uses a `fields` array pattern to control which data gets loaded:
  ```javascript
  export function getStudyBySlug(slug, fields = []) {
    // ...
    fields.forEach((f) => {
      if (f === 'content') { /* load content */ }
    })
  }
  ```

**Return Values:**
- Data functions return plain JS objects or arrays of objects
- Components return JSX
- Utility functions return primitives (strings, arrays)

## Module Design

**Exports:**
- `lib/` modules use named exports for all public functions: `export function getAllStudies()`, `export function getStudyBySlug()`
- `lib/books.js` exports a single named constant: `export const ORDERED_BOOKS`
- Components use default exports: `export default function Layout()`
- Pages export the component as default, plus named exports for `getStaticProps` and `getStaticPaths`

**Barrel Files:**
- None. Each module is imported directly by path.

## Component Patterns

**UI Framework:** React-Bootstrap for all layout and UI components. Use named imports:
```javascript
import { Container, Row, Col, Card, Nav, Navbar, NavDropdown } from 'react-bootstrap'
```

**Styling:**
- Bootstrap utility classes for layout and spacing (`className="py-5"`, `className="d-flex flex-wrap"`)
- Inline `style={{}}` objects for one-off styling
- Global CSS in `styles.css` for site-wide overrides and study content styling
- No CSS modules, no styled-components, no Tailwind

**Data Flow:**
- All data loading happens in `getStaticProps()` / `getStaticPaths()` at build time
- Props flow down: page -> Layout -> child components
- No client-side data fetching, no React context, no state management library
- `useRouter()` used only for fallback checks in dynamic pages
- `useEffect()` used only in `Ad` component for AdSense initialization

**HTML Content Rendering:**
- Study content is raw HTML rendered via `dangerouslySetInnerHTML`:
  ```javascript
  <div dangerouslySetInnerHTML={{ __html: studyContentWithAd }}></div>
  ```

## Data Conventions

**Study Slugs:**
- Format: `{book}-{chapter}` (e.g., `psalm-37`, `genesis-1a.1`, `1-samuel-15`)
- Derived from HTML filenames in `_studies/` by stripping `.html`
- Parsed by regex: `/(?<book>\d[\s-][a-zA-Z]+|[a-zA-Z]+)[\s-(chapter)]+(?<chapter>[\d]+)[\s-\.]?(?<suffix>.*)/i`

**YAML Data Files:**
- `lib/study_metadata.yml`: keyed by slug, values are objects with `videoSrc` and `videoPublishedAt`
- `lib/topic-index.yml`: hierarchical structure of topic -> section -> study name/slug pairs

---

*Convention analysis: 2026-05-09*
