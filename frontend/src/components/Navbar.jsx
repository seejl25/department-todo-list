import { NavLink } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

// icons
import dashboardIcon from "../assets/dashboard.svg"
import meetingIcon from "../assets/meeting.svg"
import announcementIcon from '../assets/announcement.svg'

const Navbar = () => {
    const { logout } = useLogout()
    const {user } = useAuthContext()

    const handleClick = () => {
        logout()
    }
    
    return (
        <nav>
            {!user && (
                <div className="auth">
                    <NavLink to="/login" className={({isActive}) => isActive ? "active-auth" : ""}>
                        Login
                    </NavLink>
                    <NavLink to="/signup" className={({isActive}) => isActive ? "active-auth" : ""}>
                        Signup
                    </NavLink>
                </div>
            )}
            {user && (
                <div>
                    <button onClick={handleClick}>Log out</button>
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
                </div>        
            )}
        </nav>
    )
}

export default Navbar