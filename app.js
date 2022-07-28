const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const produtosRouter = require('./routes/produtos')
const pedidosRouter = require('./routes/pedidos')
const usuarioRouter = require('./routes/usuarios')

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))

app.use(bodyParser.urlencoded({extended: false})) // apenas dados simples //
app.use(bodyParser.json()) // json de entrada no body //

app.use((req,res,next) => {
    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Acess-Control-Allow-Header', 'Origin, X-Requested-with, Content-Type, Accpet, Authorization')
    
    if(req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }

    next()
})

app.use('/produtos', produtosRouter)
app.use('/pedidos', pedidosRouter)
app.use('/usuarios', usuarioRouter)

// quando não encontrar rota, entra aqui //

app.use((req,res,next) =>{
    const erro = new Error('Não encontrado')
    erro.status = 404
    next(erro)
})

app.use((error,req,res,next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem : error.message
        }
    })
})
module.exports = app