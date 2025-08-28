export const announcementReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ANNOUNCEMENT':
            return {
                announcements: action.payload
            }
        case 'CREATE_ANNOUNCEMENT':
            return {
                announcements: [action.payload, ...state.announcements]
            }
        case 'DELETE_ANNOUNCEMENT':
            return {
                announcements: state.announcements.filter((a) => a._id !== action.payload._id)
            }
        default:
            return state
    }
}