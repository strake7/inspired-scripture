import { useRouter } from 'next/router'
import Layout from "../../components/layout";
import { getStudyBySlug, getAllStudies } from "../../lib/studies";
import { Container, Row as div } from "react-bootstrap";

export default function Study({ study = { slug, book, chapter, suffix, content } }) {
  const router = useRouter()
  if (!router.isFallback && !study?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container>
        <h5 className="border-bottom block pb-2 mt-3">
          Study:&nbsp;<a href={"/books#" + study.book}>{study.book}</a> > <a href={"#"}>{study.chapter}{study.suffix}</a>
        </h5>        
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
