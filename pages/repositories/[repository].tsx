
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





const Repository = ({
    client,
}: {
    client: ApolloClient<NormalizedCacheObject>
}) => {
    // console.log("%c ☑️: Repository -> data ", "font-size:16px;background-color:#f35dd1;color:white;", data1)
    const router = useRouter()
    console.log("%c 📷: router ",
        "font-size:16px;background-color:#c975a7;color:white;",
        router.query)

    console.log("%c ⛑️: router ",
        "font-size:16px;background-color:#7c6457;color:white;",
        router.query.owner, router.query.repository)
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
        owner: { avatarUrl: '', login: '' },
        object: {
            commitUrl: '',
            // id: '',
            text: ''
        },
        viewerHasStarred: false,
    })
    const [stars, setStars] = useState(repoData.stargazerCount)
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
                    setStars(res.data.repository.stargazerCount)
                    // console.log("%c 🗝️: res.data.repository.stargazerCount ", "font-size:16px;background-color:#3212c4;color:white;", res.data.repository.stargazerCount)
                })
        }

        return () => {

        }
    }, [client, router.query.repository, router.query.owner])

    return (
        <div>
            <UserPanel />
            <p>Selected repository: {repoData.name} {repoData.owner.login}</p>
            <Link
                href={'/repositories'}
            ><a

            >Back</a></Link>
            <Link
                href={`https://github.com/${repoData.owner.login}/${repoData.name}/`}
            ><a
                target="_blank"
                >Repo Url</a></Link>
            {/* <pre>{JSON.stringify(repoData, null, 2)}</pre> */}
            <div>{repoData?.object?.text ? repoData.object.text : 'No master:README.md'}</div>
            <div>{repoData.diskUsage}</div>
            <div>{repoData.name}</div>
            <div>{repoData.owner.login}</div>

            <Image
                src={repoData.owner.avatarUrl || '/1476.gif'}
                width={90}
                height={90}
            />
            <div>{repoData.owner.avatarUrl}</div>
            <div>{repoData.description}</div>
            <div>{repoData.createdAt}</div>
            <div>{repoData.updatedAt}</div>
            <StarButton
                value={stars}
                id={repoData.id}
                globalLoading={false}
                starred={repoData.viewerHasStarred}

            />

            {/* <Header /> */}
            {/* <h1>You&apos;re in!</h1> */}
        </div>
    )
}

export default Repository
