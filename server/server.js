const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)
const { generateMessage, generateLocationMessage } = require('../test/message')

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine','html')


io.on('connection', (socket) => {
  console.log('New user connected');


  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat room'))
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'))

  socket.on('createMessage',(message,callback) => {
    console.log('Create Message:' ,message)
    io.emit('newMessage',generateMessage(message.from,message.text))
    callback('from the server')
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude))
  })

  socket.on('disconnect',() => {
    console.log('New user disconnect')
  })
})


http.listen(port,() => {
  console.log(`Server listen on port ${port}`)
} )
