import Layout from "../components/layout";
import { Container } from "react-bootstrap";
import Heading from '../components/heading';
import Link from 'next/link';

export default function About(props) {
  return (
    <Layout meta={{ title: "About", description: "About inspiredscripture.com." }}>
      <Container>
        <Heading className="border-bottom pb-4 pt-3">About</Heading>
        <p>The purpose of this web site is to equip and encourage believers in Christ to see the relevance of the Old Testament to modern life. Under the inspiration of the Holy Spirit, Paul revealed that every single book of the Old Testament is both “inspired” and also “profitable for teaching, for reproof, for correction, for training in righteousness;” (2 Tim. 3:16). Most believers would profess that the Old Testament is “inspired.” Yet, few would use a book like Leviticus, Numbers or Deuteronomy for “for teaching, for reproof, for correction, for training in righteousness.”</p>
        <p>Believers in Christ are correctly taught that He fulfilled all of the tests for salvation. Yet, believers are rarely taught how the Old Testament can still be relevant to their walk for reasons unrelated to salvation. Although the list is not all inclusive, these studies seek show how God's Law and the Old Testament explain how to:</p>
            <ol>
              <li>Walk in fellowship with Jesus after finding salvation with Him</li>
              <li>Maintain God's standards of holiness as a believer</li>
              <li>Receive the fullness of Jesus' intended blessings</li>
              <li>Be His salt in the wound of sin</li>
              <li>Trust in God's sovereignty and faithfulness</li>
        <li>Defend the Word and having faith in it to share it with others</li>
        <li>Establish the right relationships and church structure to ensure growth and accountability</li>
        </ol>
        <p>Most chapters are separately organized into at least seven lessons. Based upon Paul's teachings, these studies adopt both a historical and simultaneous allegorical approach to the Old Testament wherever possible (Gal. 4:24). These studies also quote from the New American Standard Bible. </p>
        <p>Find us on here:</p>
        <ul>
          <li><a href="https://www.facebook.com/inspiredscripture" target="_blank" rel="noreferrer">Facebook Page</a></li>
          <li><a href="https://www.facebook.com/groups/inspiredscript" target="_blank" rel="noreferrer">Facebook Group</a></li>
          <li><a href="https://twitter.com/johninspireword" target="_blank" rel="noreferrer">Twitter</a></li>
          <li><a href="https://www.instagram.com/inspiredscripture/" target="_blank" rel="noreferrer">Instagram</a></li>
          <li><a href="https://www.pinterest.com/inspiredscripture/" target="_blank" rel="noreferrer">Pinterest</a></li>
          <li><a href="https://www.linkedin.com/in/john-inspire-093b12269" target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href="https://www.youtube.com/channel/UCNqjGYi58K4RQZ5dl4mvcNQ" target="_blank" rel="noreferrer">YouTube</a></li>
        </ul>
        <p>This site is developed openly. If you have corrections and enhancements you would like to report or make please see <a href="https://github.com/strake7/inspired-scripture" target="_blank" rel="noreferrer">the repository on GitHub</a>.</p>
        <p>
          Thank you for your interest in <a href="https://inspiredscripture.com">inspiredscripture.com</a>.
        </p>
      </Container>
    </Layout>
  )
}
