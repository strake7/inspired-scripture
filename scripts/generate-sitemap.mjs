import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import YAML from 'yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_URL = 'https://inspiredscripture.com'

async function generateSitemap() {
  // Read study files directly
  const studiesDir = path.join(__dirname, '../_studies')
  const studyFiles = fs
    .readdirSync(studiesDir)
    .filter((file) => file.endsWith('.html'))

  const studyPages = studyFiles.map((file) => {
    const slug = file.replace('.html', '')
    return {
      url: `/bible-studies/${slug}`,
      changefreq: 'yearly',
      priority: '0.8',
    }
  })

  // Read topic index directly
  const topicIndexPath = path.join(__dirname, '../lib/topic-index.yml')
  const topicIndexContent = fs.readFileSync(topicIndexPath, 'utf-8')
  const topicsIndex = YAML.parse(topicIndexContent)

  const topicPages = Object.keys(topicsIndex).map((topicKey) => ({
    url: `/topics/${topicKey.replaceAll(' ', '-').toLowerCase()}`,
    changefreq: 'monthly',
    priority: '0.7',
  }))

  const staticPages = [
    { url: '', changefreq: 'monthly', priority: '1.0' },
    { url: '/about', changefreq: 'yearly', priority: '0.5' },
  ]

  const allPages = [...staticPages, ...studyPages, ...topicPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  const publicDir = path.join(__dirname, '../public')
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
  console.log(
    `✅ Sitemap generated with ${allPages.length} URLs (${studyPages.length} studies, ${topicPages.length} topics, ${staticPages.length} static pages)`,
  )
}

generateSitemap().catch((error) => {
  console.error('Error generating sitemap:', error)
  process.exit(1)
})
