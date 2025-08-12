

import AddMember from "../../../components/add-memeber/add-member"
import { useEffect, useState } from "react";
import { NavParams } from "../../../components/Navbar/navParams";
import MembersTableView from "../../../components/table/members-table";
import HeadStocks from "../../../components/stocks/head-stock";
import ToolBox from "../../../components/stocks/toolbox";
import Button from "../../../components/button/Button";
import ButtonAdd from "../../../components/stocks/button-add";
import { MdAddCircleOutline } from "react-icons/md";
import Bottom from "../../../components/stocks/bottom";
import Simplifier from "../../../components/simplifier/simplifier";
import "./members.css";
import Spinner from "../../../components/spinner/spinner";
import { IoFilterSharp } from "react-icons/io5";
import eventBus from "../../../utils/eventBus";


const MembersPage = ({ setNavActive }) => {

    const [userDetailViewInfo, setUserDetailViewInfo] = useState({})

    const [title, setTitle] = useState("Member")
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getMembers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/get_members");
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des membres");
            }
            const data = await response.json();
            setData(data); // Mettre à jour l'état avec les données récupérées
        } catch (error) {
            console.error("Erreur :", error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        getMembers(); // Appeler la fonction pour récupérer les membres

        eventBus.on("DeleteMember", (isSuccess) => {
            if (isSuccess) getMembers();
        });

        return () => {
            eventBus.off("DeleteMember", (isSuccess) => {
                if (isSuccess) getMembers();
            });
        };

    }, []); // Le tableau vide signifie que cette fonction ne s'exécute qu'au montage du composant

    const [searchTerm, setSearchTerm] = useState("");
    const [types, setTypes] = useState(["Etudiant", "Manager"]);
    const [btnActive, setBtnActive] = useState("");
    // Display limited number of items
    const [numberItemDisplay, setNumberItemDisplay] = useState(10);
    const [activeNumberGroup, setActiveNumberGroup] = useState(1);

    useEffect(() => {
        // Activer le bouton budget de la navbar
        setNavActive(NavParams.membres);
    }, []);

    // filter des membres
    const setFilter = (e) => {
        setBtnActive(e);
    };

    // show detail view
    const showDetailView = (firstname, name, email, poste, salaire, device) => {
        setTitle(
            <div className="detailview-title">
                <button type="button" onClick={
                    () => {
                        setTitle("Member")
                        document.querySelector("#detail-member-view").style.visibility = "hidden"
                    }
                }><img src="/src/assets/icon/arrow-back.svg" /></button> {firstname} {name}
            </div>
        );
        setUserDetailViewInfo({
            firstname,
            name,
            email,
            poste,
            salaire: device + salaire
        })

    }

    const sum_salary = () => {
        let salary = 0;

        for (let i = 0; i < data.length; i++) {
            salary += data[i].salary;
        }
        return salary;
    };

    return (
        <Simplifier title={title}>
            <div className="members">
                <HeadStocks title={"Equipes"} setSearchTerm={setSearchTerm} />
                <div className="summary">
                    <div className="card">
                        <p>Effectif</p>
                        <p className="content">{data.length} {data.length > 1 ? "membres" : "membre"}</p>
                        <p className="icon"><img src="/src/assets/icon/group-icon.svg" alt="Person" /></p>
                    </div>
                    <div className="card">
                        <p>Coût total du personnel</p>
                        <p className="content">$ {sum_salary()}</p>
                    </div>
                </div>
                <div className="content">
                    <ToolBox
                        firstbutton={<Button className={"active"} child={<IoFilterSharp fill="#ffffff" size={16} />} />}
                        types={types}
                        SetTypeFilter={setFilter}
                        btnActive={btnActive} />
                    <div className="table-load">
                        {isLoading
                            ? <Spinner />
                            : <MembersTableView numberItemDisplay={numberItemDisplay} activeNumberGroup={activeNumberGroup} searchTerm={searchTerm} showDetailView={showDetailView} data={data} />
                        }
                    </div>

                    <ButtonAdd child={<><MdAddCircleOutline /> Inviter</>} onClick={
                        () => {
                            document.querySelector("#add-member").style.visibility = "visible"
                        }
                    } />
                </div>
                <Bottom
                    numberItemDisplay={numberItemDisplay}
                    setNumberItemDisplay={setNumberItemDisplay}
                    activeNumberGroup={activeNumberGroup}
                    setActiveNumberGroup={setActiveNumberGroup}
                    data={data}
                />

            </div>

            <AddMember refactor={getMembers} />

        </Simplifier>
    )
}

export default MembersPage;
