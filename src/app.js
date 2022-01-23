const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors")

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  bodyParser.json()
)

module.exports = app;
