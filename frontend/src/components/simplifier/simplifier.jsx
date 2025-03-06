import useAuth from "../../auth/AuthProvider";
import Header from "../Header/header";


const Simplifier = ({ children, title }) => {

    const { auth } = useAuth();

    return (
        <>
            <div className="main-content">
                <Header title={title} name={auth.name} role={auth.userType} />
                {children}
            </div>
        </>
    );
};


export default Simplifier