import DynamicTable from "../table/table"

const TableEXT = ({ data, searchTerm, numberItemDisplay, activeNumberGroup, onClick }) => {
    return (
        <DynamicTable
            theadChild={
                <tr>
                    <th className="component" style={{ width: "30%" }}>Nom</th>
                    <th className="price" style={{ width: "15%" }}>Prix</th>
                    <th className="type" style={{ width: "20%" }}>Type</th>
                    <th className="stock" style={{ width: "15%" }}>Stock</th>
                    <th style={{ width: "20%" }}>Status</th>
                </tr>
            }
            tbodyChild={
                data
                    .filter((product) => {
                        return product.type.toLowerCase().includes(searchTerm) || product.name.toLowerCase().includes(searchTerm)
                    })
                    .slice(numberItemDisplay * (activeNumberGroup - 1), numberItemDisplay * activeNumberGroup)
                    .map((product, index) => (
                        <tr key={index}>
                            <td className="component" style={{ width: "30%" }}>
                                <div >
                                    <img src={`http://localhost:3000/img/${product.image}`} alt={product.name} />
                                    {product.name.length <= 20 ? product.name : `${product.name.slice(0, 18)} ...`}
                                </div>
                            </td>
                            <td className="price" style={{ width: "15%" }}>
                                ${product.price * product.quantity}
                            </td>
                            <td className="type" style={{ width: "20%" }}>
                                {product.type}
                            </td>
                            <td style={{ width: "15%" }}>
                                {product.quantity}
                            </td>
                            <td className={product.is_available ? "status available" : "status unavailable"} style={{ width: "20%" }}>
                                <p>{product.is_available ? "Disponible" : "Pas disponible"}</p>
                            </td>
                        </tr>
                    ))
            } />
    )
}

export default TableEXT