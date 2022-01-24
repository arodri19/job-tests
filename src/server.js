require('dotenv').config()

const app = require('./app');
const port = 3000;

const { InvalidArgumentError,NotFound } = require('./errors');

const routes = require('./routes');
routes(app);

app.use((error, req, res, proximo) => {
    let status = 500
    const corpo = {
        mensagem: error.message
    }

    if(error instanceof NotFound){
        status = 404
    }
    
    if(error instanceof InvalidArgumentError){
        status = 400
    }

    res.status(status).json(corpo)
})

app.listen(port, () => console.log(`App listening on port ${port}`));
