import Ad from '../components/ad'
import React from 'react'
import Layout from '../components/layout'
import {
  Card,
  ListGroup,
  Row,
  Jumbotron,
  Container,
  Col,
} from 'react-bootstrap'
import Heading from '../components/heading'
import Link from 'next/link'
import { getAllTopics } from '../lib/topics'
import { getAllStudies } from '../lib/studies'
import { ORDERED_BOOKS } from '../lib/books'

const Home = ({ allTopics, studiesByBook }) => (
  <Layout
    meta={{
      title: 'Inspired Scripture',
      description:
        'Learn and study about the relevance of the Old Testament to modern life as a believer in Jesus Christ.',
    }}
  >
    <Jumbotron
      className="text-white"
      style={{
        position: 'relative',
        backgroundSize: 'cover',
        backgroundImage: 'url(/welcome-span.jpg)',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          background: '#000',
          opacity: 0.5,
        }}
      ></div>
      <Container
        className="text-center text-light"
        style={{ position: 'relative' }}
      >
        <h2 className="pb-4">Biblical studies for the logical mind</h2>
        <i>
          “All Scripture is inspired by God and profitable for teaching, for
          reproof, for correction, for training in righteousness;” (2 Tim.
          3:16.)
        </i>
      </Container>
    </Jumbotron>
    <Container id="content">
      <Heading>Welcome to Inspired Scripture</Heading>
      <p className="mb-5">
        This is a place of study with content intended to equip and encourage
        you as a believer in Christ to see the relevance of the Old Testament in
        modern life. Studies are organized into at least seven lessons. Based
        upon Paul’s teachings, these studies adopt both a historical and
        simultaneous allegorical approach to the Old Testament wherever possible
        (Gal. 4:24). These studies also quote from the New American Standard
        Bible.
      </p>
      <Row>
        <Col xs={6} className="text-center">
          <Link href="#topics">
            <a className="text-secondary">
              <svg
                width="2rem"
                viewBox="0 0 16 16"
                className="bi bi-card-list"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                />
                <path
                  fillRule="evenodd"
                  d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                />
                <circle cx="3.5" cy="5.5" r=".5" />
                <circle cx="3.5" cy="8" r=".5" />
                <circle cx="3.5" cy="10.5" r=".5" />
              </svg>
              <h5>Bible Studies by Topic</h5>
              <p>Explore studies for unique subjects of worship.</p>
            </a>
          </Link>
        </Col>
        <Col xs={6} className="text-center">
          <Link href="#bible-studies">
            <a className="text-secondary">
              <svg
                width="2rem"
                viewBox="0 0 16 16"
                className="bi bi-book"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1 2.828v9.923c.918-.35 2.107-.692 3.287-.81 1.094-.111 2.278-.039 3.213.492V2.687c-.654-.689-1.782-.886-3.112-.752-1.234.124-2.503.523-3.388.893zm7.5-.141v9.746c.935-.53 2.12-.603 3.213-.493 1.18.12 2.37.461 3.287.811V2.828c-.885-.37-2.154-.769-3.388-.893-1.33-.134-2.458.063-3.112.752zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"
                />
              </svg>
              <h5>Bible Studies by Book</h5>
              <p>Explore studies for each book of the Bible.</p>
            </a>
          </Link>
        </Col>
      </Row>
      <hr className="mt-sm-5 mb-sm-5" />
      <h2 id="topics">Bible Studies by Topic</h2>
      <Row>
        {allTopics.map((topic) => (
          <Col md={6} xl={4} key={topic.name}>
            <a href={'/topics/' + topic.slug} className="text-dark">
              <Card className="text-center mb-3">
                <Card.Body>
                  <Card.Title>{topic.name}</Card.Title>
                  <Card.Text>
                    <i>
                      {topic.sections.map((section) => section.name).join(', ')}
                    </i>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-primary">
                  {
                    topic.sections.map((section) => section.studies).flat()
                      .length
                  }{' '}
                  studies
                </Card.Footer>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
      <hr className="mt-sm-5 mb-sm-5" />
      <h2 id="bible-studies">Bible Studies by Book</h2>
      <Row>
        <Col sm={3}>
          <div className="sidebar">
            <ListGroup defaultActiveKey={ORDERED_BOOKS[0]} variant="flush">
              {ORDERED_BOOKS.map((bookName) => (
                <ListGroup.Item action href={'#' + bookName} key={bookName}>
                  {bookName}
                </ListGroup.Item>
              ))}
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
  </Layout>
)

function studiesList(studies) {
  if (!studies || studies.length == 0) return <p>Coming soon!</p>
  return (
    <div className="d-flex flex-wrap">
      {studies.map((study) => {
        return (
          <a
            key={study.slug}
            className="p-1"
            style={{ minWidth: '200px', textAlign: 'center' }}
            href={`/bible-studies/${study.slug}`}
          >
            {study.book} {study.chapter} {study.suffix}
          </a>
        )
      })}
    </div>
  )
}

export default Home

export function getStaticProps({ params }) {
  const allTopics = getAllTopics()
  const allStudies = getAllStudies()
  //group and warn for missing
  var studiesByBook = allStudies.reduce((rv, x) => {
    const book = x.book
    if (!book) {
      console.debug(`Ignoring ${x.slug} - no book value defined`)
      return rv
    }

    if (!ORDERED_BOOKS.includes(book))
      console.warn(
        `Book ${book} is not recognized and will be ignored from the study list.`,
      )
    if (rv[book]) rv[book].push(x)
    else rv[book] = [x]
    return rv
  }, {})
  return {
    props: {
      allTopics,

      studiesByBook,
    },
  }
}
