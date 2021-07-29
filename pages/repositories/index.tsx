// import { useSession } from 'next-auth/client';
import {
    ApolloClient,
    // InMemoryCache,
    gql,
    // createHttpLink,
    // useMutation,
    NormalizedCacheObject,
    useQuery
} from '@apollo/client'

import { useCallback, useEffect, useMemo } from 'react';

import { useState } from 'react';
import Header from '@/components/Header/Header';

import TimeAgo from 'javascript-time-ago'


import en from 'javascript-time-ago/locale/en'
// import { throttle } from 'lodash'


// import { formatBytes } from 'utils/utils';
import {
    FIRST_PROJECTS,
    // PREV_PROJECTS
} from './../../utils/queries/reposQueries';
import { Owner, Session } from 'ts/interfaces';

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

    const [pageInfo, setPageInfo] = useState(
        {
            endCursor: '',
            startCursor: '',
            hasNextPage: false,
            hasPreviousPage: false,
            // __typename: "PageInfo"
        })
    const [pageSize, setPageSize] = useState(5)
    const user =
        useUserStore((state) => state.user);


    const [ownerFliter, setOwnerFliter] = useState<Owner>(
        { login: '', avatarUrl: '' }
    )

    useEffect(() => { setOwnerFliter(user) }, [user])
    const [repos, setRepos] = useState<Node[]>([])


    const [generalData, setGeneralData] = useState<any>({
        totalCount: 0,
        totalDiskUsage: 0
    })

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
        setError('')
        setRepos(nodes)
        setPageInfo(pageInfo)
    }
    const data = useMemo(() => repos, [repos])
    const [error, setError] = useState('')
    useEffect(() => {
        // debounce(() => {


        if (client && ownerFliter.login)
            download({ client, login: ownerFliter.login })
        // }, 2000
        // )

    }, [client, ownerFliter.login])

    const download = useCallback(
        debounce(({ client, login }) => {
            client.query({
                query: FIRST_PROJECTS,
                variables: {
                    login,
                    pageSize,
                    // endCursor: pageInfo.endCursor
                }
            }).then(setRepoData).catch((e: Error) => {
                setRepos([])
                setError(e.message)
            })
        }, 200),
        []
    );

    return (
        <div>
            <SignButton />
            {error && <p>{error}</p>}
            {repos && user ? <>
                <input
                    type="text"
                    value={ownerFliter.login}
                    placeholder='Owner'
                    onChange={
                        e => {

                            setOwnerFliter(
                                owner => ({ ...owner, login: e.target.value })
                            )
                        }
                    }
                />
                <input
                    type="text"
                    placeholder='Repo name'
                />
                <Table
                    data={data}
                    loading={false}

                /></> : <p>No repos</p>}
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
