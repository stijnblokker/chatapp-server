const Sequelize = require('sequelize')
const db = require('../db')

const Chatrooms = db.define('chatrooms', {
    name : {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Chatrooms