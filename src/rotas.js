const {cadastrarUsuario, listarUsuarios, login} = require('./controllers/usuarios');
const express = require('express');
const autenticacao = require('./middlewares/autenticacao');
const rotas = express();



rotas.post('/usuarios', cadastrarUsuario);
rotas.post('/login',login)

rotas.use(autenticacao);
rotas.get('/usuarios', listarUsuarios);

module.exports = rotas;

