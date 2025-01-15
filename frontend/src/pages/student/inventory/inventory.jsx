import React, { useState, useEffect, useContext } from "react";
import Button from "../../../components/button/Button";
import HeadStocks from "../../../components/stocks/head-stock";
import ToolBox from "../../../components/stocks/toolbox";
import TableSTD from "../../../components/stocks/student-table";
import { MdFilterList } from "react-icons/md";
import "./inventory.css";
import "../../../components/stocks/stocks.css";
import Bottom from "../../../components/stocks/bottom";
import STFilter from "../../../components/popup/st-filter";
import BorrowForm from "../../../components/borrow-form/borrow-form";

// Borrow context
export const BorrowContext = React.createContext();

const InventorySTD = () => {
    const Mycontext = React.createContext();
  
    // Display limited number of items
    const [numberItemDisplay, setNumberItemDisplay] = useState(10);
    const [activeNumberGroup, setActiveNumberGroup] = useState(1);
  
    // Data acquisition
    const [allProducts, setAllProducts] = useState([]); // Store all products
    const [data, setData] = useState([]); // Store filtered products
    const [types, setTypes] = useState([]);
  
    useEffect(() => {
      // Appel à l'API pour récupérer les produits
      const fetchProducts = async () => {
        try {
          const response = await fetch("http://localhost:3000/get/products");
          const products = await response.json();
          setAllProducts(products);  // Store all products
          setData(products);  // Start with all products as filtered
          setTypes([...new Set(products.map((product) => product.type.toLowerCase()))]);
        } catch (error) {
          console.error("Erreur lors de la récupération des produits :", error);
        }
      };
  
      fetchProducts();
    }, []);
  
    // Recherche
    const [searchTerm, setSearchTerm] = useState("");
  
    // Bouton actif
    const [btnActive, setBtnActive] = useState("");
  
    // Filtrer les données par type et quantité
    const [type, setType] = useState("");
    const [quantityFilter, setQuantityFilter] = useState("");
  
    const SetQuantityFilterFunction = (q, products) => {
      if (q !== "" && q !== "indisponible" && q !== "gt20") {
        const [start, end] = q.split("-");
        return products.filter(
          (product) => product.quantity >= start && product.quantity <= end
        );
      }
      if (q === "indisponible") {
        return products.filter((product) => product.is_available === false);
      }
      if (q === "gt20") {
        return products.filter((product) => product.quantity > 20);
      }
      return products;
    };
  
    const filterAll = (e, quantity) => {
      setType(e);
      setBtnActive(e);
      setQuantityFilter(quantity);
  
      // Use allProducts to filter and then filter by type
      const filteredData = SetQuantityFilterFunction(quantity, allProducts).filter(
        (p) => p.type.toLowerCase().includes(e.toLowerCase())
      );
  
      setData(filteredData);
    };
  
    // Afficher le popup pour les filtres
    const showFilterPopUp = () => {
      document.getElementById("filter-popup").style.visibility = "visible";
    };
  
    // Afficher le formulaire
    const showForm = () => {
      document.querySelector("#borrow-form").style.visibility = "visible";
    };
  
    // Liste des données d'emprunt
    const [borrowList, setBorrowList] = useState([]);
  
    const handleListItems = (product) => {
      if (!borrowList.includes(product)) {
        setBorrowList([...borrowList, { product: product, quantity: 1 }]);
      }
      showForm();
    };
  
    return (
      <div className="student-inventory">
        <div className="stocks">
          <HeadStocks title={"Stocks"} setSearchTerm={setSearchTerm} />
  
          <ToolBox
            firstbutton={
              <Button
                className={quantityFilter !== "" ? "active" : ""}
                child={
                  <>
                    <MdFilterList /> Filtre
                  </>
                }
                onClick={showFilterPopUp}
              />
            }
            types={types}
            btnActive={btnActive}
            SetTypeFilter={(e) => {
              filterAll(e, quantityFilter);
            }}
          />
  
          <TableSTD
            data={data}
            type={type}
            searchTerm={searchTerm}
            activeNumberGroup={activeNumberGroup}
            numberItemDisplay={numberItemDisplay}
            onClick={handleListItems}
          />
  
          <Bottom
            numberItemDisplay={numberItemDisplay}
            setNumberItemDisplay={setNumberItemDisplay}
            activeNumberGroup={activeNumberGroup}
            setActiveNumberGroup={setActiveNumberGroup}
            data={data}
          />
  
          <BorrowContext.Provider value={{ borrowList, setBorrowList }}>
            <BorrowForm />
          </BorrowContext.Provider>
        </div>
  
        <Mycontext.Provider
          value={{ btnActive, filterAll, quantityFilter, types }}
        >
          <STFilter Mycontext={Mycontext} />
        </Mycontext.Provider>
      </div>
    );
  };
  
  export default InventorySTD;
  