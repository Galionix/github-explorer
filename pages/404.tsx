import Link from 'next/link'
import { useRouter } from 'next/router'
import s from 'styles/errorPage.module.scss'

export default function Custom404() {
    const router = useRouter()

    return (
        <div className={` ${s.layout} `}>
            <div className={` ${s.content} `}>
                <h1>

                    {`Seems like `}
                    <span>{router.asPath}</span>
                    {` is not a valid path`}
                </h1>
                <div className={s.status}>
                    404 (Not found)
                </div>
                <div className={s.message}>

                    <Link href='/'>
                        <a>
                            <p>Go home</p>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                                />
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
