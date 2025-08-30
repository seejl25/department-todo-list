import { useEffect, useState } from "react"

const Header = ({ path }) => {
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))

        if (storedUser) {
            setUser(storedUser)
        }
    }, [])

    return (
        <header>
            <h1>Department {path}</h1>
            <div className="profile">
                <h2>{user ? `Welcome, ${user.email.split('@')[0]}` : "Guest"}</h2>
            </div>
        </header>
    )
}

export default Header