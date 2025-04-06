import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faPinterest,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Layout from '../components/layout'

export default function About() {
  return (
    <Layout
      meta={{
        title: 'About',
        description:
          'About inspiredscripture.com - Equipping believers with relevant Old Testament studies.',
      }}
    >
      <div className="pt-5">
        <Container>
          <Row className="align-items-center">
            <Col>
              <h1 className="display-4 mb-3">Our Mission</h1>
              <p className="lead">
                Equipping believers in Christ to discover the relevance and
                richness of the Old Testament for modern Christian life.
              </p>
            </Col>
            {/* <Col md={4} className="text-center"></Col> */}
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          <Col lg={8}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h2 className="h4 mb-3 border-bottom pb-2">Our Purpose</h2>
                <p>
                  Under the inspiration of the Holy Spirit, Paul revealed that
                  every single book of the Old Testament is both "inspired" and
                  also "profitable for teaching, for reproof, for correction,
                  for training in righteousness;" (2 Tim. 3:16). Most believers
                  would profess that the Old Testament is "inspired." Yet, few
                  would use a book like Leviticus, Numbers or Deuteronomy for
                  "for teaching, for reproof, for correction, for training in
                  righteousness."
                </p>
                <p>
                  Believers in Christ are correctly taught that He fulfilled all
                  of the tests for salvation. Yet, believers are rarely taught
                  how the Old Testament can still be relevant to their walk for
                  reasons unrelated to salvation.
                </p>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h2 className="h4 mb-3 border-bottom pb-2">
                  How The Old Testament Can Help You
                </h2>
                <Row>
                  <Col md={6}>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <div className="d-flex">
                          <div className="me-2 text-primary">→</div>&nbsp;
                          <div>
                            Walk in fellowship with Jesus after finding
                            salvation
                          </div>
                        </div>
                      </li>
                      <li className="mb-2">
                        <div className="d-flex">
                          <div className="me-2 text-primary">→</div>&nbsp;
                          <div>Maintain God's standards of holiness</div>
                        </div>
                      </li>
                      <li className="mb-2">
                        <div className="d-flex">
                          <div className="me-2 text-primary">→</div>&nbsp;
                          <div>
                            Receive the fullness of Jesus' intended blessings
                          </div>
                        </div>
                      </li>
                      <li className="mb-2">
                        <div className="d-flex">
                          <div className="me-2 text-primary">→</div>&nbsp;
                          <div>Be His salt in the wound of sin</div>
                        </div>
                      </li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <div className="d-flex">
                          {' '}
                          <div className="me-2 text-primary">→</div>&nbsp;
                          <div>Trust in God's sovereignty and faithfulness</div>
                        </div>
                      </li>
                      <li className="mb-2">
                        <div className="d-flex">
                          <div className="me-2 text-primary">→</div>&nbsp;
                          <div>Defend the Word and have faith to share it</div>
                        </div>
                      </li>
                      <li className="mb-2">
                        <div className="d-flex">
                          <div className="me-2 text-primary">→</div>&nbsp;
                          <div>
                            Establish right relationships and church structure
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h2 className="h4 mb-3 border-bottom pb-2">Our Approach</h2>
                <p>
                  Most chapters are separately organized into at least seven
                  lessons. Based upon Paul's teachings, these studies adopt both
                  a historical and simultaneous allegorical approach to the Old
                  Testament wherever possible (Gal. 4:24). These studies also
                  quote from the New American Standard Bible.
                </p>
                <p className="mb-0">
                  <Link href="/#bible-studies">
                    <a className="btn btn-primary">Explore Bible Studies</a>
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h2 className="h4 mb-3 border-bottom pb-2">Connect With Us</h2>
                <div className="d-flex flex-wrap justify-content-center mb-3">
                  <a
                    href="https://www.facebook.com/inspiredscripture"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary"
                    aria-label="Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                  </a>
                  <a
                    href="https://www.facebook.com/groups/inspiredscript"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary"
                    aria-label="Facebook Group"
                  >
                    <FontAwesomeIcon icon={faFacebook} size="lg" /> Group
                  </a>
                  <a
                    href="https://twitter.com/johninspireword"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary"
                    aria-label="Twitter"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                  </a>
                  <a
                    href="https://www.instagram.com/inspiredscripture/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary"
                    aria-label="Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                  </a>
                  <a
                    href="https://www.pinterest.com/inspiredscripture/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary"
                    aria-label="Pinterest"
                  >
                    <FontAwesomeIcon icon={faPinterest} size="lg" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/john-inspire-093b12269"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCNqjGYi58K4RQZ5dl4mvcNQ"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary"
                    aria-label="YouTube"
                  >
                    <FontAwesomeIcon icon={faYoutube} size="lg" />
                  </a>
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h3 className="h5 mb-3">Contribute</h3>
                <p>
                  This site is developed openly. If you have corrections or
                  enhancements you would like to report or make, please visit
                  our GitHub repository.
                </p>
                <a
                  href="https://github.com/strake7/inspired-scripture"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-secondary"
                >
                  <FontAwesomeIcon icon={faGithub} className="me-2" />
                  &nbsp;View on GitHub
                </a>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4 bg-light">
              <Card.Body className="text-center">
                <h3 className="h5 mb-3">Thank You</h3>
                <p className="mb-0">
                  Thank you for your interest in{' '}
                  <a href="https://inspiredscripture.com" className="fw-bold">
                    inspiredscripture.com
                  </a>
                  . We hope these resources bless your walk with Christ.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
