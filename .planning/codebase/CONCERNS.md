# Codebase Concerns

**Analysis Date:** 2026-05-09

## Tech Debt

**Hardcoded Navigation Data in Layout:**
- Issue: `components/layout.jsx` lines 13-51 duplicate topic names and book-slug mappings that are already defined in `lib/topic-index.yml` and `lib/books.js`. The file contains an explicit comment acknowledging this debt: "This is duplicated from getAllTopics(); it would be nice to source this information from a single location."
- Files: `components/layout.jsx`
- Impact: When topics or books are added/removed, the layout nav must be manually updated separately. Ecclesiastes is in `lib/books.js` ORDERED_BOOKS but missing from the `navBooks` object in `components/layout.jsx`, meaning it has no nav entry despite having studies.
- Fix approach: Migrate to Next.js App Router (which supports layouts with data fetching), or pass nav data via `_app.js` context/props.

**Study Title Newline Bug:**
- Issue: `lib/studies.js:48` extracts the title line including the trailing `\n` character. `stripHtml()` removes HTML tags but does not trim whitespace. The title `"Genesis 1: The Age / Day Debate...\n"` propagates to `og:title`, `twitter:title`, Article structured data `headline`, and page `<title>`.
- Files: `lib/studies.js` (line 49), `lib/utils.js` (stripHtml function)
- Impact: Corrupted metadata across all 694 study pages. Google may interpret the newline as malformed structured data. Directly relevant to the SEO recovery effort.
- Fix approach: Add `.trim()` to `lib/studies.js:49`: `study.title = stripHtml(fLine).trim()`

**False SearchAction Structured Data:**
- Issue: The homepage structured data in `pages/index.jsx:27-35` declares a `SearchAction` pointing to `https://inspiredscripture.com/search?q={search_term_string}`, but no `/search` route exists. The site uses Google Custom Search Engine (embedded widget), not a dedicated search page.
- Files: `pages/index.jsx` (lines 27-35)
- Impact: Google Rich Results validation fails for this structured data. Signals untrustworthiness to search crawlers.
- Fix approach: Remove the `potentialAction` block from homepage structured data entirely.

**Multiple H1 Tags:**
- Issue: The homepage (`pages/index.jsx`) renders two `<h1>` elements: one in the hero section (line 58) and one via the `<Heading>` component (line 72, which renders `<h1>`). Additionally, 14 study files contain `<h1>` tags in their body content (after title extraction), creating duplicate H1s alongside the `<Heading>` component on those study pages.
- Files: `pages/index.jsx`, `components/heading.jsx`, `_studies/1-chronicles-1.html`, `_studies/genesis-7.html`, `_studies/exodus-20.html`, and 11 others
- Impact: Multiple H1 tags per page is an SEO anti-pattern. Google may struggle to identify the primary heading.
- Fix approach: Change the hero section to `<div>` or `<span>` on homepage. Change embedded H1s in study files to `<h2>`.

**Inconsistent Study Title Markup:**
- Issue: 676 of 694 study files use `<h1>` as their first line (title). 12 studies use `<p><strong>` instead (e.g., `_studies/psalm-88.html`, `_studies/psalm-51.html`). The title extraction in `lib/studies.js:48-49` assumes the first line is the title regardless of its HTML tag, and `stripHtml()` handles both, but the content after extraction differs: `<p><strong>` studies lose their title from the content body entirely (the `<p>` wrapping is consumed), while `<h1>` studies have their title popped cleanly.
- Files: `lib/studies.js` (lines 46-53), 12 study files in `_studies/`
- Impact: Inconsistent behavior. Some studies may have empty or malformed first content sections.
- Fix approach: Normalize all study files to use `<h1>` as the first line, or make the title extraction more robust.

