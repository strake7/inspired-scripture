---
title: Example Reflection. Copy This File to Start a New One
date: 2026-01-01
studySlug: job-1
description: A reference for every field a reflection supports. This file is permanently draft, so it never appears in a production build.
draft: true
---

Copy this file to `_reflections/your-reflection-slug.md` and delete the
`draft: true` line when it is ready to publish. The filename becomes the URL:
`/reflections/your-reflection-slug`.

## Frontmatter fields

| Field         | Required | What it does                                                                                                                                      |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | yes      | Page `<h1>`, `og:title`, and the share text                                                                                                       |
| `date`        | yes      | `YYYY-MM-DD`. Sorts the index, newest first                                                                                                       |
| `studySlug`   | no       | Joins to `_studies/{slug}.html`. Pulls the study title, description, and video through automatically and renders the "Keep reading" call to action |
| `description` | no       | Meta description and card blurb. Falls back to the first ~155 characters of the body                                                              |
| `image`       | no       | Path under `public/`, e.g. `/reflections/my-reflection/hero.jpg`. Becomes the `og:image` and unlocks the Pinterest share button                    |
| `imageAlt`    | no       | Alt text for that image                                                                                                                           |
| `updated`     | no       | Sets `dateModified` if you revise a reflection after publishing                                                                                   |
| `draft`       | no       | `true` keeps it out of production builds, the sitemap, and the RSS feed                                                                           |
| `author`      | no       | Defaults to John Edson                                                                                                                            |

## Writing the body

The body is Markdown. Headings start at `##`, since the title already supplies
the single `<h1>` the page needs.

Source the material from the linked study rather than writing something new
alongside it. John's own phrasing, examples, and Scripture references should
carry the reflection; the job is to select and condense, not to invent.

Never use an em dash in reflection prose. Use a comma, a colon, a semicolon, or
two sentences instead.

If `studySlug` is set and that study has a `videoSrc` in
`lib/study_metadata.yml`, the video embeds above the body and its YouTube
thumbnail becomes the social share image, with no extra configuration needed.
