import {
  Provider as AuthProvider,
  getSession,
} from 'next-auth/client'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { useUserStore } from 'utils/useUserStore'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'
import '@/styles/index.scss'
import {
  Navigation,
  Footer,
} from '@/components/index'

function MyApp({
  Component,
  pageProps,
}: AppProps) {
  const userStore = useUserStore(
    state => state.user
  )
  const setUser = useUserStore(
    state => state.setUser
  )

  const [client, setClient] = useState<
    ApolloClient<NormalizedCacheObject> | any
  >(null)

  useEffect(() => {
    if (userStore) {
      const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
      })

      const authLink = setContext(
        (_, { headers }) => {
          const token = userStore.accessToken
          return {
            headers: {
              ...headers,
              authorization: token
                ? `Bearer ${token}`
                : '',
            },
          }
        }
      )

      setClient(
        new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache(),
        })
      )
    }
  }, [userStore])

  useEffect(() => {
    ; (async () => {
      const session: any = await getSession()
      setUser(session?.user)
    })()
  }, [])

  return (
    <AuthProvider
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
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <ApolloProvider client={client || {}}>
        <Navigation />

        <Component
          {...pageProps}
          client={client}
        />

        <Footer />
      </ApolloProvider>
    </AuthProvider>
  )
}
export default MyApp