**ReactDOMServer Used Client-Side for Ad Injection:**
- Issue: `pages/bible-studies/[slug].jsx:14` imports `ReactDOMServer` and calls `renderToString()` on the client to convert an `<Ad>` component to HTML, then injects it into study content via string replacement (`study.content.replace('<h2', ...)` on line 44). This bundles `react-dom/server` into the client JavaScript bundle and renders the Ad component outside React's component tree, so the `useEffect` hook in `components/ad.jsx` never fires for this injected ad.
- Files: `pages/bible-studies/[slug].jsx` (lines 14, 34-44), `components/ad.jsx`
- Impact: Increased client bundle size. The injected ad's `useEffect` (which pushes to `adsbygoogle`) never executes, so the injected ad unit may not initialize. Additionally, 8 studies without `<h2>` tags get no injected ad at all (e.g., `_studies/psalm-51.html`, `_studies/exodus-21.html`).
- Fix approach: Split study content at the first `<h2>` during `getStaticProps` and render the Ad component between the two React-managed content sections using `dangerouslySetInnerHTML` for each half.

**Uncached YAML Metadata Parsing:**
- Issue: `lib/studies.js:83-86` (`getStudyMetadata()`) reads and parses `lib/study_metadata.yml` from disk on every call. `getStudyBySlug()` calls it once per study. `getAllStudies()` calls `getStudyBySlug()` for all 694 studies. Each study page's `getStaticProps` calls both `getStudyBySlug` and `getAllStudies`, resulting in ~695 YAML parses per page. Across 694 study pages during build: ~482,000 redundant file reads and YAML parses.
- Files: `lib/studies.js` (lines 69, 83-86)
- Impact: Slow build times. The YAML file is 342 lines and is identical across all calls.
- Fix approach: Cache the parsed metadata in a module-level variable: `let _metadata; export function getStudyMetadata() { if (!_metadata) { ... } return _metadata; }`

**Dead Fallback Code:**
- Issue: Both `pages/bible-studies/[slug].jsx:19` and `pages/topics/[slug].jsx:10` check `router.isFallback`, but `getStaticPaths` in both files returns `{ fallback: false }`. With `fallback: false`, Next.js returns 404 at the framework level for unknown paths; the `isFallback` check is dead code.
- Files: `pages/bible-studies/[slug].jsx` (lines 1, 18-21), `pages/topics/[slug].jsx` (lines 1, 9-12)
- Impact: Minor. Adds unnecessary `useRouter` import and runtime check. Confusing for maintainers.
- Fix approach: Remove the `useRouter` import, `isFallback` check, and `ErrorPage` import from both files.

**`var` Usage:**
- Issue: `pages/index.jsx:225` uses `var studiesByBook` instead of `const` or `let`.
- Files: `pages/index.jsx` (line 225)
- Impact: Minor. `var` has function scope rather than block scope, inconsistent with the rest of the codebase which uses `const`/`let`.
- Fix approach: Change `var` to `const`.

## Known Bugs

**Broken Image Paths in psalm-53:**
- Symptoms: Images fail to load on the psalm-53 study page. The browser requests `../public/psalm-53/media/image1.jpg` which resolves to an invalid path in production.
- Files: `_studies/psalm-53.html` (lines 8, 18)
- Trigger: Visit `/bible-studies/psalm-53`
- Workaround: None. Images are broken.
- Fix: Run the `touchup_html` converter function on this file, or manually change `src="../public/psalm-53/media/..."` to `src="/psalm-53/media/..."`.

**Sort Comparator Bug in getAllStudies:**
- Symptoms: Studies returned by `getAllStudies()` are sorted by chapter number only, not by book. Genesis 1, Exodus 1, Leviticus 1, etc., interleave unpredictably. The comparator also never returns 0 for equal values (returns 1 for `>=`), producing an unstable sort.
- Files: `lib/studies.js` (lines 76-79)
- Trigger: Call `getAllStudies()`. The homepage works around this by grouping by book after sorting.
- Workaround: `pages/index.jsx` groups studies by book, masking the sort issue.
- Fix: Change comparator to `(a, b) => a.chapter - b.chapter` and/or sort by book first.

## Security Considerations

