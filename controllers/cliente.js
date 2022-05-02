const Cliente = require('../models/Cliente')

module.exports = app => {
    app.get('/api/v1/user', (requisicao, resposta) => {
        Cliente.lista(resposta)
    })

    app.get('/api/v1/user/:id', (requisicao, resposta) => {
        const id = parseInt(requisicao.params.id)
         Cliente.buscaPorId(id, resposta)      
    })

    app.post('/api/v1/user', (requisicao, resposta) => {
        const cliente = requisicao.body
        Cliente.adiciona(cliente, resposta)
    })

    app.put('/api/v1/user/:id', async (requisicao, resposta) => { 
        const id = parseInt(requisicao.params.id)
        const valores = requisicao.body
        Cliente.alterar(id, valores, resposta)
    })

    app.delete('/api/v1/user/:id', (requisicao, resposta) => {
        const id = parseInt(requisicao.params.id)
        Cliente.deleta(id, resposta);
    })
}