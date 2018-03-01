const generateMessage = (from,text) => {
  return {
    from,
    text,
    created:new Date().toLocaleTimeString()}
}

const generateLocationMessage = (from,latitude,longitude) => {
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    created:new Date().toLocaleTimeString()
  }
}

module.exports = { generateMessage,generateLocationMessage }
