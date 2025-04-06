import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

// tell fontawesome to skip adding CSS automatically since it's imported above
config.autoAddCss = false

export default function InspiredScriptureApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

