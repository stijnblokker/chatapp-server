const { Router } = require('express')

const router = new Router()

router.get('/stream', (req, res) => {
    console.log('got a request on /stream')
    res.status(200)
    res.send('it works!')
    
})

module.exports = router