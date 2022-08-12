import { getAllStudies } from "./studies";

describe('getAllStudies with content', () => {
  let allStudies = getAllStudies(['content'])
  allStudies.forEach(study => {
    describe(`${study.slug}`, () => {
      it('has content', () => {
        expect(study.content).toBeDefined()
        expect(study.content).not.toBeNull()
      })
      it('has title without html', () => {
        expect(study.title).toBeDefined();
        expect(study.title).not.toBeNull();
        expect(study.title).not.toMatch(/\<.*\>.*\<\/.*\>/)
      })
      it('has description without html', () => {
        expect(study.description).toBeDefined();
        expect(study.description).not.toBeNull();
        expect(study.description).not.toMatch(/\<.*\>.*\<\/.*\>/)
      })
    })
  })
}) 