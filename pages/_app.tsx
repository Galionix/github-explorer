// import '../styles/globals.css'
import { Provider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useUserStore } from './../utils/useUserStore';

function MyApp({ Component, pageProps }: AppProps) {

  const [session, loading] = useSession()
  // const user =
  //   useUserStore((state) => state.user);
  const setUser =
    useUserStore((state) => state.setUser);
  // if (session) 
  useEffect(() => {
    session && setUser(session.user)

  }, [session])

  return <Provider
    // Provider options are not required but can be useful in situations where
    // you have a short session maxAge time. Shown here with default values.
    options={{
      // Client Max Age controls how often the useSession in the client should
      // contact the server to sync the session state. Value in seconds.
      // e.g.
      // * 0  - Disabled (always use cache value)
      // * 60 - Sync session state with server if it's older than 60 seconds
      clientMaxAge: 0,
      // Keep Alive tells windows / tabs that are signed in to keep sending
      // a keep alive request (which extends the current session expiry) to
      // prevent sessions in open windows from expiring. Value in seconds.
      //
      // Note: If a session has expired when keep alive is triggered, all open
      // windows / tabs will be updated to reflect the user is signed out.
      keepAlive: 0
    }}
    session={pageProps.session} >
    <Component {...pageProps} />
  </Provider>
}
export default MyApp
