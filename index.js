const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')

// Routers
const streamRouter = require('./stream/router')
const userRouter = require('./user/router')
const ChatroomRouter = require('./chatroom/router')

// Models
const Messages = require('./stream/model')
const Chatrooms = require('./chatroom/model')
const Users = require('./user/model')
const Members = require('./member/model')

// DB
const db = require('./db')
const app = express()
const port = process.env.PORT || 5000

const jsonParser = bodyParser.json()
app.use(cors())
app.use(jsonParser)

app.listen(port, () => console.log('Server running on:', port));

app.get('/', (req, res) => {
    res.status(200)
})

app.use(streamRouter)
app.use(userRouter)
app.use(ChatroomRouter)

db.sync({ force: true })
    .then(() => {
        console.log('database in sync')

        const user = [
            { username: 'test', password: bcrypt.hashSync('test', 10) , level: 0 },
            { username: 'test2', password: bcrypt.hashSync('test', 10), level: 0 }
        ];
        const userPromises = user.map(user => Users.create(user));
        return Promise.all(userPromises);
    })
    .then(() => {
        console.log('users added')

        const chatroom = [
            { name: 'test' },
            { name: 'test2' }
        ];
        const chatroomPromises = chatroom.map(chat => Chatrooms.create(chat));
        return Promise.all(chatroomPromises);
    })
    .then(() => {
        console.log('chatrooms added')

        const member = [
            { userId: 1, chatroomId: 1 },
            { userId: 2, chatroomId: 1 },
            { userId: 1, chatroomId: 2 }
        ];
        const memberPromises = member.map(member => Members.create(member));
        return Promise.all(memberPromises);
    })
    .then(() => {
        console.log('members added')

        const messages = [
            { message: 'test', userId: 1 },
            { message: 'test2', userId: 2 },
            { message: 'test3', userId: 1 }
        ];
        const messagesPromises = messages.map(message => Messages.create(message));
        return Promise.all(messagesPromises);
    })
    .catch(error => console.log('DB error:', error))