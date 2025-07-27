import { useEffect, useState } from "react";
import { NavParams } from "../../../components/Navbar/navParams";
import Simplifier from "../../../components/simplifier/simplifier";
import "./borrows.css"
import ToolBox from "../../../components/stocks/toolbox";
import Button from "../../../components/button/Button";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import axios from "../../../api/api";
import HeadStocks from "../../../components/stocks/head-stock";
import Spinner from "../../../components/spinner/spinner";
import DynamicTable from "../../../components/table/table";
import BorrowStatus from "../../../utils/borrow_status";
import Bottom from "../../../components/stocks/bottom";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { IoFilterSharp } from "react-icons/io5";

const BorrowsList = ({ setNavActive }) => {

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

    const location = useLocation();
    const navigate = useNavigate();

    // State for loading index rows in the table
    const [indexRowsTableLoading, setIndexRowsTableLoading] = useState([]);

    const showConfirmationPopup = (action, url, index, id) => {

        Swal.fire({
            title: "Confirmation",
            text: `Êtes-vous sûr de vouloir ${action} cet emprunt ?`,
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
        })

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
                        firstbutton={<Button className={"active"} child={<IoFilterSharp fill="#ffffff" size={16}/>}/>}
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

                                                const status = BorrowStatus(borrow.status, borrow._id);

                                                return <tr key={index}>
                                                    <td className="component" style={{ width: "35%" }}>
                                                        <div id="id-borrow" onClick={() => navigate(`${location.pathname}/${borrow._id}`)}>
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
                                                            <div className="actions-box">
                                                                {indexRowsTableLoading.includes(index)
                                                                    ? <Spinner />
                                                                    : status.actions.map((icon, idx) => (
                                                                        <div key={idx} className={`action-icon ${icon.Text == "terminé" ? "done" : icon.Text == "rejeté" ? "cancelled" : icon.Text == "accepté" ? "accepted" : ""}`} onClick={() => {
                                                                            showConfirmationPopup(icon.action, icon.url, index, borrow._id);
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
            </div>
        </Simplifier>
    )
}

export default BorrowsList;