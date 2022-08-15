// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import "../public/CSS/index.css";
import "../public/CSS/play.css";

// import 'bootstrap/dist/css/bootstrap.css'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300;1,400&display=swap" rel="stylesheet"></link>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossOrigin="anonymous"
    />
    </Head>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
