import { Navigate, Outlet } from "react-router-dom";
import axios from "../api/api"
import { useEffect, useState } from "react";
import useAuth from "./AuthProvider";

const RequireAuth = () => {

    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(200)
    const {setAuth} = useAuth()

    useEffect(() => {

        const getUser = async () => {
            await axios.get("/users/user")
                .then((res) => {
                    setStatus(200)
                    setAuth(res.data.user)
                    setLoading(false)
                })
                .catch((err) => {
                    setStatus(err.status)
                })

            setLoading(false)
        }
        
        getUser()

    }, [])

    return (
        status === 200 && !loading
        ? <Outlet />
        : loading
        ? <div> Loading ..... </div>
        :<Navigate to={"/login"} />
    )
}

export default RequireAuth