import {
  getAllStudies,
  getStudySlugs,
  getStudyBySlug,
  getStudyMetadata,
} from './studies'
import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

jest.mock('fs')
jest.mock('path')

// mock implementation for path.join to avoid filepath issues in tests
path.join.mockImplementation((...args) => args.join('/'))

describe('getStudySlugs', () => {
  it('returns only HTML files', () => {
    const mockFiles = [
      'study1.html',
      'study2.html',
      'notastudy.txt',
      'README.md',
    ]
    fs.readdirSync.mockReturnValue(mockFiles)

    const slugs = getStudySlugs()

    expect(slugs).toContain('study1.html')
    expect(slugs).toContain('study2.html')
    expect(slugs).not.toContain('notastudy.txt')
    expect(slugs).not.toContain('README.md')
    expect(slugs.length).toBe(2)
  })
})

describe('getStudyBySlug', () => {
  beforeEach(() => {
    const mockMetadata = {
      'psalm-23': { videoSrc: 'https://example.com/video' },
      'genesis-1a.1': { videoSrc: 'https://example.com/genesis' },
    }

    jest.spyOn(YAML, 'parse').mockReturnValue(mockMetadata)

    fs.readFileSync.mockImplementation((path, encoding) => {
      if (path.includes('genesis-1a.1.html')) {
        return '<h1>Genesis 1:1 Study</h1>\nIntroduction: This is a study about creation.'
      }
      if (path.includes('psalm-23.html')) {
        return '<h1>Psalm 23 Study</h1>\nBackground: A psalm of David about the Lord as shepherd.'
      }
      if (path.includes('not-standard-format.html')) {
        return '<h1>Custom Study</h1>\nThis is a custom study.'
      }
      if (path.includes('study_metadata.yml')) {
        return JSON.stringify(mockMetadata)
      }
      return ''
    })
  })

  it('extracts title and content from study files', () => {
    const study = getStudyBySlug('genesis-1a.1', ['content'])

    expect(study.title.trim()).toBe('Genesis 1:1 Study')
    expect(study.content).toContain(
      'Introduction: This is a study about creation.',
    )
  })

  it('extracts description from content with Introduction', () => {
    const study = getStudyBySlug('genesis-1a.1', ['content'])

    expect(study.description).toBe('This is a study about creation.')
  })

  it('extracts description from content with Background', () => {
    const study = getStudyBySlug('psalm-23', ['content'])

    expect(study.description).toBe(
      'A psalm of David about the Lord as shepherd.',
    )
  })

  it('provides fallback description when no pattern matches', () => {
    const study = getStudyBySlug('not-standard-format', ['content'])

    expect(study.description).toContain(
      "John Edson's commentary on Custom Study",
    )
    expect(study.description).toContain('in a seven fold outline')
  })

  it('parses book and chapter from standard slug format', () => {
    const study = getStudyBySlug('genesis-1a.1', [])

    expect(study.book).toBe('Genesis')
    expect(study.chapter).toBe(1)
    expect(study.suffix).toBe('a.1')
    expect(study.chapterLabel).toBe('1 a.1')
  })

  it('parses book and chapter from numbered book format', () => {
    const study = getStudyBySlug('1-kings-8', [])

    expect(study.book).toBe('1 Kings')
    expect(study.chapter).toBe(8)
    expect(study.suffix).toBe('')
    expect(study.chapterLabel).toBe('8')
  })

  it('merges metadata from study_metadata.yml', () => {
    const study = getStudyBySlug('psalm-23', [])

    expect(study.videoSrc).toBe('https://example.com/video')
  })
})

describe('getAllStudies', () => {
  beforeEach(() => {
    // Mock metadata
    const mockMetadata = {
      'genesis-1': { someMetadata: 'value1' },
      'genesis-2': { someMetadata: 'value2' },
      'psalm-23': { someMetadata: 'value3' },
    }

    jest.spyOn(YAML, 'parse').mockReturnValue(mockMetadata)

    fs.readdirSync.mockReturnValue([
      'genesis-1.html',
      'genesis-2.html',
      'psalm-23.html',
    ])
    fs.readFileSync.mockImplementation((path, encoding) => {
      if (path.includes('genesis-1.html')) {
        return '<h1>Genesis 1</h1>\nContent for Genesis 1'
      }
      if (path.includes('genesis-2.html')) {
        return '<h1>Genesis 2</h1>\nContent for Genesis 2'
      }
      if (path.includes('psalm-23.html')) {
        return '<h1>Psalm 23</h1>\nContent for Psalm 23'
      }
      if (path.includes('study_metadata.yml')) {
        return JSON.stringify(mockMetadata)
      }
      return ''
    })
  })

  it('returns all studies sorted by chapter', () => {
    const studies = getAllStudies(['content'])

    expect(studies.length).toBe(3)
    expect(studies[0].slug).toBe('genesis-1')
    expect(studies[1].slug).toBe('genesis-2')
  })
})

describe('getStudyMetadata', () => {
  it('parses the YAML file correctly', () => {
    const mockMetadata = {
      'job-1': { videoSrc: 'https://example.com/video1' },
      'job-2': { videoSrc: 'https://example.com/video2' },
    }

    fs.readFileSync.mockReturnValue(JSON.stringify(mockMetadata))
    jest.spyOn(YAML, 'parse').mockReturnValue(mockMetadata)

    const metadata = getStudyMetadata()

    expect(metadata).toEqual({
      'job-1': { videoSrc: 'https://example.com/video1' },
      'job-2': { videoSrc: 'https://example.com/video2' },
    })
  })
})
