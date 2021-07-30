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
import { useCallback, useEffect, useMemo } from 'react';

import { useState } from 'react';
// import Header from '@/components/Header/Header';

import TimeAgo from 'javascript-time-ago'


import en from 'javascript-time-ago/locale/en'
// import { throttle } from 'lodash'


// import { formatBytes } from 'utils/utils';
import {
    FIRST_PROJECTS,
    // PREV_PROJECTS
} from './../../utils/queries/reposQueries';
import { Owner, RootObject, Session } from 'ts/interfaces';

import { Table } from '../../src/components/Table/Table';
import { SignButton } from '@/components/SignButton/SignButton';
import { useUserStore } from 'utils/useUserStore';
import { PageInfo } from 'ts/interfaces';
import { Node } from './../../ts/interfaces';
import { debounce } from 'lodash';
import { Error } from './../../ts/interfaces';


TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')





export default function Repositories(
    { client }:
        { client: ApolloClient<NormalizedCacheObject> }
) {

    // const [sortingField, setsortingField] = useState('STARGAZERS')
    // const [orderDirection, setOrderDirection] = useState('ASC')
    const [loading, setLoading] = useState(true)
    const [pageInfo, setPageInfo] = useState(
        {
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
        setPageSize,
        setOrderDirection,
        setSortingField,
        setOwnerFilter
    } = useUserStore(
        (state) => ({
            user: state.user,
            pageSize: state.pageSize,
            orderDirection: state.orderDirection,
            sortingField: state.sortingField,
            ownerFilter: state.ownerFilter,
            setPageSize: state.setPageSize,
            setOrderDirection: state.setOrderDirection,
            setSortingField: state.setSortingField,
            setOwnerFilter: state.setOwnerFilter
        }), shallow);
    // const user =
    //     useUserStore((state) => state.user);

    // const [ownerFliter, setOwnerFliter] = useState<Owner>(
    //     { login: '', avatarUrl: '' }
    // )

    useEffect(() => { if (user && ownerFilter === '') setOwnerFilter(user.login) }, [user])

    const [repos, setRepos] = useState<Node[]>([])


    // const [generalData, setGeneralData] = useState<any>({
    //     totalCount: 0,
    //     totalDiskUsage: 0
    // })

    const [page, setPage] = useState(1)
    const nextPage = () => {
        return
    }
    const prevPage = () => {
        return

    }




    const prepareData = (repo: Node) => {
        // let modified = repo;
        // modified.name += '_edited'

        return repo
    }
    const setRepoData = ({
        data:
        {
            repositoryOwner: {
                repositories:
                { nodes, pageInfo }
            }
        } }: {
            data: {
                repositoryOwner:
                {
                    repositories: {
                        nodes: Node[],
                        pageInfo: PageInfo
                    }
                }
            }
        }) => {

        setRepos(nodes)

        setError('')
        setPageInfo(pageInfo)
    }
    const data = useMemo(() => repos, [repos])
    const [error, setError] = useState('')
    useEffect(() => {
        // debounce(() => {
        setLoading(true)

        if (client && user)
            download({
                client,

                ownerFilter,
                pageSize,
                orderDirection,
                sortingField
            })
        // }, 2000
        // )

    }, [
        client,
        ownerFilter,
        user,
        pageSize,
        orderDirection,
        sortingField
    ])

    const download = useCallback(
        debounce(({
            client,
            ownerFilter,
            pageSize,
            orderDirection,
            sortingField
        }) => {
            // console.log(
            //     login,
            //     pageSize,
            //     orderDirection,
            //     sortingField

            // )
            client.query({
                query: FIRST_PROJECTS,
                variables: {
                    login: ownerFilter,
                    pageSize,
                    orderDirection,
                    field: sortingField

                }
            }).then((res: RootObject) => {
                setLoading(false)
                if (res.data.repositoryOwner) {

                    // console.log("%c 🦕: res ",
                    //     "font-size:16px;background-color:#8cfea6;color:black;", res)

                    setRepoData(res)
                }
                else {
                    setRepos([])

                    setError('No repos found')
                    setPageInfo({
                        endCursor: '',
                        startCursor: '',
                        hasNextPage: false,
                        hasPreviousPage: false,

                    })

                }
            }).catch((e: Error) => {
                setRepos([])
                setError(e.message)
                setLoading(false)
            })
        }, 200),
        []
    );

    return (
        <div>
            <SignButton />
            <pre>{JSON.stringify({
                user,
                ownerFilter,
                pageSize,
                orderDirection,
                sortingField
            }, null, 2)}</pre>
            {error && <p>{error}</p>}

            {repos && user ? <>
                <input
                    type="text"
                    value={ownerFilter}
                    placeholder='Owner'
                    onChange={
                        e => {

                            setOwnerFilter(e.target.value)

                        }
                    }
                />
                <input
                    type="text"
                    placeholder='Repo name'
                />
                <select
                    key='select_pageSize'
                    name="" id=""
                    disabled={loading}
                    value={pageSize}
                    onChange={(e) => {
                        // setPage(1)
                        setPageSize(parseInt(e.target.value))
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>


                </select>
                <select name="" id=""
                    key='select_sortingField'

                    value={sortingField}
                    disabled={loading}
                    onChange={(e) => {
                        // console.log("%c 🔈: e ", "font-size:16px;background-color:#355b2a;color:white;", e)

                        setSortingField(e.target.value)
                    }}
                >
                    <option value="STARGAZERS">STARGAZERS</option>
                    <option value="CREATED_AT">CREATED_AT</option>
                    <option value="UPDATED_AT">UPDATED_AT</option>
                    <option value="PUSHED_AT">PUSHED_AT</option>
                    <option value="NAME">NAME</option>


                </select>
                <select name="" id=""
                    key='select_orderDirection'

                    value={orderDirection}
                    disabled={loading}
                    onChange={(e) => {
                        setOrderDirection(e.target.value)
                        // setPage(1)
                        // setPageSize(parseInt(e.target.value))
                    }}
                >
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>



                </select>
                <Table
                    data={data}
                    loading={loading}

                /></> : <p>No repos</p>}
            {pageInfo.hasNextPage && <button
                disabled={loading}
            >Next</button>}
            {pageInfo.hasPreviousPage && <button
                disabled={loading}
            >Previous</button>}
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

            <pre>{JSON.stringify(pageInfo, null, 2)}</pre>
        </div>
    )
}