**dangerouslySetInnerHTML with Study Content:**
- Risk: Study HTML files from `_studies/` are rendered directly via `dangerouslySetInnerHTML` on `pages/bible-studies/[slug].jsx:185`. If a study file contained malicious `<script>` tags, they would execute in the browser.
- Files: `pages/bible-studies/[slug].jsx` (line 185), all files in `_studies/`
- Current mitigation: Study files are authored by a single trusted contributor (John Edson) and committed via git. No user-generated content. No `<script>` tags found in any current study file. Content is statically generated at build time, not at runtime.
- Recommendations: Content is trusted and static, so the risk is low. If contributors expand, add an HTML sanitization step during the docx-to-html conversion pipeline or at build time.

**Hardcoded AdSense Publisher ID:**
- Risk: The AdSense publisher ID `ca-pub-5795179986208929` is hardcoded in `components/ad.jsx:19` and `components/scripts.jsx:23`. This is intentional and expected for AdSense, but worth noting.
- Files: `components/ad.jsx` (line 19), `components/scripts.jsx` (line 23)
- Current mitigation: AdSense publisher IDs are public by design (they appear in page source). No action needed.
- Recommendations: None required.

**Google Analytics ID Hardcoded:**
- Risk: GA4 measurement ID `G-49NRM2V6SJ` is hardcoded in `components/scripts.jsx:4-7`. This is public data but coupling config to source code makes environment-specific configuration impossible.
- Files: `components/scripts.jsx` (lines 4-7)
- Current mitigation: Single-environment deployment (Netlify production only). No staging environment.
- Recommendations: Consider extracting to an environment variable if a staging environment is introduced.

## Performance Bottlenecks

**Build-Time YAML Parsing (482K redundant reads):**
- Problem: Every study page generation triggers ~695 reads and parses of `lib/study_metadata.yml`. Total across full build: ~482,000 redundant YAML parses.
- Files: `lib/studies.js` (lines 69, 83-86)
- Cause: `getStudyMetadata()` has no caching. `getStudyBySlug()` calls it per study. `getAllStudies()` calls `getStudyBySlug()` 694 times. Each page's `getStaticProps` calls both.
- Improvement path: Add module-level memoization to `getStudyMetadata()`. Expected to reduce build time significantly.

**Large Study Files with Inline Styles:**
- Problem: Study HTML files contain extensive inline `style` attributes from docx-to-HTML conversion (e.g., `_studies/genesis-1d.20-31.html` has 36 `style=` occurrences across 1,305 lines). These increase HTML payload size.
- Files: `_studies/genesis-1d.20-31.html` (1,305 lines), `_studies/1-chronicles-1.html` (841 lines), `_studies/genesis-10.html` (786 lines)
- Cause: Pandoc's docx-to-HTML conversion preserves Word formatting as inline styles.
- Improvement path: Strip or normalize inline styles during the conversion pipeline in `_studies/converter_fns.sh`. The CSS in `styles.css` already overrides `strong` tag formatting for this reason.

**No Image Optimization Pipeline:**
- Problem: Study images in `public/*/media/` are served as-is. No Next.js `<Image>` component is used (incompatible with static export). The converter script compresses to 100KB but does not generate responsive sizes or use modern formats (WebP/AVIF).
- Files: `_studies/converter_fns.sh` (lines 54-81), all `public/*/media/*.jpg` files
- Cause: Static export cannot use Next.js `next/image` optimization. No alternative image optimization is configured.
- Improvement path: Add WebP conversion to the converter script. Consider a build-time image optimization step.

**2,375 Images Missing Alt Text:**
- Problem: Of ~3,132 total `<img>` tags across study files, 2,375 (76%) lack an `alt` attribute entirely. 2 images have blank alt text (`alt=" "`). This affects both accessibility and SEO (Google uses alt text for image understanding).
- Files: Distributed across study files in `_studies/`, concentrated in `numbers-1.5-16.html` (13 images, no alt), `2-samuel-9.html` (4 images, no alt), `leviticus-24.html` (multiple, no alt)
- Cause: Pandoc's docx-to-HTML conversion does not always preserve or generate alt text.
- Improvement path: Add a build-time check or linting step for missing alt attributes. Bulk-add descriptive alt text to images.

## Fragile Areas

