import Layout from "../../components/layout";
import { Card, Container, Col, Row } from "react-bootstrap";
import { getAllTopics } from "../../lib/topics";
import Heading from "../../components/heading";

function Topics({ allTopics }) {
  const title = 'Bible Studies by Topic'
  return (
    <Layout meta={{ title, description: "John Edson's bible studies and commentary organized by spirtual topics." }}>
      <Container>
        <Heading>{title}</Heading>
        <Row>
          {allTopics.map((topic) => (
            <Col md={6} xl={4} key={topic.name}>
              <a href={"/topics/" + topic.slug} className="text-dark">
                <Card className="text-center mb-3">
                  <Card.Body>
                    <Card.Title>{topic.name}</Card.Title>
                    <Card.Text>
                      <i>
                        {topic.sections
                          .map((section) => (section.name))
                          .join(", ")}
                      </i>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-primary">
                    {topic.sections.map((section) => section.studies).flat().length} studies</Card.Footer>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  )
}

export default Topics

export function getStaticProps({ params }) {
  const allTopics = getAllTopics()
  return {
    props: {
      allTopics
    }
  }
}