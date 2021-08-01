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
import s from '@/styles/reposPage.module.scss'
import { useState } from 'react'
// import Header from '@/components/Header/Header';

// import { throttle } from 'lodash'

// import { formatBytes } from 'utils/utils';
import {
    FIRST_PROJECTS,
    NO_LOGIN,
    NO_LOGIN_NEXT,
    NO_LOGIN_PREV,
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
import { formatBytes } from './../../utils/utils';
import { UserPanel } from './../../src/components/UserPanel/UserPanel';
import Link from 'next/link';
import Head from 'next/head';

const no_repos_message = 'No repos.'

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


    const [repos, setRepos] = useState<Node[]>([])

    const [generalData, setGeneralData] = useState<any>({
        totalCount: 0,
        totalDiskUsage: 0
    })

    const [page, setPage] = useState(1)
    const handleDownloadError = (e: Error) => {
        setRepos([])
        setPageInfo({
            endCursor: '',
            startCursor: '',
            hasNextPage: false,
            hasPreviousPage: false,
        })
        setGeneralData({

            totalCount: 0,
            totalDiskUsage: 0
        })
        setError(e.message)
        setLoading(false)
    }
    const nextPage = (
        e: SyntheticEvent<HTMLButtonElement>
    ) => {
        setLoading(true)
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
                    setPage(page => page + 1)
                    setLoading(false)
                    if (res.data.repositoryOwner) {
                        setRepoData({ res, repoNameSearch })
                    } else {
                        handleDownloadError({
                            message: no_repos_message,
                        })
                        // setError('No repos found')
                    }
                })
                .catch(handleDownloadError).finally(() => setLoading(false))
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
                    setPage(page => page + 1)
                    setLoading(false)
                    if (res.data.search.repositoryCount > 0) {
                        setNoLoginRepoData({
                            res,
                            repoNameSearch,
                        })
                    } else {
                        handleDownloadError({
                            message: no_repos_message,
                        })
                        // setError('No repos found')
                    }
                })
                .catch(handleDownloadError).finally(() => setLoading(false))
        }
    }
    const prevPage = (e: SyntheticEvent<HTMLButtonElement>) => {
        setLoading(true)
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
                    setPage(page => page - 1)
                    setLoading(false)
                    if (res.data.repositoryOwner) {
                        setRepoData({ res, repoNameSearch })
                    } else {
                        handleDownloadError({
                            message: no_repos_message,
                        })
                        // setError('No repos found')
                    }
                })
                .catch(handleDownloadError).finally(() => setLoading(false))
        }
        else {
            client
                .query({
                    query: NO_LOGIN_PREV,
                    variables: {
                        // login: ownerFilter,
                        pageSize,
                        // orderDirection,
                        // field: sortingField,
                        repoName: repoNameSearch,
                        before: pageInfo.startCursor,
                    },
                })
                .then((res: NoLogin.RootObject) => {
                    setPage(page => page - 1)
                    setLoading(false)
                    if (res.data.search.repositoryCount > 0) {
                        setNoLoginRepoData({
                            res,
                            repoNameSearch,
                        })
                    } else {
                        handleDownloadError({
                            message: no_repos_message,
                        })
                        // setError('No repos found')
                    }
                })
                .catch(handleDownloadError).finally(() => setLoading(false))

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
                    repositories: { nodes, pageInfo, totalCount, totalDiskUsage },
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
                        totalCount: number
                        totalDiskUsage: number
                    }
                    repository: Node
                }
            }
        }
            repoNameSearch: string
    }) => {
        if (repoNameSearch !== '') {
            if (repository) {
                setRepos([repository])
                setGeneralData({ totalCount: 1, totalDiskUsage: repository.diskUsage })
            }
            else handleDownloadError({ message: 'no repo found' })
        } else {
            // nodes.map(console.log)
            setRepos(nodes)
            setGeneralData({ totalCount, totalDiskUsage })
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
            setGeneralData({
                totalCount: repositoryCount,
                totalDiskUsage: Infinity
            })
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

    // const data =  repos 
    const [error, setError] = useState('')
    useEffect(() => {
        // debounce(() => {
        setLoading(true)

        if (client && user) {
            if (!globalSearch) {
                // console.log('owner search')

                download({
                    client,

                    ownerFilter,
                    pageSize,
                    orderDirection,
                    sortingField,
                    repoNameSearch,
                })
            } else {
                // console.log('global search')

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
                        // console.log("%c 👩‍👦‍👦: res ", "font-size:16px;background-color:#2e6946;color:white;", res)
                        setLoading(false)
                        if (res.data.repositoryOwner) {
                            setRepoData({ res, repoNameSearch })
                        } else
                            handleDownloadError({
                                message: no_repos_message,
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
                        // console.log("%c 📵: res ", "font-size:16px;background-color:#77e2bf;color:black;", res)
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
                                message: no_repos_message,
                            })
                        }
                    })
                    .catch(handleDownloadError)
            },
            200
        ),
        []
    )
    const data = useMemo(() => repos, [repos])

    return (
        <div
            className={s.layout}
        >

            <Head>
                <title>Github explorer | Browse!</title>
                <meta name="description"
                    content="App for browsing github repos" />
                <link rel="icon"
                    href="/favicon.ico" />
            </Head>
            <UserPanel />

            <div
                className={` ${s.content} `}

            >

                {error && <p
                    className={` ${s.error} `}

                >{error}</p>}

                <div
                    className={` ${s.controls} `}

                >
                    <input
                        className={` ${s.control} `}

                        type='text'
                        value={ownerFilter}
                        placeholder='Owner'
                        onChange={e => {
                            setPageInfo({
                                endCursor: '',
                                startCursor: '',
                                hasNextPage: false,
                                hasPreviousPage: false,
                            })
                            // if (e.target.value === '')
                            // {
                            setOwnerFilter(e.target.value)
                            // }
                        }}
                    />
                    <input
                        className={` ${s.control} `}
                        type='text'
                        placeholder='Repo name'
                        value={repoNameSearch}
                        onChange={e => {
                            setPageInfo({
                                endCursor: '',
                                startCursor: '',
                                hasNextPage: false,
                                hasPreviousPage: false,
                            })
                            setRepoNameSearch(e.target.value)
                        }}
                    />
                    <select
                        className={` ${s.control} `}
                        key='select_pageSize'
                        name=''
                        id=''
                        disabled={
                            loading ||
                            (repoNameSearch !== '' && !globalSearch)
                        }
                        value={pageSize}
                        onChange={e => {
                            setPageInfo({
                                endCursor: '',
                                startCursor: '',
                                hasNextPage: false,
                                hasPreviousPage: false,
                            })
                            setPageSize(parseInt(e.target.value))
                            // setPage(1)
                        }}
                    >
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                        <option value='50'>50</option>
                        <option value='100'>100</option>
                    </select>
                    <select
                        className={` ${s.control} `}
                        name=''
                        id=''
                        key='select_sortingField'
                        value={sortingField}
                        disabled={
                            loading || repoNameSearch !== ''
                        }
                        onChange={e => {
                            setPageInfo({
                                endCursor: '',
                                startCursor: '',
                                hasNextPage: false,
                                hasPreviousPage: false,
                            })
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
                        className={` ${s.control} `}
                        name=''
                        id=''
                        key='select_orderDirection'
                        value={orderDirection}
                        disabled={
                            loading || repoNameSearch !== ''
                        }
                        onChange={e => {
                            setPageInfo({
                                endCursor: '',
                                startCursor: '',
                                hasNextPage: false,
                                hasPreviousPage: false,
                            })
                            setOrderDirection(e.target.value)
                            // setPage(1)
                            // setPageSize(parseInt(e.target.value))
                        }}
                    >
                        <option value='DESC'>DESC</option>
                        <option value='ASC'>ASC</option>
                    </select>
                </div>
                {repos.length > 0 && user && (
                    <>
                        <Table data={repos} loading={loading} setRepos={setRepos} />
                        {/* <pre>{JSON.stringify(pageInfo, null, 2)}</pre> */}
                        <div
                            className={` ${s.buttonGroup} `}

                        >
                            {pageInfo.hasPreviousPage &&
                                <button
                                    className={` ${s.prev} `}
                                    disabled={!pageInfo.hasPreviousPage || loading}
                                    onClick={() => {
                                        setTimeout(
                                            prevPage, 100)
                                    }}
                                >Previous page</button>}
                            {pageInfo.hasNextPage && (
                                <button
                                    className={` ${s.next} `}
                                    disabled={
                                        !pageInfo.hasNextPage || loading
                                    }
                                    onClick={nextPage}
                                >
                                    Next page
                                </button>
                            )}
                        </div>
                        <div
                            className={` ${s.pagingInfo} `}

                        >   <p>Current page : {page}</p>
                            <p>Total pages : {(Math.ceil(generalData.totalCount / pageSize))}</p>
                        </div>
                        <div
                            className={` ${s.total} `}

                        >
                            <p>{`Total count: ${generalData.totalCount}`}</p>
                            {
                                globalSearch || <p>{`Total disk usage: ${formatBytes(generalData.totalDiskUsage)} (${generalData.totalDiskUsage})`}</p>
                            }
                        </div>

                    </>
                )}

            </div>

            {/* <pre>
                {JSON.stringify(pageInfo, null, 2)}
            </pre> */}
        </div>
    )
}
