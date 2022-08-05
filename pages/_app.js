import '../styles/globals.css'
/* import type { AppProps } from 'next/app' */
import { SessionProvider } from 'next-auth/react'

 function MyApp({Component, pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

export default MyApp
