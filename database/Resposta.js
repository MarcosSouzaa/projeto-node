//importando o sequelize
const Sequelize = require("sequelize");
//importando a conexão com banco
const connection = require("./database");

const Resposta = connection.define("resposta", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntasId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force:false});

// Para usar esse model fora desse arquivo
module.exports = Resposta; 