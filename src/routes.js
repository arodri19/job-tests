const reminders = require('./reminders');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');

module.exports = app => {
  app.get('/', (req, res) => {res.send('Test')});
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  
  reminders.routes(app);
};