**Study Content Parsing (Title/Content Split):**
- Files: `lib/studies.js` (lines 46-53)
- Why fragile: Title extraction assumes the first line of every `.html` file is the title. It uses `fullContent.indexOf('\n')` to find the split point. If a file has no newline, the entire content becomes the title and content is empty. If the first line is empty, the title is empty. 12 studies use `<p><strong>` instead of `<h1>` for their title, producing subtly different behavior.
- Safe modification: Always test with representative studies from both title formats (`<h1>` and `<p><strong>`). Run `pnpm test` to verify extraction.
- Test coverage: `lib/studies.spec.js` covers `<h1>` format and Introduction/Background description extraction. Does not test `<p><strong>` title format or edge cases (no newline, empty first line).

**Slug Regex:**
- Files: `lib/studies.js` (lines 30-31)
- Why fragile: The regex `/(?<book>\d[\s-][a-zA-Z]+|[a-zA-Z]+)[\s-(chapter)]+(?<chapter>[\d]+)[\s-\.]?(?<suffix>.*)/i` must handle all study filename variations. Non-matching slugs (e.g., `trinity`, `response-to-paramahansa-yogananda`) silently return a study object without `book`, `chapter`, or `suffix` fields. The regex is not unit-tested directly.
- Safe modification: Add test cases for edge-case slugs before modifying. The regex has a subtle issue: `(chapter)` in the character class `[\s-(chapter)]` is not a group match but individual characters `c`, `h`, `a`, `p`, `t`, `e`, `r`, `(`, `)`.
- Test coverage: Indirectly tested via `getStudyBySlug` tests for `genesis-1a.1` and `1-kings-8`. No tests for non-matching slugs or the `numbers-chapter-13` edge case.

**Ad Injection via String Replacement:**
- Files: `pages/bible-studies/[slug].jsx` (line 44)
- Why fragile: `study.content.replace('<h2', ...)` is a string-level manipulation of HTML. It replaces the first occurrence of `<h2` with ad HTML + `<h2`. If study content has no `<h2>` tag (8 studies), no ad is injected. If the HTML has `<h2` inside an attribute value or comment, the replacement would break markup.
- Safe modification: Test with studies that have zero, one, and many `<h2>` tags.
- Test coverage: No test coverage for ad injection.

**Converter Shell Script:**
- Files: `_studies/converter_fns.sh`
- Why fragile: Uses `eval` to execute dynamically constructed commands (line 29, 43). Depends on external tools (`pandoc`, `magick`) being installed. The `touchup_html` function uses macOS-specific `sed -i ''` syntax that fails on Linux. The `get_filesize_bytes` function uses macOS-specific `stat -f%z` syntax.
- Safe modification: Test on macOS only. Ensure pandoc and ImageMagick are installed.
- Test coverage: No automated tests. Manual process.

## Scaling Limits

**Study File Count (694 and growing):**
- Current capacity: 694 HTML files in `_studies/`, each read individually during build.
- Limit: Build time scales linearly with study count. With the uncached YAML parsing bug, it scales quadratically (N studies * N+1 YAML reads per page).
- Scaling path: Cache metadata. Consider incremental static regeneration if migrating off static export.

**Single CSS File:**
- Current capacity: All styles in a single `styles.css` (101 lines) plus Bootstrap.
- Limit: As custom styles grow, this becomes unwieldy. No CSS modules, no scoping.
- Scaling path: Adopt CSS modules or a utility framework.

## Dependencies at Risk

**TypeScript Installed but Unused:**
- Risk: `typescript@^5.8.3` is in `devDependencies` but no `.ts` or `.tsx` files exist in the project. No `tsconfig.json` found. Dead dependency adding install overhead.
- Impact: Increases `node_modules` size and install time.
- Migration plan: Remove from `devDependencies` unless a TypeScript migration is planned.

**Outdated CI Action Versions:**
- Risk: `.github/workflows/gated.yml` uses `actions/checkout@v2` (current: v4). v2 is deprecated and may stop working.
- Impact: CI pipeline may break without notice.
- Migration plan: Update to `actions/checkout@v4`.

