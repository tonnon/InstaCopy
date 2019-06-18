const express = require('express'); //Importa o express e as suas dependências
const mongoose = require('mongoose'); // Importa o mongoose para manipular dados do MongoDB
const path = require('path');
const cors = require('cors'); // Permite que o backend seja acessivel pelo front end

const app = express(); // Cria um servidor local

const server = require('http').Server(app); // Permite agente trabalhar com http
const io = require('socket.io')(server) // Envia e recebe as informações em tempo real

mongoose.connect('mongodb+srv://tonnon:Radioppear@cluster0-at5bt.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, // Formato de string novo para conecatar com o MongoDB // Username e senha criados através do database access e retirada do sinal de maior e menornpm run dev
}); // Connect com o MongoDB

app.use ((req, res, next) => {
    req.io = io;

    next(); // Permiote que os outros Middlewares funcionem
});

app.use(cors()); 

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))); // Referencia de algum arquivo fisico, arquivos estaticos e o caminho de onde os caminhos estao

app.use(require('./routes')); // As rotas serão conhecidas

server.listen(1111); // Define em qual porta o app vai rodar