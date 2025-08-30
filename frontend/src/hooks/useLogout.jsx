import { useAuthContext } from "./useAuthContext"
// import { useTodoContext } from "./useTodoContext"


export const useLogout = () => {
    const {dispatch} = useAuthContext()
    // const {dispatch: todoDispatch} = useTodoContext()


    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type:'LOGOUT'})
        // todoDispatch({type: 'SET_TODO', payload: null})
    }

    return {logout}
}