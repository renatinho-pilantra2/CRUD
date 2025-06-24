const db = require('../config/db'); // ajusta o caminho se necessário

const Venda = {
    // Criar uma nova venda
    create: (venda, callback) => {
        const sql = 'INSERT INTO vendas (data, valor, quantidade, produto_id) VALUES (?, ?, ?, ?)';
        const values = [venda.data, venda.valor, venda.quantidade, venda.produto_id];
        db.query(sql, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result.insertId);
        });
    },

    // Buscar todas as vendas
    getAll: (callback) => {
        const sql = 'SELECT * FROM vendas';
        db.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    // Buscar uma venda pelo ID
    findById: (id, callback) => {
        const sql = 'SELECT * FROM vendas WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]); // retorna apenas a venda encontrada
        });
    },

    // Atualizar uma venda existente
    update: (id, venda, callback) => {
        const sql = 'UPDATE vendas SET data = ?, valor = ?, quantidade = ?, produto_id = ? WHERE id = ?';
        const values = [venda.data, venda.valor, venda.quantidade, venda.produto_id, id];
        db.query(sql, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    // Deletar uma venda
    delete: (id, callback) => {
        const sql = 'DELETE FROM vendas WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = Venda;
