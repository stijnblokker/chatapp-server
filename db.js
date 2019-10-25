const Sequelize = require('sequelize')

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:stijnblokker@localhost:5432/postgres'

const db = new Sequelize(databaseUrl)

db.sync({force: false})
    .then( () => console.log('database in sync') )
    .catch( error => console.log('DB error:', error) )

module.exports = db