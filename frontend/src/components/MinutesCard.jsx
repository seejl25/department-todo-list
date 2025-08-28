import { useMeetingContext } from '../hooks/useMeetingContext'
import { useState } from 'react'

// icons
import delIcon from '../assets/delete.svg'
import cancelIcon from '../assets/cancel.svg'

const MinutesCard = ({ minutes }) => {
    const { dispatch } = useMeetingContext()
    const [expandMinutes, setExpandMinutes] = useState(false)

    const handleClick = () => {
        setExpandMinutes(!expandMinutes)
    }

    const delClick = async () => {
        const response = await fetch('/api/minutes/' + minutes._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_MINUTES', payload: json})
        }
    }

    return (
        <>
            {!expandMinutes && 
            <div className='single'>
                <button onClick={delClick}><img src={delIcon} alt="" /></button>
                <p onClick={handleClick} id='minutes-title'>{minutes.title}</p>
                <div className="other-info" >
                    <p>Written by: {minutes.writer}</p>
                    <p>{minutes.date}</p>
                </div>
            </div>
            }
            
            {expandMinutes && 
            <div className='single'>
                <button onClick={handleClick}><img src={cancelIcon} alt="" /></button>
                <h2>Minutes Details</h2>
                <p id='minutes-title'>{minutes.title}</p>
                <div className="other-info">
                    <span>{minutes.writer}</span>
                    <div className="date-time">
                        <span>{minutes.date}, </span>
                        <span>{minutes.time}</span>
                    </div>
                </div>
                <h4>Notes:</h4>
                <ul>
                    {minutes.notes
                        .split("\n")
                        .filter((line) => line.trim() !== "")
                        .map((line, idx) => (
                            <li key={idx}>{line}</li>
                        ))
                    }
                </ul>
            </div>
            }
        </>
    )
}

export default MinutesCard