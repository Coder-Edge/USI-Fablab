import React from "react";
import ReactDom from "react-dom/client";


import './Navbar.css';

const Navbar = () => {
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
                {/* <img src="logout_logo.png" alt="Logo Déconnexion" className="logout-logo" /> */}
                <a href="#" className="logout-link">Déconnexion</a>
            </div>
        </div>
    );
};

export default Navbar;
