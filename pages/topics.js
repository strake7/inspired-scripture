import Layout from "../components/layout"
import { Container } from "react-bootstrap"
import { getAllTopics } from "../lib/topics";
function Topics({ allTopics }) {
  return (
    <Layout>
      <Container>
        Under construction. See our <a href="/books">studies by book page</a> in the meantime!
        <ol>
          {allTopics.map((topic) => (
            <li>{topic.name}
              <ol>
                {topic.sections.map((section) =>
                  (
                    <li>{section.name}
                      <ol>
                        {section.studies.map((study) => (
                          <li><a href={`/studies/${study.slug}`} target="_blank">{study.name}</a></li>
                        ))}
                      </ol>
                    </li>
                  )
                )}
              </ol>
            </li>
          ))}
        </ol>
      </Container>
    </Layout>
  )
}

export default Topics

export async function getStaticProps({ params }) {
  const allTopics = await getAllTopics()
  return {
    props: {
      allTopics
    }
  }
}