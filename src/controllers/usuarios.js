const pool = require('../config');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try{
    const buscarEmail = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    console.log(buscarEmail.rows);
    if(buscarEmail.rows.length > 0){
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

  }catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  } 


  return res.json({message: 'Rota de cadastro de usuário'});
}
module.exports = {
    cadastrarUsuario
}

