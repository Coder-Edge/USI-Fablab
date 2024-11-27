import Commands from "../commands/commands";
import "./dashboard.css"

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Inventaire</h1>
            <div className="grid-content">
                <Commands />
                <div className="right">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam voluptas quaerat sunt, suscipit veniam reprehenderit, ipsam error dolores magni id repudiandae. Consequatur corrupti dolor voluptas sapiente molestiae nemo amet? Quasi voluptatem placeat perspiciatis fuga eveniet iste ipsum similique ratione debitis rem? Nulla accusamus modi beatae vitae eveniet eum commodi maiores aperiam? Voluptate tempore facilis rerum. Ad nobis harum laborum magnam!
                </div>
                <div className="bottom">
                    lorem200
                </div>
            </div>
        </div>
    )
}

export default Dashboard;