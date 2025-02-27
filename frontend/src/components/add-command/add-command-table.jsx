import { useContext } from "react";
import DynamicTable from "../table/table"

const AddCommandTable = ({ context }) => {

    const { data, type, searchTerm, setNewCommand, newCommand, closePop } = useContext(context);

    const onChecked = (e, product) => {
        if (e.target.checked) {
            setNewCommand((prevCommands) => {
                const updatedProduct = { ...product, quantity: 1 };
                return [...prevCommands, updatedProduct];
            });
        } else {
            setNewCommand((prevCommands) => (prevCommands.filter((cmd) => cmd._id !== product._id)));            
        }

    }

    return (
        <DynamicTable
            theadChild={
                <tr>
                    <th className="component" style={{ width: "40%" }}>Nom</th>
                    <th className="price" style={{ width: "15%" }}>Prix</th>
                    <th className="type" style={{ width: "15%" }}>Type</th>
                    <th className="quantity" style={{ width: "15%" }}>Quantité</th>
                    <th style={{ width: "15%" }}>Status</th>
                </tr>
            }
            tbodyChild={
                data
                    .filter((product) => {
                        return product.type.toLowerCase().includes(searchTerm) || product.name.toLowerCase().includes(searchTerm)
                    })
                    .filter((product) => {
                        return product.type.toLowerCase().match(type)
                    }).map((product, index) => {
                        let searchProduct = newCommand.some((cmd) => cmd._id === product._id);
                        return (
                            <tr key={index}>
                                <td className="component" style={{ width: "40%" }}>
                                    <div>
                                        <input type="checkbox" onChange={(e) => onChecked(e, product)} checked={searchProduct} />
                                        <img src={`http://localhost:3000/img/${product.image}`} alt={product.name} />
                                        {product.name}
                                    </div>
                                </td>
                                <td className="price" style={{ width: "15%" }}>
                                    ${product.price * product.quantity}
                                </td>
                                <td className="type" style={{ width: "15%" }}>
                                    {product.type}
                                </td>
                                <td className="quantity" style={{ width: "15%" }}>
                                    <button className="btn" type="button">&lt;</button>
                                    <span>{product.quantity}</span>
                                    <button className="btn" type="button">&gt;</button>
                                </td>
                                <td className={product.is_available ? "status available" : "status unavailable"} style={{ width: "15%" }}>
                                    <p>{product.is_available ? "Disponible" : "Pas disponible"}</p>
                                </td>
                            </tr>)
                    })
            } />
    )
}

export default AddCommandTable