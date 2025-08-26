const Header = ({ path }) => {
    
    return (
        <header>
            <h1>Department {path}</h1>
            <div className="profile">
                <h2>Welcome, user</h2>
            </div>
        </header>
    )
}

export default Header