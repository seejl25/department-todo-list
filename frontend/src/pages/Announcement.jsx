import { useEffect, useState } from "react"
import { useAnnouncementContext } from "../hooks/useAnnouncementContext"
import { useAuthContext } from "../hooks/useAuthContext"
import AnnouncementCard from "../components/AnnouncementCard"
import AnnouncementForm from "../components/AnnouncementForm"

const Announcement = () => {
    const {announcements, dispatch} = useAnnouncementContext()
    const {user} = useAuthContext()
    const [filteredDate, setFilteredDate] = useState("")

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const response = await fetch('/api/announcement', {
                headers: {
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ANNOUNCEMENT', payload: json})
            }
        }

        if (user) {
            fetchAnnouncements()
        }
    }, [dispatch, user])

    return (
        <div className="announcement-container">
            <div className="announcement-card">
                <div className="date-filter">
                    <label>Filter: </label>
                    <input 
                        type="date" 
                        value={filteredDate}
                        onChange={e => setFilteredDate(e.target.value)}
                    />
                </div>
                <div>
                    {announcements && (
                        filteredDate === "" ?
                        announcements.map((each) => (
                            <AnnouncementCard key={each._id} announcements={each} />
                        )) :
                        announcements.filter((a) => a.createdAt.slice(0, 10) === filteredDate)
                        .map((each) => (
                            <AnnouncementCard key={each._id} announcements={each} />
                        ))
                    )}
                </div>
            </div>
            <AnnouncementForm />
        </div>
    )
}

export default Announcement