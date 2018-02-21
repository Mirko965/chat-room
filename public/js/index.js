let socket = io()
socket.on('connect', function() {
  console.log('Welcome to chat room')

});

socket.on('disconnect', function() {
  console.log('Disconnected from server')
});

socket.on('newMessage',function (message) {
  console.log(message)

})
