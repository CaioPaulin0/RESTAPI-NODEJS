const express = require('express')
const router = express.Router()
const UsuarioController = require('../controllers/usuarios-controller')

router.post('/cadastro', UsuarioController.postUsuarioCadastro)

router.post('/login', UsuarioController.postUsuarioLogin)

module.exports = router