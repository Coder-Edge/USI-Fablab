
const Bottom = ({numberItemDisplay, setNumberItemDisplay, activeNumberGroup, setActiveNumberGroup, data}) => {

    // Group of items displayed
    function getGroupeNumber() {
        let listLength = data.length
        let q = listLength % numberItemDisplay
        let n = Math.trunc(listLength / numberItemDisplay)
        if (q) n ++

        return n
    }    

    // Change of group of items
    const increaseActiveNumber = () => {
        if (!(activeNumberGroup == getGroupeNumber())) {
            setActiveNumberGroup(activeNumberGroup+1)
        }
    }

    const decreaseActiveNumber = () => {
        if (!(activeNumberGroup == 1)) {
            setActiveNumberGroup(activeNumberGroup-1)
        }
    }
    
    return (
        <div className="bottom-stock">
            <div className="display">
                <label htmlFor="number">Affichage</label>
                <select value={numberItemDisplay} name="display" id="number" 
                onChange={(e) => {
                    setNumberItemDisplay(e.target.value)
                    setActiveNumberGroup(1)                                 
                }}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <p>Affichage de {numberItemDisplay * (activeNumberGroup-1)} à {numberItemDisplay * activeNumberGroup} de {data.length} membres</p>
            <div className="row-number">
                <button 
                    className={activeNumberGroup == 1 || !getGroupeNumber()? "non-valaible-btn": ""}
                    onClick={decreaseActiveNumber}>&lt;</button>
                {Array.from({length: getGroupeNumber()}, (_, i) => (                    
                    <button 
                        key={i+1}
                        onClick={() => setActiveNumberGroup(i+1)} 
                        className={activeNumberGroup == i+1 ? "active": ""}>
                            {i+1}</button>
                ))}
                <button 
                    className={activeNumberGroup == getGroupeNumber() || !getGroupeNumber() ? "non-valaible-btn": ""}
                    onClick={increaseActiveNumber}>&gt;</button>
            </div>
        </div>
    )
}

export default Bottom