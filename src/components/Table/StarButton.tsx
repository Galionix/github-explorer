import { useMutation, gql, ApolloProvider, } from "@apollo/client";
import { useState } from 'react';
import { StarButtonProps } from '@/ts/interfaces';



export const StarButton =
    ({ value,
        id: starrableId, globalLoading }: StarButtonProps) => {


        const ADD_STAR = gql`
        mutation MyMutation($starrableId: String!) {
            __typename
            addStar(input: {starrableId: $starrableId}) {
                clientMutationId
            }
        }
`;
        const [starColor, setStarColor] = useState("currentColor")
        const [starFillColor, setStarFillColor] = useState("none")
        const [mutateFunction, { data, loading, error }] = useMutation(
            ADD_STAR, {
            variables: {
                starrableId,
            }
        })

        const addStar = () => {


            mutateFunction({ variables: { starrableId } })
                .then((res) => {

                    console.log(res)

                })
            setStarFillColor("yellow")
        }
        if (loading) setStarColor("yellow")
        if (error) {
            setStarFillColor("red")
            setStarColor("red")
            alert(`Submission error! ${error.message}`)
            // `Submission error! ${error.message}`;
        }


        return (



            <button
                disabled={globalLoading || loading}
                onClick={() => addStar}
            >
                <span>

                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill={starFillColor}
                        viewBox="0 0 24 24"
                        stroke={starColor}
                    >
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </span>
                {value}</button>

        )
    }
