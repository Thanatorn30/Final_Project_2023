const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize('ballon_dor','root','Thanatorn30',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = sequelize