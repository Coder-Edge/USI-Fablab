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
            await axios.get("/users/userauth")
                .then((res) => {

                    if (res.data.success) {
                        setUrl(`/${res.data.user.userType.toLowerCase()}`)
                        setAuth(res.data.user)
                        setLoading(false)
                    } else {
                        setUrl("")
                        setLoading(false)
                    }  
                    
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getUser()

    }, [])

    return (
        loading && !url
            ? <div>Loading ...</div>
            : !url
                ? <Outlet />
                : <Navigate to={url} />
    )

}

export default UnknowRequire