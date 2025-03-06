import "./cards.css"

const SimpleCard = ({ title, rate, cost, icon }) => {
    return (
        <div className="card">
            <h4>{title}</h4>
            <p>{cost}</p>
            <div>
                <p>{rate}</p>
                <p>{icon}</p>
            </div>
        </div>
    )
}

export default SimpleCard