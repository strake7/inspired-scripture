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
