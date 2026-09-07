import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { getStudyBySlug, getAllStudies } from '../../lib/studies'
import { partitionArray } from '../../lib/utils'
import {
  Button,
  ButtonGroup,
  Container,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap'
import Heading from '../../components/heading'
import ErrorPage from 'next/error'

export default function Study({ study, studiesForBook }) {
  const router = useRouter()
  if (!router.isFallback && !study?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const renderStudyVideo = () =>
    study.videoSrc ? (
      <div className="video">
        <iframe
          src={study.videoSrc}
          aria-label={`Bible study video for ${study.slug}.`}
          title={study.slug + ' Study Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    ) : null
  // Generate structured data for the study
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://inspiredscripture.com/#author',
        name: 'John Edson',
        url: 'https://inspiredscripture.com/about',
      },
      {
        '@type': 'Organization',
        '@id': 'https://inspiredscripture.com/#organization',
        name: 'Inspired Scripture',
        url: 'https://inspiredscripture.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://inspiredscripture.com/welcome-span.jpg',
        },
      },
      {
        '@type': 'Article',
        headline: study.title,
        description: study.description,
        author: { '@id': 'https://inspiredscripture.com/#author' },
        publisher: { '@id': 'https://inspiredscripture.com/#organization' },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://inspiredscripture.com/bible-studies/${study.slug}`,
        },
        image: 'https://inspiredscripture.com/welcome-span.jpg',
        ...(study.videoPublishedAt && {
          datePublished: study.videoPublishedAt,
          dateModified: study.videoPublishedAt,
        }),
      },
      ...(study.videoSrc
        ? [
            {
              '@type': 'VideoObject',
              name: `${study.title} - Bible Study Video`,
              description: study.description,
              thumbnailUrl: `https://img.youtube.com/vi/${study.videoSrc.split('/embed/')[1]?.split('?')[0]}/maxresdefault.jpg`,
              uploadDate: study.videoPublishedAt || undefined,
              contentUrl: study.videoSrc,
              embedUrl: study.videoSrc,
            },
          ]
        : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://inspiredscripture.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Bible Studies',
            item: 'https://inspiredscripture.com/#bible-studies',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: study.title,
            item: `https://inspiredscripture.com/bible-studies/${study.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <Layout
      meta={{
        title: study.title,
        description: study.description,
        canonical: `https://inspiredscripture.com/bible-studies/${study.slug}`,
        ogType: 'article',
        ogImage: study.videoSrc
          ? `https://img.youtube.com/vi/${study.videoSrc.split('/embed/')[1]?.split('?')[0]}/maxresdefault.jpg`
          : undefined,
        ogImageWidth: study.videoSrc ? 1280 : undefined,
        ogImageHeight: study.videoSrc ? 720 : undefined,
        author: 'John Edson',
        structuredData,
      }}
    >
      <Container className="study-content">
        <div className="d-print-none">
          <div className="mt-2 mb-2">
            <DropdownButton
              as={ButtonGroup}
              variant="info"
              title={study.book + ' Chapter ' + study.chapterLabel}
              className="me-1"
              aria-label="Select a bible study book & chapter"
            >
              <div style={{ whiteSpace: 'nowrap' }}>
                {partitionArray(studiesForBook, 10).map((p, i) => (
                  <div style={{ display: 'inline-block' }} key={i}>
                    {p.map((s) => (
                      <Dropdown.Item
                        key={s.slug}
                        eventKey={s.slug}
                        active={s.slug === study.slug}
                        href={`/bible-studies/${s.slug}`}
                      >
                        {s.chapterLabel}
                      </Dropdown.Item>
                    ))}
                  </div>
                ))}
              </div>
            </DropdownButton>
            <Button
              variant="secondary"
              onClick={() => window.print()}
              aria-label="Print this Bible study"
            >
              <FontAwesomeIcon icon={faPrint} />
            </Button>
          </div>
          <Heading>{study.title}</Heading>
          {renderStudyVideo()}
        </div>
        <div dangerouslySetInnerHTML={{ __html: study.content }}></div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const study = getStudyBySlug(params.slug, ['content'])
  return {
    props: {
      study,
      studiesForBook: getAllStudies().filter((s) => s.book === study.book),
    },
  }
}

export async function getStaticPaths() {
  const studies = getAllStudies(['slug'])
  const paths = studies.map(({ slug }) => ({
    params: { slug },
  }))

  return { paths, fallback: false }
}
