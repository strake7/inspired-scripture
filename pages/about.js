import Layout from "../components/layout";
import { Container } from "react-bootstrap";
import Heading from '../components/heading';

export default function About(props) {
return(
  <Layout>
    <Container>
      <Heading className="border-bottom pb-4 pt-3">About</Heading>
      <p>Thank you for your interest in <a href="https://inspiredscripture.com">inspiredscripture.com</a>. More information is coming soon about this site.</p>
      <p>This site is developed openly. If you have corrections and enhancements you would like to report or make please see <a href="https://github.com/strake7/inspired-scripture" target="_blank" rel="noreferrer">the repository on GitHub</a>.</p>
    </Container>
  </Layout>
)
}