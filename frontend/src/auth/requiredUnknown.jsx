import { useEffect, useState } from "react"
import useAuth from "./AuthProvider"
import { Navigate, Outlet } from "react-router-dom"
import axios from "../api/api"

const UnknowRequire = () => {

    const [url, setUrl] = useState("")
    const { auth, setAuth } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getUser = async () => {
            await axios.get("/users/user")
                .then((res) => {
                    setUrl(`/${res.data.user.userType.toLowerCase()}`)
                    setAuth(res.data.user)
                    console.log(url);
                    setLoading(false)
                })
                .catch((err) => {
                    setUrl("")
                    setLoading(false)
                })
        }

        getUser()

    }, [])
    

    console.log(auth);
    

    return (
        loading && !url
        ?<div>Loading ...</div>
        : !url
        ?<Outlet />
        :<Navigate to={url}/>
    )

}

export default UnknowRequire