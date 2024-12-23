import "./location.css"
import { IoSearchOutline } from "react-icons/io5";
import {borrows} from "../models/borows";

const Location = () => {
    return (
        <div className="location">
            <div className="head">
                <h2>Location</h2>
                <div className="search">
                    <IoSearchOutline className="icon" />
                    <input type="search" placeholder="Recherche" />
                </div>
            </div>
            <div className="table">
                <table className="table-commands">
                <thead>
                    <tr>
                        <th className="product-name">Composant</th>
                        <th className="emprunter">Emprunter</th>
                        <th className="quantity">Quantité</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {borrows.map((borrow, borrowIndex) => (
                            borrow.products.map((item, index) => (
                            <tr key={`${borrowIndex}-${index}`}>
                                <td className="product-name">
                                    <div >
                                        <img src={item["product"].image} alt={item["product"].name} />
                                        {item["product"].name.length <= 13 ? item["product"].name: `${item["product"].name.slice(0, 13)} ...`}
                                    </div>
                                </td>
                                <td className="emprunter">
                                    {borrow.user.name.length <= 18 ? borrow.user.name: `${borrow.user.name.slice(0, 17)} ...`}
                                </td>
                                <td className="quantity">
                                    {item["quantity"]}
                                </td>
                                <td className="status">
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