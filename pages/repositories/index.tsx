import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client'
import shallow from 'zustand/shallow'
import {
    SyntheticEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import s from '@/styles/reposPage.module.scss'

import {
    FIRST_PROJECTS,
    NO_LOGIN,
    NO_LOGIN_NEXT,
    NO_LOGIN_PREV,
    SEARCH_PREV,
    SEARCH_NEXT,
} from '@/queries/reposQueries'
import {
    NoLogin,
    RootObject,
    PageInfo,
    Node,
    Error,
} from 'ts/interfaces'

import {
    Table,
    UserPanel,
} from '@/components/index'
import { useUserStore } from 'utils/useUserStore'
import { debounce } from 'lodash'
import { formatBytes } from 'utils/utils'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { buttonMotion } from 'src/motionConfig'
import { useRouter } from 'next/router'

const no_repos_message = 'No repos.'

export default function Repositories({
    client,
}: {
        client: ApolloClient<NormalizedCacheObject>
}) {
    const router = useRouter()
    useEffect(() => {
        if (router && !user) router.replace('/401')
    }, [router])

    const [loading, setLoading] = useState(true)
    const [pageInfo, setPageInfo] = useState({
        endCursor: '',
        startCursor: '',
        hasNextPage: false,
        hasPreviousPage: false,
    })

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

    const [generalData, setGeneralData] =
        useState<any>({
            totalCount: 0,
            totalDiskUsage: 0,
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
            totalDiskUsage: 0,
        })
        setError(e.message)
        setLoading(false)
        setPage(1)
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
                    }
                })
                .catch(handleDownloadError)
                .finally(() => setLoading(false))
        } else {
            client
                .query({
                    query: NO_LOGIN_NEXT,
                    variables: {
                        pageSize,

                        repoName: repoNameSearch,
                        after: pageInfo.endCursor,
                    },
                })
                .then((res: NoLogin.RootObject) => {
                    setPage(page => page + 1)
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
                .finally(() => setLoading(false))
        }
    }
    const prevPage = (
        e: SyntheticEvent<HTMLButtonElement>
    ) => {
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
                    }
                })
                .catch(handleDownloadError)
                .finally(() => setLoading(false))
        } else {
            client
                .query({
                    query: NO_LOGIN_PREV,
                    variables: {
                        pageSize,

                        repoName: repoNameSearch,
                        before: pageInfo.startCursor,
                    },
                })
                .then((res: NoLogin.RootObject) => {
                    setPage(page => page - 1)
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
                .finally(() => setLoading(false))
        }
    }

    const setRepoData = ({
        res: {
            data: {
                repositoryOwner: {
                    repositories: {
                        nodes,
                        pageInfo,
                        totalCount,
                        totalDiskUsage,
                    },
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
                setGeneralData({
                    totalCount: 1,
                    totalDiskUsage: repository.diskUsage,
                })
            } else
                handleDownloadError({
                    message: 'no repo found',
                })
        } else {
            setRepos(nodes)
            setGeneralData({
                totalCount,
                totalDiskUsage,
            })
        }

        setError('')
        setPageInfo(pageInfo)
    }

    const setNoLoginRepoData = ({
        res: {
            data: {
                search: {
                    repositoryCount,
                    edges,
                    pageInfo,
                },
            },
        },
        repoNameSearch,
    }: {
        res: NoLogin.RootObject
        repoNameSearch: string
        }) => {
        if (repositoryCount > 0) {
            setGeneralData({
                totalCount: repositoryCount,
                totalDiskUsage: Infinity,
            })
            setPageInfo(pageInfo)
            setRepos(edges.map(item => item.node))
        } else {
            handleDownloadError({
                message: 'found 0 repos',
            })
        }
    }

    const [error, setError] = useState('')
    useEffect(() => {
        setLoading(true)

        if (client && user) {
            if (!globalSearch) {
                download({
                    client,

                    ownerFilter,
                    pageSize,
                    orderDirection,
                    sortingField,
                    repoNameSearch,
                })
            } else {
                downloadRepo({
                    client,

                    pageSize,

                    repoNameSearch,
                })
            }
        }
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
                            pageSize,

                            repoName: repoNameSearch,
                        },
                    })
                    .then((res: NoLogin.RootObject) => {
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
    // const data = useMemo(() => repos, [repos])

    return (
        <div className={s.layout}>
            <Head>
                <title>Github explorer | Browse!</title>
                <meta
                    name='description'
                    content='App for browsing github repos'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <UserPanel />

            <div className={` ${s.content} `}>
                {error && (
                    <p className={` ${s.error} `}>
                        {error}
                    </p>
                )}

                <div className={` ${s.controls} `}>
                    <div className={` ${s.controlGroup} `}>
                        <p>Owner Search</p>
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
                                setPage(1)

                                setOwnerFilter(e.target.value)
                            }}
                        />
                    </div>
                    <div className={` ${s.controlGroup} `}>
                        <p>Repo search/filter</p>

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
                                setPage(1)

                                setRepoNameSearch(e.target.value)
                            }}
                        />
                    </div>
                    <div className={` ${s.controlGroup} `}>
                        <p>Page size</p>

                        <select
                            className={` ${s.control} `}
                            key='select_pageSize'
                            name=''
                            id=''
                            disabled={
                                loading ||
                                (repoNameSearch !== '' &&
                                    !globalSearch)
                            }
                            value={pageSize}
                            onChange={e => {
                                setPageInfo({
                                    endCursor: '',
                                    startCursor: '',
                                    hasNextPage: false,
                                    hasPreviousPage: false,
                                })
                                setPage(1)

                                setPageSize(
                                    parseInt(e.target.value)
                                )
                            }}
                        >
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                        </select>
                    </div>
                    <div className={` ${s.controlGroup} `}>
                        <p>Sort by</p>

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
                                setPage(1)
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
                    </div>
                    <div className={` ${s.controlGroup} `}>
                        <p>Direction</p>

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
                                setPage(1)

                                setOrderDirection(e.target.value)
                            }}
                        >
                            <option value='DESC'>DESC</option>
                            <option value='ASC'>ASC</option>
                        </select>
                    </div>
                </div>
                {repos.length > 0 && user && (
                    <>

                        <Table
                            data={repos}
                            loading={loading}
                            setRepos={setRepos}
                        />
                        <div className={` ${s.buttonGroup} `}>
                            {pageInfo.hasPreviousPage &&
                                !(
                                    repoNameSearch !== '' &&
                                    !globalSearch
                                ) && (
                                    <motion.button
                                        {...buttonMotion}
                                        className={` ${s.prev} `}
                                    disabled={
                                        !pageInfo.hasPreviousPage ||
                                        loading
                                    }
                                    onClick={() => {
                                        setTimeout(prevPage, 100)
                                    }}
                                    >
                                        Previous page
                                    </motion.button>
                                )}
                            {pageInfo.hasNextPage &&
                                !(
                                    repoNameSearch !== '' &&
                                    !globalSearch
                                ) && (
                                    <motion.button
                                        {...buttonMotion}
                                        className={` ${s.next} `}
                                        disabled={
                                            !pageInfo.hasNextPage ||
                                            loading
                                        }
                                        onClick={nextPage}
                                    >
                                        Next page
                                    </motion.button>
                                )}
                        </div>
                        <div className={` ${s.pagingInfo} `}>
                            {' '}
                            <p>Current page : {page}</p>
                            <p>
                                Total pages :{' '}
                                {Math.ceil(
                                    generalData.totalCount /
                                    pageSize
                                )}
                            </p>
                        </div>
                        <div className={` ${s.total} `}>
                            <p>{`Total count: ${generalData.totalCount}`}</p>
                            {globalSearch || (
                                <p>{`Total disk usage: ${formatBytes(
                                    generalData.totalDiskUsage
                                )}`}</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
