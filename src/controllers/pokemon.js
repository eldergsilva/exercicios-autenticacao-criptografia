const pool = require('../config');
const jwt = require('jsonwebtoken')

const listarPokemons = async(req,res)=>{
    try { 
        const resposta = await pool.query(
       `SELECT 
        pokemons.id,
        usuarios.nome AS usuario,
        pokemons.nome,
        pokemons.apelido,
        pokemons.habilidades,
        pokemons.imagem
        FROM pokemons
        JOIN usuarios ON pokemons.usuario_id = usuarios.id;
        `
        )
    const pokemons = resposta.rows.map(pokemon => ({
    ...pokemon,
    habilidades: pokemon.habilidades.split(', ')
    }))

    return res.status(200).json(pokemons)    

    }catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Erro ao Listar usuário' });
  }


}

const cadastrarPokemons = async(req,res)=>{     
     
    const {nome,habilidades,imagem,apelido}=req.body;
     
    const usuarioId = req.usuarioId

    if(!nome || !habilidades ){
    return res.status(400).json({ message: 'O Nome e Habilidades são obrigatórios' })
    }      
     
    try{
        const novoPokemon = await pool.query('INSERT INTO pokemons (nome, habilidades, imagem,apelido,usuario_id) VALUES ($1, $2, $3,$4,$5)', [nome, habilidades, imagem,apelido,usuarioId]);
     
        
    return res.status(201).json({ message: 'pokemon cadastrado'  })
    }catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Erro ao cadastradar Pokemon' });
  }

}


module.exports = {
    listarPokemons,
    cadastrarPokemons
}