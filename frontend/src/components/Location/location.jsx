import "./location.css";
import { useEffect, useState } from "react";
import HeadStocks from "../stocks/head-stock";
import DynamicTable from "../table/table";
import Spinner from "../spinner/spinner";
import ButtonAdd from "../stocks/button-add";
import { getStringDate } from "../../utils/date";
import axios from "../../api/api";
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
        const response = await axios.get("/borrows/accept");
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des borrows :", error);
      }
      finally {
        setIsLoading(false)
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
              Identifiant
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
        tbodyChild={
          isLoading
            ? <Spinner />
            : data.filter((borrow) => {
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
                      {borrow._id.length <= 13
                        ? borrow._id
                        : `${borrow._id.slice(0, 11)}...`}
                    </div>
                  </td>
                  <td className="emprunter" style={{ width: "23%" }}>
                    {borrow.user.length <= 17
                      ? borrow.user
                      : `${borrow.user.slice(0, 14)} ...`}
                  </td>
                  <td className="quantity" style={{ width: "15%" }}>
                    {borrow.Listborrow.reduce((acc, prod) => (acc + prod.quantity), 0)}
                  </td>
                  <td className="status" style={{ width: "35%" }}>
                    Du {getStringDate(borrow.startDate)} au{" "}
                    {getStringDate(borrow.endDate)}
                  </td>
                </tr>
              )
              )}
      />
      <ButtonAdd child={"Voir locations"} onClick={() => navigate(location.pathname + "/list-locations")} />
    </div>
  );
};

export default Location;
