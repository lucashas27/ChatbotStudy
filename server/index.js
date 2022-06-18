const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET, POST"],

  }
})

//eventos do socket.io
io.on('connection', (socket) => {

  socket.on("join_room", (data) => {
    socket.join(data)
    socket.to(data.room).emit("receive_connect_message", data)
  }) 

  console.log(`user connected: ${socket.id}`)

// recebe a mensagem EMIT do frontend
// emite um alerta para um room especifico
// pega a mensagem emitida do front e manda um alerta 
// do tipo receive_message para o front
  socket.on('send_message', (data) => { 
    socket.to(data.room).emit("receive_message", data)
    console.log(data)
  })
})

server.listen(3001, () => {
  console.log('backend server running')
})