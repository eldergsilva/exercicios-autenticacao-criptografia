const {cadastrarUsuario, listarUsuarios} = require('./controllers/usuarios');
const express = require('express');
const rotas = express();



rotas.post('/usuarios', cadastrarUsuario);
rotas.get('/usuarios', listarUsuarios);

module.exports = rotas;

