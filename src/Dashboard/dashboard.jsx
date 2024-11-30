import Commands from "../commands/commands";
import Location from "../Location/location";
import "./dashboard.css"

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Inventaire</h1>
            <div className="grid-content">
                <Commands />
                <Location />
                <div className="bottom">
                    lorem200
                </div>
            </div>
        </div>
    )
}

export default Dashboard;