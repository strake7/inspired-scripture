# SEO Improvement Opportunities

Audit date: 2026-03-26
Completed: 2026-03-29

## Completed

### 1. Fix Hardcoded Video Dates in Structured Data — DONE
Scraped real publish dates from YouTube for 108 videos and added `videoPublishedAt` to `lib/study_metadata.yml`. Article and VideoObject structured data now use real dates. Studies without videos omit date fields entirely. Also removed dead psalm-9 video (`w6Ohwvdxrh8`).

### 2. Per-Study Open Graph Images — DONE
Studies with videos now use the YouTube thumbnail (`maxresdefault.jpg`) as OG image. Falls back to default `welcome-span.jpg` for studies without videos.

### 3. Improve Study Description Extraction — DONE
Added fallback chain: Introduction/Background/Overview header match → first meaningful `<p>` with 50+ chars → build error. All descriptions truncated to 155 chars at word boundaries. Removed generic fallback (was dead code — never reached). Manual `description` override via `study_metadata.yml` still supported.

### 4. Add Organization / Person Structured Data — DONE
`Person` (John Edson) and `Organization` (Inspired Scripture) are top-level `@graph` entities with `@id` URIs, referenced from Article via `@id`.

### 5. Add OG Image Dimensions — DONE
Added `og:image:width` and `og:image:height` meta tags. YouTube thumbnails: 1280x720. Default image: 708x416.

## Deferred

### 6. Modernize Favicon Setup
**Impact: Low** — Deferred. Requires source image/design work to generate multi-size icons.
