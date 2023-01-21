//importando o sequelize
const Sequelize = require("sequelize");
//importando a conexão com banco
const connection = require("./database");
 
//Criando a TABELA
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type:Sequelize.TEXT,
        aloowNull: false
    }
});
 Pergunta.sync({force:false}).then(() =>{
    console.log("Se a Tabela não foi criada anteriormente, agora foi criada com sucesso!")
 }) 
 module.exports = Pergunta;