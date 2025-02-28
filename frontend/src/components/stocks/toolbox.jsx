
import Button from "../button/Button";

const ToolBox = ({firstbutton, types, btnActive, SetTypeFilter}) => {

    return(
        <div className="toolbar">
            {firstbutton}
            <Button
                type="button"
                className={btnActive == "" ? "active" : ""} 
                child={"Tous"}
                onClick={() => {
                    SetTypeFilter("")}}
            />
            {types.map((type, index) => (                    
                <Button key={index}
                    type="button"
                    className={btnActive == type.toLowerCase() ? "active" : ""}
                    value={type.toLowerCase()}
                    onClick={() => {
                        SetTypeFilter(type.toLowerCase())
                    }}
                    child={type.toLowerCase()}>
                </Button>
            ))}
        </div>
    )
}

export default ToolBox