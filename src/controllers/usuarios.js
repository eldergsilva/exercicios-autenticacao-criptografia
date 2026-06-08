const pool = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
 

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try{
    const buscarEmail = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
     
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
  
  try{     
    
   const resposta = await pool.query(`
    SELECT id,nome,email FROM usuarios
     `)
  return res.status(200).json(resposta.rows)
  }catch(error){
    console.error(error)
    return res.status(500).json({ message: 'Erro ao listar usuários' })
  }
  
}

const login = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email ou senha inválido' })
    }

    try {
        const buscarUsuario = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])

        if (buscarUsuario.rows.length === 0) {
            return res.status(400).json({ message: 'Email ou senha inválidos' })
        }

        const senhaValida = await bcrypt.compare(senha, buscarUsuario.rows[0].senha)

        if (!senhaValida) {
            return res.status(400).json({ message: 'Email ou senha inválidos' })
        }

        const token = jwt.sign({ id: buscarUsuario.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '8h' })

        return res.status(200).json({ token })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao logar usuário' })
    }
}
   

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    login 
}

