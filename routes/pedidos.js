const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

// RETONAR TODOS OS PEDIDOS/
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `SELECT 	pedidos.id_pedido, 
                        pedidos.quantidade,
                        produtos.id_produto,
                        produtos.nome,
                        produtos.preco
                     FROM pedidos 
                    INNER JOIN produtos 
                 ON produtos.id_produto = pedidos.id_produto;`,
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    pedido: result.map(pedido => {
                        return {
                            id_pedido: pedido.id_pedido,
                            quantidade: pedido.quantidade,
                            produto: {
                                id_produto: pedido.id_produto,
                                nome: pedido.nome,
                                preco : pedido.preco
                            },
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhas do pedido especifico',
                                url: 'http://localhost:3000/pedido/' + pedido.id_pedido
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    })
})

// INSERI UM PEDIDOS//
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query('SELECT * FROM pedidos WHERE id_produto = ?;', [req.body.id_produto],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    res.status(404).send({
                        mensagem: 'Produto não encontrado'
                    })
                }

                conn.query(
                    'INSERT INTO pedidos (id_produto, quantidade) VALUES(?,?)',
                    [req.body.id_produto, req.body.quantidade],
                    (error, result, field) => {
                        conn.release()

                        if (error) { return res.status(500).send({ error: error }) }
                        const response = {
                            mensagem: 'Pedido inserido com sucesso',
                            pedidoCriado: {
                                id_pedido: result.id_pedido,
                                id_produto: req.body.id_produto,
                                quantidade: req.body.quantidade,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'retorna todos os pedidos',
                                    url: 'http://localhost:3000/pedidos'
                                }
                            }
                        }
                        return res.status(201).send(response)
                    }
                )
            })
    })

})

// RETORNA O DADO DO PEDIDOS //
router.get('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedido = ?;',
            [req.params.id_pedido],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: "não foi encontrado pedido com esse id"
                    })
                }

                const response = {
                    pedido: {
                        id_pedido: result[0].id_pedido,
                        id_produto: result[0].id_produto,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'retorna todos os pedidos',
                            url: 'http://localhost:3000/pedidos'
                        }
                    }
                }
                return res.status(200).send(response)
            }
        )
    })
})

// DELETA UM PEDIDOS //
router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `DELETE FROM pedidos WHERE id_pedido = ?`, [req.body.id_pedido],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'pedido removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um pedido',
                        url: 'http://localhost:3000/pedido',
                        body: {
                            id_produto: 'Number',
                            quantidade: 'Number'
                        }
                    }
                }
                res.status(202).send(response)
            }
        )
    })
})
module.exports = router