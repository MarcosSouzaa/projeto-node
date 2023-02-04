//importando o sequelize
const Sequelize = require("sequelize");
//importando a conexão com banco
const connection = require("./database");

const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force:false});

// Para usar esse model fora desse arquivo
module.exports = Resposta;