import DynamicTable from "../table/table"

const TableSTD = ({ data, searchTerm, numberItemDisplay, activeNumberGroup, onClick }) => {
    return (
        <DynamicTable
            theadChild={
                <tr>
                    <th className="component" style={{ width: "27%" }}>Nom</th>
                    <th className="price" style={{ width: "12%" }}>Prix</th>
                    <th className="type" style={{ width: "17%" }}>Type</th>
                    <th className="stock" style={{ width: "10%" }}>Stock</th>
                    <th style={{ width: "17%" }}>Status</th>
                    <th style={{ width: "17%" }}>Emprunt</th>
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
                            <td className="component" style={{ width: "27%" }}>
                                <div >
                                    <img src={`http://localhost:3000/img/${product.image}`} alt={product.name} />
                                    {product.name.length <= 20 ? product.name : `${product.name.slice(0, 18)} ...`}
                                </div>
                            </td>
                            <td className="price" style={{ width: "12%" }}>
                                ${product.price * product.quantity}
                            </td>
                            <td className="type" style={{ width: "17%" }}>
                                {product.type}
                            </td>
                            <td style={{ width: "10%" }}>
                                {product.quantity}
                            </td>
                            <td className={product.is_available ? "status available" : "status unavailable"} style={{ width: "17%" }}>
                                <p>{product.is_available ? "Disponible" : "Pas disponible"}</p>
                            </td>
                            <td className={product.is_available ? "status emprunt" : "status unemprunt"} style={{ width: "17%", cursor: "pointer" }}
                                onClick={product.is_available ? () => onClick(product) : () => { }}>
                                <p>Emprunter</p>
                            </td>
                        </tr>
                    ))
            } />
    )
}

export default TableSTD