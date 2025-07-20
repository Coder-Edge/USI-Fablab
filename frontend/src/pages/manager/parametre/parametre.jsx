import { NavParams } from "../../../components/Navbar/navParams"
import "./parametre.css"
import ButtonAdd from "../../../components/stocks/button-add"
import Button from "../../../components/button/Button"
import { useEffect, useState } from "react"

const ParamatreMNG = ({ setNavActive }) => {
    
    const [stockLimit, setStockLimit] = useState(2)
    const [darkMode, setDarkMode] = useState(false)
    const [notifications, setNotifications] = useState(true)

    useEffect(() => {
        setNavActive(NavParams.parametre);
        if (localStorage.getItem("darkMode") === "true") {
            setDarkMode(true)
            
        }
    }, [])

    const [posts, setPosts] = useState([
        "Manager",
        "Gestionnaire de stock",
        "Gestionnaire de projet",
        "Gestionnaire de finance",
        "Chargé de communication",
        "Chargé de maintenance"
    ])

    const [components, setComponents] = useState([
        "Capteur",
        "Microcontrolleur",
        "Moteur",
        "Outil"
    ])

    const [products, setProducts] = useState([
        "Portrait",
        "Support pour PC",
        "Accessoire",
        "Outil"
    ])


    const handleAddPoste = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const value = formData.get("poste")
        console.log(value);
        e.target.reset()
        e.target.style.visibility = "hidden"
    }

    const handleAddTypeComponent = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const value = formData.get("type")
        console.log(value);
        e.target.reset()
        e.target.style.visibility = "hidden"
    }

    const handleAddTypePoduct = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const value = formData.get("type")
        console.log(value);
        e.target.reset()
        e.target.style.visibility = "hidden"
    }

    return (
        <div className="parametre">
            <div className="content">
                <div className="header">
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

                <div className="section">
                    <span className="section-title">Postes :</span>
                    <div className="button-group">
                        {posts.map((post, index) => (
                            <button key={index} className="tag-button">
                                {post}
                            </button>
                        ))}
                        <button className="add-button" onClick={() => { document.getElementById("add-poste").style.visibility = "visible" }}>
                            <span>+</span> Ajouter
                        </button>
                    </div>
                </div>

                <div className="section">
                    <span className="section-title">Type de composant :</span>
                    <div className="button-group">
                        {components.map((component, index) => (
                            <button key={index} className="tag-button">
                                {component}
                            </button>
                        ))}
                        <button className="add-button" onClick={() => { document.getElementById("add-component-type").style.visibility = "visible" }}>
                            <span>+</span> Ajouter
                        </button>
                    </div>
                </div>

                <div className="section">
                    <span className="section-title">Type de produit :</span>
                    <div className="button-group">
                        {products.map((product, index) => (
                            <button key={index} className="tag-button">
                                {product}
                            </button>
                        ))}
                        <button className="add-button" onClick={() => { document.getElementById("add-product-type").style.visibility = "visible" }}>
                            <span>+</span> Ajouter
                        </button>
                    </div>
                </div>

                <div className="settings-group">
                    <div className="stock-limit">
                        <label>Limite de rupture de stock : </label>
                        <div className="number-input">
                            <button onClick={() => setStockLimit(prev => prev > 0 ? prev - 1 : prev)}>&lt;</button>
                            <input
                                type="text"
                                value={stockLimit.toString().padStart(2, '0')}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value) && value >= 0) {
                                        setStockLimit(value);
                                    }
                                }}
                            />
                            <button onClick={() => setStockLimit(prev => prev + 1)}>&gt;</button>
                        </div>
                    </div>
                    <div className="toggle-container">
                        <label>Mode sombre : </label>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={() => {
                                    const body = document.body;
                                    body.classList.toggle("dark-mode");
                                    localStorage.setItem("darkMode", !darkMode);
                                    setDarkMode(!darkMode);
                                }}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                        <span className="status-text">{darkMode ? 'Activé' : 'Désactivé'}</span>
                    </div>
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
                        <Button child="Par défaut" type="button" onClick={() => {
                            localStorage.setItem("darkMode", false);
                            
                        }}/>
                    </div>
                </div>
            </div>
            <form id="add-poste" onSubmit={handleAddPoste}>
                <div className="add-form-parameter-content">
                    <h3>Ajouter un nouveau poste</h3>
                    <input type="text" placeholder="Ex: maintenance des équipements" name="poste" />
                    <div className="row">
                        <Button type={"button"} child={"Annuler"} onClick={() => {
                            const form = document.getElementById("add-poste")
                            form.reset();
                            form.style.visibility = "hidden"
                        }} />
                        <ButtonAdd type={"submit"} child={"Ajouter"} />
                    </div>
                </div>
            </form>
            <form id="add-component-type" onSubmit={handleAddTypeComponent}>
                <div className="add-form-parameter-content">
                    <h3>Ajouter un nouveau type de composant</h3>
                    <input type="text" placeholder="Ex: maintenance des équipements" name="type" />
                    <div className="row">
                        <Button type={"button"} child={"Annuler"} onClick={() => {
                            const form = document.getElementById("add-component-type")
                            form.reset();
                            form.style.visibility = "hidden"
                        }} />
                        <ButtonAdd type={"submit"} child={"Ajouter"} />
                    </div>
                </div>
            </form>
            <form id="add-product-type" onSubmit={handleAddTypePoduct}>
                <div className="add-form-parameter-content">
                    <h3>Ajouter un nouveau type de produit</h3>
                    <input type="text" placeholder="Ex: maintenance des équipements" name="type" />
                    <div className="row">
                        <Button type={"button"} child={"Annuler"} onClick={() => {
                            const form = document.getElementById("add-product-type")
                            form.reset();
                            form.style.visibility = "hidden"
                        }} />
                        <ButtonAdd type={"submit"} child={"Ajouter"} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ParamatreMNG;