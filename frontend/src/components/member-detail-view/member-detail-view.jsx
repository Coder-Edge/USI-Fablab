import { useState } from "react"
import HeadStocks from "../stocks/head-stock"
import "./member-detail-view.css"
import DynamicTable from "../table/table"

const MemberDetailView = ({memberInfo}) => {

    const [searchTermDone, setSearchTermDone] = useState("")
    const [searchTermToDO, setSearchTermToDO] = useState("")


    return (
        <div id="detail-member-view">
            <div className="member-info">
                <img src="/src/assets/profile-image.svg" alt="User profil" />
                <div className="member-info-text">
                    <h2>{memberInfo.firstname} {memberInfo.name}</h2>
                    <p className="email">{memberInfo.email}</p>
                    <p className="poste">Poste <span>Gestion des stocks</span></p>
                    <p className="promotion">Promotion <span>O2</span></p>
                </div>
            </div>
            <div className="member-tasks">
                <div className="member-tasks-group">
                    <HeadStocks title={"Tâches à realiser"} setSearchTerm={searchTermToDO} />
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
                    <HeadStocks title={"Tâches réalisées"} setSearchTerm={searchTermDone} />
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
    )
}

export default MemberDetailView