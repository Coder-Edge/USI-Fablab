import { useEffect, useState } from "react";
import { NavParams } from "../../../components/Navbar/navParams";
import Simplifier from "../../../components/simplifier/simplifier";
import "./commands.css"
import ToolBox from "../../../components/stocks/toolbox";
import Button from "../../../components/button/Button";
import { MdAddCircleOutline, MdDeleteOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import HeadStocks from "../../../components/stocks/head-stock";

const CommandsList = ({ setNavActive }) => {

    // Active button
    const [btnActive, setBtnActive] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const setFilter = (type) => {
        setBtnActive(type);
    }

    useEffect(() => {
        setNavActive(NavParams.inventaire)
    })

    return (
        <Simplifier title="Commandes">
            <div className="commands-list">
                <div className="commands-content">

                    <HeadStocks title={"Liste des commmandes"} setSearchTerm={setSearchTerm} />
                    <ToolBox
                        firstbutton={<Button child={<><MdAddCircleOutline /> Ajouter</>} />}
                        types={["en attente", "acceptées", "rejetées", "nouvelles", "anciennes"]}
                        btnActive={btnActive}
                        SetTypeFilter={setFilter} />
                </div>
            </div>
        </Simplifier>
    )
}

export default CommandsList;