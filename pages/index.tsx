import Head from 'next/head'
import Image from 'next/image'
// import { useTokenStore } from '';
// import { useTokenStore } from '../utils/useUserStore';
// import { AppProps } from 'next/app';
// import { InferGetStaticPropsType } from 'next';
// import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
// import Header from './../src/components/Header/Header';
// import { useSession } from 'next-auth/client';
import { useUserStore } from './../utils/useUserStore';
// import { SignButton } from '@/components/SignButton/SignButton';
import Link from 'next/link';
import { UserPanel } from './../src/components/UserPanel/UserPanel';
import s from '@/styles/homePage.module.scss';
import { AnimatePresence, motion } from 'framer-motion'
import { transition } from '@/components/motionConfig';

const exit = {

  opacity: 0


}



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
      <motion.main
        className={s.layout}
        // exit={exit}
        transition={transition}
      >
        <UserPanel />
        <div
          className={s.content}
        >{user ?
          <>
              <motion.h1
              // exit={exit}

              >
                {`Hello, ${user.name}!`}
              </motion.h1>
              <Link
                href='/repositories/'
              >
                <motion.a
                  // exit={exit}
                  className={s.go}
                  style={{ cursor: 'pointer' }}
                >Browse repositories</motion.a>
              </Link>

            </> : <>
              <h1
              >
              Hello, user! Please sign-in to browse.
            </h1>
              {/* <SignButton /> */}

            </>
          }            <motion.h2
          // exit={exit}
          >{`This app was created by `}
            <Link
              href="https://github.com/Galionix"
            >
              <a
                target="_blank"
              >
                Galionix

              </a>
            </Link>
            {` for archicgi`}</motion.h2>
          {
            repos.total_count > 0 && <>
              <motion.div


                className={s.avatar}
              >
                <Image
                  src={repos.items[0].owner.avatar_url}
                  width={50}
                  height={50}
                  layout='fixed'
                />
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="tomato"
                  animate={{
                    scale: [0.9, 1.1, 0.8, 1.2, 0.7],
                  }}
                  transition={{
                    ease: [0.6, 0.01, -0.05, 0.9],
                    repeat: Infinity,


                  }}
                >
                  <path fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </motion.svg>
              </motion.div>
              <motion.p
              // exit={exit}
              >Check out my latest projects:</motion.p>
              <motion.ul
              // exit={exit}
              >
                <AnimatePresence>


                  {


                    repos.items.map(({ name }, i) => (
                      <li

                        style={{
                          overflow: 'hidden'
                        }}
                        key={i}
                      >
                        <motion.div
                          initial={{
                            y: 100,
                            opacity: 0.5
                          }}
                          transition={{
                            ease: [0.6, 0.01, -0.05, 0.9],
                            type: 'tween',
                            duration: 1 * i,
                          }}
                          animate={{
                            y: 0,
                            opacity: 1

                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <Link
                            // prefetch
                            href={`/repositories/${name}?owner=Galionix`}
                          >
                            <motion.a


                            >

                              {name}
                            </motion.a>
                          </Link>
                        </motion.div>

                        <p

                        > </p>
                      </li>

                    ))
                  }
                </AnimatePresence>

              </motion.ul>
            </>
          }
        </div>

      </motion.main>


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