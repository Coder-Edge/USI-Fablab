import { useState, useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { Product, ListProducts } from "../../../models/product";
import Button from "../../../components/button/Button";
import HeadStocks from "../../../components/stocks/head-stock";
import ToolBox from "../../../components/stocks/toolbox";
import Table from "../../../components/stocks/manager-table";
import ButtonAdd from "../../../components/stocks/button-add";
import "./inventory.css"
import "../../../components/stocks/stocks.css"
import CommandsMBR from "../../../components/commands/member-commands";
import LocationMBR from "../../../components/Location/member-location";

const InventoryMBR = () => {

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

    const SetTypeFilter = (e) => {
        setType(e)
        setBtnActive(e)
        setData(ListProducts.filter(p=>p.type.toLocaleLowerCase().match(e)))
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
                        SetTypeFilter={SetTypeFilter}/>

                    <Table data={data} type={type} searchTerm={searchTerm} />

                    <ButtonAdd child={<><MdAddCircleOutline /> Ajouter</>} />
                </div>
            </div>
        </div>
    )
}

export default InventoryMBR;