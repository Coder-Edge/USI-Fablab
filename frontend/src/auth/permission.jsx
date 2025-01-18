import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./AuthProvider"

const Permission = ({role}) => {
    const {auth} = useAuth()    

    return(
        role.includes(auth.userType)
        ? <Outlet />
        : <Navigate to={"/Forbiden"} />
    )   
}

export default Permission