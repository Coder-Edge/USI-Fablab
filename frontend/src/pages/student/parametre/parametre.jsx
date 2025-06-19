import { NavParams } from "../../../components/Navbar/navParams"
import "./parametre.css"
import ButtonAdd from "../../../components/stocks/button-add"
import Button from "../../../components/button/Button"
import { useState } from "react"

const ParamatreMNG = ({ setNavActive }) => {
    setNavActive(NavParams.parametre)
    const [quantity, setQuantity] = useState(1)
    const [darkMode, setDarkMode] = useState(false)
    const [notifications, setNotifications] = useState(true)

    return (
        <div className="parametre">
            <div className="content">
                <div className="info">
                    <div className="field-input">
                        <label>Devise : </label>
                        <select defaultValue="$">
                            <option value="$">$</option>
                            <option value="CDF">CDF</option>
                        </select>
                    </div>
                    <div className="field-input">
                        <label>Langue : </label>
                        <select defaultValue="Français">
                            <option value="Français">Français</option>
                            <option value="Anglais">Anglais</option>
                        </select>
                    </div>
                </div>

                <div className="component-section">
                    <label>Type de composant : </label>
                    <div className="component-types">
                        <button>Capteur</button>
                        <button>Microcontrolleur</button>
                        <button>Moteur</button>
                        <button>Outil</button>
                        <button className="add-button">
                            <span>+</span> Ajouter
                        </button>
                    </div>
                </div>

                <div className="toggle-container">
                    <label>Mode sombre : </label>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                    <span className="status-text">{darkMode ? 'Activé' : 'Désactivé'}</span>
                </div>

                <div className="toggle-container">
                    <label>Notification : </label>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                    <span className="status-text">{notifications ? 'Activé' : 'Désactivé'}</span>
                </div>

                <div className="buttons">
                    <div className="action-buttons">
                        <Button child="Annuler" type="button" />
                        <ButtonAdd child="Appliquer" type="button" />
                    </div>
                    <div className="default-button">
                        <Button child="Par Défaut" type="button" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParamatreMNG;