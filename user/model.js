const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  level: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 0
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = User