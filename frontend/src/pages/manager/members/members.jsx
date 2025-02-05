import { useEffect, useRef, useState } from "react"
import { NavParams } from "../../../components/Navbar/navParams"
import MembersTableView from "../../../components/table/members-table"
import "./members.css"
import HeadStocks from "../../../components/stocks/head-stock"
import ToolBox from "../../../components/stocks/toolbox"
import { MdFilterList } from "react-icons/md"
import Button from "../../../components/button/Button"
import ButtonAdd from "../../../components/stocks/button-add"
import { MdAddCircleOutline } from "react-icons/md"
import Bottom from "../../../components/stocks/bottom"
import { users } from "../../../models/users"
import SimpleFilter from "../../../components/popup/simple-filter"

const MembersPage = ({ setNavActive }) => {

    const refPopup = useRef(null)

    const [data, setData] = useState([])

    const [searchTerm, setSearchTerm] = useState("");
    const [types, setTypes] = useState([]);
    const [btnActive, setBtnActive] = useState("");
    // Display limited number of items
    const [numberItemDisplay, setNumberItemDisplay] = useState(10);
    const [activeNumberGroup, setActiveNumberGroup] = useState(1);

    useEffect(() => {
        // Activer le bouton budget de la navbar
        setNavActive(NavParams.membres)

        setData(users);

    }, [])

    return (
        <div className="members">
            <HeadStocks title={"Equipes"} setSearchTerm={setSearchTerm} />
            <div className="summary">
                <div className="card">
                    <p>Effectif</p>
                    <p className="content">{data.length} {data.length > 1 ? "membres" : "membre"}</p>
                    <p className="icon"><img src="/src/assets/icon/group-icon.svg" alt="" srcset="" /></p>
                </div>
                <div className="card">
                    <p>Coût total du personnel</p>
                    <p className="content">$ {36000}</p>
                </div>
            </div>
            <div className="content">
                <ToolBox
                    firstbutton={
                        <Button
                            // className={quantityFilter !== "" ? "active" : ""}
                            child={<><MdFilterList /> Filtre</>}
                        />}
                    types={types}
                    btnActive={btnActive} />
                <MembersTableView numberItemDisplay={numberItemDisplay} activeNumberGroup={activeNumberGroup} searchTerm={searchTerm}/>
                <ButtonAdd child={<><MdAddCircleOutline /> Inviter</>} />
            </div>
            <Bottom
                numberItemDisplay={numberItemDisplay}
                setNumberItemDisplay={setNumberItemDisplay}
                activeNumberGroup={activeNumberGroup}
                setActiveNumberGroup={setActiveNumberGroup}
                data={data}
            />

            <SimpleFilter ref={refPopup} />
        </div>
    )
}

export default MembersPage