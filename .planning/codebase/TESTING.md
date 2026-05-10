# Testing Patterns

**Analysis Date:** 2026-05-09

## Test Framework

**Runner:**
- Jest 29.7.0
- Config: No dedicated config file. Jest uses defaults with Babel transpilation via `babel.config.js`.
- Babel config (`babel.config.js`) targets current Node version to support ES module syntax in tests:
  ```javascript
  module.exports = {
    presets: [
      'next/babel',
      ['@babel/preset-env', { targets: { node: 'current' } }],
    ],
  }
  ```

**Assertion Library:**
- Jest built-in `expect()` with standard matchers

**Run Commands:**
```bash
pnpm test              # Run all tests (jest)
```

No watch mode or coverage commands are configured in `package.json` scripts, but Jest supports them directly:
```bash
pnpm test -- --watch          # Watch mode
pnpm test -- --coverage       # Coverage report
```

## Test File Organization

**Location:**
- Co-located with source files in `lib/`

**Naming:**
- `{module}.spec.js` pattern (e.g., `lib/studies.spec.js`, `lib/topics.spec.js`)

**Structure:**
```
lib/
├── studies.js          # Source
├── studies.spec.js     # Tests for studies.js
├── topics.js           # Source
├── topics.spec.js      # Tests for topics.js
├── books.js            # No tests (static data)
└── utils.js            # No tests
```

**What is tested:**
- `lib/studies.js` - Study parsing, slug extraction, metadata merging, description extraction
- `lib/topics.js` - Topic structure validation, slug references to known studies

**What is NOT tested:**
- `lib/utils.js` - Utility functions (`stripHtml`, `truncate`, `partitionArray`) have no tests
- `lib/books.js` - Static constant, no tests
- `components/` - No component tests
- `pages/` - No page-level tests
- `middleware.js` - No tests
- `scripts/generate-sitemap.mjs` - No tests

## Test Structure

**Suite Organization:**
```javascript
// lib/studies.spec.js pattern
import { getAllStudies, getStudySlugs, getStudyBySlug, getStudyMetadata } from './studies'
import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

jest.mock('fs')
jest.mock('path')

// Mock setup at module level
path.join.mockImplementation((...args) => args.join('/'))

describe('getStudySlugs', () => {
  it('returns only HTML files', () => {
    // arrange
    fs.readdirSync.mockReturnValue(['study1.html', 'notastudy.txt'])
    // act
    const slugs = getStudySlugs()
    // assert
    expect(slugs).toContain('study1.html')
    expect(slugs).not.toContain('notastudy.txt')
  })
})
```

**Patterns:**
- `describe()` blocks group by function name: `describe('getStudySlugs', ...)`, `describe('getStudyBySlug', ...)`
- `it()` for individual test cases (not `test()`) in `studies.spec.js`
- `test.each()` for data-driven validation in `topics.spec.js`
- `beforeEach()` for per-test mock setup within a `describe` block
- No `afterEach()` or `afterAll()` cleanup — Jest auto-resets mocks between tests

## Mocking

**Framework:** Jest built-in `jest.mock()` and `jest.spyOn()`

**Patterns:**

Module-level mocking of Node built-ins:
```javascript
jest.mock('fs')
jest.mock('path')

// Configure mock implementations after mock declaration
path.join.mockImplementation((...args) => args.join('/'))
```

Per-test mock setup with `beforeEach`:
```javascript
beforeEach(() => {
  const mockMetadata = {
    'psalm-23': { videoSrc: 'https://example.com/video' },
  }

  jest.spyOn(YAML, 'parse').mockReturnValue(mockMetadata)

  fs.readFileSync.mockImplementation((path, encoding) => {
    if (path.includes('psalm-23.html')) {
      return '<h1>Psalm 23 Study</h1>\nBackground: A psalm of David.'
    }
    if (path.includes('study_metadata.yml')) {
      return JSON.stringify(mockMetadata)
    }
    return ''
  })
})
```

**What to Mock:**
- `fs` module (filesystem reads) - always mock to avoid dependency on actual study files
- `path` module - mock `path.join` to use simple string concatenation
- `YAML.parse` - mock via `jest.spyOn()` to return controlled metadata objects

