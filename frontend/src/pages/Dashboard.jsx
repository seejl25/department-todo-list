import { useEffect } from "react"
import { useTodoContext } from "../hooks/useTodoContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import TodoCard from "../components/TodoCard"
import TodoForm from "../components/TodoForm"

const Dashboard = () => {
    const {todos, dispatch} = useTodoContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchTodo = async () => {
            const response = await fetch('/api/todo', {
                headers: {
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type:'SET_TODO', payload:json})
            }
        }

        if (user) {
            fetchTodo()
        }

    }, [dispatch, user])

    return (
        <div className="container">
            <h2>Today</h2>
            <div className="tasks-today">
                {todos && todos
                .filter((todo) => todo.due === "Today")
                .map((each) => (
                    <TodoCard key={each._id} todo={each} />
                ))}
            </div>
            <h2>This week</h2>
            <div className="tasks-week">
                {todos && todos
                .filter((todo) => todo.due === "This week")
                .map((each) => (
                    <TodoCard key={each._id} todo={each} />
                ))}
            </div>
            <TodoForm />
        </div>
    )
}

export default Dashboard