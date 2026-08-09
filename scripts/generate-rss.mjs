import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { readPublishedReflections } from './read-reflections.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_URL = 'https://inspiredscripture.com'
const FEED_TITLE = 'Inspired Scripture Reflections'
const FEED_DESCRIPTION =
  'Weekly reflections from Inspired Scripture: short readings that open up each new Bible study of the Old Testament.'

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toUTCString()
}

async function generateRss() {
  const reflections = readPublishedReflections()

  const items = reflections
    .map(
      (reflection) => `    <item>
      <title>${escapeXml(reflection.title)}</title>
      <link>${SITE_URL}/reflections/${reflection.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/reflections/${reflection.slug}</guid>
      <description>${escapeXml(reflection.description)}</description>
      <pubDate>${toRfc822(reflection.date)}</pubDate>
    </item>`,
    )
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${FEED_TITLE}</title>
    <link>${SITE_URL}/reflections</link>
    <description>${FEED_DESCRIPTION}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  const publicDir = path.join(__dirname, '../public')
  fs.writeFileSync(path.join(publicDir, 'rss.xml'), feed)
  console.log(`✅ RSS feed generated with ${reflections.length} reflections`)
}

generateRss().catch((error) => {
  console.error('Error generating RSS feed:', error)
  process.exit(1)
})
