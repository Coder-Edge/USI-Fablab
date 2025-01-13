import React, { useState, useEffect, useContext } from "react";
import { Product, ListProducts } from "../../../models/product";
import Button from "../../../components/button/Button";
import HeadStocks from "../../../components/stocks/head-stock";
import ToolBox from "../../../components/stocks/toolbox";
import { MdFilterList } from "react-icons/md";
import "./inventory.css"
import "../../../components/stocks/stocks.css"
import Bottom from "../../../components/stocks/bottom";
import STFilter from "../../../components/popup/st-filter";
import TableEXT from "../../../components/stocks/extern-table";

const InventoryEXT = () => {

    const Mycontext = React.createContext()

    // Display limited number of items
    const [numberItemDisplay, setNumberItemDisplay] = useState(10)
    const [activeNumberGroup, setActiveNumberGroup] = useState(1);

    //data acquisition
    const [data, setData] = useState([])
    const [types, setTypes] = useState([])

    useEffect(() => {
        setData(ListProducts)
        setTypes(Product.getTypes(ListProducts))
    }, [])  

    //search
    const [searchTerm, setSearchTerm] = useState("")

    //active button
    const [btnActive, setBtnActive] = useState("")
    
    // Filter type data
    const [type, setType] = useState("")
    const [quantityFilter, setQuantityFilter] = useState("") 

    const SetQuantityFilterFunction = (q) => {
        
        if (q !== "" && q !== "indisponible" && q != "gt20") {
            const [start, end] = q.split("-")
            return ListProducts.filter(product=>(product.quantity <= end && product.quantity >= start))
        }
        if (q === "indisponible") {
            return ListProducts.filter(product=>(product.is_available === false))
        }
        if (q === "gt20") {
            return ListProducts.filter(product => product.quantity > 20)
        }

        return ListProducts
    }

    const filterAll = ((e, quantity) => {
        setType(e)
        setBtnActive(e)
        setQuantityFilter(quantity)
        setData(
            SetQuantityFilterFunction(quantity)
            .filter(p=>p.type.toLocaleLowerCase().match(e))
        )        
    })

    //show filter popup
    const showFilterPopUp = () => {document.getElementById("filter-popup").style.visibility = "visible"}

    // Show form
    const showForm = () => {document.querySelector('#borrow-form').style.visibility = "visible"}

    // List of the borrow data
    const [borrowList, setBorrowList] = useState([])
    
    const handleListItems = (product) => {
        if (!borrowList.includes(product)) {
            setBorrowList([...borrowList, {product: product, quantity: 1}])
        }
        showForm()
    }   

    return (
        <div className="student-inventory">
            <div className="stocks">
                <HeadStocks
                    title={"Stocks"}
                    setSearchTerm={setSearchTerm} />

                <ToolBox
                    firstbutton={
                        <Button
                            className={quantityFilter !== ""? "active": ""}
                            child={<><MdFilterList /> Filtre</>} 
                            onClick={showFilterPopUp}/>}
                    types={types}
                    btnActive={btnActive}
                    SetTypeFilter={(e) => {filterAll(e, quantityFilter)}} />

                <TableEXT
                    data={data} 
                    type={type} 
                    searchTerm={searchTerm} 
                    activeNumberGroup={activeNumberGroup}
                    numberItemDisplay={numberItemDisplay}
                    onClick={handleListItems} />

                <Bottom
                    numberItemDisplay={numberItemDisplay}
                    setNumberItemDisplay={setNumberItemDisplay}
                    activeNumberGroup={activeNumberGroup}
                    setActiveNumberGroup={setActiveNumberGroup} 
                    data={data}/>
            </div>

            <Mycontext.Provider value={{btnActive, filterAll, quantityFilter, types}}>
                    <STFilter Mycontext={Mycontext}/>
            </Mycontext.Provider>
        </div>
        
    )
}

export default InventoryEXT;