import { useAnnouncementContext } from "../hooks/useAnnouncementContext"
import { useAuthContext } from "../hooks/useAuthContext"

import delIcon from '../assets/delete.svg'
import cancelIcon from '../assets/cancel.svg'
import { useState } from "react"

const AnnouncementCard = ({ announcements }) => {
    const { dispatch } = useAnnouncementContext()
    const {user} = useAuthContext()
    const [expandAnnouncement, setExpandAnnouncement] = useState(false)

    const delClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('https://clarityboard.onrender.com/api/announcement/' + announcements._id, {
            method: 'DELETE',
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ANNOUNCEMENT', payload: json})
        }
    }

    const expandClick = () => {
        setExpandAnnouncement(!expandAnnouncement)
    }

    return (
        <>
            {!expandAnnouncement &&
            <div className="single-a">
                <button onClick={delClick}><img src={delIcon} alt="" /></button>
                <div className="content">
                    <div className="avatar">
                        {user.email.split('@')[0][0].toUpperCase()}
                    </div>
                    <div className="words">
                        <h3 onClick={expandClick}>{announcements.title}</h3>
                        <div className="line">
                            <p id="a-text">{announcements.description}</p>
                            <p>{announcements.createdAt.slice(0,10)}</p>
                        </div>
                    </div>
                </div>
            </div>
            }
            {expandAnnouncement && 
                <div className="single-a">
                    <button onClick={expandClick}><img src={cancelIcon} alt="" /></button>
                    <div className="content">
                        <div className="avatar">
                            {user.email.split('@')[0][0].toUpperCase()}
                        </div>
                        <div className="user">
                            <p id="user">{user.email.split('@')[0]}</p>
                            <p id="date">{announcements.createdAt.slice(0, 10)}</p>
                        </div>
                    </div>
                    <h4>{announcements.title}</h4>
                    <p id="description">{announcements.description}</p>
                </div>
            }
        </>
    )
}

export default AnnouncementCard