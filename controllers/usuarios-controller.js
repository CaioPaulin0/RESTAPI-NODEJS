const mysql = require('../mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.postUsuarioCadastro = async (req, res, next) => {
    try{
        let query = `SELECT * FROM usuarios WHERE email = ?`
        const result = await mysql.execute(query, [req.body.email])

        if(result.length > 0){
            return res.status(409).send({mensagem: "usuario cadastrado"})
        }

        const hash = await bcrypt.hashSync(req.body.senha, 10)

        query = 'INSERT INTO usuario (nome,senha) VALUES (?,?)'

        const response = {
            mensagem: 'usuario criado',
            usuarioCriado: {
                id_usuario: result.insertId,
                hash: hash,
                email: req.body.email
            }
        }
        return res.status(201).send(response)
    }
    catch(error){
        return res.status(500).send({ error: error }) 
    }
    
}

exports.postUsuarioLogin = async (req, res, next) => {

    try{
        const query = `SELECT * FROM usuarios WHERE email = ?`
        let result = await mysql.execute(query, [req.body.email])
        
        if (result.length < 1) {
            return res.status(401).send({ mensagem: 'falha na autenticação' })
        }

           if(bcrypt.compare(req.body.senha, result[0].senha)){
                    const token = jwt.sign({
                        id_usuario : result[0].id_usuario,
                        email: result[0].email,

                    }, 
                    process.env.JWT_KEY, 
                    {
                        expiresIn: "1h"
                    })
                    return res.status(200).send({ 
                        mensagem: 'autenticado com sucesso', 
                        token : token 
                    }) 
           }
    }
    catch(error){
        return res.status(500).send({ error: error })
        }
}
