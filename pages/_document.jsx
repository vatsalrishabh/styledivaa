import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Fonts Links */}
        <link
          href="https://fonts.googleapis.com/css2?family=Danfo&family=Pacifico&family=Sacramento&display=swap"
          rel="stylesheet"
        />
        <link
  href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&family=Merriweather:wght@400;700&display=swap"
  rel="stylesheet"
/>

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
