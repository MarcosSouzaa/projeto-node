//importação das Bibliotecas
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta");

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rota página principal
app.get("/", (req, res) => {
    Pergunta.findAll({ //buscando as perguntas do db e mostrando no index
        raw: true, order: [ //raw= pesquisa crua, só os dados mais importantes
            ['id', 'DESC'] //order= ordem das perguntas , DESC = Decrescente
        ]
    }).then(perguntas => { //quando a lista de perguntas estiver pronta, é recebida nessa variável
        res.render("index", {
            perguntas: perguntas //pegando a variável com as perguntas e enviando para o frontend
        });
    })
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
    Pergunta.create({ //responsável por criar a pergunta como: INSER INTO perguntas ...
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

//Buscar no db por id através do método sequilize findOne usando o modal Pergunta
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({ //método que busca um dado no db com uma condição
        where: { id: id } //condição: tenh um id = a variável id, criada acima que pega o id q usuário colocar
    }).then(pergunta => { //se ele achar a pergunta, chama o then e passa a pergunta
        if (pergunta != undefined) { //Pergunta encontrada
            //Vou fazer uma busca no banco de dados para buscar todas respostas referente a essa pergunta.
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => { //essa variável é uma lista de resposta que vou exibir.
                res.render("pergunta", { //criada essa view para exibir a pergunta encontrada
                    pergunta: pergunta,
                    respostas: respostas //respostas recebe a variável respostas passando pra view exibe na tela
                });
            });
        } else { //não encontrada
            res.redirect("/"); //não encontrada
        }
    });
});

// Rota para a view reponder que vem do formulário que são o corpo e id da pergunta
app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
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

