import { NavParams } from "../../../components/Navbar/navParams";
import "./shop.css"
import Simplifier from "../../../components/simplifier/simplifier";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import ToolBox from "../../../components/stocks/toolbox";
import Button from "../../../components/button/Button";
import ProductCard from "../../../components/cards/product-card";
import ProductDetailView from "../../../components/article-detail-view/article-detail-view";
import axios from "../../../api/api";
import Swal from "sweetalert2";

const Shop = ({ setNavActive }) => {

    const [state, setState] = useState(false);

    // research
    const [searchTerm, setSearchTerm] = useState("");

    //types
    const [types, setTypes] = useState(["jeux de sociétés", "jeux individuel"]);
    // materials
    const [materials, setMaterials] = useState(["Bois", "Metal", "Fibre"])

    // type filter
    const [typeFilter, settypeFilter] = useState("");
    // price filter
    const [priceFilter, setPriceFilter] = useState("")
    // material filter
    const [materialFilter, setMaterialFilter] = useState("")

    // show product detail
    const [productActive, setProductActive] = useState({})

    const showProductDetail = (product) => {
        setProductActive(product)
        
        setState(!state);
        document.querySelector("#product-detail-view").style.visibility = "visible"
    }

    //data
    const [data, setData] = useState([]);

    const fetchData = async () => {
            try {
                const response = await axios.get("/get_articles"); // Requête GET
                // console.log(response.data); // Vérifie la réponse dans la console
                setData(response.data); // Met à jour data avec les données reçues
            } catch (error) {
                console.error(error);
                Swal.fire("Erreur", error.response?.data?.message || "Erreur inconnue", "error");
            }
        };


    useEffect(() => {
        // Activer le bouton budget de la navbar
        setNavActive(NavParams.boutique);
        fetchData();
    }, []);


    return (
        <Simplifier title={"Boutique"}>
            <div className="shop">
                <div className="shop-filter">
                    <h3>Filtre</h3>
                    <div className="item-filter">
                        <h4>Type</h4>
                        <div className="input-field">
                            <input type="radio" id={`type-all`} name="type" checked={typeFilter === ""}
                                onChange={() => settypeFilter("")} />
                            <label htmlFor={`type-all`}>Tout</label>
                        </div>
                        {types.map(
                            (type, index) => (
                                <div className="input-field" key={index}>
                                    <input type="radio" id={`type-${index}`} name="type" checked={typeFilter === type}
                                        onChange={() => settypeFilter(type)} />
                                    <label htmlFor={`type-${index}`}>{type}</label>
                                </div>
                            )
                        )}
                    </div>
                    <div className="item-filter">
                        <h4>Price</h4>
                        <div className="input-field">
                            <input type="radio" id="price-0" name="price" value={""} checked={priceFilter === ""}
                                onChange={() => setPriceFilter("")} />
                            <label htmlFor="price-0">Tout</label>
                        </div>
                        <div className="input-field">
                            <input type="radio" id="price-1" name="price" value={"lt5"} checked={priceFilter === "lt5"}
                                onChange={() => setPriceFilter("lt5")} />
                            <label htmlFor="price-1">Moins de 5$</label>
                        </div>
                        <div className="input-field">
                            <input type="radio" id="price-2" name="price" value={"5-10"} checked={priceFilter === "5-10"}
                                onChange={() => setPriceFilter("5-10")} />
                            <label htmlFor="price-2">5 - 10$</label>
                        </div>
                        <div className="input-field">
                            <input type="radio" id="price-3" name="price" value={"10-50"} checked={priceFilter === "10-50"}
                                onChange={() => setPriceFilter("10-50")} />
                            <label htmlFor="price-3">10 - 50$</label>
                        </div>
                        <div className="input-field">
                            <input type="radio" id="price-4" name="price" value={"50-100"} checked={priceFilter === "50-100"}
                                onChange={() => setPriceFilter("50-100")} />
                            <label htmlFor="price-4">50 - 100$</label>
                        </div>
                        <div className="input-field">
                            <input type="radio" id="price-5" name="price" value={"gt100"} checked={priceFilter === "gt100"}
                                onChange={() => setPriceFilter("gt100")} />
                            <label htmlFor="price-5">Plus de 100$</label>
                        </div>
                    </div>
                    <div className="item-filter">
                        <h4>Materiaux</h4>
                        <div className="input-field">
                            <input type="radio" id="material-all" name="material" checked={materialFilter === ""}
                                onChange={() => setMaterialFilter("")} />
                            <label htmlFor="material-all">Tout</label>
                        </div>
                        {materials.map(
                            (material, index) => (
                                <div className="input-field" key={index}>
                                    <input type="radio" id={`material-${index}`} name="material" checked={materialFilter === material}
                                        onChange={() => setMaterialFilter(material)} />
                                    <label htmlFor={`material-${index}`}>{material}</label>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="shop-products">
                    <div className="shop-head">
                        <div className="search">
                            <IoSearchOutline />
                            <input type="search" placeholder="Recherche"
                                onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <div className="bag">
                            <img src="/src/assets/icon/panier.svg" alt="Bag" />
                            Panier
                        </div>
                    </div>
                    <ToolBox
                        firstbutton={<Button child={"Filtre"} />}
                        types={types}
                        btnActive={typeFilter}
                        SetTypeFilter={(val) => settypeFilter(val)} />

                    <div className="products-list">
                        {data
                            .filter(product => (product.name.toLowerCase().includes(searchTerm.toLowerCase())))
                            .filter(product => {
                                if (priceFilter !== "" && priceFilter !== "gt100" && priceFilter !== "lt5") {
                                    const prices = priceFilter.split("-")
                                    return product.price <= prices [1] && product.price >= prices[0]
                                }
                                else if (priceFilter === "gt100")
                                    return product.price > 100;
                                else if (priceFilter === "lt5")
                                    return product.price < 5
                                return product
                            })
                            // .filter(product => (product.material.toLowerCase().match(materialFilter.toLocaleLowerCase())))
                            .filter(product => (product.type.toLocaleLowerCase().match(typeFilter.toLocaleLowerCase())))
                            .map(
                                (product, index) => {
                                    return <ProductCard product={product} key={index} showDetail={() => showProductDetail(product)}/>
                                }
                            )}
                    </div>
                </div>

                <ProductDetailView product={productActive} receivedTypes={types} state={state}/>

            </div>
        </Simplifier>
    )
}


export default Shop