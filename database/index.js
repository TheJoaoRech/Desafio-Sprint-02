const mysql = require('mysql2');
const config = require('config');

const conexao = mysql.createConnection({
    host: config.get('mysql.host'),
    port: config.get('mysql.port'), 
    user: config.get('mysql.user'),
    password: config.get('mysql.senha'),
    database: config.get('mysql.database')
});

module.exports = conexao;