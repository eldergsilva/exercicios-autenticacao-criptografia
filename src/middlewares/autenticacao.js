
const jwt = require('jsonwebtoken')

const autenticacao = (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }
    try {   
        const usuarioVerificado = jwt.verify(token, process.env.JWT_SECRET)
        req.usuarioId = usuarioVerificado.id
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: 'Token inválido' })
    }
}
module.exports = autenticacao;