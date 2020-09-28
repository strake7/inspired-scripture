import Layout from "../components/layout"
import { Container, Col, Row, ListGroup } from "react-bootstrap"
import { getAllTopics } from "../lib/topics";
import Heading from "../components/heading";
function Topics({ allTopics }) {
  return (
    <Layout>
      <Container>
        <Heading>Studies by Topic</Heading>
        <Row>
          <Col xs={12} sm={5} md={3}>
            <ListGroup>
              {allTopics.map((topic) => (
                <ListGroup.Item action href={"#" + topic.slug}>
                  {topic.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          {/* <Nav defaultActiveKey="" className="flex-column">
          
          </Nav> */}
          <Col id="topics-content" xs={12} sm={7} md={9} data-spy="scroll">
            {allTopics.map((topic) => (
              <div id={topic.slug}>
                <h4>{topic.name}</h4>
                {
                  topic.sections.map((section) =>
                    (
                      <div>
                        <h5>{section.name}</h5>
                        <ol>
                          {section.studies.map((study) => (
                            <li><a href={`/studies/${study.slug}`} target="_blank">{study.name}</a></li>
                          ))}
                        </ol>
                      </div>
                    )
                  )
                }
              </div>
            ))}
          </Col>
        </Row>
        {/* 
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
        </ol> */}
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