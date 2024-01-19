import '../styles/globals.css'
//  import VisiterCounter from '../components/VisiterCounter'

// 新创建的 `pages/_app.js` 文件中必须有此默认的导出（export）函数
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VBJQ7WS3V4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-VBJQ7WS3V4');
    </script>
      <Component {...pageProps} />
      {/*<VisiterCounter />*/}
    </div>
  )
}
