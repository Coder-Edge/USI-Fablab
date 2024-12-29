
const TableSTD = ({data, type, searchTerm, numberItemDisplay, activeNumberGroup}) => {
    return (
        <div className="table table-student">
            <table>
                <thead>
                    <tr>
                        <th className="component" style={{ width: "27%" }}>Nom</th>
                        <th className="price" style={{ width: "12%" }}>Prix</th>
                        <th className="type" style={{ width: "17%" }}>Type</th>
                        <th className="stock" style={{ width: "10%" }}>Stock</th>
                        <th style={{ width: "17%" }}>Status</th>
                        <th style={{ width: "17%" }}>Emprunt</th>
                    </tr>
                </thead>

                <tbody style={{ maxHeight: "280px" }}>
                    {data
                        .filter((product) => {
                            return product.type.toLowerCase().includes(searchTerm) || product.name.toLowerCase().includes(searchTerm)
                        })
                        .filter((product) => {
                            return product.type.toLowerCase().match(type)
                        })
                        .slice(numberItemDisplay * (activeNumberGroup-1), numberItemDisplay * activeNumberGroup)
                        .map((product, index) => (
                            <tr key={index}>
                                <td className="component" style={{ width: "27%" }}>
                                    <div >
                                        <img src={product.image} alt={product.name} />
                                        {product.name.length <= 20 ? product.name : `${product.name.slice(0, 18)} ...`}
                                    </div>
                                </td>
                                <td className="price" style={{ width: "12%" }}>
                                    ${product.price * product.quantity}
                                </td>
                                <td className="type" style={{ width: "17%" }}>
                                    {product.type}
                                </td>
                                <td  style={{ width: "10%" }}>
                                    {product.quantity}
                                </td>
                                <td className={product.is_available ? "status available" : "status unavailable"} style={{ width: "17%" }}>
                                    <p>{product.is_available ? "Disponible" : "Pas disponible"}</p>
                                </td>
                                <td className={product.is_available ? "status emprunt" : "status unemprunt"} style={{ width: "17%" }}>
                                    <p>Emprunter</p>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableSTD