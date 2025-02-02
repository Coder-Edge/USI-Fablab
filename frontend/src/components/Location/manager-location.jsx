import "./location.css";
import { useEffect, useState } from "react";
import HeadStocks from "../stocks/head-stock";
import DynamicTable from "../table/table";

const LocationMNG = () => {
    // Data acquisition
    const [data, setData] = useState([]);
    const [users, setUsers] = useState({}); // To store user details by ID

    useEffect(() => {
        // Fetch borrows data from the API
        const fetchBorrows = async () => {
            try {
                const response = await fetch("http://localhost:3000/get/borrows"); // Replace with the correct URL
                const borrows = await response.json();
                console.log(borrows);
                setData(borrows);

                // Fetch user details for each borrow
                const userDetails = {};
                for (const borrow of borrows) {
                    if (!users[borrow.user]) {
                        const userResponse = await fetch(`http://localhost:3000/get/users/${borrow.user}`);
                        const userData = await userResponse.json();
                        userDetails[borrow.user] = userData.name; // Assuming the API returns an object with a `name` field
                    }
                }
                setUsers((prevUsers) => ({ ...prevUsers, ...userDetails }));
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchBorrows();
    }, []);

    // Search
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="location">
            <HeadStocks title={"Location"} setSearchTerm={setSearchTerm} />
            <DynamicTable
                theadChild={
                    <tr>
                        <th className="component" style={{ width: "27%" }}>Composant</th>
                        <th className="emprunter" style={{ width: "23%" }}>Emprunter</th>
                        <th className="quantity" style={{ width: "15%" }}>Quantité</th>
                        <th style={{ width: "35%" }}>Status</th>
                    </tr>
                }
                tbodyChild={
                    data
                        .filter((borrow) => {
                            const userName = users[borrow.user] || ""; // Get user name from the `users` state
                            return (
                                borrow.motif.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                userName.toLowerCase().includes(searchTerm.toLowerCase())
                            );
                        })
                        .map((borrow, ind0) =>
                            borrow.Listborrow.map((product, ind1) => (
                                <tr key={`${ind0}-${ind1}`}>
                                    <td className="component" style={{ width: "27%" }}>
                                        <div>
                                            {/* Assuming you have an image URL in the product object */}
                                            <img src={`http://localhost:3000/img/${product.product_image}`} alt={product.product_name} />
                                            {product.product_name.length <= 15
                                                ? product.product_name
                                                : `${product.product_name.slice(0, 12)}...`}
                                        </div>
                                    </td>
                                    <td className="emprunter" style={{ width: "23%" }}>
                                        {users[borrow.user]?.length <= 17
                                            ? users[borrow.user]
                                            : `${users[borrow.user]?.slice(0, 14)} ...`}
                                    </td>
                                    <td className="quantity" style={{ width: "15%" }}>
                                        <button className="btn">&lt;</button>
                                        <span>{product.quantity}</span>
                                        <button className="btn">&gt;</button>
                                    </td>
                                    <td className="status" style={{ width: "35%" }}>
                                        Du {getStringDate(borrow.startDate)} au {getStringDate(borrow.endDate)}
                                    </td>
                                </tr>
                            ))
                        )
                }
            />
        </div>
    );
};

function getStringDate(dateparam) {
    let date = new Date(dateparam);
    const option = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Intl.DateTimeFormat('fr-FR', option).format(date);
}

export default LocationMNG;