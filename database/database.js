const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', '153624',{
    host:'localhost',
    dialect: 'mysql'
});

module.exports = connection;