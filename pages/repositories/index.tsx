import { useSession } from 'next-auth/client';
import {
    ApolloClient,
    InMemoryCache,
    gql,
    createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { useEffect, useMemo } from 'react';
import { DefaultSession } from 'next-auth';
import { useState } from 'react';
import Header from './../../src/components/Header/Header';
import { Column, useTable } from 'react-table'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

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

    const columns = useMemo(
        () => [
            {
                Header: 'Repos',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },

                    {
                        Header: 'createdAt',
                        accessor: 'createdAt',
                    },
                    {
                        Header: 'UPD',
                        accessor: 'updatedAt',
                    },
                    {
                        Header: 'Rating',
                        accessor: 'stargazerCount',
                    },
                    {
                        Header: 'diskUsage',
                        accessor: 'diskUsage',
                    },
                ],
            },
        ],
        []
    )
    type RepoData = {
        createdAt: string
        diskUsage: number
        name: string
        stargazerCount: number
        updatedAt: string
        url: string
        // any props that come into the component
    }
    interface TableProps {
        data: any
        columns: Column<{}>[]
        // any props that come into the component
    }
    function Table({ columns, data }: TableProps) {
        // Use the state and functions returned from useTable to build your UI
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({
            columns,
            data,
        })

        // Render the UI for your table
        return (
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{
                                    column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        // console.log("%c 📪: row ", "font-size:16px;background-color:#27f7d3;color:black;", row)
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td
                                        {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
    const [session, loading] = useSession()
    const [repos, setRepos] = useState<any>()
    // @ts-expect-error: Let's ignore a compile error like this unreachable code 
    const user: AuthenticatedUser = session?.user!

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
        const token = user.accessToken;
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

    // const get_repos = async () => {

    //     try {


    //         const repos = await 
    //         console.log("%c 👷‍♀️: repos ", "font-size:16px;background-color:#2dcaa3;color:white;", repos)

    //     }
    //     catch (err) {
    //         throw new Error(err)
    //     }

    // }
    // let repos;
    function formatBytes(bytes: number, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    useEffect(() => {

        if (user?.login)
            client.query({
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
            }).then(response => {
                console.log("%c 🇸🇩: response ",
                    "font-size:16px;background-color:#087199;color:white;", response.data.user.repositories.nodes)
                const prepared = response.data.user.repositories.nodes.map((repo: RepoData) => {
                    return {
                        ...repo,
                        updatedAt: timeAgo.format(new Date(repo.updatedAt)),
                        diskUsage: formatBytes(repo.diskUsage),
                    }
                })
                setRepos(prepared)
            })

        // console.log("%c 🇲🇪: anyNameFunction -> repos ",
        //     "font-size:16px;background-color:#e047e3;color:white;",
        //     repos)



        // console.log("%c 👚: anyNameFunction -> repos ",
        //     "font-size:16px;background-color:#dc6a9f;color:white;",
        //     repos)
        // })();

        return () => {

        }
    }, [user?.login])





    const prepareData = (repo: RepoData) => {
        // let modified = repo;
        // modified.name += '_edited'

        return repo
    }
    const data = useMemo(() => repos, [repos])

    return (
        <div>
            <Header />
            {
                repos && <>
                    <Table columns={columns} data={data} />
                </>
            }
        </div>
    )
}
