import Layout from "../components/layout"
import { Container, Accordion, Card, Button } from "react-bootstrap"
import { getAllStudies } from "../lib/studies";
const ORDERED_BOOKS = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles']

export default function Books({ studiesByBook }) {
  console.log(studiesByBook)
  return (
    <Layout>
      <Container>
        <h5 className="border-bottom pb-3">Studies by Book</h5>
        <Accordion defaultActiveKey={ORDERED_BOOKS[0]}>
          {
            ORDERED_BOOKS.map((bookName) => {
              return (
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={bookName}>
                      {bookName}
                    </Accordion.Toggle>
                  </Card.Header>
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
      <ul>
        {studies.map((study) => {
          return (
            <li key={study.chapter}>
              <a href={`/studies/${study.slug}`}>{study.book} {study.chapter} {study.suffix}</a>
            </li>
          )
        })}
      </ul>
    )
  }
}

export async function getStaticProps({ params }) {
  const allStudies = getAllStudies()
  //group and warn missing  
  var studiesByBook = allStudies.reduce((rv, x) => {
    const book = x.book;
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
