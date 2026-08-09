import {
  getAllReflections,
  getReflectionBySlug,
  getReflectionSlugs,
  parseFrontmatter,
  toIsoDate,
} from './reflections'
import fs from 'fs'

// Only `fs` is mocked here. Leaving `path` real keeps the directory and file
// paths that reach the fs mocks unambiguous.
jest.mock('fs')

const STUDY_METADATA = `
ecclesiastes-6:
  videoSrc: https://www.youtube.com/embed/abc123
`

const REFLECTION_WITH_STUDY = `---
title: The Futility of Trusting in Wealth
date: 2026-07-18
studySlug: ecclesiastes-6
---

Solomon called it vapor. This is the first paragraph of the reflection body.
`

const REFLECTION_MINIMAL = `---
title: A Minimal Reflection
date: 2026-08-01
---

This body has no explicit description, so one gets derived from it.
`

const REFLECTION_DRAFT = `---
title: An Unfinished Reflection
date: 2026-09-01
draft: true
---

Still being written.
`

const asPath = (p) => String(p ?? '')

function mockFiles(files) {
  fs.existsSync.mockImplementation((p) => {
    const target = asPath(p)
    if (target.endsWith('_reflections')) return true
    return Object.keys(files).some((f) => target.includes(f))
  })
  fs.readFileSync.mockImplementation((p) => {
    const target = asPath(p)
    if (target.includes('study_metadata.yml')) return STUDY_METADATA
    const match = Object.keys(files).find((f) => target.includes(f))
    return match ? files[match] : ''
  })
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getReflectionSlugs', () => {
  it('returns only markdown files, without the extension', () => {
    fs.existsSync.mockReturnValue(true)
    fs.readdirSync.mockReturnValue([
      'a-reflection.md',
      'b-reflection.md',
      'notes.txt',
    ])

    expect(getReflectionSlugs()).toEqual(['a-reflection', 'b-reflection'])
  })

  it('returns an empty list when the reflections directory is absent', () => {
    fs.existsSync.mockReturnValue(false)

    expect(getReflectionSlugs()).toEqual([])
  })
})

describe('parseFrontmatter', () => {
  it('separates frontmatter data from the body', () => {
    const { data, body } = parseFrontmatter(
      REFLECTION_MINIMAL,
      'a-minimal-reflection',
    )

    expect(data.title).toBe('A Minimal Reflection')
    expect(body.trim()).toMatch(/^This body has no explicit description/)
  })

  it('throws when the frontmatter block is missing', () => {
    expect(() => parseFrontmatter('# Just markdown', 'broken')).toThrow(
      'missing a YAML frontmatter block',
    )
  })
})

describe('toIsoDate', () => {
  it('normalizes a string date', () => {
    expect(toIsoDate('2026-07-18', 'r')).toBe('2026-07-18')
  })

  it('normalizes a Date instance', () => {
    expect(toIsoDate(new Date('2026-07-18T00:00:00Z'), 'r')).toBe('2026-07-18')
  })

  it('throws on a missing date', () => {
    expect(() => toIsoDate(undefined, 'r')).toThrow('missing a "date"')
  })

  it('throws on an unparseable date', () => {
    expect(() => toIsoDate('not-a-date', 'r')).toThrow('unparseable date')
  })
})

describe('getReflectionBySlug', () => {
  it('renders markdown to HTML and applies defaults', () => {
    mockFiles({ 'a-minimal-reflection.md': REFLECTION_MINIMAL })

    const reflection = getReflectionBySlug('a-minimal-reflection')

    expect(reflection.slug).toBe('a-minimal-reflection')
    expect(reflection.title).toBe('A Minimal Reflection')
    expect(reflection.date).toBe('2026-08-01')
    expect(reflection.content).toContain('<p>')
    expect(reflection.author).toBe('John Edson')
    expect(reflection.draft).toBe(false)
    expect(reflection.study).toBeNull()
  })

  it('derives a description from the body when none is given', () => {
    mockFiles({ 'a-minimal-reflection.md': REFLECTION_MINIMAL })

    const reflection = getReflectionBySlug('a-minimal-reflection')

    expect(reflection.description).toBe(
      'This body has no explicit description, so one gets derived from it.',
    )
  })

  it('joins the linked study and inherits its video', () => {
    mockFiles({
      'wealth.md': REFLECTION_WITH_STUDY,
      'ecclesiastes-6.html':
        '<h1>Ecclesiastes 6: Lessons Regarding the Futility of Trusting in Wealth</h1>\nIntroduction: Solomon warned against trusting in wealth.',
    })

    const reflection = getReflectionBySlug('wealth')

    expect(reflection.study.slug).toBe('ecclesiastes-6')
    expect(reflection.study.title).toBe(
      'Ecclesiastes 6: Lessons Regarding the Futility of Trusting in Wealth',
    )
    expect(reflection.study.description).toBe(
      'Solomon warned against trusting in wealth.',
    )
    expect(reflection.videoSrc).toBe('https://www.youtube.com/embed/abc123')
  })

  it('throws when the linked study does not exist', () => {
    fs.existsSync.mockImplementation((p) => !p.includes('_studies'))
    fs.readFileSync.mockImplementation((p) => {
      if (p.includes('study_metadata.yml')) return STUDY_METADATA
      return REFLECTION_WITH_STUDY
    })

    expect(() => getReflectionBySlug('wealth')).toThrow(
      'references studySlug "ecclesiastes-6"',
    )
  })

  it('throws when the title is missing', () => {
    mockFiles({ 'untitled.md': '---\ndate: 2026-01-01\n---\n\nBody.' })

    expect(() => getReflectionBySlug('untitled')).toThrow('missing a "title"')
  })
})

describe('getAllReflections', () => {
  beforeEach(() => {
    fs.readdirSync.mockReturnValue([
      'a-minimal-reflection.md',
      'an-unfinished-reflection.md',
    ])
    mockFiles({
      'a-minimal-reflection.md': REFLECTION_MINIMAL,
      'an-unfinished-reflection.md': REFLECTION_DRAFT,
    })
  })

  it('sorts reflections newest first and includes drafts when asked', () => {
    const reflections = getAllReflections({ withDrafts: true })

    expect(reflections.map((r) => r.slug)).toEqual([
      'an-unfinished-reflection',
      'a-minimal-reflection',
    ])
  })

  it('excludes drafts when they are not requested', () => {
    const reflections = getAllReflections({ withDrafts: false })

    expect(reflections.map((r) => r.slug)).toEqual(['a-minimal-reflection'])
  })
})
