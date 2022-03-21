import { useRouter } from 'next/router'
import Layout from "../../components/layout";
import { getAllTopics, getTopicBySlug } from "../../lib/topics";
import { Container, Row, Col } from "react-bootstrap";
import Heading from '../../components/heading';
import ErrorPage from 'next/error'

export default function Study({ topic = { slug, name, sections } }) {
  const router = useRouter()
  if (!router.isFallback && !topic?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container className="study-content">
        <Heading>
          Bible Study Topic:&nbsp;{topic.name}
        </Heading>
        <Row>
          {topic.sections.map((section) => (
            <Col sm={12} md={6} key={section.name}>
              <h6 className='h6'>{section.name}</h6>
              <ol>
                {section.studies.map((study, i) => (
                  <li key={study.slug + i}><a href={`/studies/${study.slug}`}>{study.name}</a></li>
                ))}
              </ol>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  return {
    props: {
      topic: getTopicBySlug(params.slug)
    }
  }
}

export function getStaticPaths() {
  const topics = getAllTopics(['slug'])
  return {
    paths: topics.map((t) => {
      return {
        params: {
          slug: t.slug,
        },
      }
    }),
    fallback: false, //TODO: set to true when ready
  }
}
