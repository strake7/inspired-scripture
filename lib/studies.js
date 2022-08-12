import fs from "fs"
import { join } from "path"
import YAML from "yaml";
import { stripHtml } from "./utils";

const studiesDir = join(process.cwd(), '_studies')
const slugRegex = /(?<book>\d[\s-][a-zA-Z]+|[a-zA-Z]+)[\s-(chapter)]+(?<chapter>[\d]+)[\s-\.]?(?<suffix>.*)/i

export function getStudySlugs() {
  return fs.readdirSync(studiesDir)
    .filter(file => file.slice(-5) === '.html')
}

export function getStudyBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.html$/, '')
  const fullPath = join(studiesDir, `${realSlug}.html`)
  const study = {
    slug: realSlug
  }
  // ensure minimal data is exposed
  fields.forEach(f => {
    if (f === 'content') {
      const fullContent = fs.readFileSync(fullPath, 'utf8')
      // pop the first line, which is the assumed title
      const fLine = fullContent.slice(0, fullContent.indexOf('\n') + 1)
      study.title = stripHtml(fLine)
      // pop the rest of the file, which is the assumed content
      study.content = fullContent.slice(fLine.length)
      // search for a description paragraph 
      study.description = stripHtml(study.content).match(/(Introduction|Background|Overview)(: )?(.+)/)?.[3]
        ?? `John Edson's commentary on ${study.title} in a seven fold outline.`
    }
  })

  const groups = slugRegex.exec(realSlug)?.groups
  if (!groups)
    // study filename is not in the expected pattern; return without assigning book/chapter values 
    return study

  study.book = groups.book
    .replace('-', ' ')
    .replace(/\b\w/g, c => c.toUpperCase()) // capitalize first letter of each word
  study.chapter = parseInt(groups.chapter)
  study.suffix = groups.suffix
  study.chapterLabel = `${study.chapter}${study.suffix ? ` ${study.suffix}` : ''}`
  return { ...study, ...getStudyMetadata()[study.slug] }
}

export function getAllStudies(fields = []) {
  const slugs = getStudySlugs()
  const posts = slugs
    .map(slug => getStudyBySlug(slug, fields))
    .sort((pr, x) => {
      if (pr.chapter >= x.chapter)
        return 1
      return -1
    }
    )
  return posts
}

export function getStudyMetadata() {
  const file = fs.readFileSync('./lib/study_metadata.yml', 'utf-8')
  return YAML.parse(file)
}