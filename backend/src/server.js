const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path')

const app = express();

const server = http.Server(app);

const io = socketio(server);

const connectedUSers = {};



mongoose.connect('mongodb+srv://hiki91:91327915@projetoomnistack-gqvvn.mongodb.net/projeto01?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;

    connectedUSers[user_id] = socket.id;
});

app.use((req, res, next) =>{
    req.io = io;
    req.connectedUSers = connectedUSers;

    return next();
});

const routes = require('./routes');

// Get, Post, Put, Delete
// req.query = acessar query params (Para filtros)
// req.params = Acessar route params (para edicao, delete)
//  req.body = Acessar corpo da requisicao (para criacao e edicao)

app.use(cors());

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(routes); //Tem que vim apos o express.json

server.listen(3333);