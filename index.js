const express = require('express')

const streamRouter = require('./stream/router')
const app = express()

const port = process.env.PORT || 5000

app.listen(port, () => console.log('Server running on:', port) );

app.get('/', (req, res) => {
    console.log('get an request on /')
    res.status(200)
    res.send('hello world!')
})

app.use(streamRouter)