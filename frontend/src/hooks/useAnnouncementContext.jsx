import { useContext } from "react"
import { AnnouncementContext } from "../context/CreateAnnouncementContext"

export const useAnnouncementContext = () => {
    const context = useContext(AnnouncementContext)

    if (!context) {
        throw Error('useAnnouncementContext must be used inside an AnnouncementContextProvider')
    }

    return context
}