import React, { useState } from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'


const EditorPage = () => {
    const [clients, setClients] = useState([
        { socketId: 1, username: 'sajid k' },
        { socketId: 2, username: 'majid k' },
        { socketId: 3, username: 'wajid k' },

    ])
    return (
        <div className='mainWrap'>
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img className='logoImage' src="/code-sync.png" alt="code-sync logo" />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">{
                        clients.map((client) => (<Client key={client.socketId} username={client.username} />))
                    }</div>

                </div>
                <button className='btn copyBtn' >Copy ROOM ID</button>
                <button className='btn leaveBtn'>Leave</button>
            </div>
            <div className="editorWrap">
                <Editor />
            </div>
        </div>
    )
}

export default EditorPage