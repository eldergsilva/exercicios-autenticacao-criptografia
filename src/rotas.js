const {cadastrarUsuario, listarUsuarios, login} = require('./controllers/usuarios');
const express = require('express');
const autenticacao = require('./middlewares/autenticacao');
 
const { cadastrarPokemons,listarPokemons, atualizarPokemon, buscarPokemonPorId, deletarPokemon } = require('./controllers/pokemon');
const verificarDonoPokemon = require('./middlewares/verificarDonoPokemon');
const rotas = express();



rotas.post('/usuarios', cadastrarUsuario);
rotas.post('/login',login)

rotas.use(autenticacao);
rotas.get('/usuarios', listarUsuarios);
rotas.get('/pokemons',listarPokemons);
rotas.post('/pokemons',cadastrarPokemons)
rotas.patch('/pokemons/:id',verificarDonoPokemon, atualizarPokemon)
rotas.get('/pokemons/:id', buscarPokemonPorId)
rotas.delete('/pokemons/:id', verificarDonoPokemon,deletarPokemon)
module.exports = rotas;

