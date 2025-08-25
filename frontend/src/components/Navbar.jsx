import { Link } from "react-router-dom"

// icons
import dashboardIcon from "../assets/dashboard.svg"

const Navbar = () => {
    return (
        <nav>
            <div className="dashboard">
                <img src={dashboardIcon} alt="" />
                <Link to="/">
                    <h2>Dashboard</h2>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar