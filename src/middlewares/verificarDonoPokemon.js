const pool = require('../config');
const verificarDonoPokemon = async (req, res, next) => {
    const { id } = req.params
    const usuarioId = req.usuarioId

    try {
        const pokemon = await pool.query(
            'SELECT * FROM pokemons WHERE id = $1 AND usuario_id = $2',
            [id, usuarioId]
        )

        if (pokemon.rows.length === 0) {
            return res.status(403).json({ message: 'Você não tem permissão para manipular este pokemon' })
        }

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao verificar pokemon' })
    }
}
module.exports= verificarDonoPokemon