import fs from "fs"
import YAML from "yaml";

export function getAllTopics() {
  const file = fs.readFileSync('./lib/topic-index.yml', 'utf-8')
  const topicsIndex = YAML.parse(file)
  // flatten 
  

  const allTopics = Object.keys(topicsIndex).map((topicKey) => {
    const topic = topicsIndex[topicKey]
    // construct topic's sections
    const sections = Object.keys(topic).map((sectionKey) => {
      // construct section's studies
      const studies = topic[sectionKey].map((s) => {
        const nameAndSlugEntry = Object.entries(s)[0]
        return {
          name: nameAndSlugEntry[0],
          slug: nameAndSlugEntry[1]
        }
      })
      // final section obj
      return {
        name: sectionKey,
        studies
      }
    })
    // final topic obj
    return {
      name: topicKey,
      slug: topicKey.replace(' ', '-'),
      sections
    }
  })
  return allTopics
}