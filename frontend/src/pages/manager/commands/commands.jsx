import { useEffect, useState } from "react";
import { NavParams } from "../../../components/Navbar/navParams";
import axios from "../../../api/api"
import Simplifier from "../../../components/simplifier/simplifier";
import HeadStocks from "../../../components/stocks/head-stock";
import ToolBox from "../../../components/stocks/toolbox";
import Button from "../../../components/button/Button";
import { IoFilterSharp } from "react-icons/io5";
import Spinner from "../../../components/spinner/spinner";
import DynamicTable from "../../../components/table/table";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import CommandStatus from "../../../utils/command_status";
import Swal from "sweetalert2";
import Bottom from "../../../components/stocks/bottom";
import ButtonAdd from "../../../components/stocks/button-add";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import AddCommand from "../../../components/add-command/add-command";
import { useLocation, useNavigate } from "react-router-dom";

const CommandList = ({ setNavActive }) => {

    const [isLoading, setIsLoading] = useState(true);
    // serch value
    const [searchTerm, setSearchTerm] = useState("");
    // Active button
    const [btnActive, setBtnActive] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    // data variable
    const [data, setData] = useState([]);
    // Display limited number of items
    const [numberItemDisplay, setNumberItemDisplay] = useState(10);
    const [activeNumberGroup, setActiveNumberGroup] = useState(1);
    //show add command
    const [showAddCommand, setShowAddCommand] = useState(false);
    const showAddCommandPopup = () => setShowAddCommand(true)
    const hideAddCommandPopup = () => setShowAddCommand(false)

    // State for loading index rows in the table
    const [indexRowsTableLoading, setIndexRowsTableLoading] = useState([]);

    const showConfirmationPopup = (action, url, index, id) => {

        Swal.fire({
            title: "Confirmation",
            text: `Êtes-vous sûr de vouloir ${action} cette commande ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, confirmer",
            cancelButtonText: "Annuler",
            cancelButtonColor: "#5899DD",
            confirmButtonColor: "#0f963e"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIndexRowsTableLoading(prev => [...prev, index]);
                let newData = {}
                try {
                    if (action === "Supprimer") {
                        await axios.delete(url);
                        setData((prevData) => {
                            return prevData.filter(item => item._id !== id);
                        })
                    } else {
                        console.log("Mise à jour de la commande :", id);

                        const response = await axios.put(url);
                        console.log(response.data);

                        newData = response.data.command;
                        setData((prevData) => {
                            return prevData.map(item => item._id === id ? newData._id ? newData : item : item);
                        })
                    }


                } catch (error) {
                    console.error("Erreur lors de la mise à jour :", error);
                } finally {
                    setIndexRowsTableLoading(prev => prev.filter(i => i !== index));
                }


            }
        })

    }

    // set filter to commands
    const setFilter = (type) => {
        setBtnActive(type);
    }

    const fetchCommands = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/get_commands");
            setData(response.data);

        } catch (error) {
            console.error("Erreur lors du chargement des commandes :", error);
        } finally {
            setIsLoading(false);
        }
    }

    const filterData = () => data
        .filter((command) => command.status.match(
            btnActive
                ? btnActive.toLowerCase() === "en attente"
                    ? "en attente"
                    : btnActive.toLowerCase() === "acceptées"
                        ? "accepté"
                        : btnActive.toLowerCase() === "rejetées"
                            ? "rejeté"
                            : btnActive.toLowerCase() === "terminés"
                                ? "terminé"
                                // : btnActive.toLowerCase() === "anciennes"
                                //     ? "ancienne"
                                : ""
                : ""
        ))
        .filter(
            (command) => `${command.user.firstName.toLowerCase()} ${command.user.name.toLowerCase()}`.includes(searchTerm.toLowerCase())
        )

    useEffect(() => {
        setNavActive(NavParams.inventaire)
        fetchCommands();
    }, [])

    return (
        <Simplifier title={"Commandes"}>
            <div className="commands-list">
                <div className="commands-content">
                    <HeadStocks title={"Liste des commandes"} setSearchTerm={setSearchTerm} />
                    <div className="box-toolbox">
                        <ToolBox
                            firstbutton={<Button className={"active"} child={<IoFilterSharp fill="#ffffff" size={16} />} />}
                            types={["en attente", "acceptées", "rejetées"]}
                            btnActive={btnActive}
                            SetTypeFilter={setFilter} />
                        <ButtonAdd child={<><MdOutlineAddCircleOutline /> Ajouter</>} onClick={showAddCommandPopup} />
                    </div>
                    {
                        isLoading
                            ? <Spinner />
                            : <DynamicTable
                                theadChild={
                                    <tr>
                                        <th className="component" style={{ width: "35%" }}>
                                            Identifiant
                                        </th>
                                        <th className="emprunter" style={{ width: "15%" }}>
                                            Emprunter
                                        </th>
                                        <th className="quantity" style={{ width: "10%" }}>
                                            Quantité
                                        </th>
                                        <th style={{ width: "20%" }}>Status</th>
                                        <th style={{ width: "20%" }}>Actions</th>
                                    </tr>
                                }
                                tbodyChild={
                                    filterData()
                                        .map((command, index) => {

                                            const status = CommandStatus(command.status, command._id)

                                            return <tr key={index}>
                                                <td className="component" style={{ width: "35%" }}>
                                                    <div id="id-borrow" onClick={() => navigate(`${location.pathname}/${command._id}`)}>
                                                        {/* Assuming you have an image URL in the product object */}
                                                        <PiShoppingCartSimpleFill size={30} className="icon" />
                                                        {command._id.length <= 30
                                                            ? command._id
                                                            : `${command._id.slice(0, 11)}...`}
                                                    </div>
                                                </td>
                                                <td className="emprunter" style={{ width: "15%" }}>
                                                    {`${command.user.firstName} ${command.user.name}`.length <= 17
                                                        ? `${command.user.firstName} ${command.user.name}`
                                                        : `${`${command.user.firstName} ${command.user.name}`.slice(0, 14)} ...`}
                                                </td>
                                                <td className="quantity" style={{ width: "10%" }}>
                                                    {command.ListCommand.reduce((acc, prod) => (acc + prod.quantity), 0)}
                                                </td>
                                                <td className="component" style={{ width: "20%" }}>
                                                    {status.main}
                                                </td>
                                                <td style={{ width: "20%" }}>
                                                    <div className="actions-container">
                                                        <div className="actions-box">
                                                            {indexRowsTableLoading.includes(index)
                                                                ? <Spinner />
                                                                : status.actions.map((icon, idx) => (
                                                                    <div key={idx} className={`action-icon ${icon.Text == "terminé" ? "done" : icon.Text == "rejeté" ? "cancelled" : icon.Text == "accepté" ? "accepted" : "in-progress"}`} onClick={() => {
                                                                        showConfirmationPopup(icon.action, icon.url, index, command._id);
                                                                    }}>
                                                                        {icon.icon}
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                } />
                    }
                    <Bottom
                        numberItemDisplay={numberItemDisplay}
                        setNumberItemDisplay={setNumberItemDisplay}
                        activeNumberGroup={activeNumberGroup}
                        setActiveNumberGroup={setActiveNumberGroup}
                        data={filterData()}
                    />
                    
                </div>
                {showAddCommand && <AddCommand hide={hideAddCommandPopup} reload={fetchCommands}/>}
            </div>
        </Simplifier>
    )
}

export default CommandList