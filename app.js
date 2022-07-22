const express = require('express')
const app = express()

const produtosRouter = require('./routes/produtos')
const pedidosRouter = require('./routes/pedidos')

app.use('/produtos', produtosRouter)
app.use('/pedidos', pedidosRouter)

module.exports = app