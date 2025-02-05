import { useState, useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import Button from "../../../components/button/Button";
import HeadStocks from "../../../components/stocks/head-stock";
import ToolBox from "../../../components/stocks/toolbox";
import Table from "../../../components/stocks/manager-table";
import ButtonAdd from "../../../components/stocks/button-add";
import "./inventory.css"
import "../../../components/stocks/stocks.css"
import CommandsMBR from "../../../components/commands/member-commands";
import LocationMBR from "../../../components/Location/member-location";
import AddProduct from "../../../components/add_product/add-product";
import { NavParams } from "../../../components/Navbar/navParams";


const InventoryMBR = ({setNavActive}) => {


    //data acquisition
    const [allProducts, setAllProducts] = useState([]); // Store all products
    const [data, setData] = useState([])
    const [types, setTypes] = useState([])
    useEffect(() => {

        // Activer le bouton budget de la navbar
        setNavActive(NavParams.inventaire)

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

    //search
    const [searchTerm, setSearchTerm] = useState("")

    //active button
    const [btnActive, setBtnActive] = useState("")

    // Filter type data
    const [type, setType] = useState('')

    const SetTypeFilter = (e) => {
        setType(e)
        setBtnActive(e)
        setData(allProducts.filter(p => p.type.toLocaleLowerCase().match(e)))
    }

    // Ajouter un produit
    const openAddProductForm = () => {
       document.querySelector("#add-product").style.visibility = "visible"
       
    }

    return (

        <div className="manager-inventory">
            <div className="grid-content">
                <CommandsMBR />
                <LocationMBR />
                <div className="stocks">
                    <HeadStocks
                        title={"Stocks"}
                        setSearchTerm={setSearchTerm} />

                    <ToolBox
                        firstbutton={
                            <Button
                                child={<><MdAddCircleOutline /> Ajouter</>} />}
                        types={types}
                        btnActive={btnActive}
                        SetTypeFilter={SetTypeFilter} />

                    <Table data={data} type={type} searchTerm={searchTerm} />

                    <ButtonAdd child={<><MdAddCircleOutline /> Ajouter</>} onClick={openAddProductForm}/>
                </div>
            </div>

            <AddProduct />
            

        </div>



    )
}

export default InventoryMBR;

