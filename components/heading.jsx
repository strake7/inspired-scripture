import { Col, Container, Row } from 'react-bootstrap'

// Page title. `band` renders the full-bleed header used by landing pages,
// optionally with supporting copy via `lead`. Without it the title renders
// inline, for pages whose h1 sits below a breadcrumb or toolbar and should
// not push the content down.
export default function Heading({ children, band = false, lead }) {
  if (!band) {
    return <h1>{children}</h1>
  }

  return (
    <div className="bg-light border-bottom py-5">
      <Container>
        <Row>
          <Col lg={8}>
            <h1 className="display-4 mb-3">{children}</h1>
            {lead && <p className="lead mb-0">{lead}</p>}
          </Col>
        </Row>
      </Container>
    </div>
  )
}
