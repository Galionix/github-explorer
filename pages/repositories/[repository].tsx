
import Header from './../../src/components/Header/Header';
import { useUserStore } from 'utils/useUserStore';
import shallow from 'zustand/shallow';
import { GET_REPO } from '@/utils/queries/reposQueries';
import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RepoDetails } from '@/ts/interfaces';
import { RootObject } from './../../ts/interfaces';
import { StarButton } from './../../src/components/Table/StarButton';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { UserPanel } from './../../src/components/UserPanel/UserPanel';
import s from '@/styles/detailsPage.module.scss'
import { formatBytes } from './../../utils/utils';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Head from 'next/head';


TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


const Repository = ({
    client,
}: {
    client: ApolloClient<NormalizedCacheObject>
}) => {
    // console.log("%c ☑️: Repository -> data ", "font-size:16px;background-color:#f35dd1;color:white;", data1)
    const router = useRouter()
    // console.log("%c 📷: router ",
    //     "font-size:16px;background-color:#c975a7;color:white;",
    //     router.query)

    // console.log("%c ⛑️: router ",
    //     "font-size:16px;background-color:#7c6457;color:white;",
    //     router.query.owner, router.query.repository)
    // const {
    //     selectedName,
    //     setSelectedName,
    //     selectedOwner,
    //     setSelectedOwner,
    // } = useUserStore(
    //     state => ({
    //         selectedName: state.selectedName,
    //         setSelectedName: state.setSelectedName,
    //         selectedOwner: state.selectedOwner,
    //         setSelectedOwner: state.setSelectedOwner,
    //     }),
    //     shallow
    // )
    const [repoData, setRepoData] = useState({
        diskUsage: 0,
        id: '',
        name: '',
        openGraphImageUrl: '',

        description: '',
        url: '',
        createdAt: 0,
        updatedAt: 0,
        stargazerCount: 0,
        viewerHasStarred: false,
        owner: { avatarUrl: '', login: '' },
        object: {
            commitUrl: '',
            // id: '',
            text: ''
        },
    })
    // const [stars, setStars] = useState(repoData.stargazerCount)
    useEffect(() => {
        if (client && router.query.repository && router.query.owner) {
            // console.log({
            //     name: selectedName
            //     , owner: selectedOwner
            // })
            client
                .query(

                    {
                        query: GET_REPO,
                        variables: {

                            name: router.query.repository
                            , owner: router.query.owner


                        },
                    }
                )
                .then((res: RepoDetails.RootObject) => {

                    // console.log("%c 👩‍🎤: res ",
                    //     "font-size:16px;background-color:#af3bdd;color:white;",
                    //     res)
                    setRepoData(res.data.repository)
                    // setStars(res.data.repository.stargazerCount)
                    // console.log("%c 🗝️: res.data.repository.stargazerCount ", "font-size:16px;background-color:#3212c4;color:white;", res.data.repository.stargazerCount)
                })
        }

        return () => {

        }
    }, [client, router.query.repository, router.query.owner])

    return (
        <div
            className={s.layout}
        >
            <Head>
                <title>Github explorer | {`${router.query.owner}'s ${router.query.repository}`}</title>
                <meta name="description"
                    content="App for browsing github repos" />
                <link rel="icon"
                    href="/favicon.ico" />
            </Head>
            <UserPanel />
            <div
                className={` ${s.content} `}
            >
                {/* <p>Selected repository: {repoData.name} {repoData.owner.login}</p> */}

                <Link
                    href={`/repositories/`}
                ><a
                        className={` ${s.back} `}

                    >                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg> <span>
                            Back
                        </span>
                    </a></Link>


                <Link
                    href={`https://github.com/${repoData.owner.login}/${repoData.name}/`}
                ><a
                        className={` ${s.external} `}

                        target="_blank"
                    >                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg></a></Link>

                <h1
                    className={` ${s.login} `}

                >{repoData.owner.login}</h1>
                <h2
                    className={` ${s.name} `}

                >{repoData.name}</h2>

                <div

                    className={s.avatar}
                >
                    <Image
                        src={repoData.owner.avatarUrl || '/1476.gif'}
                        width={300}
                        height={300}
                    />
                </div>
                {/* <div>{repoData.owner.avatarUrl}</div> */}
                <div
                    className={` ${s.description} `}

                >{repoData.description}</div>
                <div>{`Created: ${new Date(repoData.createdAt).toLocaleDateString()} (${timeAgo.format(new Date(repoData.createdAt))})`}</div>
                <div
                    className={` ${s.diskUsage} `}

                >Disk usage: {formatBytes(repoData.diskUsage)}</div>
                <div>Updated: {timeAgo.format(new Date(repoData.updatedAt))}</div>
                <div
                    className={` ${s.star} `}

                >

                    <StarButton
                        setRepos={({
                            value,
                            starred
                        }: {
                            value: number,
                            starred: boolean
                        }) => {
                            console.log("%c 👊: starred ",
                                "font-size:16px;background-color:#ef4781;color:white;",
                                {
                                    value,
                                    starred
                                })


                            setRepoData({
                                ...repoData,
                                stargazerCount: value,
                                viewerHasStarred: starred,
                            })

                        }
                        }

                        value={repoData.stargazerCount}
                        id={repoData.id}
                        globalLoading={false}
                        starred={repoData.viewerHasStarred}


                    />
                </div>
                {/* <pre>{JSON.stringify(repoData, null, 2)}</pre> */}

                <div
                    className={` ${s.htmlContent} `}

                    dangerouslySetInnerHTML={{ __html: repoData?.object?.text ? repoData.object.text : 'No master:README.md' }} />
            </div>


        </div>
    )
}

export default Repository
