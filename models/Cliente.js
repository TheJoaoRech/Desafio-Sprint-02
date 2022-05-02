const moment = require('moment')
const conexao = require('../database/index')

class cliente {
    adiciona(cliente, resposta) {
        const birthDate = moment(cliente.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const clienteDatado = { ...cliente, birthDate }
        
        const dataValida = moment(birthDate).isSameOrBefore('02-05-2004') //Data definida para que o usuario tenha mais de 18 anos.
        const senhaValida = cliente.password.length >= 6 //Quantidade miníma de algarismos que a senha deve conter.
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email) //Validação do email.
        const zipCodeValido = /^[0-9]{5}-[0-9]{3}$/.test(cliente.zipCode) //Validação do ZipCode.
        const cpfValido = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cliente.cpf) //Validação do CPF.
        
        const validacoes = [

            {
            nome: 'birthDate',
            valido: dataValida,
            mensagem: 'É necessário ser maior de 18 anos para prosseguir com o cadastro!'
            },

            {
            nome: 'password',
            valido: senhaValida,
            mensagem: 'É necessário cadastrar uma senha com seis ou mais digítos!'
            },

            {
            nome: 'email',
            valido: emailValido,
            mensagem: 'A formatação do email não segue os padrões necessários!'
            },
            
            {
                nome: 'zipCode',
                valido: zipCodeValido,
                mensagem: 'O zipCode não segue os padrões necessários!'
            },

            {
                nome: 'cpf',
                valido: cpfValido,
                mensagem: 'O CPF não segue os padrões necessários!'
            },

        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            resposta.status(400).json(erros)
        } else {
            const sql = 'INSERT INTO clientes SET ?'

            conexao.query(sql, clienteDatado, (erro, resultado) => {
                if (erro) {
                    resposta.status(400).json(erro)
                } else {
                    resposta.status(201).json(cliente)
                }
            })
        }
    }

    lista(resposta) {
        const sql = 'SELECT * FROM Clientes'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, resposta) {
        const sql = `SELECT * FROM Clientes WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const cliente = resultados[0]
            if (resultados.length == 0) {
                resposta.status(404).json(
                    [
                        {
                            mensagem: `O cliente com o ID:${id} não foi encontrado no banco de dados!`
                        }
                    ])
            } else if (erro) {
                resposta.status(500).json(erro)
            } else {
                resposta.status(200).json(cliente)
            }
        })
    }

    alterar(id, valores, resposta) {
        if (this.buscaPorId) {
            const sql = `SELECT * FROM Clientes WHERE id=${id}`

            conexao.query(sql, (erro, resultados) => {
                const cliente = resultados[0]
                if (resultados.length == 0) {
                    resposta.status(404).json(
                        [
                            {
                                mensagem: `O cliente com o ID:${id} não foi encontrado em nosso banco de dados!` //Mensagem que aparece quando não se acha um usuário com o ID fornececido.
                            }
                        ])
                } else if (erro) {
                    resposta.status(500).json(erro)
                } else {
                    resposta.status(200).json(cliente)
                }
            })
        } else {
            if (valores.birthDate) {
                valores.birthDate = moment(valores.birthDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
            }
            const sql = 'UPDATE Clientes SET ? WHERE id=?'

            conexao.query(sql, [valores, id], (erro, resultados) => {
                if (erro) {
                    resposta.status(500).json(erro)
                } else {
                    resposta.status(200).json({ ...valores, id })
                }

            })
        }
    }

    deleta(id, resposta) {
        if (this.buscaPorId) {
            const sql = `SELECT * FROM Clientes WHERE id=${id}`

            conexao.query(sql, (erro, resultados) => {
                const cliente = resultados[0]
                if (resultados.length == 0) {
                    resposta.status(404).json(
                        [
                            {
                                mensagem: `Cliente com id:${id} não foi encontrado!` //Mensagem que aparece quando não se acha um usuário com o ID fornececido.
                            }
                        ])
                } else if (erro) {
                    resposta.status(500).json(erro)
                } else {
                    resposta.status(200).json(cliente)
                }
            })
        } else {
            const sql = 'DELETE FROM Clientes WHERE id=?'

            conexao.query(sql, id, (erro, resultados) => {
                if (erro) {
                    resposta.status(404).json(erro)
                } else {
                    resposta.status(200).json(`O cliente com o id:${id} foi deletado com sucesso do banco de dados!`) //Mensagem que aparece quando não se acha um usuário com o ID fornececido.
                }
            })
        }
    }
}
    module.exports = new cliente