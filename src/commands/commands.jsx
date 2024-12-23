import "./commands.css"
import { FaMoneyBills } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { commands } from "../models/command";


const Commands = () => {
    //Total price
    const [sum, setSum] = useState(0);

    console.log(commands);
    
    // Calcul du total à chaque mise à jour de `commands`
    useEffect(() => {
        const total = commands.reduce((accCommand, command) => {
            return accCommand + command.products.reduce((accProduct, item) => {
                return accProduct + item["product"].price * item["quantity"];
            }, 0);
        }, 0);
        setSum(total);
    }, [commands]); 

    console.log(sum);
    

    // button price
    const sup = ">"
    const inf = "<"

    return(
        <div className="commands">
            <h2>Commandes</h2>
            <div className="total-price">
                <div className="info-price">
                    <p className="label">Cout total</p>
                    <p className="value">{sum}</p>
                </div>
                <FaMoneyBills className="icon-money"/>
            </div>
            <div className="table">
                <table className="table-commands">
                    <thead>
                        <tr>
                            <th className="product-name">Composant</th>
                            <th className="price">Prix</th>
                            <th className="action">Quantité</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commands.map((command, indexCommand) => (
                            command.products.map((item, indexPro) => (
                            <tr key={`${indexCommand}-${indexPro}`}>
                                <td className="product-name">
                                    <div >
                                        <img src={item['product'].image} alt={item['product'].name} />
                                        {item['product'].name.length <= 15 ? item['product'].name: `${item['product'].name.slice(0, 12)}...` }
                                    </div>
                                </td>
                                <td className="price">
                                    ${item['product'].price * item['quantity']}
                                    
                                </td>
                                <td className="action">
                                    <button className="btn">{inf}</button>
                                    <span>{item['quantity']}</span>
                                    <button className="btn">{sup}</button>
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

export default Commands;