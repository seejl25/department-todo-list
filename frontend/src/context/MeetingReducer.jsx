export const meetingReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MEETING':
            return {
                meetings: action.payload
            }
        case 'CREATE_MEETING':
            return {
                meetings: [action.payload, ...state.meetings]
            }
        case 'DELETE_MEETING':
            return {
                meetings: state.meetings.filter((m) => m._id !== action.payload._id)
            }
        default:
            return state
    }
}