"use strict";

/* livereload

    //Da fallo aunque no sé porque, me dice que no encuentra el 
    //modulo de livereload, probé de diferentes maneras, pero nada
    
var livereload = require('livereload');
server = livereload.createServer();
server.watch(__dirname + "/public");
var server = livereload.createServer({
    originalPath: "http://calculadora-alu0100836059.c9users.io/"
});
server.watch('/home/ubuntu/workspace');
****/


var express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

//calculate o hace falta llamarlo con el .js .
//const calculate = require('./models/calculate.js');
//const calculate= require('./models/calc.js');
const conversion = require('./models/principal.js');
const mongodb = require('./models/dbmongo.js');

app.get('/', (request, response) => {
  response.render('index',
  {title : 'Calculadora myApp', error:"" })
});

app.get('/conv', (request, response) => {
    let aux = conversion(request.query.input);
    console.log("valor de aux"+aux);
    response.send({ 'valor': conversion(request.query.input) });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});