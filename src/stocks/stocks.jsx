import "./stocks.css"
import { IoSearchOutline } from "react-icons/io5";

const Stocks = () => {
    return (
        <div className="stocks">
            <div className="head">
                <h2>Stocks</h2>
                <div className="search">
                    <IoSearchOutline className="icon" />
                    <input type="search" placeholder="Recherche" />
                </div>
            </div>
            <div className="button-container">
                <thead>
                    <div className="toolbar">
                        <button className="btn add-btn">➕ Ajouter</button>
                        <button className="btn active">Tous</button>
                        <button className="btn">Microcontrôleur</button>
                        <button className="btn">Moteur</button>
                        <button className="btn">Capteur</button>
                        <button className="btn">Outils</button>
                        <button className="btn">Outils</button>
                        <button className="btn">Outils</button>
                    </div>
                </thead>              
                
            </div>
            
            <div className="table">
                <table className="table-commands">
                <thead>
                    <tr>
                        <th className="product-name">Nom</th>
                        <th className="price">Prix</th>
                        <th className="emprunter">Type</th>
                        <th className="quantity">Quantité</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="product-name">
                            <div >
                                <img src="./src/assets/raspberry.jpg" alt="Raspberry pi" />
                                Raspberri py
                            </div>
                        </td>
                            <td className="price">
                                $3000
                        </td>
                            <td className="emprunter">
                                Microcontroleur
                            </td>
                            <td className="quantity">
                            <p>&lt;20&gt;</p>
                            </td>
                            <td className="status available">
                                Disponible
                            </td>
                        </tr>
                        <tr>
                        <td className="product-name">
                            <div >
                                <img src="./src/assets/raspberry.jpg" alt="Raspberry pi" />
                                Raspberri py
                            </div>
                        </td>
                            <td className="price">
                                $3000
                        </td>
                            <td className="emprunter">
                                Microcontroleur
                            </td>
                            <td className="quantity">
                            <p>&lt;20&gt;</p>
                            </td>
                            <td className="status to-order">
                                Commander
                            </td>
                        </tr>
                        <tr>
                        <td className="product-name">
                            <div >
                                <img src="./src/assets/raspberry.jpg" alt="Raspberry pi" />
                                Raspberri py
                            </div>
                        </td>
                            <td className="price">
                                $3000
                        </td>
                            <td className="emprunter">
                                Microcontroleur
                            </td>
                            <td className="quantity">
                            <p>&lt;20&gt;</p>
                            </td>
                            <td className="status unavailable">
                                Indisponible                
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Stocks;