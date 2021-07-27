import { useSession } from 'next-auth/client';
import {
    ApolloClient,
    InMemoryCache,
    gql,
    createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { useEffect } from 'react';
const API_URL: string = 'https://api.github.com/graphql'



export default function Repositories() {

    const [session, loading] = useSession()

    const REPOS_QUERY = gql`
  query user(login: "${session?.user?.login}") {
    repositories(first: 10) {
      nodes {
        name
        updatedAt
        createdAt
        url
        diskUsage
        stargazerCount
      }
      pageInfo {
        endCursor
        startCursor
      }
    }
  }
`;

    const httpLink = createHttpLink({
        uri: API_URL,
    });

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = session?.user?.accessToken;
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    const get_repos = async () => {
        const repos = await client.query({
            query: gql`
            					query Query {
	

                        user(login: "${session?.user?.login}) {
                            repositories(first: 10) {
                            nodes {
                                name
                                updatedAt
                                createdAt
                                url
                                diskUsage
                                stargazerCount
                            }
                            pageInfo {
                                endCursor
                                startCursor
                            }
                            }
                        }
						
					}
   
				`,
        }).then(response => response)
        console.log("%c 👷‍♀️: repos ", "font-size:16px;background-color:#2dcaa3;color:white;", repos)
        return repos
    }
    get_repos()
    useEffect(() => {

        return () => {

        }
    }, [])




    return (
        <div>
            {session?.user?.accessToken}
        </div>
    )
}
