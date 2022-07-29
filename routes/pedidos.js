const express = require('express')
const router = express.Router()
const PedidosControler = require('../controllers/pedidos-controller')

// RETONAR TODOS OS PEDIDOS/
router.get('/', PedidosControler.getPedidos)

// INSERE UM PEDIDO//
router.post('/', PedidosControler.postPedidos)

// RETORNA O DADO DO PEDIDOS //
router.get('/:id_pedido', PedidosControler.getPedidosId)

// DELETA UM PEDIDOS //
router.delete('/', PedidosControler.deletePedidos)
module.exports = router