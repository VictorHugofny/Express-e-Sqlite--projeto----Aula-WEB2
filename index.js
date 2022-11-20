//importando express
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./db.sqlite");

const server = express();
server.use(express.json());

let listaUsuarios = [];

//usando promisse para busca assincrona
function buscarPessoa(){
    return new Promise((resolve, reject) => {

    db.all("SELECT * FROM PESSOA", (err, rows) => {
        if(rows){
            rows.forEach((row) =>{
                listaUsuarios.push({
                    "nome": row.nome
                })
            })
        }else{
            reject("Vazio")
        }
    })

    resolve(listaUsuarios);
    })
}

//Listar pessoas
server.get("/pessoa",(req, res)=>{
    buscarPessoa().then((data) => res.json(listaUsuarios))
})

//criando um novo usuario
server.post('/CriarPessoa', (req, res)=>{
    const {nome} = req.body;
    db.run(`INSERT INTO PESSOA (nome) VALUES ('${nome}')`)

    buscarPessoa().then((data) => console.log(data))
    return res.json(listaUsuarios);
});

server.listen(3000,()=>{
    console.log("servidor rodando");
});

// db.serialize(() => {
//     //db.run("DROP TABLE pole");
//     //db.run("CREATE TABLE PESSOA (nome string)");
// });
// db.run("CREATE TABLE PESSOA (nome varchar)");
//  db.run("INSERT INTO PESSOA (nome) VALUES ('Victor Hugo')")
// db.run("INSERT INTO PESSOA (nome) VALUES ('Meliodas')")
// db.run("INSERT INTO PESSOA (nome) VALUES ('Eliscleiton')")