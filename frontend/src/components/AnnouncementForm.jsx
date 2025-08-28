import { useState } from "react"
import { useAnnouncementContext } from "../hooks/useAnnouncementContext"

const AnnouncementForm = () => {
    const { dispatch } = useAnnouncementContext()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const announcement = {title, description}

        const response = await fetch('/api/announcement', {
            method: 'POST',
            body: JSON.stringify(announcement),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyField(json.emptyField)
        }

        if (response.ok) {
            setTitle("")
            setDescription("")
            setError(null)
            setEmptyField([])
            dispatch({type: 'CREATE_ANNOUNCEMENT', payload: json})
            console.log("new announcement added", json)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New Announcement</h3>

            <label>Title</label>
            <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={emptyField.includes('title') ? 'error' : ''}
            />

            <label>Description</label>
            <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                className={emptyField.includes('description') ? 'error' : ''}
            />
            
            <button>Add Announcement</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AnnouncementForm