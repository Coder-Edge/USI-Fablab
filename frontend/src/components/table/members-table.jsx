import { users } from "../../models/users";
import { useEffect, useState } from "react";
import axios from "axios";
import DynamicTable from "./table";

const MembersTableView = ({
  numberItemDisplay,
  activeNumberGroup,
  searchTerm,
}) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/get_members")
      .then((response) => {
        setMembers(response.data); // Stocke les données
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération :", err);
      });
  }, []);
  console.log(members);
  return (
    <DynamicTable
      theadChild={
        <tr>
          <th className="component" style={{ width: "37%" }}>
            Nom
          </th>
          <th style={{ width: "17%" }}>Prenom</th>
          <th style={{ width: "28%" }}>Email</th>
          <th style={{ width: "10%" }}>Classe</th>
          <th style={{ width: "25%" }}>Poste</th>
        </tr>
      }
      tbodyChild={users
        .slice(
          numberItemDisplay * (activeNumberGroup - 1),
          numberItemDisplay * activeNumberGroup
        )
        .filter(
          (members) =>
            members.member.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase().trim()) ||
            members.member.firstname
              .toLowerCase()
              .includes(searchTerm.toLowerCase().trim())
        )
        .map((members, i) => (
          <tr key={i}>
            <td className="component" style={{ width: "37%" }}>
              <div>
                <img
                  src={`/src/assets/profile-icon.svg`}
                  alt={members.member.name}
                />
                {members.member.name.length <= 20
                  ? members.member.name
                  : `${members.member.name.slice(0, 18)} ...`}
              </div>
            </td>
            <td style={{ width: "17%" }}>
              {members.member.firstname.length <= 20
                ? members.member.firstname
                : `${members.member.firstname.slice(0, 18)} ...`}
            </td>
            <td style={{ width: "28%" }}>{members.member.email}</td>
            <td style={{ width: "10%" }}>O1</td>
            <td style={{ width: "25%" }}>Gestionaire des taches</td>
          </tr>
        ))}
    />
  );
};

export default MembersTableView;
