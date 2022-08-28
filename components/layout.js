import { Container, Row, Nav, Navbar, NavDropdown } from "react-bootstrap"
import Meta from './meta'
import Scripts from "./scripts"
import { ORDERED_BOOKS } from "../lib/books";

export default function Layout({ children, meta = { title, description } }) {
  /** Intentional debt: This is  duplicated from getAllTopics(); it would be
    * nice to source this information from a single location however, at this
    * time, nextjs layouts do not support getStaticProps.
    * https://nextjs.org/docs/basic-features/layouts.
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
    'Sin'
  ]

  return (
    <>
      <Meta title={meta.title} description={meta.description} />
      <Scripts />
      <Navbar bg="light" expand="lg" sticky="top" style={{ borderBottom: '1px solid #ddd' }}>
        <Container>
          <Navbar.Brand href="/" className="text-secondary font-weight-bold">Inspired Scripture</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/about">About</Nav.Link>
              <NavDropdown title="Bible Studies by Topic">
                <NavDropdown.Item href="/#topics">Browse All</NavDropdown.Item>
                <NavDropdown.Divider />
                {navTopics.map((topic) => (
                  <NavDropdown.Item href={"/topics/" + topic.replaceAll(' ', '-').toLowerCase()} key={topic} >{topic}</NavDropdown.Item>
                ))}
              </NavDropdown>
              <NavDropdown title="Bible Studies by Book">
                <NavDropdown.Item href="/#bible-studies">Browse All</NavDropdown.Item>
                <NavDropdown.Divider />
                {ORDERED_BOOKS.map((book) => (
                  <NavDropdown.Item href={"/bible-studies/#" + book} key={book} >{book}</NavDropdown.Item>)
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  )
}
