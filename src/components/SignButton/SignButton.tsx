
import { signIn, signOut } from 'next-auth/client';
import { useUserStore } from 'utils/useUserStore';

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
                    })
                }}
            >
                Sign out
            </button>
            }
        </div>
    )
}
