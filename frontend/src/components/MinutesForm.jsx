import { useState } from "react"
import { useMeetingContext } from "../hooks/useMeetingContext"
import { useAuthContext } from "../hooks/useAuthContext"

import cancelIcon from '../assets/cancel.svg'

const MinutesForm = ({ onClose }) => {
    const { dispatch } = useMeetingContext()
    const {user} = useAuthContext()
    const [title, setTitle] = useState("")
    const [writer, setWriter] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [notes, setNotes] = useState("")
    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const minutes = { title, writer, date, time, notes}

        const response = await fetch('/api/minutes', {
            method: 'POST',
            body: JSON.stringify(minutes),
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
            setWriter("")
            setDate("")
            setTime("")
            setNotes("")
            setError(null)
            setEmptyField([])
            console.log('new minutes added', json)
            dispatch({type: 'CREATE_MINUTES', payload: json})
            onClose()
        }
    }

    return (
        <form className="create-minutes" onSubmit={handleSubmit}>
            <button id="cancel" onClick={() => onClose()}><img src={cancelIcon} alt="" /></button>
            <h3>Add New Minutes</h3>

            <label>Minutes title</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyField.includes('title') ? 'error' : ''}
            />

            <label>Writer</label>
            <input 
                type="text" 
                onChange={(e) => setWriter(e.target.value)}
                value={writer}
                className={emptyField.includes('writer') ? 'error' : ''}
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

            <label>Notes</label>
            <textarea 
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
            />

            <button>Add Minutes</button>
            {error && <div className="error">{error}</div>}
            
        </form>
    )
}

export default MinutesForm