import {
    useMutation,
    gql,
    ApolloProvider,
} from '@apollo/client'
import { useEffect, useState } from 'react'
import { StarButtonProps } from '@/ts/interfaces'
import { ADD_STAR } from '@/utils/queries/reposQueries'
import { REMOVE_STAR } from './../../../utils/queries/reposQueries'
import s from './starButton.module.scss'
import { motion } from 'framer-motion'
import { buttonMotion } from '../motionConfig'


export const StarButton = ({
    starred,
    value,
    id: starrableId,
    globalLoading,
    setRepos
}: StarButtonProps) => {

    // console.log({
    //     starred,
    //     value,
    //     id: starrableId,
    //     globalLoading,
    // })
    const [userStarred, setUserStarred] =
        useState(starred)
    const [count, setCount] = useState(value)
    const [starColor, setStarColor] = useState(
        'currentColor'
    )
    // const [starFillColor, setStarFillColor] =
    //     useState(userStarred ? '#FFDF00' : 'none')
    const [starredResult, setStarredResult] =
        useState(null)

    const [
        mutateAddStar,
        {
            data: addResponse,
            loading: addLoading,
            error: addError,
        },
    ] = useMutation(ADD_STAR, {
        variables: {
            starrableId,
        },
    })
    const [
        mutateRemoveStar,
        {
            data: removeResponse,
            loading: removeLoading,
            error: removeError,
        },
    ] = useMutation(REMOVE_STAR, {
        variables: {
            starrableId,
        },
    })

    useEffect(() => {

        setUserStarred(starred)
    }, [starred])

    useEffect(() => {

        setCount(value)
        // console.log("%c 🇨🇦: value ", "font-size:16px;background-color:#5e3df6;color:white;", value)
    }, [value])

    // useEffect(() => {

    //     setStarFillColor(userStarred ? '#FFDF00' : 'none')
    // }, [userStarred])

    useEffect(() => {

        return () => { }
    }, [
        addResponse,
        removeResponse,
        count,
        userStarred,
    ])

    const toggleStar = () => {
        // console.log(userStarred ? 'removing' : 'adding')
        if (!userStarred)
            mutateAddStar({
                variables: { starrableId },
            }).then(
                ({
                    data: {
                        addStar: {
                            starrable: {
                                stargazerCount,
                                viewerHasStarred,
                            },
                        },
                    },
                }) => {
                    setRepos({ value: stargazerCount, starred: viewerHasStarred })
                    // setCount(stargazerCount)
                    // setUserStarred(viewerHasStarred)
                    // setStarFillColor('#FFDF00')
                }
            ).catch(alert)
        else {
            mutateRemoveStar({
                variables: { starrableId },
            }).then(
                ({
                    data: {
                        removeStar: {
                            starrable: {
                                stargazerCount,
                                viewerHasStarred,
                            },
                        },
                    },
                }) => {
                    setRepos({ value: stargazerCount, starred: viewerHasStarred })


                    // setCount(stargazerCount)
                    // setUserStarred(viewerHasStarred)
                    // setStarFillColor('none')
					// console.log(res)
                }
            ).catch(alert)
        }
        // setStarFillColor("yellow")
    }

    return (
        <motion.button
            disabled={globalLoading}
            onClick={toggleStar}
            className={s.starButton}
            {...buttonMotion}
        >

                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill={userStarred ? '#FFDF00' : 'none'}
                    viewBox='0 0 24 24'
                    stroke={starColor}
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1}
                        d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    />
                </svg>
            <span>
                {count}</span>
        </motion.button>
    )
}
