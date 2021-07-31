// import { useSession } from 'next-auth/client';
import {
    ApolloClient,
    // InMemoryCache,
    gql,
    // createHttpLink,
    // useMutation,
    NormalizedCacheObject,
	// useQuery
} from '@apollo/client'
import shallow from 'zustand/shallow'
import {
    MouseEventHandler,
    SyntheticEvent,
    useCallback,
    useEffect,
    useMemo,
} from 'react'

import { useState } from 'react'
// import Header from '@/components/Header/Header';

// import { throttle } from 'lodash'

// import { formatBytes } from 'utils/utils';
import {
    FIRST_PROJECTS,
    NO_LOGIN,
    NO_LOGIN_NEXT,
    SEARCH_PREV,
	// PREV_PROJECTS
} from './../../utils/queries/reposQueries'
import {
    NoLogin,
    Owner,
    RootObject,
    Session,
} from 'ts/interfaces'

import { Table } from '../../src/components/Table/Table'
import { SignButton } from '@/components/SignButton/SignButton'
import { useUserStore } from 'utils/useUserStore'
import { PageInfo } from 'ts/interfaces'
import { Node } from './../../ts/interfaces'
import { debounce } from 'lodash'
import { Error } from './../../ts/interfaces'
import { SEARCH_NEXT } from './../../utils/queries/reposQueries'

