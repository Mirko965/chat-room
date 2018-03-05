let socket = io()

socket.on('connect', function() {
  console.log('Connected to  server')
});
socket.on('disconnect', function() {
  console.log('Disconnected from server')
});

socket.on('newMessage', function (msg) {
  let momentTime = moment().format('h:mm a')
  let source = document.getElementById('message-template').innerHTML
  let template = Handlebars.compile(source)

  let context = {
    text:msg.text,
    from:msg.from,
    create:momentTime
  }
  let html = template(context)
  document.querySelector('#messages').insertAdjacentHTML('beforeend',html)

})

socket.on('newLocationMessage',function (message) {

  let momentTime = moment().format('h:mm a')
  let source = document.getElementById('newLocationMessage-template').innerHTML
  let template = Handlebars.compile(source)

  let context = {
    from: message.from,
    url:message.url,
    create: momentTime
  }
  let html = template(context)
  document.querySelector('#messages').insertAdjacentHTML('beforeend',html)

})




let myNode = document.getElementById('messageForm');

myNode.addEventListener('submit',async function (event) {
  event.preventDefault();
  let text = document.messageForm.message.value

  let emit = socket.emit('createMessage',{
    from: 'User',
    text
  },function () {
    text = ''
  })
  await emit
  await myNode.reset()
})

let locationButton = document.getElementById('sendLocation');

locationButton.addEventListener('click', function () {
  if (!navigator.geolocation){
    return alert('Geolocation not supported on your browser')
  }
  locationButton.disabled = 'disabled';
  locationButton.textContent = 'Sending....'

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.disabled = ''
    locationButton.textContent = 'Send Location'

    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('Unable fetch location')
    locationButton.disabled = ''
    locationButton.textContent = 'Send Location'
  })
})



