import "./add-command.css"
import { IoMdClose } from "react-icons/io";
import HeadStocks from "../stocks/head-stock";
import { createContext, useState } from "react";
import ToolBox from "../stocks/toolbox";
import Button from "../button/Button";
import { MdAddCircleOutline } from "react-icons/md";
import DynamicTable from "../table/table";
import AddCommandTable from "./add-command-table";
import ButtonAdd from "../stocks/button-add";
import axios from "../../api/api";
import Swal from "sweetalert2";


const AddCommand = ({ data }) => {

    const AddCommandContext = createContext();

    const [searchTerm, setSearchTerm] = useState("")
    const [btnActive, setBtnActive] = useState("")
    const [types, setTypes] = useState(["rre", "trzezt", "motor"])
    const [type, setType] = useState("");
    const [newCommand, setNewCommand] = useState([]);

    const increaseQuantity = (index) => {
        setNewCommand((prevCommands) => {
            const updatedCommands = [...prevCommands];
            updatedCommands[index].quantity += 1;
            return updatedCommands;
        });
    }

    const decresaseQuantity = (index) => {
        setNewCommand((prevCommands) => {
            const updatedCommands = [...prevCommands]
            updatedCommands[index].quantity -= 1
            return updatedCommands
        })
    }

    const SetTypeFilter = (e) => {
        setType(e);
        setBtnActive(e);
    }

    const closePop = () => {
        const component = document.querySelector("#add-command");
        component.style.visibility = "hidden";
        setNewCommand([]);
    }

    

    const onSubmit = (e) => {
        e.preventDefault();

        let DateNow = new Date(Date.now());

        // Créer un objet contenant les données de la commande
        const newCommand_product = { listproduct : newCommand, date : DateNow };

        console.log(newCommand_product);

        const insertcommand = async (b) => {
        try {
            const res = await axios.post("/add_command", b);

            // Afficher un message de succès avec SweetAlert2
            Swal.fire({
            title: "Commande validée !",
            text: "Votre commande a été enregistrée avec succès.",
            icon: "success",
            confirmButtonText: "OK",
            });
        } catch (err) {
            console.error("Erreur lors de la requête :", err);

            // Afficher un message d'erreur en cas d'échec
            Swal.fire({
            title: "Erreur",
            text: "Une erreur s'est produite lors de l'enregistrement de la commande.",
            icon: "error",
            confirmButtonText: "OK",
            });
        }
        };

        // Send POST request to /add_command
        insertcommand(newCommand_product);

        closePop()
    }

    return (
        <form id="add-command" onSubmit={onSubmit}>
            <div className="add-popup">
                <div className="add-command-content">
                    <HeadStocks title={
                        <div className="header">
                            <button type="button" onClick={closePop}><IoMdClose /></button>
                            <h3>Formulaire d'ajout de commandes</h3>
                        </div>
                    } setSearchTerm={setSearchTerm} />
                    <ToolBox
                        firstbutton={<Button child={<><MdAddCircleOutline /> Ajouter</>} type="button" />}
                        types={types}
                        btnActive={btnActive}
                        SetTypeFilter={SetTypeFilter}
                    />
                    <AddCommandContext.Provider value={{ data, type, searchTerm, setNewCommand, newCommand, closePop }}>
                        <AddCommandTable context={AddCommandContext} />
                    </AddCommandContext.Provider>
                    <div className="lists">
                        <div className="command-list">
                            <p>Liste des nouvelles commandes</p>
                            <DynamicTable
                                theadChild={
                                    <tr>
                                        <th className="component" style={{ width: "50%" }}>Nom</th>
                                        <th className="price" style={{ width: "25%" }}>Prix</th>
                                        <th className="quantity" style={{ width: "25%" }}>Quantité</th>
                                    </tr>
                                }
                                tbodyChild={
                                    newCommand.map(
                                        (product, index) => {

                                            const originalProduct = data.find(item => item._id === product._id);
                                            return (<tr key={index}>
                                                <td className="component" style={{ width: "50%" }}>
                                                    <div >
                                                        <img src={`http://localhost:3000/img/${product.image}`} alt={product.name} />
                                                        {product.name.length <= 27 ? product.name : `${product.name.slice(0, 25)} ...`}
                                                    </div>
                                                </td>
                                                <td className="price" style={{ width: "25%" }}>
                                                    ${product.price}
                                                </td>
                                                <td className="quantity" style={{ width: "25%" }}>
                                                    <button className="btn" type="button" onClick={() => decresaseQuantity(index)} disabled={product.quantity === 1}>&lt;</button>
                                                    <span>{product.quantity}</span>
                                                    <button className="btn" type="button" onClick={() => increaseQuantity(index)} disabled={originalProduct && product.quantity >= originalProduct.quantity}>&gt;</button>
                                                </td>
                                            </tr>)
                                        }
                                    )
                                }
                            />
                        </div>
                        <div className="command-list">
                            <p>Liste des anciennes commandes</p>
                            <DynamicTable
                                theadChild={
                                    <tr>
                                        <th className="component" style={{ width: "50%" }}>Nom</th>
                                        <th className="price" style={{ width: "25%" }}>Prix</th>
                                        <th className="quantity" style={{ width: "25%" }}>Quantité</th>
                                    </tr>
                                }
                                tbodyChild={
                                    <>
                                        <tr>
                                            <td className="component" style={{ width: "50%" }}>
                                                <div >
                                                    <img src={`src/assets/products/arduino.jpg`} alt="arduino" />
                                                    {/* {product.name.length <= 27 ? product.name : `${product.name.slice(0, 25)} ...`} */}
                                                    Arduino Uno
                                                </div>
                                            </td>
                                            <td className="price" style={{ width: "25%" }}>
                                                $200
                                            </td>
                                            <td className="quantity" style={{ width: "25%" }}>
                                                <button className="btn">&lt;</button>
                                                <span>1</span>
                                                <button className="btn">&gt;</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="component" style={{ width: "50%" }}>
                                                <div >
                                                    <img src={`src/assets/products/arduino.jpg`} alt="arduino" />
                                                    {/* {product.name.length <= 27 ? product.name : `${product.name.slice(0, 25)} ...`} */}
                                                    Arduino Uno
                                                </div>
                                            </td>
                                            <td className="price" style={{ width: "25%" }}>
                                                $200
                                            </td>
                                            <td className="quantity" style={{ width: "25%" }}>
                                                <button type="button" className="btn">&lt;</button>
                                                <span>1</span>
                                                <button type="button" className="btn">&gt;</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="component" style={{ width: "50%" }}>
                                                <div >
                                                    <img src={`src/assets/products/arduino.jpg`} alt="arduino" />
                                                    {/* {product.name.length <= 27 ? product.name : `${product.name.slice(0, 25)} ...`} */}
                                                    Arduino Uno
                                                </div>
                                            </td>
                                            <td className="price" style={{ width: "25%" }}>
                                                $200
                                            </td>
                                            <td className="quantity" style={{ width: "25%" }}>
                                                <button className="btn">&lt;</button>
                                                <span>1</span>
                                                <button className="btn">&gt;</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="component" style={{ width: "50%" }}>
                                                <div >
                                                    <img src={`src/assets/products/arduino.jpg`} alt="arduino" />
                                                    {/* {product.name.length <= 27 ? product.name : `${product.name.slice(0, 25)} ...`} */}
                                                    Arduino Uno
                                                </div>
                                            </td>
                                            <td className="price" style={{ width: "25%" }}>
                                                $200
                                            </td>
                                            <td className="quantity" style={{ width: "25%" }}>
                                                <button className="btn">&lt;</button>
                                                <span>1</span>
                                                <button className="btn">&gt;</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="component" style={{ width: "50%" }}>
                                                <div >
                                                    <img src={`src/assets/products/arduino.jpg`} alt="arduino" />
                                                    {/* {product.name.length <= 27 ? product.name : `${product.name.slice(0, 25)} ...`} */}
                                                    Arduino Uno
                                                </div>
                                            </td>
                                            <td className="price" style={{ width: "25%" }}>
                                                $200
                                            </td>
                                            <td className="quantity" style={{ width: "25%" }}>
                                                <button className="btn">&lt;</button>
                                                <span>1</span>
                                                <button className="btn">&gt;</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="component" style={{ width: "50%" }}>
                                                <div >
                                                    <img src={`src/assets/products/arduino.jpg`} alt="arduino" />
                                                    {/* {product.name.length <= 27 ? product.name : `${product.name.slice(0, 25)} ...`} */}
                                                    Arduino Uno
                                                </div>
                                            </td>
                                            <td className="price" style={{ width: "25%" }}>
                                                $200
                                            </td>
                                            <td className="quantity" style={{ width: "25%" }}>
                                                <button className="btn">&lt;</button>
                                                <span>1</span>
                                                <button className="btn">&gt;</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="component" style={{ width: "50%" }}>
                                                <div >
                                                    <img src={`src/assets/products/arduino.jpg`} alt="arduino" />
                                                    {/* {product.name.length <= 27 ? product.name : `${product.name.slice(0, 25)} ...`} */}
                                                    Arduino Uno
                                                </div>
                                            </td>
                                            <td className="price" style={{ width: "25%" }}>
                                                $200
                                            </td>
                                            <td className="quantity" style={{ width: "25%" }}>
                                                <button className="btn">&lt;</button>
                                                <span>1</span>
                                                <button className="btn">&gt;</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="component" style={{ width: "50%" }}>
                                                <div >
                                                    <img src={`src/assets/products/arduino.jpg`} alt="arduino" />
                                                    {/* {product.name.length <= 27 ? product.name : `${product.name.slice(0, 25)} ...`} */}
                                                    Arduino Uno
                                                </div>
                                            </td>
                                            <td className="price" style={{ width: "25%" }}>
                                                $200
                                            </td>
                                            <td className="quantity" style={{ width: "25%" }}>
                                                <button className="btn">&lt;</button>
                                                <span>1</span>
                                                <button className="btn">&gt;</button>
                                            </td>
                                        </tr>
                                    </>
                                }
                            />
                        </div>
                    </div>
                    <ButtonAdd child={"Confirmer"} type={"submit"} />
                </div>
            </div>
        </form>
    )
}


export default AddCommand;
