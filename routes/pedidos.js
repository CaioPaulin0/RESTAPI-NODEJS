const express = require('express')
const router = express.Router()
const PedidosControler = require('../controllers/pedidos-controller')
const login = require('../middleware/login')

// RETONAR TODOS OS PEDIDOS/
router.get('/', PedidosControler.getPedidos)

// INSERE UM PEDIDO//
router.post('/', login.obrigatorio, PedidosControler.postPedidos)

// RETORNA Os DADOs DO PEDIDO //
router.get('/:id_pedido', PedidosControler.getPedidosId)

// DELETA UM PEDIDOS //
router.delete('/', PedidosControler.deletePedidos)
module.exports = router
