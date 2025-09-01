// icons
import delIcon from "../assets/delete.svg"
import cancelIcon from "../assets/cancel.svg"

import { useState } from "react"
import { useTodoContext } from "../hooks/useTodoContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TodoCard = ({ todo }) => {
    const { dispatch } = useTodoContext()
    const {user} = useAuthContext()
    const [expandTask, setExpandTask] = useState(false)
    const [status, setStatus] = useState("pending")
    const [completedCount, setCompletedCount] = useState(0)
    const handleClick = () => {
        setExpandTask(!expandTask)
    }   

    const delClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('https://clarityboard.onrender.com/api/todo/' + todo._id, {
            method: 'DELETE',
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }

    return (
        <div>
            {!expandTask && 
            <div className={status === "completed" ? "completed" : (status === "inProgress" ? "in-progress" : "pending")}>
                <div className={todo.priority ? "priority" : ""}>
        
                </div>
                <div className="options">
                    <div className="progress">
                        <select 
                            name="status" 
                            id="status" 
                            value={status} 
                            onChange={(e) => {
                                setStatus(e.target.value)
                                setCompletedCount(completedCount + 1)
                            }}
                        >
                            <option value="pending">Pending</option>
                            <option value="inProgress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="complete">
                        <button><img src={delIcon} alt="" onClick={delClick}/></button>
                    </div>
                </div>
                <h4 
                    onClick={handleClick} 
                    style={status === "completed" ? 
                        {textDecoration: "line-through 2px", color: 'rgba(0,0,0,0.3)'} : 
                        {textDecoration: "underline 2px"}}
                    
                >{todo.title}
                </h4>
                <p>{todo.username}</p>            
            </div>
            }
            {expandTask && (
                <div className={status === "completed" ? "large-completed" : (status === "inProgress" ? "large-in-progress" : "large-pending")}>
                    <div className={todo.priority ? "priority" : ""}>
        
                    </div>
                    <button onClick={handleClick}><img src={cancelIcon} alt="" /></button>
                    <h2>Task Details</h2>
                    <h3>{todo.title}</h3>
                    <div className="info">
                        <p>{todo.username}</p>
                        <p>To be done: {todo.due}</p>
                    </div>
                    <h4>Description:</h4>
                    <p>{todo.description}</p>
                </div>
            )}
        </div>
        
    )
}

export default TodoCard