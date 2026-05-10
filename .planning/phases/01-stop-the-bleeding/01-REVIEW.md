---
phase: 01-stop-the-bleeding
reviewed: 2026-05-09T20:00:00Z
depth: standard
files_reviewed: 6
files_reviewed_list:
  - components/scripts.jsx
  - lib/studies.js
  - lib/studies.spec.js
  - pages/bible-studies/[slug].jsx
  - pages/index.jsx
  - styles.css
findings:
  critical: 0
  warning: 5
  info: 3
  total: 8
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-05-09T20:00:00Z
**Depth:** standard
**Files Reviewed:** 6
**Status:** issues_found

## Summary

This phase implements an SEO recovery strategy with four categories of changes: (1) removal of AdSense ads from scripts, study pages, and homepage, (2) improved meta description extraction with broader regex matching, (3) title whitespace trimming fix, (4) homepage heading semantics fix (h1/h2 changed to p tags), and (5) removal of an invalid SearchAction from structured data. The ad removal and description extraction improvements are well-executed. There are no critical security issues. However, there are several logic-level warnings around sorting stability, regex edge cases, and a heading semantics change that may hurt SEO rather than help it.

## Warnings

### WR-01: Homepage heading tags replaced with `<p>` tags -- potential SEO regression

**File:** `pages/index.jsx:48-51`
**Issue:** The diff changes `<h1>Inspired Scripture</h1>` and `<h2>Biblical studies for the logical mind</h2>` to `<p>` tags with visual classes (`display-4`, `h2`). This removes the only `<h1>` from the homepage. Search engines use heading hierarchy for page structure signals. Removing the `<h1>` entirely from the homepage is counterproductive for an SEO recovery effort -- Google explicitly documents that heading tags help communicate page structure. The page now has no `<h1>` tag (the `<Heading>` component below renders an `<h1>` with "Welcome to Inspired Scripture" which is a secondary heading, not the site title).
**Fix:** Keep the site title as `<h1>` and the subtitle as `<p>` (or use a visually-styled `<h2>`). There should be exactly one `<h1>` on the homepage representing the primary page topic:
```jsx
<h1 className="display-4 fw-bold mb-3" style={{ marginBottom: 0 }}>
  Inspired Scripture
</h1>
<p className="h2 pb-4">Biblical studies for the logical mind</p>
```
Note: If the intent was to avoid having two `<h1>` tags (the hero one and the `<Heading>` component's one), the correct fix is to demote one of them -- not remove both `<h1>` usages from the hero section.

### WR-02: `getAllStudies` sort comparator is unstable and only sorts by chapter across all books

**File:** `lib/studies.js:76-78`
**Issue:** The sort comparator `(pr, x) => pr.chapter >= x.chapter ? 1 : -1` has two problems: (1) It uses `>=` instead of `>`, meaning equal chapters always return 1 (swap), making the sort unstable. In a stable sort, equal elements preserve their original order; here they are always swapped. (2) It only compares `chapter` without considering `book`, so studies from different books (e.g., Genesis 1 and Psalm 1) are interleaved arbitrarily. This has been present before this diff and was not introduced by this change, but it is called from `getStaticProps` in both reviewed pages.
**Fix:**
```js
.sort((a, b) => {
  if (a.book < b.book) return -1
  if (a.book > b.book) return 1
  return a.chapter - b.chapter
})
```

### WR-03: `String.replace('-', ' ')` only replaces the first hyphen in book names

**File:** `lib/studies.js:62`
**Issue:** `groups.book.replace('-', ' ')` uses a string argument, not a regex, so it only replaces the first hyphen. For a slug like `song-of-solomon`, `groups.book` would be parsed as `song-of-solomon` (depending on the regex), and `.replace('-', ' ')` would produce `song of-solomon` instead of `song of solomon`. This is a pre-existing issue but affects the correctness of book name display for multi-hyphenated books.
**Fix:**
```js
study.book = groups.book
  .replace(/-/g, ' ')
  .replace(/\b\w/g, (c) => c.toUpperCase())
```

### WR-04: Description extraction regex may capture unintended trailing content

**File:** `lib/studies.js:13-14`
**Issue:** The regex `/(Introduction|Background|Overview)[.:;]?\s*(.+)/` uses `.+` which is greedy and matches everything to the end of the line. However, since `plainText` is the full stripped HTML content (all tags removed), it is a single continuous string with no reliable line boundaries -- `stripHtml` does not insert newlines at tag boundaries. This means the capture group `(.+)` could match the entire remaining text of the study after the keyword, producing a very long string that then gets truncated. While `truncate()` limits the output length, the regex is matching far more than intended. The old regex `(: )?(.+)` had the same issue but was narrower due to requiring a colon. The new regex broadens the match by making the separator fully optional (`[.:;]?\s*`), meaning bare occurrences of "Introduction" or "Background" anywhere in the text could trigger a false-positive match.
**Fix:** Consider anchoring the match more carefully, e.g., requiring the keyword to appear at the start of the text or after a newline/tag boundary. Alternatively, match only the sentence after the keyword rather than the entire remaining content:
```js
const headerMatch = plainText.match(
  /(Introduction|Background|Overview)[.:;]?\s*([^.]+\.)/,
)
```
This captures only the first sentence, which is more likely to produce a meaningful description. However, this should be validated against the actual study content to ensure it produces adequate descriptions.

### WR-05: `studiesList` uses loose equality `==` instead of `===`

**File:** `pages/index.jsx:182`
**Issue:** `studies.length == 0` uses loose equality. While this works correctly since `.length` always returns a number and `0` is a number, the project uses ESLint and this is inconsistent with JavaScript best practices. This could mask issues if `studies` were ever something unexpected.
**Fix:**
```js
if (!studies || studies.length === 0) return <p>Coming soon!</p>
```

## Info

### IN-01: Removed SearchAction structured data references a non-existent search page

**File:** `pages/index.jsx` (removed lines)
**Issue:** The diff removes a `SearchAction` from structured data that pointed to `https://inspiredscripture.com/search?q={search_term_string}`. This is correct -- the site uses Google Custom Search Engine embedded in the navbar, not a `/search` route. Having a SearchAction pointing to a non-existent URL would cause Google Search Console validation errors. Good removal.
**Fix:** No action needed -- the removal is correct.

### IN-02: `dangerouslySetInnerHTML` usage in study page with regex content manipulation

**File:** `pages/bible-studies/[slug].jsx:172-178`
**Issue:** The new code uses `study.content.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '')` to strip the first `<h1>` tag from study content before rendering via `dangerouslySetInnerHTML`. This is reasonable since the title is already rendered separately via `<Heading>`. The `dangerouslySetInnerHTML` usage is acceptable here because the content comes from trusted local HTML files in `_studies/`, not user input. The regex is well-formed with a non-greedy quantifier (`[\s\S]*?`) to avoid over-matching.
**Fix:** No action needed -- noting for documentation.

### IN-03: Ad-related CSS cleanup is complete

**File:** `styles.css` (removed lines)
**Issue:** The `.ad-container` and `@media print` ad-hiding rules were removed. This is consistent with the full ad removal from `scripts.jsx`, `[slug].jsx`, and `index.jsx`. No orphaned CSS references remain.
**Fix:** No action needed -- the cleanup is thorough.

---

_Reviewed: 2026-05-09T20:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
