const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool
const imagemController = require('../controllers/imagens-controller')
const multer = require('multer')
const login = require('../middleware/login')
const jwt = require('jsonwebtoken')

router.delete('/:id_image',  login.obrigatorio , imagemController.deleteImagem)
module.exports = router