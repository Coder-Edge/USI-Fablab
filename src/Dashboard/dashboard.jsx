import Commands from "../commands/commands";
import Location from "../Location/location";
import Stocks from "../stocks/stocks";
import "./dashboard.css"

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Inventaire</h1>
            <div className="grid-content">
                <Commands />
                <Location />
                <Stocks />
            </div>
        </div>
    )
}

export default Dashboard;