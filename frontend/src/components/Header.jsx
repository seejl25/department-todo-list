import { useEffect, useState } from "react"

import companyLogo from '../assets/company_logo.png'

const Header = ({ path }) => {
    const [user, setUser] = useState(null)

    const dept = {
        "ENG3918": "Engineering",
        "BIZ1210": "Business",
        "TECH8769": "IT",
        "OPS8656": "Operations",
        "FIN5208": "Finance"
    }
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))

        if (storedUser) {
            setUser(storedUser)
        }
    }, [])

    return (
        <header>
            <div className="company">
                <img src={companyLogo} alt="" />
                <h1><em>{user && dept[user.code]}</em> {path}</h1>
            </div>
            <div className="profile">
                <h2>{user ? `Welcome, ${user.email.split('@')[0]}` : "Guest"}</h2>
                <div className="avatar">
                    {user && user.email.split('@')[0][0].toUpperCase()}
                </div>
            </div>
        </header>
    )
}

export default Header