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

**Inspired Scripture SEO Recovery**

An SEO recovery project for inspiredscripture.com, a statically exported Next.js site publishing Bible study commentaries by John Edson. The site experienced a 94% drop in Google Search impressions (1.7M → 100K) and clicks (41K → 2K) starting June 2025. This project systematically addresses the quality signals causing the decline.

**Core Value:** Restore Google's trust in the site so that Bible study pages rank and receive organic search traffic again.

### Constraints

- **Tech stack**: Next.js with static export, no server-side capabilities
- **Content**: Study HTML files in `_studies/` cannot be bulk-reformatted — fixes must work with existing content structure
- **Verification lag**: SEO improvements take weeks/months to reflect in Search Console — success criteria must include both technical verification and long-term monitoring
<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->
## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
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
