import { useMeetingContext } from '../hooks/useMeetingContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

// icons
import delIcon from '../assets/delete.svg'
import cancelIcon from '../assets/cancel.svg'

const MeetingCard = ({ meeting }) => {
    const { dispatch } = useMeetingContext()
    const {user} = useAuthContext()
    const [expandMeeting, setExpandMeeting] = useState(false)

    const handleClick = () => {
        setExpandMeeting(!expandMeeting)
    }

    const delClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/meeting/' + meeting._id, {
            method: 'DELETE',
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_MEETING', payload: json})
        }
    }

    return (
        <>
            {!expandMeeting && 
            <div className='single'>
                <button onClick={delClick}><img src={delIcon} alt="" /></button>
                <div className="date-time" onClick={handleClick}>
                    <h3>{meeting.date}, </h3>
                    <h3>{meeting.time}</h3>
                </div>
                <p>{meeting.title}</p>
            </div>
            }
            
            {expandMeeting && 
            <div className='single'>
                <button onClick={handleClick}><img src={cancelIcon} alt="" /></button>
                <h2>Meeting Details</h2>
                <span>{meeting.date}, </span>
                <span>{meeting.time}</span>
                <p>Duration: {meeting.duration} hours</p>
                <h3>{meeting.title}</h3>
                <p>Organised by: {meeting.organiser}</p>
                <h4>Location:</h4>
                <p>{meeting.location}</p>
                <h4>Description:</h4>
                <p>{meeting.description}</p>
            </div>
            }
        </>
    )
}

export default MeetingCard