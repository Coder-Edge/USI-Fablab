import "./header.css"

import { IoIosNotificationsOutline } from "react-icons/io";

const Header = () => {
    return (
        <header>
            <div className="header-content">
                <div className="notification-box">
                    <IoIosNotificationsOutline className="notification-icon"/>
                </div>
                <div className="user-info-header">
                    <p className="username">Ignace</p>
                    <p className="user-role">Manager</p>
                </div>
                <img src="./src/assets/profile.jpg" alt="User Profile" className="profile-header" />
            </div>
        </header>
    )
}

export default Header;