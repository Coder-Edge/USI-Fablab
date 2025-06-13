import "./location.css";
import { useEffect, useState } from "react";
import HeadStocks from "../stocks/head-stock";
import DynamicTable from "../table/table";
import Spinner from "../spinner/spinner";
import ButtonAdd from "../stocks/button-add";
import { useLocation, useNavigate } from "react-router-dom";
import { RiShoppingBag3Fill } from "react-icons/ri";

const Location = () => {
  // Data acquisition
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:3000/get/borrows"); // Replace with the correct URL
        const borrows = await response.json();
        setData(borrows);
      } catch (error) {
        console.error("Erreur lors de la récupération des borrows :", error);
      }
      finally {
        setIsLoading(false)
      }
    };

    fetchData();

  }, []);

  const calculate_total_quantity = (products) => {
    let total = 0;

    products.forEach(prod => {
      total += prod.quantity
    });

    return total;
  }

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="location">
      {isLoading
        ? <Spinner />
        : <>
          <HeadStocks title={"Location"} setSearchTerm={setSearchTerm} />
          <DynamicTable
            theadChild={
              <tr>
                <th className="component" style={{ width: "27%" }}>
                  Commande ID
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
              .map((borrow, index) =>
              (
                <tr key={index}>
                  <td className="component" style={{ width: "27%" }}>
                    <div>
                      {/* Assuming you have an image URL in the product object */}
                      <RiShoppingBag3Fill size={30} className="icon" />
                      {borrow.id.length <= 13
                        ? borrow.id
                        : `${borrow.id.slice(0, 11)}...`}
                    </div>
                  </td>
                  <td className="emprunter" style={{ width: "23%" }}>
                    {borrow.user.length <= 17
                      ? borrow.user
                      : `${borrow.user.slice(0, 14)} ...`}
                  </td>
                  <td className="quantity" style={{ width: "15%" }}>
                    {calculate_total_quantity(borrow.Listborrow)}
                  </td>
                  <td className="status" style={{ width: "35%" }}>
                    Du {getStringDate(borrow.startDate)} au{" "}
                    {getStringDate(borrow.endDate)}
                  </td>
                </tr>
                )
              )}
          />
          <ButtonAdd child={"Voir commandes"} onClick={() => navigate(location.pathname + "/list-commands")} />
        </>
      }
    </div>
  );
};

function getStringDate(dateparam) {
  let date = new Date(dateparam);
  const option = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Intl.DateTimeFormat("fr-FR", option).format(date);
}

export default Location;
