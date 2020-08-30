import { useRouter } from 'next/router'
import Layout from "../../components/layout";
import { getStudyBySlug, getAllStudies } from "../../lib/studies";
import { Row } from "react-bootstrap";

export default function Study({ study }) {
  const router = useRouter()

  if (!router.isFallback && !study?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>      
      <Row className="studyContent" dangerouslySetInnerHTML={{ __html: study.content }}></Row>
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
