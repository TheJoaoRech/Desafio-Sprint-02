const CustomExpress = require('./config/CustomExpress')
const config = require('config');
const conexao = require('./database/index')
const tabelas = require('./database/tabelas')

const app = CustomExpress() 

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log
        ("Conectado com sucesso ao banco de dados!")

        tabelas.init(conexao)

        app.listen(config.get('api.porta'), () => console.log
        ('O servidor está funcionando corretamente!'))

        app.get('/', (requisicao, resposta) => resposta.send
        ('Use "/api/v1/user" ou "api/v1/task" na url para verificar os clientes cadastrados ou tarefas a serem realizadas!'))
    }
})