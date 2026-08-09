---
description: 'Draft a reflection that accompanies a social media campaign for a study'
allowed-tools: ['Bash', 'Read', 'Write', 'Edit', 'Glob', 'Grep']
---

# Draft a Reflection

Reflections exist to drive traffic from the weekly social blast back into the
Bible studies. Each one is short, standalone, and ends by handing the reader to
the full study.

Given a study slug and some source content (John's own words, a study excerpt,
or notes), draft `_reflections/{reflection-slug}.md`.

## Rules

- **Source from the study, do not invent.** Read `_studies/{studySlug}.html` in
  full and build the reflection out of John's own points, phrasing, examples,
  and Scripture references. Condense and select; do not write a fresh essay
  that merely shares a topic with the study.
- **Never use an em dash.** Not in the title, description, or body. Use a
  comma, a colon, a semicolon, or two sentences. Check the draft for `—` before
  you finish.

## Steps

1. **Confirm the study exists.** `_studies/{studySlug}.html` must be present, or
   the build will fail. Read its first line for the study title, and check
   `lib/study_metadata.yml` for a `videoSrc`.
2. **Read the whole study.** The reflection is a distillation of it, so the
   source material has to be in hand before any drafting starts.
3. **Pick a reflection slug.** Short, keyword-bearing, and distinct from the
   study slug, since the reflection competes in search on its own terms. Prefer
   the theme over the reference: `futility-of-trusting-in-wealth`, not
   `ecclesiastes-6`.
4. **Write the frontmatter.** See `_reflections/_template.md` for every
   supported field. `title`, `date`, and `studySlug` are the ones that matter
   most. Set `draft: true` until it is ready to go live.
5. **Write the body.** Aim for 200 to 400 words:
   - Open with the concrete hook, not a summary of what the reflection covers
   - Keep John's wording wherever it already says the thing well
   - Use `##` for any subheadings; the title supplies the page's only `<h1>`
   - Do not restate the whole study, since the reader needs a reason to click
   - Close with a line that points at the study
6. **Write the description.** Under 155 characters, written for a search result
   and a social card, not as a first sentence.
7. **Verify.** Run `pnpm test`, then start the dev server and open
   `http://localhost:4000/reflections/{reflection-slug}`. Drafts render locally
   but are excluded from production builds, the sitemap, and the RSS feed.
