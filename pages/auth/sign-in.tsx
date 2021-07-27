import React, { useState } from "react"
// import { useTokenStore } from '../../utils/useUserStore';
import { useRouter } from 'next/dist/client/router';



export default function SignIn() {


    const router = useRouter()
    // const setTokenInStore =
    //     useTokenStore((state) => state.setToken);

    const [token, setToken] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // No longer need to cast to any - hooray for react!
        setToken(e.target.value);
        // console.log("%c 🇰🇪: handleChange -> e.type ", "font-size:16px;background-color:#830fcc;color:white;", e.type)
    }
    // const handleSave = (event: React.MouseEvent<HTMLElement>) => {
    //     setTokenInStore(token)
    //     router.replace('/')
    // }
    // const handleKey = (event: React.KeyboardEvent<HTMLElement>) => {
    //     if (event.key === 'Enter') {
    //         setTokenInStore(token)
    //         router.replace('/')
    //     }
    // }


    return (
        <div


        >
            <h2>{token}</h2>
            <input
                type="text"
                onChange={handleChange}
                // onKeyDown={handleKey}
                value={token}
            />
            <button type="submit"

                // onClick={handleSave}
            >Save</button>
        </div>
    )
}
