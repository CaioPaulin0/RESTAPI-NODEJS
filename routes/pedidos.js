const express = require('express')
const router = express.Router()

// RETONAR TODOS OS PEDIDOS/
router.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'retorna os pedidos'
    })
})

// INSERI UM PEDIDOS//
router.post('/', (req,res,next) =>{
    res.status(201).send({
        mensagem: "o pedido foi criado"
    })
})

// RETORNA O DADO DO PEDIDOS //
router.get('/:id_pedidos', (req,res,next) =>{
    // utilzado para passar os parametro via url //
    const id = req.params.id_pedidos
        res.status(200).send({
            mensagem : "detalhes do pedido",
            id: id
        })    
})

// DELETA UM PEDIDOS //
router.delete('/', (req,res,next) => {
    res.status(201).send({
        mensagem : "pedido excluído"
    })
})
module.exports = router