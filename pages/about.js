import Layout from "../components/layout";
import { Container } from "react-bootstrap";

export default function About(props) {
return(
  <Layout>
    <Container>
      <h5 className="border-bottom pb-4 pt-3">About</h5>
      <p>Thank you for your interest in <a href="https://inspiredscripture.com">inspiredscripture.com</a>. More information is coming soon about this site.</p>
      <p>This site is developed openly. If you have corrections and enhancements you would like to report or make please see <a href="https://github.com/strake7/inspired-scripture" target="_blank">the repository on GitHub</a>.</p>
    </Container>
  </Layout>
)
}