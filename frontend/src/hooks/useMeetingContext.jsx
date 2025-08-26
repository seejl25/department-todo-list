import { MeetingContext } from "../context/CreateMeetingContext";
import { useContext } from "react";

export const useMeetingContext = () => {
    const context = useContext(MeetingContext)

    if (!context) {
        throw Error('useMeetingContext must be used inside an MeetingContextProvider')
    }
    return context
}