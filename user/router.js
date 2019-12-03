const User = require('./model')
const { Router } = require('express')
const bcrypt = require('bcrypt')
const { toData, toJWT } = require('./jwt')

router = new Router
router.post('/user', (req, res) => {
  console.log('got a request on /user');
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(400).send({
      message: 'Please supply valid email or password'
    })
  } else {
    User.create({
      email: email,
      password: bcrypt.hashSync(password, 10)
    })
      .then(user => res.status(201).send('OK'))
  }
})

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }
  else {
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that email does not exist'
          })
        }
        else if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.send({
            email: req.body.email,
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