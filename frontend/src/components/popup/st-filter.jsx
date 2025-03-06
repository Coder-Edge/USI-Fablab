import { useContext, useEffect, useState } from 'react'
import Button from '../button/Button'
import './popup.css'

const STFilter = ({Mycontext}) => {

    const {btnActive, filterAll, quantityFilter, types} = useContext(Mycontext)

    // active btn in popup
    const [activeFilter, setActiveFilter] = useState("")

    useEffect(() => {
        setActiveFilter(btnActive)
        setQuantity(quantityFilter)
    }, [])
    
    
    // close popup
    const closePopUp = () => {document.getElementById("filter-popup").style.visibility = "hidden"}

    // Filter data by quantity
    const [quantity, setQuantity] = useState("")

    return (
        <div className="st-filter" id='filter-popup'>
            <div className="popup-content">
                <div className="st-filter-content">
                    <h3>Filtre</h3>
                    <div className="filter-types">
                        <h4>Type</h4>
                        <div className="filter-toolbox-types">
                            {types.map((type, ind) => (
                                <Button key={ind}
                                    child={type.toLowerCase()} 
                                    className={activeFilter === type.toLowerCase()? "active": ""} 
                                    value={type.toLowerCase()}
                                    onClick={(e) => setActiveFilter(e.target.value)}/>
                            ))}
                        </div>
                    </div>
                    <div className="filter-quantity">
                        <h4>Quantité d'items</h4>
                        <div className="filter-toolbox-quantity">
                            <div className="filter-radio-btn">
                                <input type="radio" name='filter' checked={quantity===""} onChange={() => setQuantity("")}/><label>Tout</label>
                            </div>
                            <div className="filter-radio-btn">
                                <input type="radio" name='filter' checked={quantity==="indisponible"} onChange={() => setQuantity("indisponible")}/><label>Indisponible</label>
                            </div>
                            <div className="filter-radio-btn">
                                <input type="radio" name='filter' checked={quantity==="1-5"} onChange={() => setQuantity("1-5")}/><label>1 - 5</label>
                            </div>
                            <div className="filter-radio-btn">
                                <input type="radio" name='filter' checked={quantity==="5-10"} onChange={() => setQuantity("5-10")}/><label>5 - 10</label>
                            </div>
                            <div className="filter-radio-btn">
                                <input type="radio" name='filter' checked={quantity==="10-20"} onChange={() => setQuantity("10-20")}/><label>10 - 20</label>
                            </div>
                            <div className="filter-radio-btn">
                                <input type="radio" name='filter' checked={quantity==="gt20"} onChange={() => setQuantity("gt20")}/><label>Plus de 20</label>
                            </div>
                        </div>
                    </div>
                    <div className="filter-bottom">
                        <Button child={"Annuler"} onClick={closePopUp}/>
                        <Button 
                            child={"Appliquer"} 
                            className={"active"}
                            onClick={() => filterAll(activeFilter, quantity)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default STFilter