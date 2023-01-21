//importação das Bibliotecas
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

//Database

connection
     .authenticate()
     .then(() => {
        console.log("Conexão feita com o banco de dados")
     })
     .catch((msgErro) => {
        console.log(msgErro);
     })
    

//Estou dizendo para o Express usar o EJS como View Engine - Motor de visualização
app.set('view engine', 'ejs');

//Vou criar acesso para arquivos estáticos
app.use(express.static('public'));

//Body parser para pegar dados do formulario
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//criação da rota 
app.get("/", (req, res) => {
    res.render("index");
});

//rota para página perguntar
app.get("/perguntar", (req, res) => {    
    res.render("perguntar");
});

//Criando rota para o Formulário methodo= POST Página perguntar.Body-parse disponibiliza o objeto body aqui.
//enviando para o Banco de Dados
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(() => {
         res.redirect("/");
    });
});

// Start da aplicação
app.listen(8080, (erro) => {

    if (erro) {
        console.log("Ops! Algo deu errado!");
    } else {
        console.log("Aplicativo em funcionamento!");
    }
});

