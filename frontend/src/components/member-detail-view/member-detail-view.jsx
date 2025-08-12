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
import { getStringDate, getTodayDate } from "../../utils/date"
import Swal from "sweetalert2"
import { timer_duration } from "../../utils/config"
import eventBus from "../../utils/eventBus"

const MemberDetailView = ({ setNavActive }) => {    

    const memberId = useParams().id

    const [searchTermDone, setSearchTermDone] = useState("");
    const [searchTermToDO, setSearchTermToDO] = useState("");
    const [memberInfo, setMemberInfo] = useState({});
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [addTaskFormVisible, setAddTaskFormVisible] = useState(false);

    const [addTaskFormTitleError, setAddTaskFormTitleError] = useState(false);
    const [addTaskFormEndDateError, setAddTaskFormEndDateError] = useState(false);
    const [addTaskFormDescriptionError, setAddTaskFormDescriptionError] = useState(false);

    const addTaskFormRef = useRef(null);

    const onSubmitAddTask = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const email = memberInfo.member.email;
        const title = formData.get("task");
        const startDate = formData.get("start_date");
        const endDate = formData.get("due_date");
        const description = formData.get("description");

        if (!title) setAddTaskFormTitleError(true); else setAddTaskFormTitleError(false);
        if (!endDate) setAddTaskFormEndDateError(true); else setAddTaskFormEndDateError(false);
        if (!description) setAddTaskFormDescriptionError(true); else setAddTaskFormDescriptionError(false);

        if (!title || !endDate || !description) return;

        const data = {
            email,
            title,
            startDate,
            endDate,
            description
        };

        try {
            await axios.post(`/tasks`, data);
            
            Swal.fire({
                title: "Succès",
                text: "Tâche ajoutée avec succès",
                icon: "success",
                timer: timer_duration,
                showConfirmButton: false
            });
        } catch (error) {

            Swal.fire({
                title: "Erreur",
                text: "Une erreur s'est produite lors de l'ajout de la tâche",
                icon: "error",
                timer: timer_duration,
                showConfirmButton: false
            });
        } finally {
            setAddTaskFormVisible(false);
            setAddTaskFormDescriptionError(false);
            setAddTaskFormEndDateError(false);
            setAddTaskFormTitleError(false);
            addTaskFormRef.current.reset();
        }

    }

    const navigate = useNavigate();

    const getMember = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/get_member/${memberId}`);
            setMemberInfo(response.data);
            setIsLoading(false);
            getTasks(memberId);
        } catch (error) {
            console.error("Erreur lors de la récupération des informations du membre :", error);
        }
    }

    const getTasks =  async (id) => {
        try {
            const response = await axios.get(`/get_tasks/member/${id}`);
            setTasks(response.data);
            console.log(response);
            
        } catch (error) {
            console.error("Erreur lors de la récupération des tâches :", error);
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
                                    navigate(-1);
                                    let isSuccess;
                                    try {
                                        const result = await axios.delete(`/remove_member/${memberId}`);
                                        isSuccess = true;
                                        Swal.fire({
                                            title: "Succès",
                                            text: "Le membre a été supprimé avec succès",
                                            icon: "success",
                                            timer: timer_duration,
                                            showConfirmButton: false
                                        });
                                    } catch (error) {
                                        isSuccess = false;
                                        Swal.fire({
                                            title: "Erreur",
                                            text: "Une erreur s'est produite lors de la suppression du membre",
                                            icon: "error",
                                            timer: timer_duration,
                                            showConfirmButton: false
                                        });
                                    } finally {
                                        eventBus.emit("DeleteMember", isSuccess)
                                    }
                                }} />
                                <ButtonAdd child={<><MdOutlineAddCircleOutline /> Ajouter une tâche</>} onClick={() => {
                                    setAddTaskFormDescriptionError(false);
                                    setAddTaskFormEndDateError(false);
                                    setAddTaskFormTitleError(false);
                                    setAddTaskFormVisible(true);
                                }} />

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
                                    tasks.map((task) => (
                                        <tr key={task._id}>
                                            <td style={{ width: "70%" }}>{task.title}</td>
                                            <td style={{ width: "30%" }}>{getStringDate(task.endDate)}</td>
                                        </tr>
                                    ))
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
                    <form className="add_task-form" ref={addTaskFormRef} onSubmit={onSubmitAddTask}>
                        <div className="add_task-form-content">
                            <h3>Nouvelle tâche</h3>
                            <div className="input-field">
                                <label htmlFor="task">Tâche</label>
                                <input
                                    type="text"
                                    id="task"
                                    placeholder="Ex: maintenance des imprimantes 3d"
                                    name="task"
                                    className={addTaskFormTitleError ? "error": null}
                                />
                            </div>
                            <div className="row dates">
                                <div className="input-field">
                                    <label htmlFor="start">Date de début</label>
                                    <input type="date" name="start_date" id="start" defaultValue={getTodayDate()}/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="due_date">Date d'échéance</label>
                                    <input type="date" name="due_date" id="due_date" className={addTaskFormEndDateError ? "error": null} />
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
                                    className={addTaskFormDescriptionError ? "error": null}
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