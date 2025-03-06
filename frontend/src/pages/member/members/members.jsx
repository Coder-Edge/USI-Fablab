import { useEffect, useState } from "react"
import { NavParams } from "../../../components/Navbar/navParams"
import MembersTableView from "../../../components/table/members-table"
import HeadStocks from "../../../components/stocks/head-stock"
import ToolBox from "../../../components/stocks/toolbox"
import { MdFilterList } from "react-icons/md"
import Button from "../../../components/button/Button"
import Bottom from "../../../components/stocks/bottom"
import { users } from "../../../models/users"

const MembersPageMBR = ({ setNavActive }) => {

    const [data, setData] = useState([])

    const [searchTerm, setSearchTerm] = useState("");
    const [types, setTypes] = useState(["Etudiant", "Manager"]);
    const [btnActive, setBtnActive] = useState("");
    // Display limited number of items
    const [numberItemDisplay, setNumberItemDisplay] = useState(10);
    const [activeNumberGroup, setActiveNumberGroup] = useState(1);

    useEffect(() => {
        // Activer le bouton budget de la navbar
        setNavActive(NavParams.membres)

        setData(users);

    }, [])

    const setFilter = (e) => {
        setBtnActive(e)
    }

    return (
        <div className="members">
            <HeadStocks title={"Equipes"} setSearchTerm={setSearchTerm} />
            <div className="content">
                <ToolBox
                    firstbutton={
                        <Button
                            // className={quantityFilter !== "" ? "active" : ""}
                            child={<><MdFilterList /> Filtre</>}
                        />}
                    types={types}
                    btnActive={btnActive}
                    SetTypeFilter={setFilter} />
                <MembersTableView numberItemDisplay={numberItemDisplay} activeNumberGroup={activeNumberGroup} searchTerm={searchTerm}/>
            </div>
            <Bottom
                numberItemDisplay={numberItemDisplay}
                setNumberItemDisplay={setNumberItemDisplay}
                activeNumberGroup={activeNumberGroup}
                setActiveNumberGroup={setActiveNumberGroup}
                data={data}
            />
        </div>
    )
}

export default MembersPageMBR