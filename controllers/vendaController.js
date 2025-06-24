const Venda = require('../models/vendaModel');

const vendaController = {
    // Exibe o formulário para criar nova venda
    renderCreateForm: (req, res) => {
        res.render('vendas/create');
    },

    // Cria nova venda
    createVenda: (req, res) => {
        const novaVenda = {
            data: req.body.data,
            valor: req.body.valor,
            quantidade: req.body.quantidade,
            produto_id: req.body.produto_id
        };

        Venda.create(novaVenda, (err, vendaId) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.redirect('/vendas');
        });
    },

    // Lista todas as vendas
    getAllVendas: (req, res) => {
        Venda.getAll((err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.render('vendas/index', { vendas });
        });
    },

    // Busca uma venda específica por ID
    getVendaById: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            res.render('vendas/show', { venda });
        });
    },

    // Renderiza o formulário para editar uma venda
    renderEditForm: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            res.render('vendas/edit', { venda });
        });
    },

    // Atualiza uma venda
    updateVenda: (req, res) => {
        const vendaId = req.params.id;
        const vendaAtualizada = {
            data: req.body.data,
            valor: req.body.valor,
            quantidade: req.body.quantidade,
            produto_id: req.body.produto_id
        };

        Venda.update(vendaId, vendaAtualizada, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.redirect('/vendas');
        });
    },

    // Deleta uma venda
    deleteVenda: (req, res) => {
        const vendaId = req.params.id;

        Venda.delete(vendaId, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.redirect('/vendas');
        });
    }
};

module.exports = vendaController;
