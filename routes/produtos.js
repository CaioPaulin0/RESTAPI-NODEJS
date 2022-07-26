const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

// RETONAR TODOS OS PRODUTOS/
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) }

                return res.status(200).send({ response: resultado })
            }
        )
    })
})

// INSERI UM PRODUTO//
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES(?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: "produto inserido com sucesso",
                    id_produto: resultado.insertId
                })
            }
        )
    })
})

// RETORNA O DADO DO PRODUTO //
router.get('/:id_produtos', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produtos],
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) }

                return res.status(200).send({ response: resultado })
            }
        )
    })
})

// ALTERA UM PRODUTO //
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `UPDATE produtos SET nome=?, preco=? WHERE id_produto=?`,
            [req.body.nome, req.body.preco,req.body.id_produto],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: "produto alterado"
                })
            }
        )
    })
})

// DELETA UM PRODUTO //
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `DELETE FROM produtos WHERE id_produto = ?`,[req.body.id_produto],
            (error, resultado, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: "produto deletado"
                })
            }
        )
    })
})
module.exports = router