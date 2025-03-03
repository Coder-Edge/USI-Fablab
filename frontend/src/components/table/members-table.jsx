import { users } from "../../models/users"
import DynamicTable from "./table"

const MembersTableView = ({ numberItemDisplay, activeNumberGroup, searchTerm, showDetailView }) => {

    const detailView = (name, firstname, email, task) => {
        showDetailView(name, firstname, email, task)
        document.querySelector("#detail-member-view").style.visibility = "visible"
    }

    return (
        <DynamicTable
            theadChild={
                <tr>
                    <th className="component" style={{ width: "37%" }}>Nom</th>
                    <th style={{ width: "17%" }}>Prenom</th>
                    <th style={{ width: "28%" }}>Email</th>
                    <th style={{ width: "10%" }}>Classe</th>
                    <th style={{ width: "25%" }}>Poste</th>
                </tr>
            }
            tbodyChild={
                users
                    .slice(numberItemDisplay * (activeNumberGroup - 1), numberItemDisplay * activeNumberGroup)
                    .filter((user) => (user.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) || user.firstname.toLowerCase().includes(searchTerm.toLowerCase().trim())))
                    .map((user, i) => (
                        <tr key={i}>
                            <td className="component" style={{ width: "37%" }}>
                                <div >
                                    <img src={`/src/assets/profile-icon.svg`} alt={user.name} />
                                    <a onClick={() => detailView(user.firstname, user.name, user.email, "Gestionaire des taches")}>
                                        {user.name.length <= 20 ? user.name : `${user.name.slice(0, 18)} ...`}
                                    </a>
                                </div>
                            </td>
                            <td style={{ width: "17%" }}>
                                <a onClick={() => detailView(user.firstname, user.name, user.email, "Gestionaire des taches")}>
                                    {user.firstname.length <= 20 ? user.firstname : `${user.firstname.slice(0, 18)} ...`}
                                </a>
                            </td>
                            <td style={{ width: "28%" }}>
                                <a onClick={() => detailView(user.firstname, user.name, user.email, "Gestionaire des taches")}>
                                    {user.email.length <= 25 ? user.email : `${user.email.slice(0, 18)} ...`}
                                </a>
                            </td>
                            <td style={{ width: "10%" }}>
                                O1
                            </td>
                            <td style={{ width: "25%" }}>
                                Gestionaire des taches
                            </td>
                        </tr>
                    ))
            }
        />
    )
}

export default MembersTableView