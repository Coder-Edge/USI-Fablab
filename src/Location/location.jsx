import "./location.css"
import { IoSearchOutline } from "react-icons/io5";
import { borrows } from "../models/borows";
import { useEffect, useState } from "react";

const Location = () => {

    // data acquisition
    const [data, setData] = useState([])

    useEffect(() => {
        setData(borrows)
    }, [])

    // search
    const [searchTerm, setSearchTerm] = useState([])

    const handleSearch = (e) => {
        let value = e.target.value.toLowerCase()
        setSearchTerm(value)
    }

    return (
        <div className="location">
            <div className="head">
                <h2>Location</h2>
                <div className="search">
                    <IoSearchOutline className="icon" />
                    <input type="search" placeholder="Recherche" onChange={handleSearch} />
                </div>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th className="component" style={{ width: "32%" }}>Composant</th>
                            <th className="emprunter" style={{ width: "33%" }}>Emprunter</th>
                            <th className="quantity" style={{ width: "20%" }}>Quantité</th>
                            <th style={{ width: "15%" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody style={{ maxHeight: "240px" }}>
                        {data
                        .map((borrow, ind0) => (
                            borrow.products
                            .filter((a) => {
                                return a["product"].name.toLowerCase().includes(searchTerm) || borrow.user.name.toLowerCase().includes(searchTerm)
                            })
                            .map((item, ind1) => (
                                <tr key={`${ind0}-${ind1}`}>
                                    <td className="component" style={{ width: "32%" }}>
                                        <div>
                                            <img src={item["product"].image} alt=""/>
                                            {item['product'].name.length <= 15 ? item['product'].name: `${item['product'].name.slice(0, 12)}...` }
                                        </div>
                                    </td>
                                    <td className="emprunter" style={{ width: "33%" }}>
                                        {borrow.user.name.length <= 18 ? borrow.user.name: `${borrow.user.name.slice(0, 16)} ...`}
                                    </td>
                                    <td className="quantity" style={{ width: "20%" }}>
                                        {item["quantity"]}
                                    </td>
                                    <td className="status" style={{ width: "15%" }}>
                                        {getStringDate(borrow.date)}
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function getStringDate(dateparam) {
    let date = new Date(dateparam)
    const option = {day: '2-digit', month: '2-digit', year: '2-digit'}
    return new Intl.DateTimeFormat('fr-FR', option).format(date)
}

export default Location;