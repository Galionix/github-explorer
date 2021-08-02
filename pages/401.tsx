import { SignButton } from "@/components/index"
import { useRouter } from "next/router"
import s from 'styles/errorPage.module.scss'

export default function Custom401() {
    const router = useRouter()

    return (
        <div
            className={` ${s.layout} `}

        >
            <div
                className={` ${s.content} `}

            >
                <div className={s.status}>
                    401 (Unauthorized)
                </div>
                <h1>

                    {`please login to view this content`}
                </h1>
                <div className={s.message}>

                    <SignButton />
                </div>

            </div>

        </div>
    )
}
