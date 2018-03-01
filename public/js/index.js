let socket = io()

socket.on('connect', function() {
  console.log('Connected to  server')
});
socket.on('disconnect', function() {
  console.log('Disconnected from server')
});

socket.on('newMessage', function (msg) {
  console.log('message:',msg)
  let list = document.createElement('LI');
  let text = document.createTextNode(`${msg.from}: ${msg.text}`);
  list.appendChild(text)
  document.getElementById('messages').appendChild(list)
})

socket.on('newLocationMessage',function (message) {
  let li = document.createElement('LI');
  let a = document.createElement('A');
  li.textContent = `${message.from}: `;
  a.href = message.url;
  a.target = '_blank'
  a.text = 'My Location'
  li.appendChild(a)
  document.getElementById('messages').appendChild(li)

})




let myNode = document.getElementById('messageForm');

myNode.addEventListener('submit',async function (event) {
  event.preventDefault();
  const text = document.messageForm.message.value

  let emit =  socket.emit('createMessage',{
    from: 'User',
    text
  },function () {

  })
  let reset = myNode.reset()
  await emit
  await reset
})

let locationButton = document.getElementById('sendLocation');
locationButton.addEventListener('click', function () {
  if (!navigator.geolocation){
    return alert('Geolocation not supported on your browser')
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('Unable fetch location')
  })
})



