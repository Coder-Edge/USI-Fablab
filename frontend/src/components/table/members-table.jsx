import { useEffect } from "react";
import DynamicTable from "./table";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";


const MembersTableView = ({ numberItemDisplay, activeNumberGroup, searchTerm, data }) => {

    // Fonction pour récupérer les membres depuis l'API

    const location = useLocation();
    const navigate = useNavigate();

    console.log(data);

    return (
        <DynamicTable
            theadChild={
                <tr>
                    <th className="component" style={{ width: "37%" }}>Nom</th>
                    <th style={{ width: "17%" }}>Prénom</th>
                    <th style={{ width: "38%" }}>Email</th>
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
                                        () => navigate(location.pathname + `/${member._id}`)}>
                                        {member.member.name.length <= 20 ? member.member.name : `${member.member.name.slice(0, 18)} ...`}
                                    </a>
                                </div>
                            </td>
                            <td style={{ width: "17%" }}>
                                <a onClick={
                                    () => navigate(location.pathname + `/${member._id}`)}>
                                    {member.member.firstName.length <= 20 ? member.member.firstName : `${member.member.firstName.slice(0, 18)} ...`}
                                </a>
                            </td>
                            <td style={{ width: "38%" }}>
                                <a onClick={
                                    () => navigate(location.pathname + `/${member._id}`)}>
                                    {member.member.email.length <= 30 ? member.member.email : `${member.member.email.slice(0, 26)} ...`}
                                </a>
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