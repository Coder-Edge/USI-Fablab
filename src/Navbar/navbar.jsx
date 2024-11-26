import React from "react";
import ReactDom from "react-dom/client";
import { FiGrid, FiBox, FiDollarSign, FiCalendar, FiUsers, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';

import './Navbar.css';

const Navbar = () => {

    const menuItems = [
        { icon: FiGrid, text: 'Tableau de bord', active: false },
        { icon: FiBox, text: 'Inventaire', active: true },
        { icon: FiDollarSign, text: 'Budget', active: false },
        { icon: FiCalendar, text: 'Calendrier', active: false },
        { icon: FiUsers, text: 'Membres', active: false },
        { icon: FiShoppingBag, text: 'Boutique', active: false },
        { icon: FiSettings, text: 'Paramètre', active: false },
      ];
    
    return (
        <div className="navbar">
            <div className="navbar-header">
                {/* <img src="logo_fablab.png" alt="Logo Fablab" className="logo" /> */}
                <h1>Fablab ULC Icam</h1>
            </div>
            <ul className="nav-links">
                {['Tableau de bord', 'Inventaire', 'Budget', 'Calendrier', 'Membres', 'Boutique', 'Parametre'].map((link, index) => (
                    <li key={index}>
                        {/* <img src={`logo${index + 1}.png`} alt={`Logo ${index + 1}`} className="nav-logo" /> */}
                        <a href="#">{link}</a>
                    </li>
                ))}
            </ul>

            <hr />

            <div className="logout">
                <FiLogOut className="logout-logo"/>   
                <a href="#" className="logout-link">Déconnexion</a>
            </div>
        </div>
    );
};

export default Navbar;
