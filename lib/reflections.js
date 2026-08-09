import fs from 'fs'
import { join } from 'path'
import YAML from 'yaml'
import { marked } from 'marked'
import { getStudyBySlug } from './studies'
import { stripHtml, truncate } from './utils'

const reflectionsDir = join(process.cwd(), '_reflections')
const MAX_DESCRIPTION_LENGTH = 155
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

/**
 * Reflections accompany the weekly social media campaign. Each one is a short
 * piece of standalone writing that funnels readers to a full study, so the
 * `studySlug` frontmatter field is the load-bearing part: it pulls the study's
 * title, description, and video through to the reflection automatically.
 */

export function parseFrontmatter(raw, slug) {
  const match = FRONTMATTER_PATTERN.exec(raw)
  if (!match) {
    throw new Error(
      `Reflection "${slug}" is missing a YAML frontmatter block. Every reflection must start with a --- delimited block containing at least title and date.`,
    )
  }
  return {
    data: YAML.parse(match[1]) || {},
    body: raw.slice(match[0].length),
  }
}

/**
 * YAML 1.2's core schema reads unquoted dates as strings, but a quoted date or
 * a different parser can yield a Date. Normalize both to an ISO day so props
 * stay JSON-serializable for getStaticProps.
 */
export function toIsoDate(value, slug) {
  if (!value) {
    throw new Error(
      `Reflection "${slug}" is missing a "date" in its frontmatter.`,
    )
  }
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new Error(
      `Reflection "${slug}" has an unparseable date "${value}". Use YYYY-MM-DD.`,
    )
  }
  return date.toISOString().slice(0, 10)
}

export function getReflectionSlugs() {
  if (!fs.existsSync(reflectionsDir)) return []
  return fs
    .readdirSync(reflectionsDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

export function getReflectionBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '')
  const raw = fs.readFileSync(join(reflectionsDir, `${realSlug}.md`), 'utf8')
  const { data, body } = parseFrontmatter(raw, realSlug)

  if (!data.title) {
    throw new Error(
      `Reflection "${realSlug}" is missing a "title" in frontmatter.`,
    )
  }

  const contentHtml = marked.parse(body.trim())
  const reflection = {
    slug: realSlug,
    title: String(data.title).trim(),
    date: toIsoDate(data.date, realSlug),
    updated: data.updated ? toIsoDate(data.updated, realSlug) : null,
    draft: data.draft === true,
    author: data.author || 'John Edson',
    content: contentHtml,
    description:
      data.description?.trim() ||
      truncate(stripHtml(contentHtml).trim(), MAX_DESCRIPTION_LENGTH),
    image: data.image || null,
    imageAlt: data.imageAlt || null,
    study: null,
  }

  if (data.studySlug) {
    reflection.study = linkedStudy(data.studySlug, realSlug)
    // A reflection inherits the study's video so the campaign page can embed it
    // without duplicating the URL in two places.
    reflection.videoSrc = reflection.study.videoSrc || null
  }

  return reflection
}

function linkedStudy(studySlug, reflectionSlug) {
  const studyPath = join(process.cwd(), '_studies', `${studySlug}.html`)
  if (!fs.existsSync(studyPath)) {
    throw new Error(
      `Reflection "${reflectionSlug}" references studySlug "${studySlug}", but _studies/${studySlug}.html does not exist.`,
    )
  }
  const study = getStudyBySlug(studySlug, ['content'])
  return {
    slug: study.slug,
    title: study.title,
    description: study.description,
    book: study.book || null,
    chapterLabel: study.chapterLabel || null,
    videoSrc: study.videoSrc || null,
  }
}

/**
 * Drafts stay out of the production build but render locally so a reflection
 * can be previewed before it goes live alongside the social blast.
 */
export function includeDrafts() {
  return process.env.NODE_ENV !== 'production'
}

export function getAllReflections({ withDrafts = includeDrafts() } = {}) {
  return getReflectionSlugs()
    .map((slug) => getReflectionBySlug(slug))
    .filter((reflection) => withDrafts || !reflection.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}
