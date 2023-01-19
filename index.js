//importação do express
const express = require("express");
const app = express();

//Estou dizendopara o Express usar o EJS como View Engine - Motor de visualização
app.set('view engine', 'ejs');

//criação da rota com dois parâmetros 
 app.get("/:nome/:lang", (req, res)=>{

    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    //utilizando forEach
    var produtos = [
        {nome:"Doritos", preco: 3.14},
        {nome:"Coca-Cola", preco: 10.00},
        {nome:"Leite", preco: 6.25},
        {nome:"Macarrão", preco: 7.25},
        {nome:"Feijão", preco: 10.32},
        {nome:"Arroz", preco: 7.20},
        {nome:"Farinha", preco: 3.38}
    ]

    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "MS Produções",
        funcionarios:60,
        msg:exibirMsg,
        produtos:produtos
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

 