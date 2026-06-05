const {cadastrarUsuario} = require('./controllers/usuarios');
const express = require('express');
const rotas = express();



rotas.post('/usuarios', cadastrarUsuario)

module.exports = rotas;

