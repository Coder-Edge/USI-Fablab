import { MdAddCircleOutline } from "react-icons/md";
import Button from "../button/Button"

const ButtonAdd = ({child}) => {
    return(
        <div className="button-add">
            <Button
            child={child}
            className={"active"} />
        </div>
    )
}

export default ButtonAdd