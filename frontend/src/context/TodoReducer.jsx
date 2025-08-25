export const todoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODO':
            return {
                todos: action.payload
            }
        case 'CREATE_TODO':
            return {
                todos: [action.payload, ...state.todos]
            }
        case 'DELETE_TODO':
            return {
                todos: state.todos.filter((t) => t._id !== action.payload._id)
            }
        default:
            return state
    }
}