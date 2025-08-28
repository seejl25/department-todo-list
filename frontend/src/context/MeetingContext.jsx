import { useReducer } from "react";
import { meetingReducer } from "./MeetingReducer";
import { MeetingContext } from "./CreateMeetingContext";


export const MeetingContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(meetingReducer, {
        meetings: null,
        minutes: null
    })

    return (
    <MeetingContext.Provider value={{...state, dispatch}}>
        {children}
    </MeetingContext.Provider>
    )
}