const Sequelize = require('sequelize')
const db = require('../db')

const User = require('../user/model')

const Chatrooms = db.define('chatrooms', {
    name : {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Chatrooms