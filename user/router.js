const User = require('./model')
const { Router } = require('express')
const bcrypt = require('bcrypt')
const { toData, toJWT } = require('./jwt')

router = new Router
router.post('/user', (req, res) => {
  console.log('got a request on /user');
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    res.status(400).send({
      message: 'Please supply valid username or password'
    })
  } else {
    User.create({
      username: username,
      password: bcrypt.hashSync(password, 10)
    })
      .then(user => res.status(201).send('OK'))
  }
})

router.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    res.status(400).send({
      message: 'Please supply a valid username and password'
    })
  }
  else {
    User
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that username does not exist'
          })
        }
        else if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.send({
            id: entity.id,
            username: req.body.username,
            jwt: toJWT({ userId: entity.id })
          })
        }
        else {
          res.status(400).send({
            message: 'Password was incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })
  }
})

module.exports = router