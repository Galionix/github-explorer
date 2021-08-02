import { signIn, signOut } from 'next-auth/client'
import { useUserStore } from 'utils/useUserStore'
import shallow from 'zustand/shallow'
import s from './button.module.scss'
import { motion } from 'framer-motion'
import { buttonMotion } from '../../motionConfig'

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
        setPageSize,
        setOrderDirection,
        setSortingField,
        setOwnerFilter,
        setRepoNameSearch,
    } = useUserStore(
        state => ({
            setPageSize: state.setPageSize,
            setOrderDirection: state.setOrderDirection,
            setSortingField: state.setSortingField,
            setOwnerFilter: state.setOwnerFilter,
            setRepoNameSearch: state.setRepoNameSearch,
        }),
        shallow
    )

    return (
        <div>
            {!userStore ? (
                <motion.button
                    {...buttonMotion}
                    className={s.button}
                    disabled={sessionLoading}
                    onClick={e => {
                        setSessionLoading(true)
                        e.preventDefault()
                        signIn('github').then(msg => {
                            setSessionLoading(false)
                        })
                    }}
                >
                    Sign in
                </motion.button>
            ) : (
                <motion.button
                    {...buttonMotion}
                        className={`${s.disabled} ${s.button}`}
                        onClick={e => {
                            setSessionLoading(true)
                            e.preventDefault()
                            signOut({ callbackUrl: '/' }).then(
                                res => {
                                    setUser(null)
                                    setSessionLoading(false)
                                    setPageSize(5),
                                    setOrderDirection('ASC'),
                                    setSortingField('STARGAZERS'),
                                    setOwnerFilter('')
                                setRepoNameSearch('')
                            }
                        )
                        }}
                    >
                        Sign out
                    </motion.button>
            )}
        </div>
    )
}
