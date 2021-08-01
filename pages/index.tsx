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

  const user =
    useUserStore((state) => state.user);

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
                <a
                  className={s.go}
                >Browse repositories</a>
        </Link>

            </> : <>
              <h1
              >
              Hello, user! Please sign-in to browse.
            </h1>
              {/* <SignButton /> */}

            </>
          }            <h2>{`This app was created by `}
              <Link
                href="https://github.com/Galionix"
              >
                <a
                  target="_blank"
                >
                Galionix

                </a>
              </Link>
            {` for archicgi`}</h2>
          {
            repos.total_count > 0 && <>
              <div


                className={s.avatar}
              >
                <Image
                  src={repos.items[0].owner.avatar_url}
                  width={50}
                  height={50}
                  layout='fixed'
                />
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="tomato"
                >
                  <path fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <p>Check out my latest projects:</p>
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
          </>
        }
        </div>

      </main>


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