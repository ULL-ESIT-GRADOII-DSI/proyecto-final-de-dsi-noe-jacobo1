"use strict";

var express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

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



app.get('/new_user', (request, response) => {//midelware para la creacion de un usuario a la bdd
    let name_user = request.query.name;
    console.log("valor de aux"+name_user);
    let usuario_app = new mongodb.User({
        name:name_user
    });
    usuario_app.save(function(err){
        if(err) return console.log(err);
    console.log(`Saved: ${usuario_app}`);
    });
});


app.param('usuario',function(request,response,next,name){ //param (guardar dato en el midelware)
    console.log("usuario param: "+ name);
    if (name.match(/^[a-z0-9_]*$/i)) { 
      request.user = name;
      console.log("request: "+ request.ejemplo);
    } else {  
      next(new Error(`<${name}> does not match 'usuario' requirements`));
    }
    next();
});

app.get('/buscar/:usuario',function(request,response){//Para llegar aqi primero tiene q haber un nombre en la etiqueta name_user
    console.log("Midelware Buscamos usuario ->"+request.user);
     mongodb.User.find({name: request.user},function(err,docs){
         
           if(docs.length > 0){
                //console.log("Error:"+err);
                console.log("Id de usuario:"+docs[0]._id);
                /*var id = new ObjectId(data[0]._id);
                console.log("Id:"+id._id);*/
                const id = mongoose.Types.ObjectId(docs[0]._id);
                console.log("Id:"+id);
                mongodb.Acumulador.find({_creator: id},function(err,docs_acum){
                    if(err) {
                        console.error("Se ha producido un error->"+err);
                    } else {
                        console.log("  Acumulador:"+docs_acum);    
                    }
                   // response.send({contenido: data_tablas, usuario_propietario: id, mensaje_respuesta: "Busqueda realizada correctamente.", mensaje_guardado: " "});
                });
           }
     });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});