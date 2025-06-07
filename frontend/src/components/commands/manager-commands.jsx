// import "./commands.css"
// import { FaMoneyBills } from "react-icons/fa6";
// import { useEffect, useState } from "react";
// // import { commands } from "../../models/command";
// import ButtonAdd from "../stocks/button-add";
// import HeadStocks from "../stocks/head-stock";
// import DynamicTable from "../table/table";
// import axios from "../../api/api";

// const CommandsMNG = () => {
//     // State for search term
//     const [searchTerm, setSearchTerm] = useState("");

//     // State for total price
//     const [sum, setSum] = useState(0);

//     const [commands, setCommands] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCommands = async () => {
//           try {
//             const response = await axios.get("/get_commands");
//             setCommands(response.data);
//             console.log(response.data);
//             setLoading(false);
//           } catch (error) {
//             console.error("Erreur lors du chargement des commandes :", error);
//             setLoading(false);
//           }
//         };
    
//         fetchCommands();
//       }, []);

//     // Calculate total price whenever `commands` changes
//     // useEffect(() => {
//     //     const total = commands.reduce((accCommand, command) => {
//     //         return accCommand + command.product.price * command.quantity;
//     //     }, 0);
//     //     setSum(total);
//     // }, [commands]);

//     // Filtered commands based on search term
//     const filteredCommands = commands.filter((command) => (
//         command.product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//         command.user.name.toLowerCase().includes(searchTerm.toLowerCase())
//     ));

//     return (
//         <div className="commands">
//             <HeadStocks title={"Commandes"} setSearchTerm={setSearchTerm} />
//             <div className="total-price">
//                 <div className="info-price">
//                     <p className="label">Cout total</p>
//                     <p className="value">$ {sum}</p>
//                 </div>
//                 <FaMoneyBills className="icon-money" />
//             </div>
//             <DynamicTable
//                 theadChild={
//                     <tr>
//                         <th style={{ width: "50%" }} className="component">Composant</th>
//                         <th className="price" style={{ width: "20%" }}>Prix</th>
//                         <th className="quantity" style={{ width: "20%" }}>Quantité</th>
//                     </tr>
//                 }
//                 tbodyChild={
//                     filteredCommands.map((command, index) => (
//                         <tr key={index}>
//                             <td className="component" style={{ width: "50%" }}>
//                                 <div>
//                                     <img src={command.product.image} alt={command.product.name} />
//                                     {command.product.name.length <= 15 ? command.product.name : `${command.product.name.slice(0, 12)}...`}
//                                 </div>
//                             </td>
//                             <td className="price" style={{ width: "20%" }}>
//                                 ${command.product.price * command.quantity}
//                             </td>
//                             <td className="quantity" style={{ width: "20%" }}>
//                                 <button className="btn">&lt;</button>
//                                 <span>{command.quantity}</span>
//                                 <button className="btn">&gt;</button>
//                             </td>
//                         </tr>
//                     ))
//                 }
//             />
//             <ButtonAdd child={"Ajouter au stock"} onClick={() => {
//                 const component = document.querySelector("#add-command");
//                 component.style.visibility = "visible";
//             }} />
//         </div>
//     );
// }

// export default CommandsMNG;

import "./commands.css"
import { FaMoneyBills } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { commands } from "../../models/command";
import ButtonAdd from "../stocks/button-add";
import HeadStocks from "../stocks/head-stock";
import DynamicTable from "../table/table";

const CommandsMNG = () => {
    // State for search term
    const [searchTerm, setSearchTerm] = useState("");

    // State for total price
    const [sum, setSum] = useState(0);

    // Calculate total price whenever `commands` changes
    useEffect(() => {
        const total = commands.reduce((accCommand, command) => {
            return accCommand + command.product.price * command.quantity;
        }, 0);
        setSum(total);
    }, [commands]);

    // Filtered commands based on search term
    const filteredCommands = commands.filter((command) => (
        command.product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        command.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    return (
        <div className="commands">
            <HeadStocks title={"Commandes"} setSearchTerm={setSearchTerm} />
            <div className="total-price">
                <div className="info-price">
                    <p className="label">Cout total</p>
                    <p className="value">$ {sum}</p>
                </div>
                <FaMoneyBills className="icon-money" />
            </div>
            <DynamicTable
                theadChild={
                    <tr>
                        <th style={{ width: "50%" }} className="component">Composant</th>
                        <th className="price" style={{ width: "20%" }}>Prix</th>
                        <th className="quantity" style={{ width: "20%" }}>Quantité</th>
                    </tr>
                }
                tbodyChild={
                    filteredCommands.map((command, index) => (
                        <tr key={index}>
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

export default CommandsMNG;