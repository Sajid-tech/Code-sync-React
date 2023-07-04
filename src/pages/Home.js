import React from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useState } from 'react'

const Home = () => {
    const [roomId, setRoomId] = useState('')

    const [username, setUsername] = useState('')

    const handleRoomClick = (e) => {
        setRoomId(e.target.value)
    }

    const handleUserClick = (e) => {
        setUsername(e.target.value)
    }

    const createNewRoom = (e) => {
        e.preventDefault()
        const id = uuidV4();
        setRoomId(id)

    }
    return (
        <div className='homePageWrapper'>
            <div className="formWrapper">
                <img className='homePageLogo' src="/code-sync.png" alt="code-sync-logo" />
                <h4 className='mainLabel'>Paste Invitation ROOM ID</h4>
                <div className="inputGroup">
                    <input value={roomId} onChange={handleRoomClick} type="text" className='inputBox' placeholder='ROOM ID' />
                    <input value={username} onChange={handleUserClick} type="text" className='inputBox' placeholder='USERNAME' />
                    <button className="btn joinBtn">Join</button>
                    <span className='createInfo'>
                        If you don't have an invite then create &nbsp;
                        <a onClick={createNewRoom} href="" className='createNewBtn'>new room</a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>Built with 💛 by <a target='blank' href="https://www.linkedin.com/in/sajidhussain7/">Sajid Hussain</a></h4>
            </footer>
        </div>
    )
}

export default Home