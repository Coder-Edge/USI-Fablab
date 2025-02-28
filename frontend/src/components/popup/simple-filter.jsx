import Button from "../button/Button"

const SimpleFilter = () => {

    const types = ["Gestionnaire des stocks", "Manager", "Gestionnaire de projet", "Gestionnaire de finance", "Chargé de maitenace"]

    return (
        <div className="st-filter" id='filter-popup'>
            <div className="popup-content">
                <div className="st-filter-content">
                    <h3>Filtre</h3>
                    <div className="filter-types">
                        <h4>Poste</h4>
                        <div className="filter-toolbox-types">
                            {types.map((type, ind) => (
                                <Button key={ind}
                                    child={type.toLowerCase()}
                                    // className={activeFilter === type.toLowerCase() ? "active" : ""}
                                    // value={type.toLowerCase()}
                                    // onClick={(e) => setActiveFilter(e.target.value)} 
                                    />
                            ))}
                        </div>
                    </div>
                    <div className="filter-bottom">
                        <Button child={"Annuler"}/>
                        <Button
                            child={"Appliquer"}
                            className={"active"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimpleFilter