import { useSession } from 'next-auth/client';
import {
    ApolloClient,
    InMemoryCache,
    gql,
    createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { useEffect } from 'react';
import { DefaultSession } from 'next-auth';
const API_URL: string = 'https://api.github.com/graphql'

// interface withUser extends DefaultSession {
//     user?: {
//         name?: string | null
//         email?: string | null
//         picture?: string | null
//         accessToken?: string | null
//     }

// }
type AuthenticatedUser = {
    // user: {
    login: string
    name?: string
    picture?: string
    accessToken?: string
    // }
}

export default function Repositories() {

    const [session, loading] = useSession()

    // @ts-expect-error: Let's ignore a compile error like this unreachable code 
    const user: AuthenticatedUser = session!.user!

    //     const REPOS_QUERY = gql`
    //   query user(login: "${session?.user?.login}") {
    //     repositories(first: 10) {
    //       nodes {
    //         name
    //         updatedAt
    //         createdAt
    //         url
    //         diskUsage
    //         stargazerCount
    //       }
    //       pageInfo {
    //         endCursor
    //         startCursor
    //       }
    //     }
    //   }
    // `;


    const httpLink = createHttpLink({
        uri: API_URL,
    });

    const authLink = setContext((_, { headers }) => {

        // get the authentication token from local storage if it exists
        // @ts-expect-error: Let's ignore a compile error like this unreachable code 
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

        try {


            const repos = await client.query({
                query: gql`
            query Query {
                        user: user(login: "${user.login}") {
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
        catch (err) {
            throw new Error(err)
        }

    }


    useEffect(() => {
        if (user.login)
            get_repos()
        return () => {

        }
    }, [])




    return (
        <div>
            {'Привет'}
        </div>
    )
}
