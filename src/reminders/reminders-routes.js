const postsControlador = require('./reminders-controller');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger-output.json');

module.exports = app => {
    app
        .route('/post')
        .get(
            postsControlador.lista
        )
        .post(
            postsControlador.adiciona
        )

    app.route('/post/:id')
        .get(
            postsControlador.obterDetalhes
        )
        .delete(
            postsControlador.remover
        )
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

