import Script from 'next/script';

export default function Scripts() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-49NRM2V6SJ" async={true}/>
      <Script strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-49NRM2V6SJ');`
      }} />
    </>
  )
}