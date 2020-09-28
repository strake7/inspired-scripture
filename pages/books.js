import Layout from "../components/layout"
import { Container, Accordion, Card, Button } from "react-bootstrap"
import { getAllStudies } from "../lib/studies";
import Heading from "../components/heading";
const ORDERED_BOOKS = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles']

export default function Books({ studiesByBook }) {
  return (
    <Layout>
      <Container>
        <Heading>Studies by Book</Heading>        
        <Accordion defaultActiveKey={ORDERED_BOOKS[0]}>
          {
            ORDERED_BOOKS.map((bookName) => {
              return (
                <Card key={bookName} className="">
                  <Accordion.Toggle as={Card.Header} eventKey={bookName}>
                    {bookName}
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
      <div className='d-flex flex-wrap ' >
        {studies.map((study) => {
          return (
            <a key={study.slug} className="p-1" style={{minWidth:'200px', textAlign:'center'}} href={`/studies/${study.slug}`} target="_blank">{study.book} {study.chapter} {study.suffix}</a>
          )
        })}
      </div>
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
