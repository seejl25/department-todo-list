import { Link } from "react-router-dom"

// icons
import dashboardIcon from "../assets/dashboard.svg"
import meetingIcon from "../assets/meeting.svg"

const Navbar = () => {
    
    return (
        <nav>
            <div className="dashboard">
                <img src={dashboardIcon} alt="" />
                <Link to="/">
                    <h2>Dashboard</h2>
                </Link>
            </div>
            <div className="meeting-nav">
                <img src={meetingIcon} alt="" />
                <Link to="/meeting">
                    <h2>Meetings</h2>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar