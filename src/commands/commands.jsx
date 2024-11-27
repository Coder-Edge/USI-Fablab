import "./commands.css"
import { FaMoneyBills } from "react-icons/fa6";


const Commands = () => {
    const sup = ">"
    const inf = "<"
    return(
        <div className="commands">
            <h2>Commandes</h2>
            <div className="total-price">
                <div className="info-price">
                    <p className="label">Cout total</p>
                    <p className="value">$ 3500</p>
                </div>
                <FaMoneyBills className="icon-money"/>
            </div>
            <div className="table">
                <table className="table-commands">
                    <thead>
                        <tr>
                            <th>Composant</th>
                            <th>Prix</th>
                            <th>Quantité</th>
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
                                $300
                            </td>
                            <td>
                                <button className="btn">{inf}</button>
                                <span>20</span>
                                <button className="btn">{sup}</button>
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
                                $300
                            </td>
                            <td>
                                <button className="btn">{inf}</button>
                                <span>20</span>
                                <button className="btn">{sup}</button>
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
                                $300
                            </td>
                            <td>
                                <button className="btn">{inf}</button>
                                <span>20</span>
                                <button className="btn">{sup}</button>
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
                                $300
                            </td>
                            <td>
                                <button className="btn">{inf}</button>
                                <span>20</span>
                                <button className="btn">{sup}</button>
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
                                $300
                            </td>
                            <td>
                                <button className="btn">{inf}</button>
                                <span>20</span>
                                <button className="btn">{sup}</button>
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
                                $300
                            </td>
                            <td>
                                <button className="btn">{inf}</button>
                                <span>20</span>
                                <button className="btn">{sup}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Commands;