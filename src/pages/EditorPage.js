import React, { useEffect, useRef, useState } from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'
import { initSocket } from '../socket';
import ACTIONS from '../Action';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom';


const EditorPage = () => {
    const socketRef = useRef(null);
    const codeRef = useRef(null)
    let location = useLocation()
    let reactNavigator = useNavigate()
    const { roomId } = useParams()
    const [clients, setClients] = useState([])

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket()
            //if connect err comes than on that suitation call handleError(err)
            socketRef.current.on('connect_error', (err) => handleErrors(err))
            //if connect failed comes than on that suitation call handleError(err)
            socketRef.current.on('connect_failed', (err) => handleErrors(err))

            function handleErrors(e) {
                console.log('socket error', e)
                toast.error('Socket connection failed,try again later')
                reactNavigator('/')
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            //LISTENING FOR JOINED EVENT
            socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
                if (username !== Location.state?.username) {
                    toast.success(`${username} joined the room.`)
                    console.log(`${username} joined`)
                }
                setClients(clients)
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    code: codeRef.current,
                    socketId,
                })
            })



            //Listening for Discoonected

            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                toast.success(`${username} left the room.`)
                setClients((prev) => {
                    return prev.filter(client => client.socketId !== socketId)
                })
            })
        };
        init()
        //always clear the listerner
        return () => {
            if (socketRef.current) {

                socketRef.current.off(ACTIONS.JOINED)
                socketRef.current.off(ACTIONS.DISCONNECTED)
                socketRef.current.disconnect()
            }
        }
    }, [])


    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId)
            toast.success('Room Id has been copied to your clipboard')
        } catch (err) {
            toast.error('Could not copy room id')
            console.error(err)
        }
    }

    function leaveRoom() {
        reactNavigator('/')
    }


    if (!location.state) {
        return <Navigate to='/' />
    }

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
                <button className='btn copyBtn' onClick={copyRoomId}>Copy ROOM ID</button>
                <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>
            </div>
            <div className="editorWrap">
                <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => { codeRef.current = code }} />
            </div>
        </div>
    )
}

export default EditorPage