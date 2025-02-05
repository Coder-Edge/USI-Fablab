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

const Navbar = ({param, role}) => {  

  const menuItems = [
    { icon: FiGrid, text: "Tableau de bord", link: `/${role}/board`},
    { icon: FiBox, text: "Inventaire", link: `/${role}`},
    { icon: FiDollarSign, text: "Budget", link: `/${role}/budget`},
    { icon: FiCalendar, text: "Calendrier", link: ""},
    { icon: FiUsers, text: "Membres", link: `/${role}/members`},
    { icon: FiShoppingBag, text: "Boutique", link: ""},
    { icon: FiSettings, text: "Paramètre", link: ""},
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
          <li key={index} className={param == link.text ? "active": ""}>
            <link.icon className="nav-logo" />
            <a href={link.link}>{link.text}</a>
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
