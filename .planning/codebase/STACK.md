# Technology Stack

**Analysis Date:** 2026-05-09

## Languages

**Primary:**
- JavaScript (ES Modules + CommonJS) - All application code (`.js`, `.jsx`, `.mjs`)

**Secondary:**
- YAML - Content metadata (`lib/study_metadata.yml`, `lib/topic-index.yml`)
- HTML - Study content files (`_studies/*.html`)
- CSS - Styling (`styles.css`, Bootstrap CSS)

**Note:** TypeScript is listed as a devDependency (`^5.8.3`) but no `.ts`/`.tsx` files exist. No `tsconfig.json` is present. TypeScript is not actively used.

## Runtime

**Environment:**
- Node.js v22.18.0 (local development)
- Node.js v20 (CI via `.github/workflows/gated.yml`)
- `.tool-versions` specifies `python 3.11.9` (likely for unrelated tooling; not used by the app)

**Package Manager:**
- pnpm 9.15.9 (declared in `package.json` `packageManager` field)
- Lockfile: `pnpm-lock.yaml` present

## Frameworks

**Core:**
- Next.js `^16.1.5` - Static site generator with Pages Router
  - Config: `next.config.js` (`output: 'export'` -- fully static export, no SSR/ISR)
- React `19.1.0` - UI rendering
- React DOM `19.1.0` - DOM rendering

**UI Component Library:**
- React Bootstrap `^2.10.6` - Pre-built Bootstrap components (Navbar, Card, Row, Col, Dropdown, etc.)
- Bootstrap `^5.3.3` - CSS framework, imported globally in `pages/_app.js`
- Bootstrap Icons `^1.0.0` - Icon set (imported as CSS)

**Testing:**
- Jest `^29.7.0` - Test runner (no separate config file; config via `package.json` scripts)
- Babel Jest `^29.7.0` - Jest transformer for JSX/ES modules

**Build/Dev:**
- Babel `@babel/core ^7.12.9` + `@babel/preset-env ^7.12.7` - Transpilation
  - Config: `babel.config.js` (presets: `next/babel`, `@babel/preset-env` targeting current Node)
- ESLint `^9.26.0` - Linting (flat config in `eslint.config.js`)
  - `eslint-config-next ^16.0.7` - Next.js-specific rules
  - `eslint-config-prettier ^10.1.5` - Disables formatting rules that conflict with Prettier
  - `eslint-plugin-prettier ^5.0.0` - Runs Prettier as an ESLint rule
- Prettier `^3.0.3` - Code formatting
  - Config: `.prettierrc.js` (no semicolons, single quotes, trailing commas, 80 char width, 2-space tabs)

## Key Dependencies

**Critical:**
- `next ^16.1.5` - Core framework; static export produces the entire site
- `react 19.1.0` / `react-dom 19.1.0` - UI rendering (pinned exact versions)
- `yaml ^2.7.1` - Parses YAML metadata files (`study_metadata.yml`, `topic-index.yml`) at build time
- `react-bootstrap ^2.10.6` - Used in every page/component for layout and UI elements

**Infrastructure:**
- `@fortawesome/fontawesome-svg-core ^6.4.0` - Icon rendering engine
- `@fortawesome/free-brands-svg-icons 6.7.2` - Brand icons (Facebook, YouTube, GitHub, etc.) used on About page
- `@fortawesome/free-solid-svg-icons ^6.4.0` - Solid icons
- `@fortawesome/react-fontawesome ^0.2.0` - React bindings for FontAwesome
- `@popperjs/core ^2.11.8` - Tooltip/popover positioning (Bootstrap dependency)

## Configuration

**Environment:**
- No `.env` files are committed (`.gitignore` excludes `.env*`)
- No environment variables are required at runtime -- the site is fully static
- Google Analytics ID (`G-49NRM2V6SJ`) and AdSense publisher ID (`ca-pub-5795179986208929`) are hardcoded in `components/scripts.jsx` and `components/ad.jsx`
- Google Custom Search Engine ID (`36dcdc8b2b66146f8`) is hardcoded in `components/layout.jsx`

**Build:**
- `next.config.js` - Single setting: `output: 'export'`
- `babel.config.js` - Presets for Next.js and current Node target
- `eslint.config.js` - Flat config with Next.js rules + Prettier integration
- `.prettierrc.js` - Formatting preferences

**Build Pipeline:**
- `pnpm build` runs `node scripts/generate-sitemap.mjs && next build`
- Sitemap generation happens first (`scripts/generate-sitemap.mjs`), writing to `public/sitemap.xml`
- Then `next build` performs static export to `out/` directory

## NPM Scripts

```bash
pnpm dev          # Dev server with Node inspector on port 4000
pnpm start        # Dev server on port 4000 (alias, no inspector)
pnpm build        # Generate sitemap + static export
pnpm test         # Run Jest tests
pnpm lint         # Run ESLint
```

## Platform Requirements

**Development:**
- Node.js >= 20 (CI uses 20; local uses 22)
- pnpm 9.x (enforced via `packageManager` field)

**Production:**
- Static file hosting only (no Node.js server required)
- Output directory: `out/`
- Site URL: `https://inspiredscripture.com`
- Hosting platform: Not explicitly configured (no Vercel/Netlify/AWS config files present)

---

*Stack analysis: 2026-05-09*
