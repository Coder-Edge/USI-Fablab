
import Button from "../button/Button";

const ToolBox = ({firstbutton, types, btnActive, SetTypeFilter}) => {

    return(
        <div className="toolbar">
            {firstbutton}
            <Button 
                className={btnActive == "" ? "active" : ""} 
                child={"Tous"}
                onClick={() => {
                    SetTypeFilter("")}}
            />
            {types.map((productType, index) => (                    
                <Button key={index}
                    className={btnActive == productType.toLowerCase() ? "active" : ""}
                    value={productType.toLowerCase()}
                    onClick={() => {
                        SetTypeFilter(productType.toLowerCase())
                    }}
                    child={productType.toLowerCase()}>
                </Button>
            ))}
        </div>
    )
}

export default ToolBox