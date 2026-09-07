import Link from 'next/link'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/layout'
import Heading from '../../components/heading'
import { getAllReflections } from '../../lib/reflections'
import { formatReflectionDate, youTubeThumbnail } from '../../lib/utils'

const SITE_URL = 'https://inspiredscripture.com'
const DESCRIPTION =
  'Weekly reflections from Inspired Scripture: short readings that open up each new Bible study of the Old Testament.'

export default function Reflections({ reflections }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Inspired Scripture Reflections',
    description: DESCRIPTION,
    url: `${SITE_URL}/reflections`,
    publisher: {
      '@type': 'Organization',
      name: 'Inspired Scripture',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/welcome-span.jpg`,
      },
    },
    blogPost: reflections.map((reflection) => ({
      '@type': 'BlogPosting',
      headline: reflection.title,
      description: reflection.description,
      datePublished: reflection.date,
      url: `${SITE_URL}/reflections/${reflection.slug}`,
    })),
  }

  return (
    <Layout
      meta={{
        title: 'Reflections',
        description: DESCRIPTION,
        canonical: `${SITE_URL}/reflections`,
        structuredData,
      }}
    >
      <Heading band lead={DESCRIPTION}>
        Reflections
      </Heading>

      <Container id="content" className="py-5">
        {reflections.length === 0 && (
          <p>
            No reflections yet, so check back soon or{' '}
            <Link href="/#bible-studies">browse the Bible studies</Link>.
          </p>
        )}

        <Row>
          {reflections.map((reflection) => {
            const thumbnail =
              reflection.image || youTubeThumbnail(reflection.videoSrc)
            const href = `/reflections/${reflection.slug}`
            return (
              <Col md={6} key={reflection.slug} className="mb-4">
                <Card className="h-100 shadow-sm">
                  {/* Every link on the card points at the reflection. The study
                      is named for context but is only linked from the
                      reflection itself, so the listing never routes a reader
                      past the writing it is advertising. */}
                  {thumbnail && (
                    <Link href={href}>
                      <Card.Img
                        variant="top"
                        src={thumbnail}
                        alt={reflection.imageAlt || reflection.title}
                      />
                    </Link>
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h5">
                      <Link href={href} className="text-secondary">
                        {reflection.title}
                      </Link>
                      {reflection.draft && (
                        <Badge bg="warning" text="dark" className="ms-2">
                          Draft
                        </Badge>
                      )}
                    </Card.Title>
                    <Card.Subtitle className="text-muted small mb-2">
                      <time dateTime={reflection.date}>
                        {formatReflectionDate(reflection.date)}
                      </time>
                    </Card.Subtitle>
                    {reflection.study && (
                      <Card.Text className="text-muted small mb-1">
                        On {reflection.study.title}
                      </Card.Text>
                    )}
                    <Card.Text>{reflection.description}</Card.Text>
                    <Link href={href} className="mt-auto">
                      Read the reflection
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </Layout>
  )
}

export function getStaticProps() {
  return { props: { reflections: getAllReflections() } }
}
