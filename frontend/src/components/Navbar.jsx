import { NavLink } from "react-router-dom"

// icons
import dashboardIcon from "../assets/dashboard.svg"
import meetingIcon from "../assets/meeting.svg"
import announcementIcon from '../assets/announcement.svg'

const Navbar = () => {
    
    return (
        <nav>
            <div className="dashboard">
                <img src={dashboardIcon} alt="" />
                <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
                    <h2>Dashboard</h2>
                </NavLink>
            </div>
            <div className="meeting-nav">
                <img src={meetingIcon} alt="" />
                <NavLink to="/meeting" className={({isActive}) => isActive ? "active" : ""}>
                    <h2>Meetings</h2>
                </NavLink>
            </div>
            <div className="announcement-nav">
                <img src={announcementIcon} alt="" />
                <NavLink to="/announcement" className={({isActive}) => isActive ? "active" : ""}>
                    <h2>Announcements</h2>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar