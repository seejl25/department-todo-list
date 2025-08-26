import { useEffect, useState } from "react"
import { useMeetingContext } from "../hooks/useMeetingContext"
import MeetingCard from "../components/MeetingCard"
import MeetingForm from "../components/MeetingForm"

// icons
import addIcon from '../assets/add.svg'

const Meeting = () => {
    const {meetings, dispatch} = useMeetingContext()
    const [showForm, setShowForm] = useState(false)
    
    const addClick = () => {
        setShowForm(!showForm)
    }

    useEffect(() => {
        const fetchMeeting = async () => {
            const response = await fetch('/api/meeting')
            const json = await response.json()

            if (response.ok) {
                dispatch({type:'SET_MEETING', payload:json})
            }
        }

        fetchMeeting()
    }, [dispatch])

    return (
        <div className="container">
            {!showForm && 
            <div className="meetings">
                <div className="meeting-header">
                    <h3>All Meetings</h3>
                    <button onClick={addClick}><img src={addIcon} alt="" /></button>
                </div>
                <div className="meeting-card">
                    {meetings && meetings
                        .filter((meeting) => meeting.date >= new Date().toISOString().slice(0,10))
                        .map((each) => (
                            <MeetingCard key={each._id} meeting={each} />
                        ))}
                </div>    
            </div>
            }
            {showForm && <MeetingForm onClose={() => setShowForm(!showForm)} />}
        </div>
    )
}

export default Meeting