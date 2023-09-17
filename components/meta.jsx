import Head from 'next/head'

export default function Meta({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </Head>
  )
}
