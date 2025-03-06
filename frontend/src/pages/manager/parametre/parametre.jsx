
import { NavParams } from "../../../components/Navbar/navParams"
import "./parametre.css"
import ButtonAdd from "../../../components/stocks/button-add"
import Button from "../../../components/button/Button"
import { useState } from "react"


const ParamatreMNG = ({ setNavActive }) => {

    

        // Activer le bouton budget de la navbar
    setNavActive(NavParams.parametre)
    const [quantity, setQuantity] = useState(1)
    const [isOn, setIsOn] = useState(false)
    const toggleSwitch = () => setIsOn(!isOn)

    return (
        <div className="parametre">
            <div className="content">
                <div className="info">
                    <div className="field-input">
                        <label htmlFor="price">Devise : </label>
                        <select name="device">
                            <option value="$">$</option>
                            <option value="CDF">CDF</option>
                        </select>
                    </div>
                    <div className="field-input">
                        <label htmlFor="quantity">Langue : </label>
                        <select name="device">
                            <option value="$">Français</option>
                            <option value="CDF">Anglais</option>
                        </select>
                    </div>
                </div>
                <div className="info">
                    <div className="field-input">
                        <label htmlFor="quantity">Quantité: </label>
                        <button type="button" id="quantity" onClick={() => setQuantity((e) => (e > 1 ? e - 1 : e))}>&lt;</button>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value >= 0 ? parseInt(e.target.value) : quantity)} />
                        <button type="button" onClick={() => setQuantity((e) => (e + 1))}>&gt;</button>
                    </div>
                    <div>
                        <label htmlFor="quantity">Mode Sombre : Désactivé </label>
                    </div>                        
                </div>
                <div className="notifications">
                    <label htmlFor="notifications">Notifications : Activé </label>
                </div>
                <div className="toggle">
                        <input type="checkbox"></input>
                </div>
              
                
                <div className="BN" >
                    <Button child="Annuler" type="submit" />
                    <ButtonAdd child="Appliquer" type="submit" />
                </div>
                <div className="default">
                    <Button child="Par Defaut" type="submit" />
                </div>
            </div>
        </div>
    )
}

export default ParamatreMNG