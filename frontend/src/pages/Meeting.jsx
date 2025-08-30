import { useEffect, useState } from "react"
import { useMeetingContext } from "../hooks/useMeetingContext"
import { useAuthContext } from "../hooks/useAuthContext"
import MeetingCard from "../components/MeetingCard"
import MeetingForm from "../components/MeetingForm"
import MinutesCard from "../components/MinutesCard"
import MinutesForm from "../components/MinutesForm"

// icons
import addIcon from '../assets/add.svg'

const Meeting = () => {
    const {meetings, minutes, dispatch} = useMeetingContext()
    const {user} = useAuthContext()
    const [showForm, setShowForm] = useState(false)
    const [showMinForm, setShowMinForm] = useState(false)
    const [filterDate, setFilterDate] = useState("")
    
    const addClick = () => {
        setShowForm(!showForm)
    }

    const addMinClick = () => {
        setShowMinForm(!showMinForm)
    }

    useEffect(() => {
        const fetchMeeting = async () => {
            const response = await fetch('/api/meeting', {
                headers: {
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type:'SET_MEETING', payload:json})
            }
        }

        const fetchMinutes = async () => {
            const response = await fetch('/api/minutes', {
                headers: {
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type:'SET_MINUTES',payload:json})
            }
        }

        if (user) {
            fetchMeeting()
            fetchMinutes()
        }

    }, [dispatch, user])

    return (
        <div className="meetings-container">
            {!showMinForm &&
            <div className="minutes">
                <div className="minutes-header">
                    <h3>All Minutes</h3>
                    <div className="filter">
                        <label>Filter: </label>
                        <input 
                            type="date" 
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                        <button onClick={addMinClick}><img src={addIcon} alt="" /></button>
                    </div>
                </div>
                <div className="minutes-card">
                    {minutes && 
                        (filterDate === "" ? 
                        minutes
                        .map((each) => (
                            <MinutesCard key={each._id} minutes={each} />
                        )) :
                        minutes
                        .filter((m) => m.date === filterDate)
                        .map((each) => (
                            <MinutesCard key={each._id} minutes={each} />
                        )))
                    }
                </div>
            </div>
            }
            {showMinForm && <MinutesForm onClose={() => setShowMinForm(!showMinForm)} />}
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