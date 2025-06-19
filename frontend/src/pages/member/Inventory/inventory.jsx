import CommandsView from "../../../components/commands/commands";
import Location from "../../../components/Location/location";
import { useState, useEffect, useRef } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import Button from "../../../components/button/Button";
import HeadStocks from "../../../components/stocks/head-stock";
import ToolBox from "../../../components/stocks/toolbox";
import Table from "../../../components/stocks/manager-table";
import ButtonAdd from "../../../components/stocks/button-add";
import "./inventory.css";
import "../../../components/stocks/stocks.css";
import { NavParams } from "../../../components/Navbar/navParams";
import AddProduct from "../../../components/add_product/add-product";
import AddCommand from "../../../components/add-command/add-command";
import Spinner from "../../../components/spinner/spinner";

const InventoryMBR = ({ setNavActive }) => {
  // data acquisition
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [data, setData] = useState([]); // Store filtered products
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    // set active button in sidebar
    setNavActive(NavParams.inventaire)

    // Fetch data from the API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/get/products"); // Replace with the correct URL
        const products = await response.json();
        setAllProducts(products);  // Store all products
        setData(products);  // Start with all products as filtered
        setTypes([...new Set(products.map((product) => product.type))]);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
      finally {
        setIsLoading(false)
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
        <CommandsView />
        <Location />
        <div className="stocks">
          {isLoading
            ? <Spinner />
            : <>
              <HeadStocks title={"Stocks"} setSearchTerm={setSearchTerm} />

              <ToolBox
                firstbutton={<Button child={<><MdAddCircleOutline /> Ajouter</>} />}
                types={types}
                btnActive={btnActive}
                SetTypeFilter={SetTypeFilter}
              />

              <Table data={data} type={type} searchTerm={searchTerm} />

              <ButtonAdd child={<><MdAddCircleOutline /> Ajouter</>} onClick={() => { document.querySelector("#add-product").style.visibility = "visible" }} />
            </>
          }
        </div>
      </div>

      <AddProduct />
      <AddCommand data={data} />

    </div>
  );
};

export default InventoryMBR;
