import Layout from "../../components/layout"
import { Container, ListGroup, Col, Row } from "react-bootstrap"
import { getAllStudies } from "../../lib/studies";
import Heading from "../../components/heading";
import { ORDERED_BOOKS } from "../../lib/books";
import { useRouter } from "next/router";

export default function Books({ studiesByBook }) {
  const route = useRouter()
  if (!route.isReady)
    return null;
  const defaultActiveKey = parseRouteForDefaultBookKey(route) ?? "#" + ORDERED_BOOKS[0];
  return (
    <Layout meta={{ title: "Bible Studies by Book", description: "John Edson's bible studies and commentary grouped sequentially by old testament book." }} >
      <Container>
        <Heading>Bible Studies by Book</Heading>
        <Row>
          <Col sm={3}>
            <div className="sidebar">
              <ListGroup defaultActiveKey={defaultActiveKey} variant="flush">
                {
                  ORDERED_BOOKS.map((bookName) => (
                    <ListGroup.Item action href={"#" + bookName} key={bookName}>{bookName}</ListGroup.Item>
                  ))
                }
              </ListGroup>
            </div>
          </Col>
          <Col sm={9}>
            {ORDERED_BOOKS.map((bookName) => (
              <section id={bookName} key={bookName}>
                <h2 className="h5 mt-2">{bookName}</h2>
                <hr />
                {studiesList(studiesByBook[bookName])}
              </section>
            ))}
          </Col>
        </Row>
      </Container>
    </Layout >
  )

  function parseRouteForDefaultBookKey(route) {
    const matches = decodeURI(route.asPath).match('#.*$');
    if (!matches) return null;

    return matches[0];
  }

  function studiesList(studies) {
    if (!studies || studies.length == 0)
      return (<p>Coming soon!</p>)
    return (
      <div className='d-flex flex-wrap'>
        {studies.map((study) => {
          return (
            <a key={study.slug} className="p-1" style={{ minWidth: '200px', textAlign: 'center' }} href={`/bible-studies/${study.slug}`}>{study.book} {study.chapter} {study.suffix}</a>
          )
        })}
      </div>
    )
  }
}

export async function getStaticProps({ params }) {
  console.log(params)
  const allStudies = getAllStudies()
  //group and warn missing  
  var studiesByBook = allStudies.reduce((rv, x) => {
    const book = x.book;
    if (!book) {
      console.debug(`Ignoring ${x.slug} - no book value defined`);
      return rv
    }

    if (!ORDERED_BOOKS.includes(book))
      console.warn(`Book ${book} is not recognized and will be ignored from the study list.`)
    if (rv[book])
      rv[book].push(x)
    else
      rv[book] = [x]
    return rv
  }, {})
  return {
    props: {
      studiesByBook
    }
  }
}
