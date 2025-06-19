
import {
  FiBox,
  FiCalendar,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import logout from "./logout";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NavbarOTH = ({param, role}) => {

  const navigate = useNavigate()

  const menuItems = [
    { icon: MdOutlineShoppingBag, text: "Boutique" , link: `/${role.toLowerCase()}/shop`},
    { icon: FiBox, text: "Inventaire", link: `/${role.toLowerCase()}` },	
    { icon: FiCalendar, text: "Calendrier"},
    { icon: FiSettings, text: "Paramètre"},
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
          <li key={index} className={param == link.text ? "active" : ""} onClick={() => navigate(link.link)}>
          <link.icon className="nav-logo" />
          <a>{link.text}</a>
        </li>
        ))}
      </ul>

      <div className="bottom">
        <hr/>
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

export default NavbarOTH;
