const pool = require('../config'); 
 

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
    return res.status(500).json({ message: 'Erro ao listar pokemons' })
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
const atualizarPokemon = async (req, res) => {
   
    const { apelido } = req.body
    const { id } = req.params

    if (!apelido) {
        return res.status(400).json({ message: 'O Apelido é obrigatório' })
    }

    try {
        await pool.query('UPDATE pokemons SET apelido = $1 WHERE id = $2', [apelido, id])
        return res.status(200).json({ message: 'Pokemon atualizado com sucesso' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao atualizar pokemon' })
    }
}
const buscarPokemonPorId = async (req,res)=>{
     
    const{id}=req.params

    try {
    const pokemonEncontrado = await pool.query(`
    SELECT 
        pokemons.id,
        usuarios.nome AS usuario,
        pokemons.nome,
        pokemons.apelido,
        pokemons.habilidades,
        pokemons.imagem
    FROM pokemons
    JOIN usuarios ON pokemons.usuario_id = usuarios.id
    WHERE pokemons.id = $1
    `, [id]);

    if (pokemonEncontrado.rows.length === 0) {
    return res.status(404).json({ message: 'Pokemon não encontrado' })
    }
    const pokemon = {
    ...pokemonEncontrado.rows[0],
    habilidades: pokemonEncontrado.rows[0].habilidades.split(', ')

    }
    return res.status(200).json(pokemon)

   }catch (error) {
        console.error(error)
    return res.status(500).json({ message: 'Erro ao Buscar  pokemon' })
    }

}
const deletarPokemon = async (req,res)=>{
 
    const{id}=req.params
    try {
    const deletaPokemon = await pool.query('DELETE FROM pokemons WHERE id = $1', [id])

    if (deletaPokemon.rowCount === 0) {
    return res.status(404).json({ message: 'Pokemon não encontrado' })
    }

    return res.status(204).send()
    }catch (error) {
        console.error(error)
    return res.status(500).json({ message: 'Erro ao deletar pokemon' })
    }
}


module.exports = {
    listarPokemons,
    cadastrarPokemons,
    atualizarPokemon,
    buscarPokemonPorId,
    deletarPokemon
}