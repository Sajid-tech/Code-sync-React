const express = require('express')
const app = express()

const http = require('http')
const { Server } = require('socket.io')
const ACTIONS = require('./src/Action')

const server = http.createServer(app)

const io = new Server(server)


const userSocketMap = {};
function getAllConnectedClients(roomId) {
    //Map,return array and do map on the array
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        // on each itteration we will get socketId
        (socketId) => {
            return {
                //on on which maping on each itteration ,return object and gave socketId and username and finally we get list
                socketId,
                username: userSocketMap[socketId],
            }
        });
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id)


    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        //we have to stored the roomId and username in server
        userSocketMap[socket.id] = username
        socket.join(roomId)
        const clients = getAllConnectedClients(roomId)
        clients.forEach(({ socketId }) => {
            //for notify every user
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            })
        })
    })


    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    })


    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    })

    // for disconnecting
    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms]
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            })
        })
        delete userSocketMap[socket.id]
        socket.leave()
    })

});





const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Listening on port ${PORT}`))