import '../styles/globals.css'
//  import VisiterCounter from '../components/VisiterCounter'
import { GoogleAnalytics } from '@next/third-parties/google'

// 新创建的 `pages/_app.js` 文件中必须有此默认的导出（export）函数
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <GoogleAnalytics gaId="G-VBJQ7WS3V4" />
      <Component {...pageProps} />
      {/*<VisiterCounter />*/}
    </div>
  )
}
