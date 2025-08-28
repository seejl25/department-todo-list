export const meetingReducer = (state, action) => {
    
    switch (action.type) {
        case 'SET_MEETING':
            return {
                ...state,
                meetings: action.payload
            }
        case 'CREATE_MEETING':
            return {
                ...state,
                meetings: [action.payload, ...state.meetings]
            }
        case 'DELETE_MEETING':
            return {
                ...state,
                meetings: state.meetings.filter((m) => m._id !== action.payload._id)
            }
        case 'SET_MINUTES':
            return {
                ...state,
                minutes: action.payload
            }
        case 'CREATE_MINUTES':
            return {
                ...state,
                minutes: [action.payload, ...state.minutes]
            }
        case 'DELETE_MINUTES': 
            return {
                ...state,
                minutes: state.minutes.filter((min) => min._id !== action.payload._id)
            }
        default:
            return state
    }
}