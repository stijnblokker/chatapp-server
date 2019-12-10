const db = require('../db')

const Chatrooms = require('../chatroom/model')
const Users = require('../user/model')

Chatrooms.belongsToMany(Users, { through: 'members'})
Users.belongsToMany(Chatrooms, { through: 'members'})
const Members = db.model('members')
module.exports = Members