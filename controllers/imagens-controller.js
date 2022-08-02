const mysql = require('../mysql')

exports.deleteImagem = async (req, res, next) => {

    try {
        const query = `DELETE FROM imagens_produtos WHERE id_image = ?`
        await mysql.execute(query, req.params.id_image)

        const response = {
            mensagem: 'imagem removida com sucesso',
            request: {
                tipo: 'POST',
                descricao: 'Insere uma imagem',
                url: process.env.URL_API + 'produtos/' + req.body.id_produto + '/imagem',
                body: {
                    id_produto: 'Number',
                    imagem_produto: 'File'
                }
            }
        }
        res.status(202).send(response)
    }
    catch (error) {
        return res.status(500).send({ error: error })
    }
}