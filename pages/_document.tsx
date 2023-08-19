import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="/static/fonts/boxicons.css" />
        <link rel="stylesheet" href="/static/styles/core.css" />
        <link rel="stylesheet" href="/static/styles/theme-default.css" />
        <link rel="stylesheet" href="/static/styles/demo.css" />
        <link rel="stylesheet" href="/static/styles/perfect-scrollbar.css" />
        <link rel="stylesheet" href="/static/styles/apex-charts.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
