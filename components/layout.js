import { Container, Row, Nav, Navbar } from "react-bootstrap"
import Meta from './meta'
import Scripts from "./scripts"

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Scripts />
      <Navbar bg="light" expand="lg" sticky="top" style={{ borderBottom: '1px solid #ddd'}}>
        <Container>
          <Navbar.Brand href="/" className="text-secondary           s
          font-weight-bold">Inspired Scripture</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/topics">Bible Studies By Topic</Nav.Link>
              <Nav.Link href="/books">Bible Studies By Book</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  )
}