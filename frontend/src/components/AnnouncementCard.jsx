import { useAnnouncementContext } from "../hooks/useAnnouncementContext"

import delIcon from '../assets/delete.svg'
import avatarIcon from '../assets/avatar.svg'

const AnnouncementCard = ({ announcements }) => {
    const { dispatch } = useAnnouncementContext()

    const delClick = async () => {
        const response = await fetch('/api/announcements', {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ANNOUNCEMENT', payload: json})
        }
    }

    return (
        <>
            <div className="single-a">
                <button onClick={delClick}><img src={delIcon} alt="" /></button>
                <img src={avatarIcon} alt="" id="avatar"/>
                <h3>{announcements.title}</h3>
                <div className="line">
                    <p id="a-text">{announcements.description}</p>
                    <p>{announcements.createdAt.slice(0,10)}</p>
                </div>
            </div>
        </>
    )
}

export default AnnouncementCard