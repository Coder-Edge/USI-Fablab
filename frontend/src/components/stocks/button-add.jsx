
import Button from "../button/Button"

const ButtonAdd = ({child, type, onClick, className}) => {
    return(
        <div className={`button-add ${className}`}>
            <Button
            child={child}
            className={"active"} 
            type={type}
            onClick={onClick}/>
        </div>
    )
}

export default ButtonAdd