export default function Repositories({
    client,
}: {
    client: ApolloClient<NormalizedCacheObject>
}) {
    // const [sortingField, setsortingField] = useState('STARGAZERS')
    // const [orderDirection, setOrderDirection] = useState('ASC')
    const [loading, setLoading] = useState(true)
    const [pageInfo, setPageInfo] = useState({
        endCursor: '',
        startCursor: '',
        hasNextPage: false,
        hasPreviousPage: false,
        // __typename: "PageInfo"
    })
	// const [pageSize, setPageSize] = useState(5)
	// const user =
	//     useUserStore((state) => state.user);
	// const pageSize =
	//     useUserStore((state) => state.pageSize);
	// const orderDirection =
	//     useUserStore((state) => state.orderDirection);
	// const sortingField =
	//     useUserStore((state) => state.sortingField);

    const {
        user,
        pageSize,
        orderDirection,
        sortingField,
        ownerFilter,
        repoNameSearch,
        setPageSize,
        setOrderDirection,
        setSortingField,
        setOwnerFilter,
        setRepoNameSearch,
    } = useUserStore(
        state => ({
            user: state.user,
            pageSize: state.pageSize,
            orderDirection: state.orderDirection,
            sortingField: state.sortingField,
            ownerFilter: state.ownerFilter,
            repoNameSearch: state.repoNameSearch,
            setPageSize: state.setPageSize,
            setOrderDirection: state.setOrderDirection,
            setSortingField: state.setSortingField,
            setOwnerFilter: state.setOwnerFilter,
            setRepoNameSearch: state.setRepoNameSearch,
        }),
        shallow
    )

    const globalSearch = ownerFilter === ''
	// const user =
	//     useUserStore((state) => state.user);

	// const [ownerFliter, setOwnerFliter] = useState<Owner>(
	//     { login: '', avatarUrl: '' }
	// )

	// useEffect(() => { if (user && ownerFilter === '') setOwnerFilter(user.login) }, [user])

    const [repos, setRepos] = useState<Node[]>([])

	// const [generalData, setGeneralData] = useState<any>({
	//     totalCount: 0,
	//     totalDiskUsage: 0
	// })

    const [page, setPage] = useState(1)
    const handleDownloadError = (e: Error) => {
        setRepos([])
        setPageInfo({
            endCursor: '',
            startCursor: '',
            hasNextPage: false,
            hasPreviousPage: false,
        })
        setError(e.message)
        setLoading(false)
    }
    const nextPage = (
        e: SyntheticEvent<HTMLButtonElement>
    ) => {

        if (!globalSearch) {
            client
                .query({
                    query: SEARCH_NEXT,
                    variables: {
                        login: ownerFilter,
                        pageSize,
                        orderDirection,
                        field: sortingField,
                        repoName: repoNameSearch,
                        after: pageInfo.endCursor,
                    },
                })
                .then((res: RootObject) => {
                    setLoading(false)
                    if (res.data.repositoryOwner) {
                        setRepoData({ res, repoNameSearch })
                    } else {
                        handleDownloadError({
                            message: 'No repos found',
                        })
                        setError('No repos found')
                    }
                })
                .catch(handleDownloadError)
        }
        else {
            client
                .query({
                    query: NO_LOGIN_NEXT,
                    variables: {
                        // login: ownerFilter,
                        pageSize,
                        // orderDirection,
                        // field: sortingField,
                        repoName: repoNameSearch,
                        after: pageInfo.endCursor,
                    },
                })
                .then((res: NoLogin.RootObject) => {
                    setLoading(false)
                    if (res.data.search.repositoryCount > 0) {
                        setNoLoginRepoData({
                            res,
                            repoNameSearch,
                        })
                    } else {
                        handleDownloadError({
                            message: 'No repos found',
                        })
                        // setError('No repos found')
                    }
                })
                .catch(handleDownloadError)
        }
    }
    const prevPage = (e: SyntheticEvent<HTMLButtonElement>) => {

        if (!globalSearch) {
            client
                .query({
                    query: SEARCH_PREV,
                    variables: {
                        login: ownerFilter,
                        pageSize,
                        orderDirection,
                        field: sortingField,
                        repoName: repoNameSearch,
                        before: pageInfo.startCursor,
                    },
                })
                .then((res: RootObject) => {
                    setLoading(false)
                    if (res.data.repositoryOwner) {
                        setRepoData({ res, repoNameSearch })
                    } else {
                        handleDownloadError({
                            message: 'No repos found',
                        })
                        setError('No repos found')
                    }
                })
                .catch(handleDownloadError)
        }
    }

    const prepareData = (repo: Node) => {
		// let modified = repo;
		// modified.name += '_edited'

        return repo
    }

    const setRepoData = ({
        res: {
            data: {
                repositoryOwner: {
                    repositories: { nodes, pageInfo },
                    repository,
                },
            },
        },
        repoNameSearch,
    }: {
        res: {
            data: {
                repositoryOwner: {
                    repositories: {
                        nodes: Node[]
                        pageInfo: PageInfo
                    }
                    repository: Node
                }
            }
        }
            repoNameSearch: string
    }) => {
        if (repoNameSearch !== '') {
            if (repository) setRepos([repository])
            else handleDownloadError({ message: 'no repo found' })
        } else {
            // nodes.map(console.log)
            setRepos(nodes)
        }

        setError('')
        setPageInfo(pageInfo)
    }

    const setNoLoginRepoData = ({
        res: {
            data: {
                search: { repositoryCount, edges, pageInfo },
            },
        },
        repoNameSearch,
    }: {
        res: NoLogin.RootObject
        repoNameSearch: string
    }) => {
        // if (repoNameSearch !== '') {
        if (repositoryCount > 0) {
			// edges.map(item => console.log(item.node))
            setPageInfo(pageInfo)
            setRepos(edges.map(item => item.node))
        } else {
            handleDownloadError({ message: 'found 0 repos' })
            // setRepos([])
            // setError('no repo found')
            // setPageInfo({
            //     endCursor: '',
            //     startCursor: '',
            //     hasNextPage: false,
            //     hasPreviousPage: false,
            // })
        }
		// }
		// else
		//     setRepos(nodes)

        // setError('')

    }

    const data = useMemo(() => repos, [repos])
    const [error, setError] = useState('')
    useEffect(() => {
        // debounce(() => {
        setLoading(true)

        if (client && user) {
            if (!globalSearch) {
                console.log('owner search')

                download({
                    client,

                    ownerFilter,
                    pageSize,
                    orderDirection,
                    sortingField,
                    repoNameSearch,
                })
            } else {
                console.log('global search')

                downloadRepo({
                    client,
                    // ownerFilter,
                    pageSize,
					// orderDirection,
					// sortingField,
                    repoNameSearch,
                })
            }
        }
		// }, 2000
		// )
    }, [
        client,
        ownerFilter,
        user,
        pageSize,
        orderDirection,
        sortingField,
        repoNameSearch,
    ])

    const download = useCallback(
        debounce(
            ({
                client,
                ownerFilter,
                pageSize,
                orderDirection,
                sortingField,
                repoNameSearch,
            }) => {
				// console.log(
				//     login,
				//     pageSize,
				//     orderDirection,
				//     sortingField

				// )
                client
                    .query({
                        query: FIRST_PROJECTS,
                        variables: {
                            login: ownerFilter,
                            pageSize,
                            orderDirection,
                            field: sortingField,
                            repoName: repoNameSearch,
                        },
                    })
                    .then((res: RootObject) => {
                        setLoading(false)
                        if (res.data.repositoryOwner) {
                            setRepoData({ res, repoNameSearch })
                        } else
                            handleDownloadError({
                                message: 'No repos found',
                            })
                    })
                    .catch(handleDownloadError)
            },
            200
        ),
        []
    )
    const downloadRepo = useCallback(
        debounce(
            ({
                client,

                pageSize,

                repoNameSearch,
            }) => {
                client
                    .query({
                        query: NO_LOGIN,
                        variables: {
                            // login: ownerFilter,
                            pageSize,
							// orderDirection,
							// field: sortingField,
                            repoName: repoNameSearch,
                        },
                    })
                    .then((res: NoLogin.RootObject) => {
                        console.log("%c 📵: res ", "font-size:16px;background-color:#77e2bf;color:black;", res)
                        setLoading(false)
                        if (
                            res.data.search.repositoryCount > 0
                        ) {
                            setNoLoginRepoData({
                                res,
                                repoNameSearch,
                            })
                        } else {
                            handleDownloadError({
                                message: 'no repos',
                            })
                        }
                    })
                    .catch(handleDownloadError)
            },
            200
        ),
        []
    )

    return (
        <div>
            <SignButton />
            <pre>
                {JSON.stringify(
                    {
                        user,
                        ownerFilter,
                        pageSize,
                        orderDirection,
                        sortingField,
                        repoNameSearch,
                    },
                    null,
                    2
                )}
            </pre>
            {error && <p>{error}</p>}
            <input
                type='text'
                value={ownerFilter}
                placeholder='Owner'
                onChange={e => {
                    // if (e.target.value === '')

                    // {
                    setOwnerFilter(e.target.value)
                    // }
                }}
            />
            <input
                type='text'
                placeholder='Repo name'
                value={repoNameSearch}
                onChange={e => {
                    setRepoNameSearch(e.target.value)
                }}
            />
            <select
                key='select_pageSize'
                name=''
                id=''
                disabled={
                    loading ||
                    (repoNameSearch !== '' && !globalSearch)
                }
                value={pageSize}
                onChange={e => {
                    // setPage(1)
                    setPageSize(parseInt(e.target.value))
                }}
            >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
            </select>
            <select
                name=''
                id=''
                key='select_sortingField'
                value={sortingField}
                disabled={
                    loading || repoNameSearch !== ''
                }
                onChange={e => {
					// console.log("%c 🔈: e ", "font-size:16px;background-color:#355b2a;color:white;", e)

                    setSortingField(e.target.value)
                }}
            >
                <option value='STARGAZERS'>
                    STARGAZERS
                </option>
                <option value='CREATED_AT'>
                    CREATED_AT
                </option>
                <option value='UPDATED_AT'>
                    UPDATED_AT
                </option>
                <option value='PUSHED_AT'>
                    PUSHED_AT
                </option>
                <option value='NAME'>NAME</option>
            </select>
            <select
                name=''
                id=''
                key='select_orderDirection'
                value={orderDirection}
                disabled={
                    loading || repoNameSearch !== ''
                }
                onChange={e => {
                    setOrderDirection(e.target.value)
                    // setPage(1)
                    // setPageSize(parseInt(e.target.value))
                }}
            >
                <option value='ASC'>ASC</option>
                <option value='DESC'>DESC</option>
            </select>
            {repos && user ? (
                <>
                    <Table data={data} loading={loading} />
                </>
            ) : (
                <p>No repos</p>
            )}
            {pageInfo.hasNextPage && (
                <button
                    disabled={
                        !pageInfo.hasNextPage || loading
                    }
                    onClick={nextPage}
                >
                    Next page
                </button>
            )}

            <p>Current page : {page}</p>
            {/* <p>Total pages : {(Math.ceil(generalData.totalCount / pageSize))}</p> */}
            {pageInfo.hasPreviousPage &&
                <button
                    disabled={!pageInfo.hasPreviousPage || loading}
                    onClick={() => {

                        setTimeout(
                            prevPage, 100)


                    }}
                >Previous page</button>}
            {/* <Header /> */}
            {/* {
                repos && <>

                    <select name="" id=""
                        disabled={globalLoading}
                        onChange={(e) => {
                            setPage(1)
                            setPageSize(parseInt(e.target.value))
                        }}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>


                    </select>
                    <Table columns={columns} data={data}

                        loading={loading}
                    />
                    <div>
                        <p>{`Total disk usage: ${formatBytes(generalData.totalDiskUsage)}`}</p>
                        <p>{`Total count: ${generalData.totalCount}`}</p>
                    </div>
                    <button
                        disabled={!pageInfo.hasNextPage || globalLoading}
                        onClick={() => {
                            if (globalLoading) return
                            setGlobalLoading(true)
                            setTimeout(nextPage,
                                100)
                            // throttle(
                            //     )


                        }}
                    >Next page</button>
                    <p>Current page : {page}</p>
                    <p>Total pages : {(Math.ceil(generalData.totalCount / pageSize))}</p>
                    <button
                        disabled={!pageInfo.hasPreviousPage || globalLoading}
                        onClick={() => {
                            if (globalLoading) return
                            setGlobalLoading(true)
                            setTimeout(
                                prevPage, 100)


                        }}
                    >Previous page</button>

                </>
            } */}

            <pre>
                {JSON.stringify(pageInfo, null, 2)}
            </pre>
        </div>
    )
}
