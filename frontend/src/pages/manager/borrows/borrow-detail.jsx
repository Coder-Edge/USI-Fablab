import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "../../../api/api"
import Simplifier from "../../../components/simplifier/simplifier";
import Spinner from "../../../components/spinner/spinner";
import DynamicTable from "../../../components/table/table";
import { NavParams } from "../../../components/Navbar/navParams";
import HeadStocks from "../../../components/stocks/head-stock";
import { RiShoppingBag3Fill } from "react-icons/ri";
import BorrowStatus from "../../../utils/borrow_status";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Swal from "sweetalert2";

const BorroDetails = ({ setNavActive }) => {

    const { id: _id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [borrowData, setBorrowData] = useState([]);
    const navigate = useNavigate();

    const getBorrow = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/get/borrows/" + _id)
            setBorrowData(response.data);

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
                    await axios.patch(url);
                } catch (error) {
                    console.error("Erreur lors de la mise à jour :", error);
                } finally {
                    getBorrow();
                }
            }
        })

    }

    useEffect(() => {

        setNavActive(NavParams.inventaire)

        getBorrow();

    }, [])

    const status = isLoading ? null : BorrowStatus(borrowData.status, _id);

    return (
        <Simplifier title={<><HiArrowNarrowLeft className="icon" onClick={() => navigate(-1)} /> Emprunt</>} className="borrow-detail-main-content">
            <div className="borrow-detail">
                {
                    isLoading
                        ? <Spinner />
                        : <div className="borrow-detail-content">
                            <HeadStocks title={<><RiShoppingBag3Fill size={30} fill="#5899DD" /> {_id} </>} />
                            <div className="borrow-info">
                                <p><span className="text">Emprunteur:</span> <span>{borrowData.user}</span></p>
                                <p><span className="text">Status:</span> {status.main}</p>
                                <p><span className="text">actions:</span> {status.actions.length > 0
                                    ? status.actions.map((icon, index) => (
                                        <span key={index} className={`action-icon ${icon.Text == "terminé" ? "done" : icon.Text == "rejeté" ? "cancelled" : icon.Text == "accepté" ? "accepted" : ""}`} onClick={() => {
                                            showConfirmationPopup(icon.action, icon.url)
                                        }}>
                                            {icon.icon} {icon.Text}
                                        </span>
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
                                    borrowData.Listborrow.map((product, index) => (<tr key={index}>
                                        <td className="component" style={{ width: "65%" }}>
                                            <div>
                                                <img src={`http://localhost:3000/img/${product.product_image}`} alt="" />
                                                {product.product_name}
                                            </div>
                                        </td>
                                        <td className="quantity" style={{ width: "35%" }}>
                                            {product.quantity}
                                        </td>
                                    </tr>))

                                } />
                        </div>
                }
            </div>
        </Simplifier>
    )
}

export default BorroDetails