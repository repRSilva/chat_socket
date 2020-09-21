//Importação do módulo express
const express = require('express');
//Importação do módulo consign
const consign = require('consign');
//Importação do módulo body-parser
const bodyParser = require('body-parser');
//Importação do módulo express-validator
const expressValidator = require('express-validator');
//Iniciar o objeto Express
const app = express();
//Configurar EJS
//Setar as variáveis que o EJS necessita(View Engine, Views)
app.set('view engine', 'ejs');
app.set('views', './app/views');
//Configurar o middleware static
app.use(express.static('./app/public'));
//Configurar o middleware body-parser(Recuperar os dados via JSON do Body)
app.use(bodyParser.urlencoded({ extended: true }));
//Configurar o middleware express-validator
app.use(expressValidator());
//Configurar importações do consign, para dentro do objeto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

//Exportar objeto para ser utilizado
module.exports = app;

