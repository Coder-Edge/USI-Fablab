import "./location.css"
import { IoSearchOutline } from "react-icons/io5";

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
                        <tr>
                            <td className="product-name">
                                <div >
                                    <img src="./src/assets/raspberry.jpg" alt="Raspberry pi" />
                                    Raspberri py
                                </div>
                            </td>
                            <td className="emprunter">
                                Gloire Mankununu
                            </td>
                            <td className="quantity">
                                10
                            </td>
                            <td className="status">
                                12/11/2024
                            </td>
                        </tr>
                        <tr>
                            <td className="product-name">
                                <div >
                                    <img src="./src/assets/raspberry.jpg" alt="Raspberry pi" />
                                    Raspberri py
                                </div>
                            </td>
                            <td className="emprunter">
                                Claudel Mubenzem
                            </td>
                            <td className="quanity">
                                10
                            </td>
                            <td className="status">
                                12/11/2024
                            </td>
                        </tr>
                        <tr>
                            <td className="product-name">
                                <div >
                                    <img src="./src/assets/raspberry.jpg" alt="Raspberry pi" />
                                    Raspberri py
                                </div>
                            </td>
                            <td className="emprunter">
                                Remile Bianga
                            </td>
                            <td className="quanity">
                                10
                            </td>
                            <td className="status">
                                12/11/2024
                            </td>
                        </tr>
                        <tr>
                            <td className="product-name">
                                <div >
                                    <img src="./src/assets/raspberry.jpg" alt="Raspberry pi" />
                                    Raspberri py
                                </div>
                            </td>
                            <td className="emprunter">
                                Nathan Lukamba
                            </td>
                            <td className="quanity">
                                10
                            </td>
                            <td className="status">
                                12/11/2024
                            </td>
                        </tr>
                        <tr>
                            <td className="product-name">
                                <div >
                                    <img src="./src/assets/raspberry.jpg" alt="Raspberry pi" />
                                    Raspberri py
                                </div>
                            </td>
                            <td className="emprunter">
                                Nathan Lukamba
                            </td>
                            <td className="quanity">
                                10
                            </td>
                            <td className="status">
                                12/11/2024
                            </td>
                        </tr>
                        <tr>
                            <td className="product-name">
                                <div >
                                    <img src="./src/assets/raspberry.jpg" alt="Raspberry pi" />
                                    Raspberri py
                                </div>
                            </td>
                            <td className="emprunter">
                                Gloire Mankununu
                            </td>
                            <td className="quanity">
                                10
                            </td>
                            <td className="status">
                                12/11/2024
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Location;