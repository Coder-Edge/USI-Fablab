import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({type}) => {
    const { auth } = useAuth()
    const location = useLocation()

    console.log(auth);
    

    return (
        <Outlet />
    )
}

export default RequireAuth