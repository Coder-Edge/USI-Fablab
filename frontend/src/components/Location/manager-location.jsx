import "./location.css"
import { borrows } from "../../models/borows";
import { useEffect, useState } from "react";
import HeadStocks from "../stocks/head-stock";
import DynamicTable from "../table/table";

const LocationMNG = () => {

    // data acquisition
    const [data, setData] = useState([])

    useEffect(() => {
        setData(borrows)
    }, [])

    // search
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="location">
            <HeadStocks title={"Location"} setSearchTerm={setSearchTerm} />
            <DynamicTable
                theadChild={
                    <tr>
                        <th className="component" style={{ width: "27%" }}>Composant</th>
                        <th className="emprunter" style={{ width: "23%" }}>Emprunter</th>
                        <th className="quantity" style={{ width: "15%" }}>Quantité</th>
                        <th style={{ width: "35%" }}>Status</th>
                    </tr>
                }
                tbodyChild={
                    data
                        .filter((a) => {
                            return a.product.name.toLowerCase().includes(searchTerm) || a.user.name.toLowerCase().includes(searchTerm)
                        })
                        .map((borrow, ind0) => (
                            <tr key={ind0}>
                                <td className="component" style={{ width: "27%" }}>
                                    <div>
                                        <img src={borrow.product.image} alt={borrow.product.name} />
                                        {borrow.product.name.length <= 15 ? borrow.product.name : `${borrow.product.name.slice(0, 12)}...`}
                                    </div>
                                </td>
                                <td className="emprunter" style={{ width: "23%" }}>
                                    {borrow.user.name.length <= 17 ? borrow.user.name : `${borrow.user.name.slice(0, 14)} ...`}
                                </td>
                                <td className="quantity" style={{ width: "15%" }}>
                                    <button className="btn">&lt;</button>
                                    <span>{borrow.quantity}</span>
                                    <button className="btn">&gt;</button>
                                </td>
                                <td className="status" style={{ width: "35%" }}>
                                    Du {getStringDate(borrow.date)} au {getStringDate(borrow.enddate)}
                                </td>
                            </tr>
                        ))
                } />
        </div>
    )
}

function getStringDate(dateparam) {
    let date = new Date(dateparam)
    const option = { day: '2-digit', month: '2-digit', year: '2-digit' }
    return new Intl.DateTimeFormat('fr-FR', option).format(date)
}

export default LocationMNG;