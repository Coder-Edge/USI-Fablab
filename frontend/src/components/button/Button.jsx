import "./Button.css"

const Button  = ({className, value, onClick, child, type}) => {

    return (
        <button className={`button ${className}`} 
            style={{ whiteSpace: "nowrap" }}
            onClick={onClick}
            value={value}
            type={type}> 
                {child}
        </button>
    )
}

export default Button
