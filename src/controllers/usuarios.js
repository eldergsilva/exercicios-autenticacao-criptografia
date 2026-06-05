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
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, senhaHash]);
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });

  }catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  } 

}
const listarUsuarios = async(req,res)=>{
  const resposta = await pool.query(`
    SELECT id,nome,email FROM usuarios
     `)
  return res.status(200).json(resposta.rows)
}

   

module.exports = {
    cadastrarUsuario,
    listarUsuarios
}

