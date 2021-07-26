import React, { useState } from "react"
import { useTokenStore } from './../../utils/useTokenStore';

export default function SignIn() {

    const setTokenInStore =
        useTokenStore((state) => state.setToken);

    const [token, setToken] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // No longer need to cast to any - hooray for react!
        setToken(e.target.value);
    }
    const handleSave = (event: React.MouseEvent<HTMLElement>) => {
        setTokenInStore(token)
        // alert(token)
    }
    return (
        <div


        >
            <h2>{token}</h2>
            <input type="text" onChange={handleChange} value={token} />
            <button type="submit"
                onClick={handleSave}
            >Save</button>
        </div>
    )
}
