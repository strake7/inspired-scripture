import { getAllTopics } from "./topics";
import { getAllStudies } from "./studies";

describe('topics', () => {
  let knownStudySlugs = getAllStudies()
    .map((study) => study.slug)

  let topics = getAllTopics()

  test.each(topics)('topic has name and slug', (topic) => {
    expect(topic.name).not.toBeNull()
    expect(topic.slug).not.toBeNull()
    expect(topic.sections).not.toBeNull()
    expect(topic.sections.length).not.toBe(0)
  })

  describe('sections', () => {
    let sections = topics.flatMap((topic) => topic.sections)
    test.each(sections)('section has name and studies', (section) => {
      expect(section.name).not.toBeNull()
      expect(section.studies.length).not.toBe(0)
    })
    describe('studies', ()=>{
      let studies = sections.flatMap((section)=> section.studies)
      test.each(studies)('%s has name and valid slug', (study) => { 
        expect(study.name).not.toBeNull()         
        expect(knownStudySlugs.indexOf(study.slug)).toBeGreaterThan(-1)
       })
    })
  })
}) 