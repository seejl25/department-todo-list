import { useState } from "react"
import { useTodoContext } from "../hooks/useTodoContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TodoForm = () => {
    const { dispatch } = useTodoContext()
    const { user } = useAuthContext()
    const [title, setTitle] = useState("")
    const [username, setUsername] = useState("")
    const [due, setDue] = useState("")
    const [priority, setPriority] = useState(false)
    const [description, setDecription] = useState("")
    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const todo = {title, username, due, priority, description}

        const response = await fetch('https://clarityboard.onrender.com/api/todo', {
            method: 'POST',
            body: JSON.stringify(todo),
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
            setUsername("")
            setDue("")
            setPriority(false)
            setDecription("")
            setError(null)
            setEmptyField([])
            console.log('new task added', json)
            dispatch({type: 'CREATE_TODO', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New Task</h3>

            <label>Task title</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyField.includes('title') ? 'error' : ''}
            />

            <label>Who</label>
            <input 
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className={emptyField.includes('who') ? 'error' : ''}
            />

            <div className="select">
                <label>To be done</label>
                <select
                    onChange={(e) => setDue(e.target.value)}
                    value={due}
                    className={emptyField.includes('due') ? 'error' : ''}>
                    <option value="">Select</option>
                    <option value="Today">Today</option>
                    <option value="This week">This Week</option>
                </select> 
            </div>
            

            <div className="select">
                <label>Priority</label>
                <input 
                    type="checkbox" 
                    onChange={(e) => setPriority(e.target.checked)}
                    checked={priority}
                />
            </div>
                

            <label>Description</label>
            <textarea 
                onChange={(e) => setDecription(e.target.value)}
                value={description}
            />

            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TodoForm