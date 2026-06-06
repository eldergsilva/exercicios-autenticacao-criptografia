const {cadastrarUsuario, listarUsuarios, login} = require('./controllers/usuarios');
const express = require('express');
const autenticacao = require('./middlewares/autenticacao');
 
const { cadastrarPokemons,listarPokemons } = require('./controllers/pokemon');
const rotas = express();



rotas.post('/usuarios', cadastrarUsuario);
rotas.post('/login',login)

rotas.use(autenticacao);
rotas.get('/usuarios', listarUsuarios);
rotas.get('/pokemon',listarPokemons);
rotas.post('/pokemon',cadastrarPokemons)

module.exports = rotas;

