const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    //console.log('New WebSocket connection')
    socket.emit('consoleMsg', 'Welcome !')
    socket.broadcast.emit('consoleMsg', 'A new user has joined !')

    socket.on('sendMessage', (msg, callback) => {
        io.emit('newMessage', msg)
        callback()
    })
    socket.emit('welcomeMsg')
    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count++
    //     io.emit('countUpdated', count)
    // })

    socket.on('sendLocation', (coords, callback) => {
        socket.broadcast.emit('consoleMsg', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

    socket.emit('disconnect', () => {
        io.emit('consoleMsg', 'A user has left !')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})