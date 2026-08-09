import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import YAML from 'yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const REFLECTIONS_DIR = path.join(__dirname, '../_reflections')
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

/**
 * Build scripts run under plain Node before webpack exists, so they read
 * content directly rather than importing `lib/reflections.js`. This mirrors how
 * the sitemap already reads `_studies/` and `topic-index.yml`.
 */
export function readPublishedReflections() {
  if (!fs.existsSync(REFLECTIONS_DIR)) return []

  return fs
    .readdirSync(REFLECTIONS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(REFLECTIONS_DIR, file), 'utf-8')
      const match = FRONTMATTER_PATTERN.exec(raw)
      if (!match) return null
      const data = YAML.parse(match[1]) || {}
      const date =
        data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : String(data.date ?? '')
      return {
        slug: file.replace(/\.md$/, ''),
        title: String(data.title ?? '').trim(),
        description: String(data.description ?? '').trim(),
        date,
        updated: data.updated ? String(data.updated) : null,
        draft: data.draft === true,
      }
    })
    .filter((reflection) => reflection && !reflection.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}
