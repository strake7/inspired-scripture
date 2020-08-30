import fs from "fs"
import { join } from "path"

const studiesDir = join(process.cwd(), '_studies')

export function getStudySlugs() {  
  return fs.readdirSync(studiesDir)
    .filter(file => file.slice(-5) === '.html')
}

export function getStudyBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.html$/, '')
  const fullPath = join(studiesDir, `${realSlug}.html`)

  const study = {}
  // ensure minimal data is exposed
  fields.forEach(f => {
    study['slug'] = realSlug
    if (f === 'content') {
      study['content'] = fs.readFileSync(fullPath, 'utf8')
    }
  })
  return study;
}

export function getAllStudies(fields = []) {
  const slugs = getStudySlugs()
  const posts = slugs
    .map(slug => getStudyBySlug(slug, fields))
  return posts
}