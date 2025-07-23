import { useEffect, useRef, useState } from "react"
import HeadStocks from "../stocks/head-stock"
import "./member-detail-view.css"
import DynamicTable from "../table/table"
import Button from "../button/Button"
import ButtonAdd from "../stocks/button-add"
import { MdDeleteOutline, MdOutlineAddCircleOutline } from "react-icons/md"
import { NavParams } from "../Navbar/navParams"
import { useNavigate, useParams } from "react-router-dom"
import Simplifier from "../simplifier/simplifier"
import axios from "../../api/api"
import Spinner from "../spinner/spinner"
import { HiArrowNarrowLeft } from "react-icons/hi"


const MemberDetailView = ({ setNavActive }) => {

    const memberId = useParams().id

    const [searchTermDone, setSearchTermDone] = useState("");
    const [searchTermToDO, setSearchTermToDO] = useState("");
    const [memberInfo, setMemberInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [addTaskFormVisible, setAddTaskFormVisible] = useState(false);
    const addTaskFormRef = useRef(null);

    const navigate = useNavigate();

    const getMember = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/get_member/${memberId}`);
            setMemberInfo(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des informations du membre :", error);
        }
    }

    useEffect(() => {
        setNavActive(NavParams.membres);
        getMember();

    }, []);

    return (
        isLoading
            ? <Spinner />
            : <Simplifier title={<><HiArrowNarrowLeft className="icon" onClick={() => navigate(-1)} /> {memberInfo.member.firstName} {memberInfo.member.name}</>}>
                <div id="detail-member-view">
                    <div className="member-info">
                        <img src="/src/assets/profile-image.svg" alt="User profil" />
                        <div className="member-info-text">
                            <h2>{memberInfo.member.firstName} {memberInfo.member.name}</h2>
                            <p className="email"><img src="/src/assets/icon/email-outline.svg" alt="" />{memberInfo.member.email}</p>
                            <p className="poste">Poste : <span>{memberInfo.role}</span></p>
                            <p className="poste">Salaire : <span>{memberInfo.salary} {memberInfo.device}</span></p>
                            <div className="btns">
                                <Button className={"delete"} child={<><MdDeleteOutline size={16} fill="#ffffff" /> Supprimer</>} onClick={async () => {
                                    const result = await axios.delete("/remove_member/"+memberId)
                                    console.log(result);
                                    
                                }} />
                                <ButtonAdd child={<><MdOutlineAddCircleOutline /> Ajouter une tâche</>} onClick={() => setAddTaskFormVisible(true)} />
                                
                            </div>
                        </div>
                    </div>
                    <div className="member-tasks">
                        <div className="member-tasks-group">
                            <HeadStocks title={"Tâches à realiser"} setSearchTerm={setSearchTermToDO} />
                            <DynamicTable
                                theadChild={
                                    <tr>
                                        <th style={{ width: "70%" }}>Tâches</th>
                                        <th style={{ width: "30%" }}>Echeance</th>
                                    </tr>
                                }
                                tbodyChild={
                                    <tr>
                                        <td style={{ width: "70%" }}>changer la buse de l'imprimante 3D</td>
                                        <td style={{ width: "30%" }}>Le 26/07/2025</td>
                                    </tr>
                                }
                            />
                        </div>
                        <div className="member-tasks-group">
                            <HeadStocks title={"Tâches réalisées"} setSearchTerm={setSearchTermDone} />
                            <DynamicTable
                                theadChild={
                                    <tr>
                                        <th style={{ width: "70%" }}>Tâches</th>
                                        <th style={{ width: "30%" }}>Echeance</th>
                                    </tr>
                                }
                                tbodyChild={
                                    <>
                                        <tr>
                                            <td style={{ width: "70%" }}>changer la buse de l'imprimante 3D</td>
                                            <td style={{ width: "30%" }}>Le 26/07/2025</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "70%" }}>changer la buse de l'imprimante 3D</td>
                                            <td style={{ width: "30%" }}>Le 26/07/2025</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "70%" }}>changer la buse de l'imprimante 3D</td>
                                            <td style={{ width: "30%" }}>Le 26/07/2025</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "70%" }}>changer la buse de l'imprimante 3D</td>
                                            <td style={{ width: "30%" }}>Le 26/07/2025</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "70%" }}>changer la buse de l'imprimante 3D</td>
                                            <td style={{ width: "30%" }}>Le 26/07/2025</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "70%" }}>changer la buse de l'imprimante 3D</td>
                                            <td style={{ width: "30%" }}>Le 26/07/2025</td>
                                        </tr>
                                    </>
                                }
                            />
                        </div>

                    </div>

                </div>

                {addTaskFormVisible && (
                    <form className="add_task-form" ref={addTaskFormRef}>
                        <div className="add_task-form-content">
                            <h3>Nouvelle tâche</h3>
                            <div className="input-field">
                                <label htmlFor="task">Tâche</label>
                                <input
                                    type="text"
                                    id="task"
                                    placeholder="Ex: maintenance des imprimantes 3d"
                                    name="task"
                                />
                            </div>
                            <div className="row dates">
                                <div className="input-field">
                                    <label htmlFor="start">Date de début</label>
                                    <input type="date" name="start" id="start" />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="due_date">Date d'échéance</label>
                                    <input type="date" name="due_date" id="due_date" />
                                </div>
                            </div>
                            <div className="input-field">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    type="text"
                                    id="description"
                                    placeholder=""
                                    name="description"
                                    rows={5}
                                />
                            </div>
                            <div className="row">
                                <Button className={"cancel-button"} type={"button"} child={"Annuler"} onClick={() => {
                                    addTaskFormRef.current.reset();
                                    setAddTaskFormVisible(false);
                                }} />
                                <ButtonAdd type={"submit"} child={"Ajouter"} />
                            </div>
                        </div>
                    </form>
                )}

            </Simplifier>
    )
}

export default MemberDetailView