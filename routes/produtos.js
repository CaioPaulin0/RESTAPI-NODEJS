const express = require('express')
const router = express.Router()

// RETONAR TODOS OS PRODUTOS/
router.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'retorna os produtos'
    })
})

// INSERI UM PRODUTO//
router.post('/', (req,res,next) =>{

    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }
    res.status(201).send({
        mensagem: "Inserir um produto",
        produtoCriado: produto
    })
})

// RETORNA O DADO DO PRODUTO //
router.get('/:id_produtos', (req,res,next) =>{
    // utilzado para passar os parametro via url //
    const id = req.params.id_produtos

    if(id === '1'){
        res.status(200).send({
            mensagem : "numero do produtos 1",
            id: id
        }) 
    } else{
        res.status(200).send({
            mensagem : "usando o get do produtos",
        })
    }
})

// ALTERA UM PRODUTO //
router.patch('/', (req,res,next) =>{
    res.status(201).send({
        mensagem: "produto alterado"
    })
})

// DELETA UM PRODUTO //
router.delete('/', (req,res,next) => {
    res.status(201).send({
        mensagem : "produto deletado"
    })
})
module.exports = router