**CI Does Not Run Build:**
- Risk: The CI pipeline (`.github/workflows/gated.yml`) runs `pnpm test` and `pnpm lint` but does not run `pnpm build`. Build failures (missing study descriptions, broken HTML) are not caught before merge.
- Impact: Broken builds can reach production.
- Migration plan: Add `pnpm build` step to the CI workflow.

**Boilerplate Package Name:**
- Risk: `package.json` name is `next-starter-jamstack`, a boilerplate artifact. Not a bug, but signals incomplete project setup.
- Impact: None functional. Confusing in logs and tooling.
- Migration plan: Rename to `inspired-scripture`.

## Missing Critical Features

**No Error Monitoring:**
- Problem: No error tracking service (Sentry, etc.) is configured. Client-side errors are invisible unless a user reports them.
- Blocks: Cannot detect broken pages, failed ad loads, or JavaScript errors in production.

**No Staging Environment:**
- Problem: No staging or preview deployment environment. Changes go directly from local development to production via Netlify.
- Blocks: Cannot test SEO changes or content updates before they affect live traffic.

**Middleware Incompatible with Static Export:**
- Problem: `middleware.js` implements case-insensitive URL redirects, but Next.js middleware does not execute in static export mode (`output: 'export'`). The middleware file is dead code.
- Files: `middleware.js`
- Blocks: Case-sensitive URLs (e.g., `/Bible-Studies/Psalm-23`) return 404 instead of redirecting. Users arriving via incorrectly-cased URLs see errors.

## Test Coverage Gaps

**No Tests for Page Components:**
- What's not tested: All 5 page files (`pages/index.jsx`, `pages/about.jsx`, `pages/bible-studies/[slug].jsx`, `pages/topics/[slug].jsx`, `pages/_document.jsx`) and all 5 components (`components/layout.jsx`, `components/meta.jsx`, `components/ad.jsx`, `components/scripts.jsx`, `components/heading.jsx`) have zero test coverage.
- Files: All files in `pages/` and `components/`
- Risk: Structural changes to pages (e.g., SEO fixes, heading changes, ad modifications) cannot be verified without manual testing.
- Priority: Medium -- the static site has limited runtime behavior, but structured data and metadata correctness are critical for the SEO recovery project.

**No Tests for Description Extraction Edge Cases:**
- What's not tested: The `extractDescription()` function in `lib/studies.js` is tested for Introduction/Background matches and the "no description" error case, but not for: studies starting with `<p><strong>` (12 studies), descriptions starting with punctuation (known issue per SEO recovery doc), or content with only short paragraphs.
- Files: `lib/studies.spec.js`, `lib/studies.js` (lines 9-29)
- Risk: Description extraction changes for SEO fix could silently break edge cases.
- Priority: High -- directly blocks the SEO recovery effort (Phase 1b).

**No Tests for Slug Regex:**
- What's not tested: The `slugRegex` in `lib/studies.js:30-31` is only indirectly tested via `getStudyBySlug`. No tests for non-matching slugs (`trinity`, `response-to-paramahansa-yogananda`), the `numbers-chapter-13` edge case, or suffixes with dots.
- Files: `lib/studies.spec.js`, `lib/studies.js` (lines 30-31)
- Risk: Regex changes could break book/chapter extraction for edge-case filenames.
- Priority: Medium

**No Integration/E2E Tests:**
- What's not tested: No Playwright, Cypress, or other E2E test framework is configured. Visual rendering, navigation, video embeds, ad loading, and structured data output are never tested automatically.
- Files: No test files exist outside `lib/`
- Risk: SEO-critical changes (structured data, meta tags) can only be verified via manual Playwright MCP inspection.
- Priority: Medium -- the CLAUDE.md recommends Playwright MCP for verification, but this is manual and ad-hoc.

**Topics Test Reads Real Files:**
- What's not tested: `lib/topics.spec.js` reads the actual `_studies/` directory and `topic-index.yml` file (no mocks). This makes the test brittle: adding/removing study files can break the test, and it validates against real data rather than testing logic in isolation.
- Files: `lib/topics.spec.js`
- Risk: Topic index changes require study files to exist, coupling content to tests.
- Priority: Low

---

*Concerns audit: 2026-05-09*
