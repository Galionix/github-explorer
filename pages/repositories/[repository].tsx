
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






const Repository = ({
    client,
}: {
    client: ApolloClient<NormalizedCacheObject>
}) => {
    // console.log("%c ☑️: Repository -> data ", "font-size:16px;background-color:#f35dd1;color:white;", data1)

    const {
        selectedName,
        setSelectedName,
        selectedOwner,
        setSelectedOwner,
    } = useUserStore(
        state => ({
            selectedName: state.selectedName,
            setSelectedName: state.setSelectedName,
            selectedOwner: state.selectedOwner,
            setSelectedOwner: state.setSelectedOwner,
        }),
        shallow
    )
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
        if (client && selectedName && selectedOwner) {
            // console.log({
            //     name: selectedName
            //     , owner: selectedOwner
            // })
            client
                .query(

                    {
                        query: GET_REPO,
                        variables: {

                            name: selectedName
                            , owner: selectedOwner


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
    }, [client, selectedName, selectedOwner])

    return (
        <div>
            <p>Selected repository: {selectedName} {selectedOwner}</p>
            <Link
                href={`https://github.com/${selectedOwner}/${selectedName}/`}
            ><a
                target="_blank"
            >Commit Url</a></Link>
            <pre>{JSON.stringify(repoData, null, 2)}</pre>
            <div>{repoData.object.text}</div>
            <div>{repoData.diskUsage}</div>
            <div>{repoData.name}</div>
            <div>{repoData.owner.login}</div>
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
