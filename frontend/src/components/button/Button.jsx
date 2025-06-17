import "./Button.css"

const Button  = ({className, value, onClick, child, type, btnRef}) => {

    return (
        <button className={`button ${className}`} 
            style={{ whiteSpace: "nowrap" }}
            onClick={onClick}
            value={value}
            type={type}
            ref={btnRef}> 
                {child}
        </button>
    )
}

export default Button
