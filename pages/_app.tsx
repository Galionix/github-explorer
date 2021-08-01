import { getSession, useSession } from 'next-auth/client';
// import '../styles/globals.css'
import { Provider as AuthProvider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { useUserStore } from './../utils/useUserStore';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  ApolloConsumer
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context';
import { DefaultSession } from 'next-auth';
import { useState } from 'react';
import { Session } from '@/ts/interfaces';
import '@/styles/index.scss'
import { Navigation } from './../src/components/Nav/Navigation';



function MyApp({ Component, pageProps }: AppProps) {


  // type AuthenticatedUser = {
  //   // user: {
  //   login: string
  //   name?: string
  //   picture?: string
  //   accessToken?: string
  //   // }
  // }


  const userStore =
    useUserStore((state) => state.user);
  const setUser =
    useUserStore((state) => state.setUser);
  const setOwnerFilter =
    useUserStore((state) => state.setOwnerFilter);

  // if (session) 

  // useEffect(() => {

    // if (!loading)
    //   if (session?.user)
  //   setOwnerFilter(session?.user?.login)
  // }, [session?.user?.login])


  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | any>(null)


  useEffect(() => {




    // const [session, loading]
    //   : [session: Session | null, loading: boolean | null] = useSession()
    // console.log("%c 🕵️‍♂️: MyApp -> session ",
    //   "font-size:16px;background-color:#871f01;color:white;",
    //   session)

    if (userStore) {




      const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
      });

      const authLink = setContext((_, { headers }) => {
        // const user = session?.user!
        // if (!user) return
        // get the authentication token from local storage if it exists
        const token = userStore.accessToken;
        // console.log("%c ⬇️: authLink -> token ",
        //   "font-size:16px;background-color:#cc9bd1;color:white;", token)
        // return the headers to the context so httpLink can read them
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          }
        }
      });



      setClient(
        new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache()
        })

      )
    }
  }, [userStore])

  useEffect(() => {
    (async () => {
      const session: any = await getSession()
      setUser(session?.user)

      // console.log("%c 🇵🇱: MyApp -> session ",
      //   "font-size:16px;background-color:#76ce59;color:white;", session)
    })()
    // console.log("%c 🥛: client ", "font-size:16px;background-color:#2baa13;color:white;", client)

  }, [])



  return <AuthProvider
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
    <ApolloProvider
      client={client || {}}
    >

      {/* {client && <p>client got!</p>} */}


      <Navigation />
      <Component {...pageProps} client={client} />

    </ApolloProvider>
  </AuthProvider>
}
export default MyApp
