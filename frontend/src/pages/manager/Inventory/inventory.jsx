import CommandsMNG from "../../../components/commands/manager-commands";
import LocationMNG from "../../../components/Location/manager-location";
import { useState, useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import Button from "../../../components/button/Button";
import HeadStocks from "../../../components/stocks/head-stock";
import ToolBox from "../../../components/stocks/toolbox";
import Table from "../../../components/stocks/manager-table";
import ButtonAdd from "../../../components/stocks/button-add";
import "./inventory.css";
import "../../../components/stocks/stocks.css";

const InventoryMNG = () => {
  // data acquisition
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/get/products"); // Remplacez par l'URL correcte
        const products = await response.json();
        setData(products);

        // Extract unique types from the products
        const uniqueTypes = [...new Set(products.map((product) => product.type))];
        setTypes(uniqueTypes);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchData();
  }, []);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Active button
  const [btnActive, setBtnActive] = useState("");

  // Filter type data
  const [type, setType] = useState("");

  const SetTypeFilter = (e) => {
    setType(e);
    setBtnActive(e);
    setData((prevData) =>
      prevData.filter((p) => p.type.toLocaleLowerCase().includes(e))
    );
  };

  return (
    <div className="manager-inventory">
      <div className="grid-content">
        <CommandsMNG />
        <LocationMNG />
        <div className="stocks">
          <HeadStocks title={"Stocks"} setSearchTerm={setSearchTerm} />

          <ToolBox
            firstbutton={<Button child={<><MdAddCircleOutline /> Ajouter</>} />}
            types={types}
            btnActive={btnActive}
            SetTypeFilter={SetTypeFilter}
          />

          <Table data={data} type={type} searchTerm={searchTerm} />

          <ButtonAdd child={<><MdAddCircleOutline /> Ajouter</>} />
        </div>
      </div>
    </div>
  );
};

export default InventoryMNG;
    