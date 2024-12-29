import "./commands.css"
import { FaMoneyBills } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { commands } from "../../models/command";
import ButtonAdd from "../stocks/button-add";
import HeadStocks from "../stocks/head-stock";


const Commands = () => {

    // research
    const [searchTerm, setSearchTerm] = useState("")

    //Total price
    const [sum, setSum] = useState(0);

    // Calcul du total à chaque mise à jour de `commands`
    useEffect(() => {
        const total = commands.reduce((accCommand, command) => {
            return accCommand + command.product.price * command.quantity
        }, 0);
        setSum(total);
    }, [commands]);

    return (
        <div className="commands">
            <HeadStocks title={"Commandes"} setSearchTerm={setSearchTerm}/>
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
                        {commands
                        .filter((command) => (
                            command.product.name.toLowerCase().includes(searchTerm) || command.user.name.toLowerCase().includes(searchTerm)
                        ))
                        .map((command, ind0) => (
                            <tr key={ind0}>
                                <td className="component" style={{ width: "50%" }}>
                                    <div>
                                        <img src={command.product.image} alt={command.product.name} />
                                        {command.product.name.length <= 15 ? command.product.name : `${command.product.name.slice(0, 12)}...`}
                                    </div>
                                </td>
                                <td className="price" style={{ width: "20%" }}>
                                    ${command.product.price * command.quantity}
                                </td>
                                <td className="quantity" style={{ width: "20%" }}>
                                    <button className="btn">&lt;</button>
                                    <span>{command.quantity}</span>
                                    <button className="btn">&gt;</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ButtonAdd child={"Ajouter au stock"} />
        </div>
    )
}

export default Commands;