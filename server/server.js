const express = require('express');
const path = require('path');
const http = require('http')
const socketIo = require('socket.io')

const port = process.env.PORT || 3333
const app = express();
const server = http.createServer(app);
const io = socketIo(server)

app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine','html')

io.on('connection', (socket) => {
  console.log('Connected to server');

  socket.emit('newMessage',{
    from:'Admin',
    text:'Welcome to chat room'
  })

  socket.broadcast.emit('newMessage',{
    from:'Admin',
    text:'New User connected',
    created: new Date().toLocaleTimeString()
  })

  socket.on('CreateMessage', (msg) => {
    console.log('CreateMessage:',msg)

    socket.on('newMessage',{
      from:msg.from,
      text: msg.text,
      created: new Date().toLocaleTimeString()
    })

  })

  socket.on('disconnect', () => {
    console.log('New user disconnected')
  });
})


server.listen(port,() => {
  console.log(`Server listen on port ${port}`)
} )
