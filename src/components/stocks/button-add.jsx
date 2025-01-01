import { MdAddCircleOutline } from "react-icons/md";
import Button from "../button/Button"

const ButtonAdd = ({child, type, onClick}) => {
    return(
        <div className="button-add">
            <Button
            child={child}
            className={"active"} 
            type={type}
            onClick={onClick}/>
        </div>
    )
}

export default ButtonAdd