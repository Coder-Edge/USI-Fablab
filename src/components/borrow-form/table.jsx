import { useContext } from "react"
import { IoCloseCircleOutline } from "react-icons/io5";
import { BorrowContext } from "../../pages/student/inventory/inventory"
import DynamicTable from "../table/table";

const BorrowTable = () => {

    const { borrowList, setBorrowList } = useContext(BorrowContext)

    // Modify quantity of item to borrow
    const increaseBorrowItem = (product, q) => {
        setBorrowList(
            borrowList.map((item) => (
                item.product.name === product.name ? { ...item, quantity: item.quantity + q } : item
            ))
        )
    }

    // delete item to borrow
    const deleteItem = (ind) => {
        setBorrowList(
            borrowList.filter((item, index) => (index != ind))
        )
    }

    return (
        <DynamicTable
            theadChild={
                <tr>
                    <th style={{ width: "35%" }}>Composant</th>
                    <th style={{ width: "35%" }}>Type</th>
                    <th style={{ width: "15%" }}>Prix</th>
                    <th className="quantity" style={{ width: "10%" }}>Quantité</th>
                    <th style={{ width: "5%" }}></th>
                </tr>}
            tbodyChild={
                borrowList
                .map((product, ind) => (
                    <tr key={ind}>
                        <td style={{ width: "35%" }} className="component">
                            <div>
                                <img src={product.product.image} alt={product.product.name} />
                                {product.product.name.length <= 15 ? product.product.name : `${product.product.name.slice(0, 12)}...`}
                            </div>
                        </td>
                        <td style={{ width: "35%" }}>
                            {product.product.type}
                        </td>
                        <td style={{ width: "15%" }}>
                            ${product.product.price * product.quantity}
                        </td>
                        <td className="quantity" style={{ width: "10%" }}>
                            <button type="button" className={`${product.quantity > 1 ? "" : "unable"}`} onClick={product.quantity > 1 ? () => increaseBorrowItem(product.product, -1) : () => { }}>&lt;</button>
                            <span>{product.quantity}</span>
                            <button type="button" className={`${product.quantity < product.product.quantity ? "" : "unable"}`} onClick={product.quantity < product.product.quantity ? () => increaseBorrowItem(product.product, 1) : () => { }}>&gt;</button>
                        </td>
                        <td style={{ width: "5%" }} className="close-btn"><button type="button" onClick={() => deleteItem(ind)}><IoCloseCircleOutline /></button></td>
                    </tr>
                ))} />
    )
}

export default BorrowTable