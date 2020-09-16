import fs from "fs"
import { join } from "path"

const studiesDir = join(process.cwd(), '_studies')
const slugRegex = /(?<book>\d[\s-][a-zA-Z]+|[a-zA-Z]+)[\s-(chapter)]+(?<chapter>[\d]+)[\s-]?(?<suffix>.*)/i

export function getStudySlugs() {  
  return fs.readdirSync(studiesDir)
    .filter(file => file.slice(-5) === '.html')
}

export function getStudyBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.html$/, '')
  const fullPath = join(studiesDir, `${realSlug}.html`)
  const groups = slugRegex.exec(realSlug).groups

  const study = {
    slug: realSlug,
    book: groups.book.replace('-', ' '),
    chapter: parseInt(groups.chapter),
    suffix: groups.suffix,
  }
  // ensure minimal data is exposed
  fields.forEach(f => {
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
    .sort((pr, x)=>{
      if(pr.chapter >= x.chapter)
        return 1
      return -1
    }
    )
    console.log(posts)
  return posts
}