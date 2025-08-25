import { useReducer } from "react";
import { todoReducer } from "./TodoReducer";
import { TodoContext } from "./CreateContext";

export const TodoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, {
        todos: null
    })

    return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
        { children }
    </TodoContext.Provider>
    )
}

