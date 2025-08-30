import { useState } from "react"
import { useMeetingContext } from "../hooks/useMeetingContext"
import { useAuthContext } from "../hooks/useAuthContext"

import cancelIcon from '../assets/cancel.svg'

const MeetingForm = ({ onClose }) => {
    const { dispatch } = useMeetingContext()
    const {user} = useAuthContext()
    const [title, setTitle] = useState("")
    const [organiser, setOrganiser] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [duration, setDuration] = useState(0)
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const meeting = { title, organiser, date, time, duration, location, description}

        const response = await fetch('/api/meeting', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyField(json.emptyField)
        }

        if (response.ok) {
            setTitle("")
            setOrganiser("")
            setDate("")
            setTime("")
            setDuration(0)
            setLocation("")
            setDescription("")
            setError(null)
            setEmptyField([])
            console.log('new meeting added', json)
            dispatch({type: 'CREATE_MEETING', payload: json})
            onClose()
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <button id="cancel" onClick={() => onClose()}><img src={cancelIcon} alt="" /></button>
            <h3>Add New Meeting</h3>

            <label>Meeting title</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyField.includes('title') ? 'error' : ''}
            />

            <label>Organiser</label>
            <input 
                type="text" 
                onChange={(e) => setOrganiser(e.target.value)}
                value={organiser}
                className={emptyField.includes('organiser') ? 'error' : ''}
            />

            <label>Date</label>
            <input 
                type="date" 
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className={emptyField.includes('date') ? 'error' : ''}
            />

            <label>Time</label>
            <input 
                type="time" 
                onChange={(e) => setTime(e.target.value)}
                value={time}
                className={emptyField.includes('time') ? 'error' : ''}
            />

            <label>Duration</label>
            <input 
                type="number" 
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
                className={emptyField.includes('duration') ? 'error' : ''}
            />

            <label>Location</label>
            <input 
                type="text" 
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className={emptyField.includes('location') ? 'error' : ''}
            />

            <label>Description</label>
            <textarea 
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />

            <button>Add Meeting</button>
            {error && <div className="error">{error}</div>}
            
        </form>
    )
}

export default MeetingForm