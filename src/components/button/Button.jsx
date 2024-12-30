import "./Button.css"

const Button  = ({className, value, onClick, child}) => {

    return (
        <button className={`button ${className}`} 
            style={{ whiteSpace: "nowrap" }}
            onClick={onClick}
            value={value}> 
                {child}
        </button>
    )
}

export default Button
