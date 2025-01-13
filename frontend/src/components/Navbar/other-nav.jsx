
import {
  FiBox,
  FiCalendar,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { MdOutlineShoppingBag } from "react-icons/md";

const NavbarOTH = () => {
  const menuItems = [
    { icon: MdOutlineShoppingBag, text: "Boutique", active: false },
    { icon: FiBox, text: "Inventaire", active: false },
    { icon: FiCalendar, text: "Calendrier", active: false },
    { icon: FiSettings, text: "Paramètre", active: false },
  ];

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
      <div className="logout">
        <FiLogOut className="logout-logo" />
        <a href="#" className="logout-link">
          Déconnexion
        </a>
      </div>
    </div>
  );
};

export default NavbarOTH;
