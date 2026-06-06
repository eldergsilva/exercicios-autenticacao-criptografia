const pool = require('../config');


const listarPokemon = async(req,res)=>{
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
    return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }


}