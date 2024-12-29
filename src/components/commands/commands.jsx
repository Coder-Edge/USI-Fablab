import "./commands.css"
import { FaMoneyBills } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { commands } from "../../models/command";
import Button from "../button/Button";
import ButtonAdd from "../stocks/button-add";


const Commands = () => {
    //Total price
    const [sum, setSum] = useState(0);

    // Calcul du total à chaque mise à jour de `commands`
    useEffect(() => {
        const total = commands.reduce((accCommand, command) => {
            return accCommand + command.products.reduce((accProduct, item) => {
                return accProduct + item["product"].price * item["quantity"];
            }, 0);
        }, 0);
        setSum(total);
    }, [commands]);

    return (
        <div className="commands">
            <h2>Commandes</h2>
            <div className="total-price">
                <div className="info-price">
                    <p className="label">Cout total</p>
                    <p className="value">$ {sum}</p>
                </div>
                <FaMoneyBills className="icon-money" />
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "50%" }} className="component">Composant</th>
                            <th className="price" style={{ width: "20%" }}>Prix</th>
                            <th className="quantity" style={{ width: "20%" }}>Quantité</th>
                        </tr>
                    </thead>
                    <tbody style={{ maxHeight: "170px" }}>
                        {commands.map((command, ind0) => (
                            command.products.map((item, ind1) => (
                                <tr key={`${ind0}-${ind1}`}>
                                    <td className="component" style={{ width: "50%" }}>
                                        <div>
                                            <img src={item["product"].image} alt="" />
                                            {item['product'].name.length <= 15 ? item['product'].name : `${item['product'].name.slice(0, 12)}...`}
                                        </div>
                                    </td>
                                    <td className="price" style={{ width: "20%" }}>
                                        ${item['product'].price * item['quantity']}
                                    </td>
                                    <td className="quantity" style={{ width: "20%" }}>
                                        <button className="btn">&lt;</button>
                                        <span>{item['quantity']}</span>
                                        <button className="btn">&gt;</button>
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
            <ButtonAdd child={"Ajouter au stock"} />
        </div>
    )
}

export default Commands;