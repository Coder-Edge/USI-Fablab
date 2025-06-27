import { useEffect } from "react";
import DynamicTable from "./table";
import { IoPersonCircleSharp } from "react-icons/io5";


const MembersTableView = ({ numberItemDisplay, activeNumberGroup, searchTerm, showDetailView, data }) => {

    // Fonction pour récupérer les membres depuis l'API
    useEffect(() => {        
        // Appeler la fonction pour récupérer les membres
    }, []); // Le tableau vide signifie que cette fonction ne s'exécute qu'au montage du composant


    const detailView = (name, firstname, email, task, salary, device) => {
        showDetailView(name, firstname, email, task, salary, device)
        
        document.querySelector("#detail-member-view").style.visibility = "visible"
    }

    return (
        <DynamicTable
            theadChild={
                <tr>
                    <th className="component" style={{ width: "37%" }}>Nom</th>
                    <th style={{ width: "17%" }}>Prénom</th>
                    <th style={{ width: "28%" }}>Email</th>
                    <th style={{ width: "10%" }}>Classe</th>
                    <th style={{ width: "25%" }}>Poste</th>
                </tr>
            }
            tbodyChild={
                data
                    .slice(numberItemDisplay * (activeNumberGroup - 1), numberItemDisplay * activeNumberGroup)
                    .filter((member) => (
                        member.member.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                        member.member.firstName.toLowerCase().includes(searchTerm.toLowerCase().trim())
                    ))
                    .map((member, i) => (
                        <tr key={i}>
                            <td className="component" style={{ width: "37%" }}>
                                <div>
                                    <IoPersonCircleSharp size={30} className="icon" />
                                    <a onClick={
                                        () => detailView(member.member.firstName, member.member.name, member.member.email, member.role, member.salary, member.device)}>
                                        {member.member.name.length <= 20 ? member.member.name : `${member.member.name.slice(0, 18)} ...`}
                                    </a>
                                </div>
                            </td>
                            <td style={{ width: "17%" }}>
                                <a onClick={
                                    () => detailView(member.member.firstName, member.member.name, member.member.email, member.role, member.salary, member.device)}>
                                    {member.member.firstName.length <= 20 ? member.member.firstName : `${member.member.firstName.slice(0, 18)} ...`}
                                </a>
                            </td>
                            <td style={{ width: "28%" }}>
                                <a onClick={
                                    () => detailView(member.member.firstName, member.member.name, member.member.email, member.role, member.salary, member.device)}>
                                    {member.member.email.length <= 25 ? member.member.email : `${member.member.email.slice(0, 20)} ...`}
                                </a>
                            </td>
                            <td style={{ width: "10%" }}>
                                O0
                            </td>
                            <td style={{ width: "25%" }}>
                                {member.role}
                            </td>
                        </tr>
                    ))
            }
        />
    );
};

export default MembersTableView;