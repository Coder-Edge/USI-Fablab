import "./location.css";
import { useEffect, useState } from "react";
import HeadStocks from "../stocks/head-stock";
import DynamicTable from "../table/table";

const LocationMNG = () => {
  // Data acquisition
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/get/borrows"); // Replace with the correct URL
        const borrows = await response.json();
        setData(borrows);
      } catch (error) {
        console.error("Erreur lors de la récupération des borrows :", error);
      }
    };

    fetchData();
  }, []);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="location">
      <HeadStocks title={"Location"} setSearchTerm={setSearchTerm} />
      <DynamicTable
        theadChild={
          <tr>
            <th className="component" style={{ width: "27%" }}>
              Composant
            </th>
            <th className="emprunter" style={{ width: "23%" }}>
              Emprunter
            </th>
            <th className="quantity" style={{ width: "15%" }}>
              Quantité
            </th>
            <th style={{ width: "35%" }}>Status</th>
          </tr>
        }
        tbodyChild={data
          .filter((borrow) => {
            return (
              borrow.user.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
          .map((borrow, ind0) =>
            borrow.Listborrow.map((product, ind1) => (
              <tr key={`${ind0}-${ind1}`}>
                <td className="component" style={{ width: "27%" }}>
                  <div>
                    {/* Assuming you have an image URL in the product object */}
                    <img
                      src={`http://localhost:3000/img/${product.product_image}`}
                      alt={product.product_name}
                    />
                    {product.product_name.length <= 15
                      ? product.product_name
                      : `${product.product_name.slice(0, 12)}...`}
                  </div>
                </td>
                <td className="emprunter" style={{ width: "23%" }}>
                  {borrow.user.length <= 17
                    ? borrow.user
                    : `${borrow.user.slice(0, 14)} ...`}
                </td>
                <td className="quantity" style={{ width: "15%" }}>
                  <button className="btn">&lt;</button>
                  <span>{product.quantity}</span>
                  <button className="btn">&gt;</button>
                </td>
                <td className="status" style={{ width: "35%" }}>
                  Du {getStringDate(borrow.startDate)} au{" "}
                  {getStringDate(borrow.endDate)}
                </td>
              </tr>
            ))
          )}
      />
    </div>
  );
};

function getStringDate(dateparam) {
  let date = new Date(dateparam);
  const option = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Intl.DateTimeFormat("fr-FR", option).format(date);
}

export default LocationMNG;
