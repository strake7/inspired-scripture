import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Nav, Navbar } from "react-bootstrap";


const InspiredScriptureApp = ({ Component, pageProps }) => (
  <>
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand href="/">InspiredScripture</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/topics">Studies By Topic</Nav.Link>
          <Nav.Link href="/books">Studies By Book</Nav.Link>     
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    {/* <nav className="navbar navbar-expand-xl p-0">
          <div className="navbar-brand">
            <a className="text-muted" style={{textDecoration: 'none'}}href="https://inspiredscripture.com/">Inspired Scripture</a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end">
            <ul id="menu-navbar" className="navbar-nav">
              <li id="menu-item-82" className="nav-item menu-item menu-item-type-custom menu-item-object-custom menu-item-82"><a title="Home" href="http://35.203.134.198" className="nav-link">Home</a></li>
              <li id="menu-item-132" className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-132"><a title="About" href="https://inspiredscripture.com/about" className="nav-link">About</a></li>
              <li id="menu-item-121" className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-121"><a title="Studies by Book" href="https://inspiredscripture.com/studies-by-book" className="nav-link">Studies by Book</a></li>
              <li id="menu-item-449" className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-449"><a title="Studies by Topic" href="https://inspiredscripture.com/studies-by-topic" className="nav-link">Studies by Topic</a></li>
            </ul>
          </div>
        </nav> */}
    <Component {...pageProps} />
  </>
)

export default InspiredScriptureApp