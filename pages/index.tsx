import Head from 'next/head'
import Image from 'next/image'
// import { useTokenStore } from '';
// import { useTokenStore } from '../utils/useUserStore';
import { AppProps } from 'next/app';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Header from './../src/components/Header/Header';
import { useSession } from 'next-auth/client';
import { useUserStore } from './../utils/useUserStore';
import { SignButton } from '@/components/SignButton/SignButton';
import Link from 'next/link';
import { UserPanel } from './../src/components/UserPanel/UserPanel';
import s from '@/styles/homePage.module.scss';

export default function Home(data: any) {
  // console.log("%c 💆‍♂️: Home -> data ",
  //   "font-size:16px;background-color:#f9e161;color:black;",
  //   data)
  // const router = useRouter()

  // const token =
  //   useTokenStore((state) => state.token);
  // const setTokenInStore =
  //   useTokenStore((state) => state.setToken);
  // const signOut = (event: React.MouseEvent<HTMLElement>) => {
  //   setTokenInStore('')
  //   // router.push('/auth/sign-in')
  // }

  // const [session, loading] = useSession();
  const user =
    useUserStore((state) => state.user);
  // console.log("%c 🇫🇷: Home -> user ", "font-size:16px;background-color:#73ca34;color:white;", user)

  const [repos, setRepos] = useState({
    total_count: 0,
    items: [{
      name: '',
      html_url: '',
      owner: {
        avatar_url: '',
        login: ''
      }

    }]
  })
  // const [repos, setRepos] = useState([])
  useEffect(() => {


    fetch('https://api.github.com/search/repositories?q=user:galionix+sort:updated-desc&per_page=5')
      .then(res => res.json())
      .then(text => setRepos(text))

    return () => {

    }
  }, [])

  return (

    <  >

      <Head>
        <title>Github explorer | Galionix</title>
        <meta name="description"
          content="App for browsing github repos" />
        <link rel="icon"
          href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <main
        className={s.layout}
      >
        <UserPanel />
        <div
          className={s.content}
        >{user ?
          <>
        <h1  >
          {`Hello, ${user.name}!`}
        </h1>
        <Link
          href='/repositories/'
        >
          <a >Browse repositories</a>
        </Link>

            </> : <>
              <h1
              >
              Hello, user! Please sign-in to browse.
            </h1>
              <SignButton />

            </>
          }</div>
        {
          repos.total_count > 0 && <div>
            <p>{`This app was created by `}
              <Link
                href="https://github.com/Galionix"
              >
                <a
                  target="_blank"
                >
                  {repos.items[0].owner.login}

                </a>
              </Link>
              {` for archicgi`}</p>
            <Image
              src={repos.items[0].owner.avatar_url}
              width={50}
              height={50}
            />
            <p>Here are my latest projects:</p>
            <ul>

              {


                repos.items.map(({ name, html_url }, i) => (
                  <li
                    key={i}
                  >

                    <Link
                      href={html_url}
                    >
                      <a >

                        {name}
                      </a>
                    </Link>
                  </li>

                ))
              }
            </ul>
          </div>
        }
        {/* <pre>{JSON.stringify(repos, null, 2)}</pre> */}

        {/* <h1>{token || 'No token set.'}</h1> */}
        {/* {
          token && <>
            <p>Welcome back!</p>
            <button
              onClick={() => router.push('/repositories')}

            >Browse repositories</button>
            <button type="reset"
              onClick={signOut}
            >Sign Out</button>
          </>
        }
        {
          !token && <>
            <p>Greetings! Start using explorer by logging in!</p>
            <button
              onClick={() => router.push('/auth/sign-in')}

            >Sign-in</button>
          </>
        } */}

      </main>
      <footer  >

      </footer>
    </>
  )
}

// export async function getStaticProps() {
//   const res = await fetch(API_URL)
//   const posts: String = await res.json()

//   return {
//     props: {
//       posts,
//     },
//   }
// }