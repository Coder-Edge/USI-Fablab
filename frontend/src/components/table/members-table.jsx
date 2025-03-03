import { useEffect, useState } from "react";
import DynamicTable from "./table";


const MembersTableView = ({ numberItemDisplay, activeNumberGroup, searchTerm }) => {
    const [members, setMembers] = useState([]); // État pour stocker les membres récupérés
    const [loading, setLoading] = useState(true); // État pour gérer le chargement

    // Fonction pour récupérer les membres depuis l'API
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch("http://localhost:3000/get_members");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des membres");
                }
                const data = await response.json();
                setMembers(data); // Mettre à jour l'état avec les données récupérées
            } catch (error) {
                console.error("Erreur :", error);
            } finally {
                setLoading(false); // Arrêter le chargement une fois les données récupérées
            }
        };

        fetchMembers(); // Appeler la fonction pour récupérer les membres
    }, []); // Le tableau vide signifie que cette fonction ne s'exécute qu'au montage du composant

    // Si les données sont en cours de chargement, afficher un message
    if (loading) {
        return <div className="loading">Chargement en cours...</div>;
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
                members
                    .slice(numberItemDisplay * (activeNumberGroup - 1), numberItemDisplay * activeNumberGroup)
                    .filter((member) => (
                        member.member.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                        member.member.firstName.toLowerCase().includes(searchTerm.toLowerCase().trim())
                    ))
                    .map((member, i) => (
                        <tr key={i}>
                            <td className="component" style={{ width: "20%" }}>
                                <div>
                                    <img src={`/src/assets/profile-icon.svg`} alt={member.member.name} />
                                    {member.member.name.length <= 20 ? member.member.name : `${member.member.name.slice(0, 18)} ...`}
                                </div>
                            </td>
                            <td style={{ width: "20%" }}>
                                {member.member.firstName.length <= 20 ? member.member.firstName : `${member.member.firstName.slice(0, 18)} ...`}
                            </td>
                            <td style={{ width: "28%" }}>
                                {member.member.email}
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