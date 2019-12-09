const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const streamRouter = require('./stream/router')
const userRouter = require('./user/router')
const ChatroomRouter = require('./chatroom/router')
const app = express()

const port = process.env.PORT || 5000

const jsonParser = bodyParser.json()
app.use(cors())
app.use(jsonParser)

app.listen(port, () => console.log('Server running on:', port) );

app.get('/', (req, res) => {
    res.status(200)
})

app.use(streamRouter)
app.use(userRouter)
app.use(ChatroomRouter)
