import { useEffect, useRef, useState } from "react";
import { NavParams } from "../../../components/Navbar/navParams";
import Simplifier from "../../../components/simplifier/simplifier";
import "./commands.css"
import ToolBox from "../../../components/stocks/toolbox";
import Button from "../../../components/button/Button";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { MdAddCircleOutline, MdInfoOutline } from "react-icons/md";
import axios from "../../../api/api";
import HeadStocks from "../../../components/stocks/head-stock";
import Spinner from "../../../components/spinner/spinner";
import DynamicTable from "../../../components/table/table";
import CommandStatus from "../../../utils/command_status";
import Bottom from "../../../components/stocks/bottom";

const CommandsList = ({ setNavActive }) => {

    // Active button
    const [btnActive, setBtnActive] = useState("");
    // State for search term
    const [searchTerm, setSearchTerm] = useState("");
    // State for commands
    const [data, setData] = useState([]);
    // State for loading indicator
    const [isLoading, setIsLoading] = useState(false);
    // Display limited number of items
    const [numberItemDisplay, setNumberItemDisplay] = useState(10);
    const [activeNumberGroup, setActiveNumberGroup] = useState(1);

    const confirmationButtonRef = useRef();
    // State for loading index rows in the table
    const [indexRowsTableLoading, setIndexRowsTableLoading] = useState([]);

    const confirmationPopupRef = useRef();
    const [confirmationAction, setConfirmationAction] = useState(null);
    const showConfirmationPopup = (action, url, index, id) => {
        setConfirmationAction(action);

        confirmationPopupRef.current.style.visibility = "visible";
        confirmationButtonRef.current.onclick = async () => {
            confirmationPopupRef.current.style.visibility = "hidden";
            setIndexRowsTableLoading(prev => [...prev, index]);
            let newData = {}
            try {
                const response = await axios.patch(url);
                newData = response.data.borrow;

            } catch (error) {
                console.error("Erreur lors de la mise à jour :", error);
            } finally {
                setIndexRowsTableLoading(prev => prev.filter(i => i !== index));
            }
            
            setData((prevData) => {
                return prevData.map(item => item._id === id ? newData._id ? newData : item : item);
            })
        }
    }

    const setFilter = (type) => {
        setBtnActive(type);
    }

    const fetchCommands = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/get/borrows");
            setData(response.data);
            // console.log(response.data);

        } catch (error) {
            console.error("Erreur lors du chargement des commandes :", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setNavActive(NavParams.inventaire)


        fetchCommands();
    }, [])

    const filterData = () => data.filter((borrow) => (
        borrow.status.match(
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
        )
    )).filter((borrow) => (
        borrow.user.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    return (
        <Simplifier title="Location">
            <div className="commands-list">
                <div className="commands-content">

                    <HeadStocks title={"Liste des emprunts"} setSearchTerm={setSearchTerm} />
                    <ToolBox
                        firstbutton={<Button child={<><MdAddCircleOutline /> Ajouter</>} />}
                        types={["en attente", "acceptées", "rejetées", "Terminés", "anciennes"]}
                        btnActive={btnActive}
                        SetTypeFilter={setFilter} />

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
                                    isLoading
                                        ? <Spinner />
                                        : filterData()
                                            .slice(numberItemDisplay * (activeNumberGroup - 1), numberItemDisplay * activeNumberGroup)
                                            .map((borrow, index) => {

                                                const status = CommandStatus(borrow.status, borrow._id);

                                                return <tr key={index}>
                                                    <td className="component" style={{ width: "35%" }}>
                                                        <div>
                                                            {/* Assuming you have an image URL in the product object */}
                                                            <RiShoppingBag3Fill size={30} className="icon" />
                                                            {borrow._id.length <= 30
                                                                ? borrow._id
                                                                : `${borrow._id.slice(0, 11)}...`}
                                                        </div>
                                                    </td>
                                                    <td className="emprunter" style={{ width: "15%" }}>
                                                        {borrow.user.length <= 17
                                                            ? borrow.user
                                                            : `${borrow.user.slice(0, 14)} ...`}
                                                    </td>
                                                    <td className="quantity" style={{ width: "10%" }}>
                                                        {borrow.Listborrow.reduce((acc, prod) => (acc + prod.quantity), 0)}
                                                    </td>
                                                    <td className="component" style={{ width: "20%" }}>
                                                        {status.main}
                                                    </td>
                                                    <td style={{ width: "20%" }}>
                                                        <div className="actions-container">
                                                            <div>
                                                                {indexRowsTableLoading.includes(index)
                                                                    ? <Spinner />
                                                                    : status.actions.map((icon, idx) => (
                                                                        <span key={idx} className={`action-icon ${icon.Text == "terminé" ? "done" : icon.Text == "rejeté" ? "cancelled" : icon.Text == "accepté" ? "accepted" : ""}`} onClick={() => {
                                                                            showConfirmationPopup(icon.action, icon.url, index, borrow._id);
                                                                        }}>
                                                                            {icon.icon}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </div>
                                                            {/* <div>
                                                                <span className="action-icon in-progress"><MdDeleteOutline size={16} fill="#5899DD" onClick={() => showConfirmationPopup("Supprimer")} /></span>
                                                                <span className="action-icon in-progress"><MdOutlineEdit size={16} fill="#5899DD" onClick={() => showConfirmationPopup("Modifier")} /></span>
                                                            </div> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            })
                                }
                            />}
                    <Bottom
                        numberItemDisplay={numberItemDisplay}
                        setNumberItemDisplay={setNumberItemDisplay}
                        activeNumberGroup={activeNumberGroup}
                        setActiveNumberGroup={setActiveNumberGroup}
                        data={filterData()}
                    />
                </div>
                <div className="confirmation-popup" ref={confirmationPopupRef}>
                    <div className="confirmation-popup-content">
                        <p><MdInfoOutline size={30} className="icon" />Êtes-vous sûr de vouloir effectuer cette action ?</p>
                        <p style={{ color: "var(--blue-color)" }}>{confirmationAction}</p>
                        <div className="buttons">
                            <Button child="Annuler" onClick={() => confirmationPopupRef.current.style.visibility = "hidden"} />
                            <Button child="Confirmer" className="active" btnRef={confirmationButtonRef} />
                        </div>
                    </div>
                </div>
            </div>
        </Simplifier>
    )
}

export default CommandsList;