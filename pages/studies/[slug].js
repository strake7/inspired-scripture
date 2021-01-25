import { useRouter } from 'next/router'
import Layout from "../../components/layout";
import { getStudyBySlug, getAllStudies } from "../../lib/studies";
import { Container, Row as div } from "react-bootstrap";
import Heading from '../../components/heading';

export default function Study({ study = { slug, book, chapter, suffix, content } }) {
  const router = useRouter()
  if (!router.isFallback && !study?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container className="study-content">
        {study.book &&
          <Heading>
            Study:&nbsp;<a href={"/books#" + study.book}>{study.book}</a> / <a href={"#"}>{study.chapter}&nbsp;{study.suffix}</a>
          </Heading>
        }
        <div dangerouslySetInnerHTML={{ __html: study.content }}></div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const study = getStudyBySlug(params.slug, [
    'content'
  ])
  return {
    props: {
      study
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
