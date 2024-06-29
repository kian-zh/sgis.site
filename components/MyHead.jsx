import Head from 'next/head'
import Script from 'next/script'

const MyHead = () => (
    <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="./logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
            name="description"
            content="Jingyuan Zhang's Homepage"
        />
        <meta
            name="keywords"
            content="Jingyuan, Zhang, 张景源, Homepage, GIS, Front-end, developer"
        />
        <title>Jingyuan Zhang</title>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3183132074495367" crossOrigin="anonymous" />
    </Head>
)

export default MyHead
