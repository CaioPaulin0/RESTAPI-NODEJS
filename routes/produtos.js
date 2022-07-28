const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool
const ProdutosController = require('../controllers/produtos-controller')
const multer = require('multer')
const login = require('../middleware/login')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname )
    }
})

const fileFilter = (req, file,cb) =>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true);
    } else{
        cb(null, false)
    }
}
const upload = multer({ 
    storage: storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

// RETONAR TODOS OS PRODUTOS/
router.get('/', ProdutosController.getProdutos)

// INSERI UM PRODUTO//
router.post('/', login.obrigatorio, upload.single('produto_imagem'), ProdutosController.postProdutos)

// RETORNA O DADO DO PRODUTO //
router.get('/:id_produtos', ProdutosController.getProdutosId)

// ALTERA UM PRODUTO //
router.patch('/', login.obrigatorio, ProdutosController.patchProdutos)

// DELETA UM PRODUTO //
router.delete('/',  login.obrigatorio , ProdutosController.deleteProdutos)
module.exports = router