import { useEffect, useState } from "react"
import "./shop.css"
import { NavParams } from "../../../components/Navbar/navParams"
import Simplifier from "../../../components/simplifier/simplifier"
import HeadStocks from "../../../components/stocks/head-stock"
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../../../components/button/Button"
import ButtonAdd from "../../../components/stocks/button-add"
import { MdAddCircleOutline, MdFilterList, MdOutlineEdit } from "react-icons/md"
import DynamicTable from "../../../components/table/table"
import { ListProducts } from "../../../models/product"
import Bottom from "../../../components/stocks/bottom"
import AddArticle from "../../../components/add-article/add-article"

const ShopMNG = ({ setNavActive }) => {

    const [state, setState] = useState(false);

    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState([])
    const [types, setTypes] = useState(["Jeux de société", "Jeux individuel"])
    const [listView, setListView] = useState([])

    // Display limited number of items
    const [numberItemDisplay, setNumberItemDisplay] = useState(10);
    const [activeNumberGroup, setActiveNumberGroup] = useState(1);

    useEffect(() => {
        setNavActive(NavParams.boutique)
        setListView(ListProducts)
        setData(ListProducts)
    }, [])

    useEffect(() => {
        setListView(data.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }, [searchTerm])

    return (
        <Simplifier title={"Boutique"}>
            <div className="shop-manager">
                <div className="shop-manager-content">
                    <HeadStocks title={"Product"} setSearchTerm={setSearchTerm} />
                    <div className="summary">
                        <div className="card">
                            <p className="title">Meilleur produit de l'année</p>
                            <p className="content"><img src="/src/assets/shop/phone-support.svg" alt="" /> 240 ventes</p>
                            <p className="icon">Support pour telephone<img src="/src/assets/icon/sale-tag.svg" alt="Person" /></p>
                        </div>
                        <div className="card">
                            <p className="title">Revenu de la boutique</p>
                            <p className="content">$ {36000}</p>
                            <p className="icon"><img src="/src/assets/icon/fluent-money.svg" alt="Person" /></p>
                        </div>
                    </div>
                    <div className="shop-buttons">
                        <Button child={<><MdFilterList /> Filtre</>} type={"button"} />
                        <ButtonAdd child={<><MdAddCircleOutline /> Inviter</>} type={"button"}
                            onClick={() => document.querySelector("#add-article").style.visibility = "visible"} />
                    </div>
                    <DynamicTable
                        theadChild={
                            <tr>
                                <th className="component" style={{ width: "25%" }}>Nom</th>
                                <th style={{ width: "15%" }}>Type</th>
                                <th style={{ width: "10%" }}>Prix</th>
                                <th style={{ width: "10%" }}>Stock</th>
                                <th style={{ width: "10%" }}>Ventes</th>
                                <th style={{ width: "15%" }}>Modifier</th>
                                <th style={{ width: "15%" }}>Supprimer</th>
                            </tr>
                        }
                        tbodyChild={
                            listView
                                .slice(numberItemDisplay * (activeNumberGroup - 1), numberItemDisplay * activeNumberGroup)
                                .map(
                                    (product, index) => (
                                        <tr key={index}>
                                            <td className="component" style={{ width: "25%" }}>
                                                <div>
                                                    <img src={product.image} alt="" />
                                                    <a>
                                                        {product.name}
                                                    </a>
                                                </div>
                                            </td>
                                            <td style={{ width: "15%" }}>{product.type}</td>
                                            <td style={{ width: "10%" }}>{product.price}</td>
                                            <td style={{ width: "10%" }}>{product.quantity}</td>
                                            <td style={{ width: "10%" }}>jhcjd</td>
                                            <td style={{ width: "15%" }}><Button child={<><MdOutlineEdit /> Disponible</>} className={"active"} /></td>
                                            <td style={{ width: "15%" }}><Button child={<><RiDeleteBin6Line /> Supprimer</>} className={"delete"} /></td>
                                        </tr>
                                    )
                                )
                        }
                    />

                    <Bottom
                        numberItemDisplay={numberItemDisplay} setActiveNumberGroup={setActiveNumberGroup}
                        activeNumberGroup={activeNumberGroup} setNumberItemDisplay={setNumberItemDisplay}
                        data={listView} />
                </div>

                <AddArticle articles={data} receivedTypes={types} state={state} />

            </div>
        </Simplifier>
    )
}

export default ShopMNG