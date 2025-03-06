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
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = ({param, role}) => {  

  const menuItems = [
    { icon: FiGrid, text: "Tableau de bord", link: `/${role.toLowerCase()}/board`},
    { icon: FiBox, text: "Inventaire", link: `/${role.toLowerCase()}`},
    { icon: FiDollarSign, text: "Budget", link: `/${role.toLowerCase()}/budget`},
    { icon: FiCalendar, text: "Calendrier", link: `/${role.toLowerCase()}/calendar`},
    { icon: FiUsers, text: "Membres", link: `/${role.toLowerCase()}/members`},
    { icon: FiShoppingBag, text: "Boutique", link: ""},
    { icon: FiSettings, text: "Paramètre", link: `/${role.toLowerCase()}/parametre`},
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
          <li key={index} className={param == link.text ? "active": ""} onClick={() => navigate(link.link)}>
            <link.icon className="nav-logo" />
            <a>{link.text}</a>
          </li>
        ))}
      </ul>

      <div className="bottom">
        <hr />
        <div className="logout" onClick={() => {
          if (logout()) navigate("/login")
        }}>
          <FiLogOut className="logout-logo" />
          <a className="logout-link">
            Déconnexion
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
