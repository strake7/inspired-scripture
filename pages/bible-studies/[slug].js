import { useRouter } from 'next/router'
import Layout from "../../components/layout";
import { getStudyBySlug, getAllStudies } from "../../lib/studies";
import { Button, ButtonGroup, Container, Dropdown, DropdownButton } from "react-bootstrap";
import Heading from '../../components/heading';
import ErrorPage from 'next/error'

export default function Study({ study, studiesForBook }) {
  const router = useRouter()
  if (!router.isFallback && !study?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const renderStudyVideo = () =>
    study.videoSrc
      ? (
        <div className="video">
          <iframe width="560" height="315" src={study.videoSrc} title={study.slug + " Study Video"} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      )
      : null;

  return (
    <Layout meta={{ title: study.title, description: study.description }}>
      <Container className="study-content">
        <div className="d-print-none">
          <div className='mt-2 mb-2'>
            <DropdownButton
              as={ButtonGroup}
              variant='info'
              title={study.book + ' Chapter ' + study.chapterLabel}
              className='mr-1'
            >
              {studiesForBook.map((s) => (
                <Dropdown.Item key={s.slug}
                  eventKey={s.slug}
                  active={s.slug === study.slug}
                  href={`/bible-studies/${s.slug}`} >
                  {s.chapterLabel}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Button variant='secondary' onClick={() => window.print()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-printer" viewBox="0 0 16 16">
                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
              </svg>
            </Button>
            {/* <ul style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  listStyleType: 'none',
                }}>
                  {studiesForBook.map((s) => (
                    <li key={s.slug}>
                      <a key={s.slug}
                        className={"p-2 " + (s.slug == study.slug ? ' text-muted font-weight-bolder' : '')}
                        href={`/bible-studies/${s.slug}`}>{s.chapterLabel}</a>
                    </li>
                  ))}
                </ul> */}
          </div>
          <Heading>
            {study.title}
          </Heading>
          {renderStudyVideo()}
        </div>
        <div dangerouslySetInnerHTML={{ __html: study.content }}></div>
      </Container>
    </Layout >
  )
}

export async function getStaticProps({ params }) {
  const study = getStudyBySlug(params.slug, [
    'content'
  ])
  return {
    props: {
      study,
      studiesForBook: getAllStudies().filter(s => s.book === study.book)
    }
  }
}

export async function getStaticPaths() {
  const studies = getAllStudies(['slug'])
  return {
    paths: studies.map((s) => {
      return {
        params: {
          slug: s.slug,
        },
      }
    }),
    fallback: false,
  }
}
