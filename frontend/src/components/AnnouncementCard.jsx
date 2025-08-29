import { useAnnouncementContext } from "../hooks/useAnnouncementContext"

import delIcon from '../assets/delete.svg'
import avatarIcon from '../assets/avatar.svg'
import cancelIcon from '../assets/cancel.svg'
import { useState } from "react"

const AnnouncementCard = ({ announcements }) => {
    const { dispatch } = useAnnouncementContext()
    const [expandAnnouncement, setExpandAnnouncement] = useState(false)

    const delClick = async () => {
        const response = await fetch('/api/announcement/' + announcements._id, {
            method: 'DELETE'
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
                <img src={avatarIcon} alt="" id="avatar"/>
                <h3 onClick={expandClick}>{announcements.title}</h3>
                <div className="line">
                    <p id="a-text">{announcements.description}</p>
                    <p>{announcements.createdAt.slice(0,10)}</p>
                </div>
            </div>
            }
            {expandAnnouncement && 
                <div className="single-a">
                    <button onClick={expandClick}><img src={cancelIcon} alt="" /></button>
                    <img src={avatarIcon} alt="" id="avatar"/>
                    <p id="user">User</p>
                    <p id="date">{announcements.createdAt.slice(0, 10)}</p>
                    <h4>{announcements.title}</h4>
                    <p id="description">{announcements.description}</p>
                </div>
            }
        </>
    )
}

export default AnnouncementCard