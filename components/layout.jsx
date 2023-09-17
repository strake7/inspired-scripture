import {
  Container,
  Form,
  Col,
  Row,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import Meta from './meta'
import Script from 'next/script'
import Scripts from './scripts'

export default function Layout({ children, meta = { title, description } }) {
  /** Intentional debt: This is  duplicated from getAllTopics(); it would be
   * nice to source this information from a single location however, at this
   * time, nextjs layouts do not support getStaticProps. We can fix this in
   * future versions of nextjs
   * https://nextjs.org/blog/layouts-rfc#layout-and-page-behavior
   */
  const navTopics = [
    'Faith',
    'Spiritual Renewal',
    'Discipleship',
    'Relationships',
    'Service',
    'Leadership',
    'Prayer',
    'Worship',
    'Spiritual Warfare',
    'Stewardship',
    'Jesus in the Old Testament',
    'Attributes of God',
    'Apologetics',
    'End Times',
    'Sin',
  ]
  const navBooks = {
    Genesis: 'genesis-1a.1-8',
    Exodus: 'exodus-1',
    Leviticus: 'leviticus-1',
    Numbers: 'numbers-1.1-4',
    Deuteronomy: 'deuteronomy-1',
    Joshua: 'joshua-1',
    Judges: 'judges-1',
    Ruth: 'ruth-1',
    '1 Samuel': '1-samuel-1',
    '2 Samuel': '2-samuel-1',
    '1 Kings': '1-kings-1',
    '2 Kings': '2-kings-1',
    '1 Chronicles': '1-chronicles-1',
    '2 Chronicles': '2-chronicles-1',
    Ezra: 'ezra-1',
    Nehemiah: 'nehemiah-1',
    Esther: 'esther-1',
    Job: 'job-1',
    Psalm: 'psalm-1',
  }
  return (
    <>
      <Meta title={meta.title} description={meta.description} />
      <Scripts />
      <Navbar
        bg="light"
        expand="lg"
        sticky="top"
        style={{ borderBottom: '1px solid #ddd' }}
      >
        <Container>
          <Navbar.Brand href="/" className="text-secondary font-weight-bold">
            Inspired Scripture
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Item>
                <Script
                  src="https://cse.google.com/cse.js?cx=36dcdc8b2b66146f8"
                  async={true}
                />
                <div style={{ minWidth: '325px' }}>
                  <div className="gcse-search">Loading...</div>
                </div>
              </Nav.Item>
              <Nav.Link href="/about">About</Nav.Link>
              <NavDropdown title="Bible Studies by Topic">
                <NavDropdown.Item href="/#topics">Browse All</NavDropdown.Item>
                <NavDropdown.Divider />
                {navTopics.map((topic) => (
                  <NavDropdown.Item
                    href={'/topics/' + topic.replaceAll(' ', '-').toLowerCase()}
                    key={topic}
                  >
                    {topic}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <NavDropdown title="Bible Studies by Book">
                <NavDropdown.Item href="/#bible-studies">
                  Browse All
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {Object.keys(navBooks).map((k) => (
                  <NavDropdown.Item
                    href={'/bible-studies/' + navBooks[k]}
                    key={k}
                  >
                    {k}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  )
}
