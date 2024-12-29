
import { MdAddCircleOutline } from "react-icons/md";
import Button from "../button/Button";

const ToolBox = ({firstbutton, types, btnActive, setBtnActive, setType}) => {

    //set active data
    const activeBtn = (btn) => {
        setBtnActive(btn)
    }

    // set filter
    const setFilter = (e) => {       
        let value = e.target.value.toLowerCase()
        setType(value)
    }

    return(
        <div className="toolbar">
            {firstbutton}
            <Button 
                className={btnActive == "" ? "active" : ""} 
                child={"Tous"}
                onClick={(e) => {
                    setFilter(e)
                    activeBtn("")}}
            />
            {types.map((productType, index) => (                    
                <Button key={index}
                    className={btnActive == productType.toLowerCase() ? "active" : ""}
                    value={productType.toLowerCase()}
                    onClick={(e) => {
                        setFilter(e)
                        activeBtn(productType.toLowerCase())
                    }}
                    child={productType.toLowerCase()}>
                </Button>
            ))}
        </div>
    )
}

export default ToolBox