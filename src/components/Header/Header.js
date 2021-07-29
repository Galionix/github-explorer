import Link from 'next/link'
import {
	signIn,
	signOut,
	useSession,
} from 'next-auth/client'
import styles from './header.module.css'
import { useUserStore } from './../../../utils/useUserStore'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
	// const [session, loading] = useSession()
	// console.log(
	// 	'%c 👗: Header -> session ',
	// 	'font-size:16px;background-color:#3a75fb;color:white;',
	// 	session
	// )
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
	return (
		<header>
			<noscript>
				<style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
			</noscript>
			<div className={styles.signedInStatus}>
				<p
					className={`nojs-show ${
						!userStore && sessionLoading
							? styles.loading
							: styles.loaded
					}`}
				>
					{!userStore && (
						<>
							<span
								className={styles.notSignedInText}
							>
								You are not signed in
							</span>
						</>
					)}
					{userStore && (
						<>
							{userStore.picture && (
								<span
									style={{
										backgroundImage: `url(${userStore.picture})`,
									}}
									className={styles.avatar}
								/>
							)}
							<span
								className={styles.signedInText}
							>
								<small>Signed in as</small>
								<br />
								<strong>{userStore.login}</strong>
							</span>
							<a
								href={`/api/auth/signout`}
								className={styles.button}
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
							</a>
						</>
					)}
				</p>
			</div>
			<nav>
				<ul className={styles.navItems}>
					<li className={styles.navItem}>
						<Link href='/'>
							<a>Home</a>
						</Link>
					</li>
					{userStore && (
						<li className={styles.navItem}>
							<Link href='/repositories'>
								<a>Browse repositories</a>
							</Link>
						</li>
					)}
					{/* <li className={styles.navItem}>
						<Link href='/server'>
							<a>Server</a>
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link href='/protected'>
							<a>Protected</a>
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link href='/api-example'>
							<a>API</a>
						</Link>
					</li> */}
				</ul>
			</nav>
		</header>
	)
}
