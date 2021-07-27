import { useSession } from 'next-auth/client';
import {
    ApolloClient,
    InMemoryCache,
    gql,
    createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { useCallback, useEffect, useMemo } from 'react';
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
    const renderRowSubComponent = useCallback(
        ({ row }) => (
            <pre
                style={{
                    fontSize: '10px',
                }}
            >
                <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
            </pre>
        ),
        []
    )
    interface TableProps {
        data: any
        columns: Column<{}>[]
        renderRowSubComponent: any
        // any props that come into the component
    }
    function Table({ columns, data, renderRowSubComponent }: TableProps): React.ReactElement {
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
        // console.log("%c 😭: Repositories -> headerGroups ", "font-size:16px;background-color:#a2254a;color:white;", headerGroups)

        // Render the UI for your table
        return (
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={i + 'header'}
                        >
                            {headerGroup.headers.map((column, j) => (
                                <th {...column.getHeaderProps()}
                                    key={j + 'column'}
                                >{
                                    column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, k) => {
                        // console.log("%c 📪: row ", "font-size:16px;background-color:#27f7d3;color:black;", row)
                        prepareRow(row)
                        return (
                            <tr

                                {...row.getRowProps()}
                                key={k + 'row'}
                            >
                                {row.cells.map((cell, l) => {


                                    if (cell.column.id === 'createdAt') {
                                        return (<td
                                            {...cell.getCellProps()}
                                            key={l + '_cell'}
                                        >
                                            <span>{new Date(cell.value).toLocaleDateString()}</span>

                                        </td>
                                        )
                                    }

                                    if (cell.column.id === 'stargazerCount') {

                                        // console.log("%c 🆘: Repositories -> cell ",
                                        //     "font-size:16px;background-color:#f2ec2b;color:black;",
                                        //     cell)
                                        return (<td
                                            {...cell.getCellProps()}
                                            key={l + '_cell'}
                                        >
                                            <button>
                                                <span>

                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                                </span>
                                                {cell.value}</button>
                                        </td>
                                        )
                                    }
                                    return <td
                                        {...cell.getCellProps()}
                                        key={l + '_cell'}
                                    >{cell.render('Cell')}</td>
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
    const [pageInfo, setPageInfo] = useState({ endCursor: '', startCursor: '', hasNextPage: false, hasPreviousPage: false, __typename: "PageInfo" })
    const [generalData, setGeneralData] = useState<any>({
        totalCount: 0,
        totalDiskUsage: 0
    })

    const [page, setPage] = useState(0)
    const nextPage = () => {

        if (user?.login)
            client.query({
                query: gql`
            query Query {
                        user: user(login: "${user.login}") {
                            repositories(first: 5, after: "${pageInfo.startCursor}" ) {
     pageInfo {
          endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
      totalDiskUsage
      nodes {
        name
        updatedAt
        createdAt
        url
        diskUsage
        stargazerCount
      }
                            }
                        }

					}

				`,
            }).then(response => {

                console.log("%c 🇸🇩: response ",
                    "font-size:16px;background-color:#087199;color:white;",
                    response)

                const prepared = response.data.user.repositories.nodes.map((repo: RepoData) => {
                    return {
                        ...repo,
                        updatedAt: timeAgo.format(new Date(repo.updatedAt)),
                        diskUsage: formatBytes(repo.diskUsage),
                    }
                })
                setPageInfo(response.data.user.repositories.pageInfo)
                setRepos(prepared)
                setGeneralData({
                    totalCount: response.data.user.repositories.totalCount,
                    totalDiskUsage: response.data.user.repositories.totalDiskUsage
                })
            })

    }
    const prevPage = () => {

        if (user?.login)
            client.query({
                query: gql`
            query Query {
                        user: user(login: "${user.login}") {
                            repositories(last: 5,before: "${pageInfo.endCursor}"  ) {
     pageInfo {
          endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
      totalDiskUsage
      nodes {
        name
        updatedAt
        createdAt
        url
        diskUsage
        stargazerCount
      }
                            }
                        }

					}

				`,
            }).then(response => {

                console.log("%c 🇸🇩: response ",
                    "font-size:16px;background-color:#087199;color:white;",
                    response)

                const prepared = response.data.user.repositories.nodes.map((repo: RepoData) => {
                    return {
                        ...repo,
                        updatedAt: timeAgo.format(new Date(repo.updatedAt)),
                        diskUsage: formatBytes(repo.diskUsage),
                    }
                })
                setPageInfo(response.data.user.repositories.pageInfo)
                setRepos(prepared)
                setGeneralData({
                    totalCount: response.data.user.repositories.totalCount,
                    totalDiskUsage: response.data.user.repositories.totalDiskUsage
                })
            })

    }

    useEffect(() => {

        if (user?.login)
            client.query({
                query: gql`
            query Query {
                        user: user(login: "${user.login}") {
                            repositories(last: 5 ) {
     pageInfo {
          endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
      totalDiskUsage
      nodes {
        name
        updatedAt
        createdAt
        url
        diskUsage
        stargazerCount
      }
                            }
                        }
						
					}
   
				`,
            }).then(response => {

                console.log("%c 🇸🇩: response ",
                    "font-size:16px;background-color:#087199;color:white;",
                    response)

                const prepared = response.data.user.repositories.nodes.map((repo: RepoData) => {
                    return {
                        ...repo,
                        updatedAt: timeAgo.format(new Date(repo.updatedAt)),
                        diskUsage: formatBytes(repo.diskUsage),
                    }
                })
                setPageInfo(response.data.user.repositories.pageInfo)
                setRepos(prepared)
                setGeneralData({
                    totalCount: response.data.user.repositories.totalCount,
                    totalDiskUsage: response.data.user.repositories.totalDiskUsage
                })
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
                    <Table columns={columns} data={data}
                        renderRowSubComponent={renderRowSubComponent}
                    />
                    <div>
                        <p>{`Total disk usage: ${formatBytes(generalData.totalDiskUsage)}`}</p>
                        <p>{`Total count: ${generalData.totalCount}`}</p>
                    </div>
                    <button
                        disabled={!pageInfo.hasNextPage}
                        onClick={() => {
                            nextPage();
                            setPage((page) => page - 1)

                        }}
                    >Next page</button>
                    <p>Current page : {page}</p>
                    <button
                        disabled={!pageInfo.hasPreviousPage}
                        onClick={() => {
                            prevPage()
                            setPage((page) => page + 1)

                        }}
                    >Previous page</button>
                    <pre>{JSON.stringify(pageInfo, null, 2)}</pre>
                </>
            }
        </div>
    )
}
