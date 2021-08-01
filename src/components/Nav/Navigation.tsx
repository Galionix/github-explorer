
import Link from 'next/link';
import { SignButton } from '@/components/SignButton/SignButton';
import s from './navigation.module.scss'


export const Navigation = () => {
    return (
        <nav
            className={s.nav}
        >

            <ul

            >
                <li>
                    <Link
                        href="/"
                    >
                        <a >Home</a>
                    </Link>
                </li>
                <li>

                    <Link
                        href="/repositories"
                    >
                        <a >Repos</a>
                    </Link>
                </li>




            </ul>
            <SignButton />
        </nav>
    )
}
