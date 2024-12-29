
const Table = ({data, type, searchTerm}) => {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th className="component" style={{ width: "40%" }}>Nom</th>
                        <th className="price" style={{ width: "15%" }}>Prix</th>
                        <th className="type" style={{ width: "15%" }}>Type</th>
                        <th className="quantity" style={{ width: "15%" }}>Quantité</th>
                        <th style={{ width: "15%" }}>Status</th>
                    </tr>
                </thead>

                <tbody style={{ maxHeight: "280px" }}>
                    {data
                        .filter((product) => {
                            return product.type.toLowerCase().includes(searchTerm) || product.name.toLowerCase().includes(searchTerm)
                        })
                        .filter((product) => {
                            return product.type.toLowerCase().match(type)
                        }).map((product, index) => (
                            <tr key={index}>
                                <td className="component" style={{ width: "40%" }}>
                                    <div >
                                        <img src={product.image} alt={product.name} />
                                        {product.name.length <= 27 ? product.name : `${product.name.slice(0, 25)} ...`}
                                    </div>
                                </td>
                                <td className="price" style={{ width: "15%" }}>
                                    ${product.price * product.quantity}
                                </td>
                                <td className="type" style={{ width: "15%" }}>
                                    {product.type}
                                </td>
                                <td className="quantity" style={{ width: "15%" }}>
                                    <button className="btn">&lt;</button>
                                    <span>{product.quantity}</span>
                                    <button className="btn">&gt;</button>
                                </td>
                                <td className={product.is_available ? "status available" : "status unavailable"} style={{ width: "15%" }}>
                                    <p>{product.is_available ? "Disponible" : "Pas disponible"}</p>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table