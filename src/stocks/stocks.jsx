import "./stocks.css"
import { IoSearchOutline } from "react-icons/io5";
import { Product, ListProducts } from "../models/product";
import { useEffect, useState } from "react";

const Stocks = () => {

    // button quantity
    const sup = ">"
    const inf = "<"

    //data acquisition
    const [data, setData] = useState([])
    const [types, setTypes] = useState([])
    useEffect(() => {
        setData(ListProducts)
        setTypes(Product.getTypes(ListProducts))
    }, []) 

    //search
    const [searchTerm, setSearchTerm] = useState("")
    const handleSearchTerm = (e) => {
        let value = e.target.value.toLowerCase()
        setSearchTerm(value)
    }

    //active button
    const [btnActive, setBtnActive] = useState("")
    const activeBtn = (btn) => {
        setBtnActive(btn)
    }

    // Filter type data
    const [type, setType] = useState('')
    // product types

    const setFilter = (e) => {
        let value = e.target.value.toLowerCase()
        if (type != value) {
            setType(value)
        }
    }

    return (
        <div className="stocks">
            <div className="head">
                <h2>Stocks</h2>
                <div className="search">
                    <IoSearchOutline className="icon" />
                    <input type="search" placeholder="Recherche" onChange={handleSearchTerm} />
                </div>

            </div>
            <div className="toolbar">
                <button>➕ Ajouter</button>
                <button className={btnActive == "" ? "active" : ""} onClick={(e) => {
                    setFilter(e)
                    activeBtn("")
                }}>Tous
                </button>
                {types.map((productType, index) => (                    
                    <button key={index}
                        className={btnActive == productType.toLowerCase() ? "active" : ""}
                        style={{ whiteSpace: "nowrap" }}
                        value={productType.toLowerCase()}
                        onClick={(e) => {
                            setFilter(e)
                            activeBtn(productType.toLowerCase())
                        }}>
                        {productType.toLowerCase()}
                    </button>
                ))}
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
                        {data
                            .filter((product) => {
                                return product.type.toLowerCase().includes(searchTerm) || product.name.toLowerCase().includes(searchTerm)
                            })
                            .filter((product) => {
                                return product.type.toLowerCase().match(type)
                            }).map((product, index) => (
                                <tr key={index}>
                                    <td className="component" style={{ width: "40%" }}>
                                        <div >
                                            <img src={product.image} alt={product.name} />
                                            {product.name.length <= 27 ? product.name : `${product.name.slice(0, 25)} ...`}
                                        </div>
                                    </td>
                                    <td className="price" style={{ width: "15%" }}>
                                        ${product.price * product.quantity}
                                    </td>
                                    <td className="type" style={{ width: "15%" }}>
                                        {product.type}
                                    </td>
                                    <td className="quantity" style={{ width: "15%" }}>
                                        <button className="btn">{inf}</button>
                                        <span>{product.quantity}</span>
                                        <button className="btn">{sup}</button>
                                    </td>
                                    <td className={product.is_available ? "status available" : "status unavailable"} style={{ width: "15%" }}>
                                        <p>{product.is_available ? "Disponible" : "Pas disponible"}</p>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Stocks;