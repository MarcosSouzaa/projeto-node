//importação do express
const express = require("express");
const app = express();

//Estou dizendopara o Express usar o EJS como View Engine - Motor de visualização
app.set('view engine', 'ejs');

//Vou criar acesso para arquivos estáticos
app.use(express.static('public'));

//criação da rota 
app.get("/", (req, res) => {
    res.render("index")
});


// Start da aplicação
app.listen(8080, (erro) => {

    if (erro) {
        console.log("Ops! Algo deu errado!")
    } else {
        console.log("Aplicativo em funcionamento!");
    }
});

