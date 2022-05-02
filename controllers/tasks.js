const Task = require('../models/Task');

module.exports = app => {
    app.get('/api/v1/task', (requisicao, resposta) =>{
        Task.lista(resposta)
    })

    app.get('/api/v1/task/:user', (requisicao, resposta) => {
        const user = parseInt(requisicao.params.user)
        Task.buscarPorId(user, resposta)
    })

    app.post('/api/v1/task', (requisicao, resposta) => {
        const task = requisicao.body
        Task.adiciona(task, resposta)
    })

    app.put('/api/v1/task/:user',(requisicao, resposta) => {
        const user = parseInt(requisicao.params.user)
        const valores = requisicao.body
        Task.alterar(user, valores, resposta)
    })

    app.delete('/api/v1/task/:user', (requisicao, resposta) => {
        const user = parseInt(requisicao.params.user)
        Task.deleta(user, resposta)
    })
    
}