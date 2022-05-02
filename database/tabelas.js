const Sequelize = require('sequelize')

class tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarClientes()
        this.criarTask()
    };

    colunas = {
    }

    //Criação das tabelas clientes!
    criarClientes() {
        const sql = `CREATE TABLE IF NOT EXISTS Clientes (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(50) NOT NULL,
            cpf varchar(11) NOT NULL, 
            birthDate DATE NOT NULL,
            email varchar(50) NOT NULL,
            password varchar(20) NOT NULL,
            address varchar(50) NOT NULL,
            number varchar(10),
            complement varchar(50) NOT NULL,
            city varchar(20) NOT NULL,
            state varchar(2),
            country varchar(10),
            zipCode varchar(8),
            PRIMARY KEY(id))`
            
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('As tabelas foram criadas com sucesso!')
            }
        })
    }
    
    //Criação das tabelas tasks!
    criarTask() {
        const sql = `CREATE TABLE IF NOT EXISTS Tasks ( 
            description varchar(200) NOT NULL,
            date datetime NOT NULL,
            user int,
            CONSTRAINT fk_UserTask FOREIGN KEY (user) REFERENCES Clientes (id))`

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {

            }
        })
    }
};

module.exports = new tabelas



