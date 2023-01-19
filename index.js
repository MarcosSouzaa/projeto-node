//importação do express
const express = require("express");
const app = express();

//Estou dizendopara o Express usar o EJS como View Engine - Motor de visualização
app.set('view engine', 'ejs');

//criação da rota com dois parâmetros 
 app.get("/:nome/:lang", (req, res)=>{

    var nome = req.params.nome;
    var lang = req.params.lang;

    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "MS Produções",
        funcionarios:60
    });
 });

// Start da aplicação
 app.listen(8080, (erro)=>{

    if(erro){
        console.log("Ops! Algo deu errado!")
    }else{
        console.log("Aplicativo em funcionamento!");
    }
 });

 