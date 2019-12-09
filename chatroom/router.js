const { Router } = require('express');
const Chatrooms = require('./model');
const Sse = require('json-sse')
const db = require('../db')

const router = new Router()
const stream = new Sse()

router.get('/chatrooms', async (req, res, next) => {
  console.log('got a request on /chatroom');

  const chatrooms = await Chatrooms.findAll({ order: [['updatedAt', 'DESC']] })
  const data = JSON.stringify(chatrooms)
  stream.updateInit(data)
  stream.init(req, res)
});

router.post('/chatrooms2', (req, res, next) => {
  console.log('got a request on /chatroom with userId', req.body);

  db.query(`SELECT chatrooms.* FROM chatrooms INNER JOIN members ON chatrooms.id = members."chatroomId" WHERE members."userId" = ${req.body.userId}`)
  .then(([results, metadata]) => {
    const data = JSON.stringify(results)
    console.log('stringified chatroom in db:', data);
    stream.updateInit(data)
    stream.init(req, res)
  })
});

router.post("/chatrooms", async (req, res, next) => {
  console.log(req.body);
  await Chatrooms.create(req.body)

  const chatrooms = await Chatrooms.findAll({ order: [['updatedAt', 'DESC']] })
  const data = JSON.stringify(chatrooms)
  stream.send(data)
  res.status(201)
  res.send('Thanks for your message!')
});

module.exports = router