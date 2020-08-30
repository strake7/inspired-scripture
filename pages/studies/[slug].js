import {useRouter} from 'next/router'
import fs from 'fs'
import { join } from 'path'

export default function Study({study}){
  // const router = useRouter()
  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />
  // }
  study.content


}

export async function getStaticProps({ params }) {
  //todo move to central js file
  const studiesDirectory = join(process.cwd(), '_studies')
  const realSlug = params.slug.replace(/\.html$/, '')  
  const fullPath = join(studiesDirectory, `${realSlug}.html`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')  
  return {
    props:{
      study: {
        content: fileContents
        // todo book, title, chapter, verse, etc
      }
    }
  }  
}