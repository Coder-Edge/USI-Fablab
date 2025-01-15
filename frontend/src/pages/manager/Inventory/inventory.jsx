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
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [data, setData] = useState([]); // Store filtered products
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/get/products"); // Replace with the correct URL
        const products = await response.json();
        setAllProducts(products);  // Store all products
        setData(products);  // Start with all products as filtered
        setTypes([...new Set(products.map((product) => product.type))]);
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

    // Use allProducts to filter and then filter by type
    const filteredData = allProducts.filter((p) => p.type.toLowerCase().includes(e.toLowerCase()));

    setData(filteredData);
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
