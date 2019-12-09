const { Router } = require('express')
const Messages = require('./model')
const Sse = require('json-sse')

const router = new Router()
const stream = new Sse()

router.get('/stream/:id', async (req, res) => {
    console.log('got a request on /stream', req.params.id)
    const messages = await Messages.findAll({
        where: {
          chatroomId: req.params.id
        }})
    const data = JSON.stringify(messages)
    console.log('stringified messages in db:', data);
    stream.updateInit(data)
    stream.init(req, res)
})

router.post('/message', async (req, res) => {
    console.log('got a request on /message: ', req.body)
    const { message, userId, chatroomId } = req.body
    await Messages.create({
        message,
        userId,
        chatroomId
    })
    const messages = await Messages.findAll({
        where: {
          chatroomId: chatroomId
        }})
    const data = JSON.stringify(messages)
    stream.send(data)
    res.status(201)
    res.send('Thanks for your message!')
})
module.exports = router