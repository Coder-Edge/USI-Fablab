import "./header.css"

import { IoIosNotificationsOutline } from "react-icons/io";

const Header = ({title, name, firstName, role}) => {

    return (
        <header>
            <h1>{title}</h1>
            <div className="header-content">
                <div className="notification-box">
                    <IoIosNotificationsOutline className="notification-icon"/>
                </div>
                <div className="user-info-header">
                    <p className="username">{name} {firstName}</p>
                    <p className="user-role">{role}</p>
                </div>
                <img src="/src/assets/profile.jpg" alt="User Profile" className="profile-header" />
            </div>
        </header>
    )
}

export default Header;