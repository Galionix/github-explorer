import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { RepoDetails } from '@/ts/interfaces'
import {
    StarButton,
    UserPanel,
} from '@/components/index'
import s from '@/styles/detailsPage.module.scss'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {
    motion,
    AnimatePresence,
} from 'framer-motion'
import {
    buttonMotion,
    transition,
} from 'src/motionConfig'
import shallow from 'zustand/shallow'

import { GET_REPO } from '@/utils/queries/reposQueries'
import { useUserStore } from 'utils/useUserStore'
import { formatBytes } from 'utils/utils'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const Repository = ({
    client,
}: {
        client: ApolloClient<NormalizedCacheObject>
    }) => {
    const router = useRouter()
    const { user } = useUserStore(
        state => ({
            user: state.user,
        }),
        shallow
    )
    useEffect(() => {
        if (router && !user) router.replace('/401')
    }, [router])
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
            text: '',
        },
    })
    useEffect(() => {
        if (
            client &&
            router.query.repository &&
            router.query.owner
        ) {
            client
                .query({
                    query: GET_REPO,
                    variables: {
                        name: router.query.repository,
                        owner: router.query.owner,
                    },
                })
                .then((res: RepoDetails.RootObject) => {
                    setRepoData(res.data.repository)
                })
        }

        return () => { }
    }, [
        client,
        router.query.repository,
        router.query.owner,
    ])

    return (
        <div className={s.layout}>
            <Head>
                <title>
                    Github explorer |{' '}
                    {`${router.query.owner}'s ${router.query.repository}`}
                </title>
                <meta
                    name='description'
                    content='App for browsing github repos'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <UserPanel />
            <div className={` ${s.content} `}>
                <Link href={`/repositories/`}>
                    <a className={` ${s.back} `}>
                        {' '}
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M15 19l-7-7 7-7'
                            />
                        </svg>{' '}
                        <span>Back</span>
                    </a>
                </Link>

                <motion.div
                    className={` ${s.external} `}
                    style={{ cursor: 'pointer' }}
                    {...buttonMotion}
                >
                    <Link
                        href={`https://github.com/${repoData.owner.login}/${repoData.name}/`}
                    >
                        <a target='_blank'>
                            {' '}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                                />
                            </svg>
                        </a>
                    </Link>
                </motion.div>

                <h1 className={` ${s.login} `}>
                    {repoData.owner.login}
                </h1>
                <h2 className={` ${s.name} `}>
                    {repoData.name}
                </h2>
                <AnimatePresence>
                    <motion.div
                        exit={{ opacity: 0 }}
                        transition={transition}
                        className={s.avatar}
                    >
                        <Image
                            src={
                                repoData.owner.avatarUrl ||
                                '/1476.gif'
                            }
                            width={300}
                            height={300}
                        />
                    </motion.div>
                </AnimatePresence>
                <div className={` ${s.description} `}>
                    {repoData.description}
                </div>
                <div>{`Created: ${new Date(
                    repoData.createdAt
                ).toLocaleDateString()} (${timeAgo.format(
                    new Date(repoData.createdAt)
                )})`}</div>
                <div className={` ${s.diskUsage} `}>
                    Disk usage:{' '}
                    {formatBytes(repoData.diskUsage)}
                </div>
                <div>
                    Updated:{' '}
                    {timeAgo.format(
                        new Date(repoData.updatedAt)
                    )}
                </div>
                <div className={` ${s.star} `}>
                    <StarButton
                        setRepos={({
                            value,
                            starred,
                        }: {
                            value: number
                            starred: boolean
                        }) => {
                            setRepoData({
                                ...repoData,
                                stargazerCount: value,
                                viewerHasStarred: starred,
                            })
                        }}
                        value={repoData.stargazerCount}
                        id={repoData.id}
                        globalLoading={false}
                        starred={repoData.viewerHasStarred}
                    />
                </div>

                <div
                    className={` ${s.htmlContent} `}
                    dangerouslySetInnerHTML={{
                        __html: repoData?.object?.text
                            ? repoData.object.text
                            : 'No master:README.md',
                    }}
                />
            </div>
        </div>
    )
}

export default Repository
