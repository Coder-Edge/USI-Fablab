import { useState, useEffect } from "react";
import { Product, ListProducts } from "../../../models/product";
import Button from "../../../components/button/Button";
import HeadStocks from "../../../components/stocks/head-stock";
import ToolBox from "../../../components/stocks/toolbox";
import TableSTD from "../../../components/stocks/st-table";
import { MdFilterList } from "react-icons/md";
import "./inventory.css"
import "../../../components/stocks/stocks.css"
import Bottom from "../../../components/stocks/bottom";

const InventorySTD = () => {

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
    const [type, setType] = useState('')

    return (
        <div className="student-inventory">
            <div className="stocks">
                <HeadStocks
                    title={"Stocks"}
                    setSearchTerm={setSearchTerm} />

                <ToolBox
                    firstbutton={
                        <Button
                            child={<><MdFilterList /> Filtre</>} />}
                    types={types}
                    btnActive={btnActive}
                    setBtnActive={setBtnActive}
                    setType={setType} />

                <TableSTD
                    data={data} 
                    type={type} 
                    searchTerm={searchTerm} 
                    activeNumberGroup={activeNumberGroup}
                    numberItemDisplay={numberItemDisplay} />
            </div>
            <Bottom
                numberItemDisplay={numberItemDisplay}
                setNumberItemDisplay={setNumberItemDisplay}
                activeNumberGroup={activeNumberGroup}
                setActiveNumberGroup={setActiveNumberGroup} />
        </div>
    )
}

export default InventorySTD;