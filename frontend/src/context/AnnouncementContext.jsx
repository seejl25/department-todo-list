import { useReducer } from "react"
import { AnnouncementContext } from "./CreateAnnouncementContext"
import { announcementReducer } from "./AnnouncementReducer"

export const AnnouncementContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(announcementReducer, {
        announcements: null
    })

    return (
        <AnnouncementContext.Provider value={{...state, dispatch}}>
            { children }
        </AnnouncementContext.Provider>
    )
}