import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { Badge, Button, Card, Container } from 'react-bootstrap'
import Layout from '../../components/layout'
import Heading from '../../components/heading'
import ShareBar from '../../components/share-bar'
import { getAllReflections, getReflectionBySlug } from '../../lib/reflections'
import { formatReflectionDate, youTubeThumbnail } from '../../lib/utils'

const SITE_URL = 'https://inspiredscripture.com'

export default function Reflection({ reflection }) {
  const router = useRouter()
  if (!router.isFallback && !reflection?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const canonical = `${SITE_URL}/reflections/${reflection.slug}`
  const socialImage =
    (reflection.image && `${SITE_URL}${reflection.image}`) ||
    youTubeThumbnail(reflection.videoSrc) ||
    undefined

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#author`,
        name: reflection.author,
        url: `${SITE_URL}/about`,
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Inspired Scripture',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/welcome-span.jpg`,
        },
      },
      {
        '@type': 'BlogPosting',
        headline: reflection.title,
        description: reflection.description,
        author: { '@id': `${SITE_URL}/#author` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        datePublished: reflection.date,
        dateModified: reflection.updated || reflection.date,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        image: socialImage || `${SITE_URL}/welcome-span.jpg`,
        ...(reflection.study && {
          // Point the crawler at the study this reflection is promoting so the
          // two pages are understood as related rather than duplicative.
          about: {
            '@type': 'Article',
            name: reflection.study.title,
            url: `${SITE_URL}/bible-studies/${reflection.study.slug}`,
          },
        }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Reflections',
            item: `${SITE_URL}/reflections`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: reflection.title,
            item: canonical,
          },
        ],
      },
    ],
  }

  return (
    <Layout
      meta={{
        title: reflection.title,
        description: reflection.description,
        canonical,
        ogType: 'article',
        ogImage: socialImage,
        ogImageWidth: socialImage ? 1280 : undefined,
        ogImageHeight: socialImage ? 720 : undefined,
        publishedTime: reflection.date,
        modifiedTime: reflection.updated || reflection.date,
        author: reflection.author,
        structuredData,
      }}
    >
      <Container className="study-content py-4">
        <nav aria-label="Breadcrumb" className="d-print-none mb-3 small">
          <Link href="/reflections">← All reflections</Link>
        </nav>

        {reflection.draft && (
          <Badge bg="warning" text="dark" className="mb-3">
            Draft, not published in production builds
          </Badge>
        )}

        <Heading>{reflection.title}</Heading>

        <p className="text-muted small">
          By{' '}
          <Link href="/about" className="text-muted underline">
            {reflection.author}
          </Link>{' '}
          ·{' '}
          <time dateTime={reflection.date}>
            {formatReflectionDate(reflection.date)}
          </time>
        </p>

        {reflection.image && (
          // next/image needs a loader this statically exported site has no
          // runtime for; study content renders plain <img> for the same reason.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={reflection.image}
            alt={reflection.imageAlt || reflection.title}
            className="img-fluid rounded mb-4"
          />
        )}

        {reflection.videoSrc && (
          <div className="video d-print-none">
            <iframe
              src={reflection.videoSrc}
              aria-label={`Video for ${reflection.title}.`}
              title={`${reflection.title} Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div dangerouslySetInnerHTML={{ __html: reflection.content }}></div>

        {reflection.study && (
          <Card className="bg-light my-4 d-print-none">
            <Card.Body>
              <h2 className="h5">Keep reading</h2>
              <p className="mb-3">{reflection.study.description}</p>
              <Button
                href={`/bible-studies/${reflection.study.slug}`}
                variant="primary"
              >
                Read the full study: {reflection.study.title}
              </Button>
            </Card.Body>
          </Card>
        )}

        <ShareBar
          url={canonical}
          title={reflection.title}
          image={socialImage}
          label="Share this reflection"
        />
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  return { props: { reflection: getReflectionBySlug(params.slug) } }
}

export async function getStaticPaths() {
  const paths = getAllReflections().map((reflection) => ({
    params: { slug: reflection.slug },
  }))
  return { paths, fallback: false }
}
