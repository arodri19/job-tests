const Reminder = require('./reminders-model');
const { InvalidArgumentError } = require('../errors');

module.exports = {
    async adiciona(req, res, proximo) {
        try {

            res.status(201).send({ msg: '' });
        } catch (erro) {
            if (erro instanceof InvalidArgumentError) {
                res.status(422).json({ erro: erro.message });
            } else {
                res.status(500).json({ erro: erro.message });
            }
        }
    },

    async lista(req, res, proximo) {
        try {

            res.send({ msg: 'teste' });
        } catch (erro) {
            return res.status(500).json({ erro: erro });
        }
    },

    async obterDetalhes(req, res, proximo) {
        try {
            res.status(201).send({ msg: '' });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message })
        }
    },

    async remover(req, res, proximo) {
        try {
            res.status(201).send({ msg: '' });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message })
        }
    }
};
