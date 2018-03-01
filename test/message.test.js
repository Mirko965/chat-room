const request = require('supertest');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generate message',async () => {
  test('should be generate message', async () => {
    const from = 'Tica';
    const text = 'Some text'
    const message = await generateMessage(from,text)
    expect(message).toMatchObject({
      from,
      text,
      created:new Date().toLocaleTimeString()
    })
    expect(message.from).toBe(from)
    expect(message.text).toBe(text)
    expect(message.created).toBe(new Date().toLocaleTimeString())
  })
})
describe('generate location message', async () => {
  test('should be generate location message', async () => {
    const from = 'Admin'
    const latitude = 1
    const longitude = 1
    const locationMessage = generateLocationMessage(from,latitude,longitude)
    expect(locationMessage).toMatchObject({
      from,
      url : `https://www.google.com/maps?q=${latitude},${longitude}`,
      created:new Date().toLocaleTimeString()
    })
  })
})
