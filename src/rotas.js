const {cadastrarUsuario, listarUsuarios, login} = require('./controllers/usuarios');
const express = require('express');
const rotas = express();



rotas.post('/usuarios', cadastrarUsuario);
rotas.post('/login',login)
rotas.get('/usuarios', listarUsuarios);

module.exports = rotas;

