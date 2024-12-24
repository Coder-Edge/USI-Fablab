import "./stocks.css"
import { IoSearchOutline } from "react-icons/io5";
import { ListProducts } from "../models/product";

const Stocks = () => {

    // button quantity
    const sup = ">"
    const inf = "<"

    return (
        <div className="stocks">
            <div className="head">
                <h2>Stocks</h2>
                <div className="search">
                    <IoSearchOutline className="icon" />
                    <input type="search" placeholder="Recherche" />
                </div>

            </div>
            <div className="toolbar">
                <button>➕ Ajouter</button>
                <button className="active">Tous</button>
                <button>Microcontrôleur</button>
                <button>Moteur</button>
                <button>Capteur</button>
                <button>Batterie</button>
                <button>Outils</button>
                <button>Outils</button>
                <button>Moteur</button>
                <button>Capteur</button>
                <button>Outils</button>
                <button>Outils</button>
                <button>Outils</button>
            </div>            
                

            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th className="component" style={{ width: "40%" }}>Nom</th>
                            <th className="price" style={{ width: "15%" }}>Prix</th>
                            <th className="type" style={{ width: "15%" }}>Type</th>
                            <th className="quantity" style={{ width: "15%" }}>Quantité</th>
                            <th style={{ width: "15%" }}>Status</th>
                        </tr>
                    </thead>

                    <tbody style={{ maxHeight: "280px" }}>
                    {ListProducts.map((product, index) => (
                        <tr key={index}>
                            <td className="component" style={{ width: "40%" }}>
                                <div >
                                    <img src={product.image} alt={product.name} />
                                    {product.name.length <= 15 ? product.name: `${product.name.slice(0, 15)} ...`}
                                </div>
                            </td>
                            <td className="price" style={{ width: "15%" }}>
                                {product.price * product.quantity}
                            </td>
                            <td className="type" style={{ width: "15%" }}>
                                {product.type}
                            </td>
                            <td className="quantity" style={{ width: "15%" }}>
                                <button className="btn">{inf}</button>
                                <span>{product.quantity}</span>
                                <button className="btn">{sup}</button>
                            </td>
                            <td className={product.is_available ? "status available": "status unavailable"} style={{ width: "15%" }}>
                                <p>{product.is_available ? "Disponible": "Pas disponible"}</p>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            
            {/*<div className="table">
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
                    {ListProducts.map((product, index) => (
                        <tr key={index}>
                            <td className="product-name">
                                <div >
                                    <img src={product.image} alt={product.name} />
                                    {product.name.length <= 15 ? product.name: `${product.name.slice(0, 15)} ...`}
                                </div>
                            </td>
                                <td className="price">
                                    {product.price * product.quantity}
                            </td>
                            <td className="emprunter">
                                {product.type}
                            </td>
                            <td className="quantity">
                                <p>&lt;20&gt;</p>
                            </td>
                            <td className="status available">
                                Disponible
                            </td>
                        </tr>
                    ))}                        
                    </tbody>
                </table>
            </div>*/}
        </div>
    )
}

export default Stocks;