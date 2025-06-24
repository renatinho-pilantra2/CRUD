const mysql = require('mysql2');
const dotenv = require('dotenv');

// Carrega as variáveis do .env
dotenv.config();

// Cria a conexão com o banco de dados usando variáveis de ambiente
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Conecta ao banco e exibe status
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

module.exports = connection;
