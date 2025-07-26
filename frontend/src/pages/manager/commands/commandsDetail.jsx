import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "../../../api/api"
import Simplifier from "../../../components/simplifier/simplifier";
import Spinner from "../../../components/spinner/spinner";
import DynamicTable from "../../../components/table/table";
import { NavParams } from "../../../components/Navbar/navParams";
import HeadStocks from "../../../components/stocks/head-stock";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Swal from "sweetalert2";
import CommandStatus from "../../../utils/command_status";

const CommandDetails = ({ setNavActive }) => {

    const { id: _id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [commandData, setCommandData] = useState([]);
    const navigate = useNavigate();

    const getCommand = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/get_command/" + _id)
            setCommandData(response.data);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const showConfirmationPopup = (action, url) => {

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
                try {
                    if (action === "Supprimer") {
                        await axios.delete(url);
                        navigate(-1)
                    } else {
                        await axios.put(url);
                        getCommand();
                    }

                } catch (error) {
                    console.error("Erreur lors de la mise à jour :", error);
                } finally {
                    setIndexRowsTableLoading(prev => prev.filter(i => i !== index));
                }


            }
        })

    }

    useEffect(() => {

        setNavActive(NavParams.inventaire)

        getCommand();

    }, [])

    const status = isLoading ? null : CommandStatus(commandData.status, _id);

    return (
        <Simplifier title={<><HiArrowNarrowLeft className="icon" onClick={() => navigate(-1)} /> Emprunt</>} className="borrow-detail-main-content">
            <div className="borrow-detail">
                {
                    isLoading
                        ? <Spinner />
                        : <div className="borrow-detail-content">
                            <HeadStocks title={<><RiShoppingBag3Fill size={30} fill="#5899DD" /> {_id} </>} />
                            <div className="borrow-info">
                                <p><span className="text">Emprunteur:</span> <span>{"Remile Bianga"}</span></p>
                                <p><span className="text">Status:</span> {status.main}</p>
                                <p><span className="text">actions:</span> {status.actions.length > 0
                                    ? status.actions.map((icon, index) => (
                                        <div key={index} className={`action-icon ${icon.Text == "terminé" ? "done" : icon.Text == "rejeté" ? "cancelled" : icon.Text == "accepté" ? "accepted" : "in-progress"}`} onClick={() => {
                                            showConfirmationPopup(icon.action, icon.url)
                                        }}>
                                            {icon.icon} {icon.action}
                                        </div>
                                    ))
                                    : "aucune action"
                                }</p>
                            </div>
                            <DynamicTable
                                theadChild={
                                    <tr>
                                        <th className="component" style={{ width: "65%" }}>
                                            Composant
                                        </th>
                                        <th className="quantity" style={{ width: "35%" }}>
                                            Quantité
                                        </th>
                                    </tr>
                                }
                                tbodyChild={
                                    commandData.ListCommand.map((product, index) => (<tr key={index}>
                                        <td className="component" style={{ width: "65%" }}>
                                            <div>
                                                <img src={`http://localhost:3000/img/${product.product_id.image}`} alt="" />
                                                {product.product_id.name}
                                            </div>
                                        </td>
                                        <td className="quantity" style={{ width: "35%" }}>
                                            {product.product_id.quantity}
                                        </td>
                                    </tr>))

                                } />
                        </div>
                }
            </div>
        </Simplifier>
    )
}

export default CommandDetails