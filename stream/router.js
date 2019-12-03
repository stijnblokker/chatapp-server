const { Router } = require('express')
const Messages = require('./model')
const Sse = require('json-sse')

const router = new Router()
const stream = new Sse()

router.get('/stream', async (req, res) => {
    console.log('got a request on /stream')
    const messages = await Messages.findAll()
    const data = JSON.stringify(messages)
    console.log('stringified messages in db:', data);
    stream.updateInit(data)
    stream.init(req, res)
})

router.post('/message', async (req, res) => {
    console.log('got a request on /message: ', req.body)
    const { message, username } = req.body
    await Messages.create({
        message,
        username
    })
    const messages = await Messages.findAll()
    const data = JSON.stringify(messages)
    stream.send(data)
    res.status(201)
    res.send('Thanks for your message!')
})
module.exports = router