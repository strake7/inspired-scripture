import Layout from "../../components/layout"
import { Container, Accordion, Card, Button } from "react-bootstrap"
import { getAllStudies } from "../../lib/studies";
import Heading from "../../components/heading";
import { ORDERED_BOOKS } from "../../lib/books";
import { useRouter } from "next/router";

export default function Books({ studiesByBook }) {
  const route = useRouter()
  const defaultActiveBook = route.query.book // TODO: This isn't working.
  return (
    <Layout meta={{ title: "Bible Studies by Book", description: "John Edson's bible studies and commentary grouped sequentially by old testament book." }} >
      <Container>
        <Heading>Bible Studies by Book</Heading>
        <Accordion className="pb-4" defaultActiveKey={defaultActiveBook}>
          {
            ORDERED_BOOKS.map((bookName) => {
              return (
                <Card key={bookName} className="">
                  <Accordion.Toggle as={Card.Header} eventKey={bookName}>
                    <a href={'#' + bookName}>
                      {bookName}
                    </a>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={bookName}>
                    <Card.Body>
                      {
                        studiesList(studiesByBook[bookName])
                      }
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )
            })}
        </Accordion>
      </Container>
    </Layout>
  )

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