**What NOT to Mock:**
- The module under test itself - always import and call real functions
- Data transformation logic - test the actual parsing, slug extraction, and sorting behavior

## Fixtures and Factories

**Test Data:**
Inline mock data defined in `beforeEach` or test bodies. No shared fixture files.

```javascript
// Inline mock study content
fs.readFileSync.mockImplementation((path) => {
  if (path.includes('genesis-1.html')) {
    return '<h1>Genesis 1</h1>\nIntroduction: A study about creation.'
  }
  return ''
})

// Inline mock metadata
const mockMetadata = {
  'genesis-1': { someMetadata: 'value1' },
  'psalm-23': { someMetadata: 'value3' },
}
```

**Location:**
- No separate fixture directory. All test data is inline within spec files.

## Coverage

**Requirements:** None enforced. No coverage thresholds configured.

**View Coverage:**
```bash
pnpm test -- --coverage
```

## Test Types

**Unit Tests:**
- All existing tests are unit tests covering `lib/` data-access functions
- `lib/studies.spec.js`: 7 test cases covering slug parsing, title/content extraction, description extraction, metadata merging, sorting
- `lib/topics.spec.js`: Uses `test.each()` for data-driven validation against real YAML data. Tests validate:
  - Every topic has a name, slug (no spaces), and non-empty sections
  - Every section has a name and non-empty studies list
  - Every study reference has a name and a slug matching a known study file

**Integration-style Tests (topics.spec.js):**
- `lib/topics.spec.js` reads actual YAML files from disk (no mocking) and cross-references against real study files
- This makes it function as a content integrity check at build time
- It generates 1,050+ test cases dynamically via `test.each()`
- Verifies all topic-study slug references resolve to actual study HTML files

**E2E Tests:**
- Not configured. No Playwright, Cypress, or similar tool installed.
- Playwright MCP is available for manual visual verification during development (per CLAUDE.md).

## Common Patterns

**Data-Driven Testing:**
```javascript
// lib/topics.spec.js - validates all topics from real YAML
let topics = getAllTopics()

test.each(topics)('topic has name and slug', (topic) => {
  expect(topic.name).not.toBeNull()
  expect(topic.slug).not.toBeNull()
  expect(topic.slug).not.toContain(' ')
  expect(topic.sections).not.toBeNull()
  expect(topic.sections.length).not.toBe(0)
})
```

**Cross-Reference Validation:**
```javascript
// Verifies every study slug referenced in topics exists in actual study files
let knownStudySlugs = getAllStudies().map((study) => study.slug)

describe('studies', () => {
  let studies = sections.flatMap((section) => section.studies)
  test.each(studies)('%s has name and valid slug', (study) => {
    expect(study.name).not.toBeNull()
    expect(knownStudySlugs.indexOf(study.slug)).toBeGreaterThan(-1)
  })
})
```

**Error Testing:**
```javascript
it('throws when no description can be extracted', () => {
  expect(() => getStudyBySlug('not-standard-format', ['content'])).toThrow(
    'Could not extract description',
  )
})
```

**Assertion Style:**
- Uses `toContain()`, `not.toContain()` for array membership
- Uses `toBe()` for exact string/number equality
- Uses `toEqual()` for deep object comparison
- Uses `toThrow()` for error assertions (wrapped in `expect(() => ...)`)
- Uses `toBeGreaterThan(-1)` as an indexOf check (could use `toContain()` instead)
- Uses `not.toBeNull()` for existence checks

## Adding New Tests

**For a new lib module:**
1. Create `lib/{module}.spec.js` next to the source file
2. Mock `fs` and `path` if the module reads from disk
3. Use `jest.spyOn(YAML, 'parse')` if the module parses YAML
4. Group tests with `describe()` by exported function name
5. Use `it()` for individual test cases
6. Use `beforeEach()` for shared mock setup within a describe block

**For content validation:**
1. Follow the `topics.spec.js` pattern: read real data, use `test.each()` for dynamic test generation
2. Cross-reference slugs against `getAllStudies()` to ensure data integrity

---

*Testing analysis: 2026-05-09*
