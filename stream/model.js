const Sequelize = require('sequelize')
const db = require('../db')

const Chatroom = require('../chatroom/model')

const Messages = db.define('messages', {
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

// Messages.belongsTo(Chatroom)
// Chatroom.hasMany(Messages)

module.exports = Messages