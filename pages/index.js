import React from 'react'
import Layout from '../components/layout'
import { Row, Jumbotron, Container, Col, Card } from 'react-bootstrap';


const Home = () => (
  <Layout>
    <Jumbotron className="text-white" style={{ position: 'relative', backgroundSize: 'cover', backgroundImage: 'url(/welcome-span.jpg)', backgroundPosition: 'center' }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, background: '#000', opacity: 0.5 }}></div>
      <Container className='text-center text-light' style={{ position: 'relative' }}>
        <h2 className='pb-4'>Biblical studies for the logical mind</h2>
        <a href='#content' className="text-light">
          <svg width='2em' height='2em' viewBox='0 0 16 16' class='bi bi-chevron-down' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z' />
          </svg>
        </a>
      </Container>
    </Jumbotron>
    <Container id='content'>
      <h5 className="border-bottom block pb-3">Welcome to Inspired Scripture</h5>
      <p>The purpose of this web site is to equip and encourage believers in Christ to see the relevance of the Old Testament to modern life. Under the inspiration of the Holy Spirit, Paul revealed that every single book of the Old Testament is both “inspired” and also “profitable for teaching, for reproof, for correction, for training in righteousness;” (2 Tim. 3:16). Most believers would profess that the Old Testament is “inspired.” Yet, few would use a book like Leviticus, Numbers or Deuteronomy for “for teaching, for reproof, for correction, for training in righteousness.”</p>
      <p>Believers in Christ are correctly taught that He fulfilled all of the tests for salvation. Yet, believers are rarely taught how the Old Testament can still be relevant to their walk for reasons unrelated to salvation. Although the list is not all inclusive, these studies seek show how God’s Law and the Old Testament explain how to:</p>
      <ol>
        <li>Walk in fellowship with Jesus after finding salvation with Him</li>
        <li>Maintain God’s standards of holiness as a believer</li>
        <li>Receive the fullness of Jesus’ intended blessings</li>
        <li>Be His salt in the wound of sin</li>
        <li>Celebrate Jesus as He intended during His holy days</li>
        <li>Defend the Word and having faith in it to share it with others</li>
        <li>Establish the right relationships and church structure to ensure growth and accountability</li>
      </ol>
      <p>Most chapters are separately organized into at least seven lessons. Based upon Paul’s teachings, these studies adopt both a historical and simultaneous allegorical approach to the Old Testament wherever possible (Gal. 4:24). These studies also quote from the New American Standard Bible. </p>
      <hr />
      <Row>
        <Col xs={6} className="text-center">
          <a href="/topics" className="text-secondary">
            <svg width="2rem" viewBox="0 0 16 16" class="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
              <path fill-rule="evenodd" d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
              <circle cx="3.5" cy="5.5" r=".5" />
              <circle cx="3.5" cy="8" r=".5" />
              <circle cx="3.5" cy="10.5" r=".5" />
            </svg>
            <h5>Studies by Topic</h5>
            <p>Explore studies for unique subjects of worship.</p>
          </a>
        </Col>
        <Col xs={6} className="text-center">
          <a href="/books" className="text-secondary">
            <svg width="2rem" viewBox="0 0 16 16" class="bi bi-book" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M1 2.828v9.923c.918-.35 2.107-.692 3.287-.81 1.094-.111 2.278-.039 3.213.492V2.687c-.654-.689-1.782-.886-3.112-.752-1.234.124-2.503.523-3.388.893zm7.5-.141v9.746c.935-.53 2.12-.603 3.213-.493 1.18.12 2.37.461 3.287.811V2.828c-.885-.37-2.154-.769-3.388-.893-1.33-.134-2.458.063-3.112.752zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
            <h5>Studies by Book</h5>
            <p>Explore studies for each book of the Bible.</p>
          </a>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default Home
