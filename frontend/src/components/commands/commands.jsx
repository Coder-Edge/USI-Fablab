
import "./commands.css"
import { FaMoneyBills } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ButtonAdd from "../stocks/button-add";
import HeadStocks from "../stocks/head-stock";
import DynamicTable from "../table/table";
import axios from "../../api/api"
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Spinner from "../spinner/spinner";

const CommandsView = () => {
    // State for search term
    const [searchTerm, setSearchTerm] = useState("");
    const [commands, setCommands] = useState([]);
    // State for loading indicator
    const [isLoading, setIsLoading] = useState(false);

    // get commands from the API
    useEffect(() => {

        const fetchCommands = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("/get_commands");
                setCommands(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des commandes :", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCommands();

    }, []);

    // Filtered commands based on search term
    const filteredCommands = commands.filter((command) => (
        command.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    return (
        <div className="commands">
            <HeadStocks title={"Commandes"} setSearchTerm={setSearchTerm} />
            <div className="total-price">
                <div className="info-price">
                    <p className="label">Cout total</p>
                    <p className="value">$ {
                        commands.reduce((total, command) => {
                            return total + command.ListCommand.reduce((accCommand, command) => (accCommand + command.product_id.price * command.quantity), 0);
                        }, 0)
                    }</p>
                </div>
                <FaMoneyBills className="icon-money" />
            </div>
            <DynamicTable
                theadChild={
                    <tr>
                        <th style={{ width: "50%" }} className="component">Identifiant</th>
                        <th className="price" style={{ width: "20%" }}>Prix</th>
                        <th className="quantity" style={{ width: "20%" }}>Quantité</th>
                    </tr>
                }
                tbodyChild={
                    isLoading
                        ? <Spinner />
                        : commands.map((command, index) => (

                            <tr key={index}>
                                <td className="component" style={{ width: "50%" }}>
                                    <div>
                                        <PiShoppingCartSimpleFill size={30} className="icon" />
                                        {command._id <= 15 ? command._id : `${command._id.slice(0, 13)}...`}
                                    </div>
                                </td>
                                <td className="price" style={{ width: "20%" }}>
                                    ${command.ListCommand.reduce((total, item) => total + item.product_id.price * item.quantity, 0)}
                                </td>
                                <td className="quantity" style={{ width: "20%" }}>
                                    <button className="btn">&lt;</button>
                                    <span>{command.ListCommand.reduce((total, command) => total + command.quantity, 0)}</span>
                                    <button className="btn">&gt;</button>
                                </td>
                            </tr>
                        ))
                }
            />
            <ButtonAdd child={"Ajouter au stock"} onClick={() => {
                const component = document.querySelector("#add-command");
                component.style.visibility = "visible";
            }} />
        </div>
    );
}

export default CommandsView; name