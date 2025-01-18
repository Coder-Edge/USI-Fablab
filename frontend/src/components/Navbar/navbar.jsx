import React from "react";
import logout from "./logout";
import {
  FiGrid,
  FiBox,
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const menuItems = [
    { icon: FiGrid, text: "Tableau de bord", active: true },
    { icon: FiBox, text: "Inventaire", active: false },
    { icon: FiDollarSign, text: "Budget", active: false },
    { icon: FiCalendar, text: "Calendrier", active: false },
    { icon: FiUsers, text: "Membres", active: false },
    { icon: FiShoppingBag, text: "Boutique", active: false },
    { icon: FiSettings, text: "Paramètre", active: false },
  ];

  const navigate = useNavigate()

  return (
    <div className="navbar">
      <div className="navbar-header">
        <img
          src="/src/assets/LogoFabLab.jpg"
          alt="Logo Fablab ULC"
          className="logo"
        />
      </div>
      <ul className="nav-links">
        {menuItems.map((link, index) => (
          <li key={index} >
            <link.icon className="nav-logo" />
            <a href={link.text}>{link.text}</a>
          </li>
        ))}
      </ul>

      <hr />
      <div className="logout" onClick={() => {
        if (logout()) navigate("/login")
      }}>
        <FiLogOut className="logout-logo" />
        <a href="#" className="logout-link">
          Déconnexion
        </a>
      </div>
    </div>
  );
};

export default Navbar;
