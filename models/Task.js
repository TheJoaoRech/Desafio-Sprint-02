const moment = require('moment');
const conexao = require('../database/index');
const cliente = require('../database/tabelas')

class task {
    adiciona(task, resposta) {
        const date = moment(task.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const taskDatada = { ...task, date }
        const dataValida = moment(date).isAfter(moment())

        const validacoes = [
            {
                nome: 'date',
                valido: dataValida,
                mensagem: 'A data precisa ser maior do que a atual!'
            }
        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            resposta.status(400).json(erros)
        } else {
            const sql = 'INSERT INTO tasks SET ?'

            conexao.query(sql, taskDatada, (erro, resultado) => {
                if (erro) {
                    resposta.status(400).json(erro)
                } else {
                    resposta.status(201).json(task)
                }
            })
        }
    }
    //Método de busca. (GET)
    lista(resposta) {
        const sql = 'SELECT Tasks. *, clientes.id FROM tasks INNER JOIN clientes ON tasks.user = clientes.id'

        conexao.query(sql, (erro, resultado) => {
            if(erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json(resultado)
            }
        })

    }
    //Método de busca específica. (GET)
    buscarPorId(user, resposta) {
        const sql = `SELECT Tasks.*, clientes.id FROM tasks INNER JOIN clientes ON tasks.user = clientes.id WHERE user=${user}`

        conexao.query(sql, (erro, resultado) => {
            const task = resultado[0]
            if(erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json(task)
            }
        })
    }
    //Método de alterar. (Update)
    alterar(user, valores, resposta) {
        if(valores.date) {
            valores.date = moment(valores.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Tasks SET ? WHERE user=?'

        conexao.query(sql, [valores, user], (erro, resultado) => {
            if(erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json({...valores, user})
            }
        })
    }
    //Método de deletar. (Delete)
    deleta(id, resposta) {
        const sql = 'DELETE FROM Tasks WHERE user=?'

        conexao.query(sql, id, (erro, resultado) => {
            if(erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json(`A task ${id} foi deletada com sucesso!`)
            }
        }) 
    }
}

    module.exports = new task