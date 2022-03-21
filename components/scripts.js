import Script from 'next/script';

export default function Scripts() {
  const script = `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-49NRM2V6SJ');`;
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-49NRM2V6SJ" async={true} />
      <Script id='gtag' strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: script
      }} />
    </>
  )
}