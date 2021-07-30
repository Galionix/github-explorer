
import { signIn, signOut } from 'next-auth/client';
import { useUserStore } from 'utils/useUserStore';
import shallow from 'zustand/shallow';

export const SignButton = () => {


    const userStore = useUserStore(
        state => state.user
    )
    const setUser = useUserStore(
        state => state.setUser
    )

    const sessionLoading = useUserStore(
        state => state.sessionLoading
    )
    const setSessionLoading = useUserStore(
        state => state.setSessionLoading
    )
    const {
        // user,
        // pageSize,
        // orderDirection,
        // sortingField,
        // ownerFilter,
        setPageSize,
        setOrderDirection,
        setSortingField,
        setOwnerFilter,
        setRepoNameSearch
    } = useUserStore(
        (state) => ({
            // user: state.user,
            // pageSize: state.pageSize,
            // orderDirection: state.orderDirection,
            // sortingField: state.sortingField,
            // ownerFilter: state.ownerFilter,
            setPageSize: state.setPageSize,
            setOrderDirection: state.setOrderDirection,
            setSortingField: state.setSortingField,
            setOwnerFilter: state.setOwnerFilter,
            setRepoNameSearch: state.setRepoNameSearch,
        }), shallow);
    // console.log("%c 😚: SignButton -> userStore ", "font-size:16px;background-color:#570d39;color:white;", userStore)


    return (
        <div>
            {!userStore ? <button
                disabled={sessionLoading}
                // href={`/api/auth/signin`}
                // className={styles.buttonPrimary}
                onClick={e => {
                    setSessionLoading(true)
                    e.preventDefault()
                    signIn().then(
                        // alert(res)
                        // console.log(
                        //     '%c 🧛‍♂️: Header -> res ',
                        //     'font-size:16px;background-color:#563acd;color:white;',
                        //     res
                        // )
                        // setUser(null)
                        () => setSessionLoading(false)
                    )
                }}
            >
                Sign in
            </button> : <button
                // href={`/api/auth/signout`}
                // className={styles.button}
                onClick={e => {
                    setSessionLoading(true)
                    e.preventDefault()
                    signOut().then(res => {
                        setUser(null)
                        setSessionLoading(false)
                        setPageSize(5),
                            setOrderDirection("ASC"),
                            setSortingField("STARGAZERS"),
                            setOwnerFilter('')
                        setRepoNameSearch('')
                    })
                }}
            >
                Sign out
            </button>
            }
        </div>
    )
}
