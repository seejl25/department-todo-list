// icons
import checkIcon from "../assets/check.svg"
import delIcon from "../assets/delete.svg"
import cancelIcon from "../assets/cancel.svg"
import { useState } from "react"
import { useTodoContext } from "../hooks/useTodoContext"

const TodoCard = ({ todo }) => {
    const { dispatch } = useTodoContext()
    const [expandTask, setExpandTask] = useState(false)
    const [checkClicked, setCheckClicked] = useState(false)

    const handleClick = () => {
        setExpandTask(!expandTask)
    }   

    const delClick = async () => {
        const response = await fetch('/api/todo/' + todo._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }

    const checkClick = () => {
        setCheckClicked(!checkClicked)
    }

    return (
        <div>
            {!expandTask && 
            <div className={todo.priority ? "priority" : "normal"}>
                <div className="options">
                    <div className="progress">
                        <label>In progress</label>
                        <input type="checkbox" />
                    </div>
                    <div className="complete">
                        <button><img src={checkIcon} alt="" onClick={checkClick}/></button>
                        <button><img src={delIcon} alt="" onClick={delClick}/></button>
                    </div>
                </div>
                <h4 
                    onClick={handleClick} 
                    style={checkClicked ? 
                        {textDecoration: "line-through 2px", color: 'rgba(0,0,0,0.3)'} : 
                        {textDecoration: "underline 2px"}}
                    
                >{todo.title}
                </h4>
                <p>{todo.username}</p>            
            </div>
            }
            {expandTask && (
                <div className={todo.priority ? "large-priority" : "large-normal"}>
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