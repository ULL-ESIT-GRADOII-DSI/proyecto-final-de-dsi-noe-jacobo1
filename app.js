"use strict";

var express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));//body

//calculate o hace falta llamarlo con el .js .
//const calculate = require('./models/calculate.js');
//const calculate= require('./models/calc.js');
const conversion = require('./models/principal.js');
const mongodb = require('./models/dbmongo.js');

//renderiza el index
app.get('/', (request, response) => {
  response.render('index',  {title : 'BIENVENIDO A SU SUPERMERCADO APP', error:"" })
});

//Registrarse por primera vez
app.get('/registro', function(request, response){
      response.render('registro', {title: "Sing UP", error:""});
});

//Inicicar sesion
app.get('/iniciar', function(request, response){
      response.render('iniciar', {title: "Sing IN", error:""});
});

//Pagina principal super
app.get('/superprincipal', function(request, response){
      response.render('super_principal', {title: "SUPER APP"});
});


//renderiza la pagina de la calculadora
app.get('/calculadora', (request, response) => {
  response.render('calculadora',  {title : 'Calculadora myApp', error:"" })
});


//renderiza la pagina fruteria
app.get('/fruteria', function(req, res, next){
      res.render('fruteria', {title: "Fruteria APP", error:""});
});

//renderiza la pagina pescaderia
app.get('/pescaderia', function(req, res, next){
      res.render('pescaderia', {title: "Pescaderia APP", error:""});
});

//renderiza la pagina fruteria
app.get('/charcuteria', function(req, res, next){
      res.render('charcuteria', {title: "Charcuteria APP", error:""});
});

//Operacion de la calculadora
app.get('/conv', (request, response) => {
    let aux = conversion(request.query.input);
    console.log("valor de aux"+aux);
    response.send({ 'valor': conversion(request.query.input) });
});


app.get('/error', function(request, response){
      response.render('error', {title: "No existe en la BDD", error:""});
});

/*****/


/******/


//guardamos el usuario en el server
app.param('usuario',function(request,response,next,name){ //param (guardar dato en el midelware)
    console.log("USUARIO PARAM: "+ name);
    if (name.match(/^[a-z0-9_]*$/i)) { 
      request.user = name;
      console.log("request: "+ request.user);
    } else {  
      next(new Error(`<${name}> does not match 'usuario' requirements`));
    }
    next();
});

// //gardamos la contrasenia en el server
// app.param('contrasenia',function(request,response,next,contrasenia){ //param (guardar dato en el midelware)

//     console.log("CONTRASENIA PARAMs: "+ contrasenia);
//     if (contrasenia.match(/^[a-z0-9_]*$/i)) { 
//       request.contrasenia = contrasenia;
//       console.log("request: "+ request.contrasenia);
//     } else {  
//       next(new Error(`<${contrasenia}> does not match 'usuario' requirements`));
//     }
//     next();
// });

// //guardamos el correo en el server
// app.param('correo',function(request,response,next,correo){ //param (guardar dato en el midelware)

//     console.log("CoRREO PARAMs: "+ correo);
//     //if (correo.match(/^[a-z0-9_]*$/i)) { 
//       request.correo = correo;
//       console.log("request: "+ request.correo);
//     //} else {  
//     //  next(new Error(`<${correo}> does not match 'usuario' requirements`));
//     //}
//     next();
// });



//Opcion de boton registrarse, busca en la bdd y sino lo crea

// app.get('/buscar/:usuario/:contrasenia/:correo',function(request,response,next){//Para llegar aqi primero tiene q haber un nombre en la etiqueta name_user
//     console.log("Midelware Buscamos usuario ->"+request.user);
//     console.log("Midelware Buscamos cprreo ->"+request.correo);
//     console.log("Midelware Buscamos password ->"+request.contrasenia);
//      mongodb.User.find({name: request.user, contrasenia: request.contrasenia},function(err,docs){
         
//           if(docs.length > 0){
//                 //console.log("Error:"+err);
//                 console.log("Id de usuario:"+docs[0]._id);
//                 /*var id = new ObjectId(data[0]._id);
//                 console.log("Id:"+id._id);*/
//                 const id = mongoose.Types.ObjectId(docs[0]._id);
//                 console.log("Id:"+id);
//                 console.log("NAME: "+docs[0].name);
//                 console.log("FIND: "+ mongodb.Acumulador.find({_creator: id}));
//                 mongodb.Acumulador.find({_creator: id},function(err,docs_acum){//BUsca en acumulador y devuelve lo relacionado a ID
//                     if(err) {
//                         console.error("Se ha producido un error->"+err);
//                     } else {
//                         console.log("EL USUARIO EXISTE EN LA BDD")
//                         console.log("ACUMULADOR: "+docs_acum.acu);
//                         console.log("Buscamos por la ID del usuario: "+docs[0].name+"  Acumulador:"+docs_acum);    
//                     }
//                      //response.send({contenido: docs[0].name, usuario_propietario: id,todo:docs_acum});
//                      //console.alert("Usuario ya existente");
//                      //response.send(docs);
//                     response.render('super_principal',{name: docs[0].name, usuario_propietario: id,title: "SUPER APP"});
//                 });
//           }else{
    
//               let usuario_app = new mongodb.User({
//                     name:request.user,
//                     correo: request.correo,
//                     contrasenia: request.contrasenia
//                 });
//                 usuario_app.save(function(err){
//                 if(err) return console.log(err);
//                 console.log("Antes de enviar respuesta");
//                 //response.next({contenido: " ", usuario_propietario: usuario_app._id, todo: " "});
//                 //response.render('super_principal', {contenido: " ", usuario_propietario: usuario_app._id, todo: " ",title: "SUPER APP"});
//                 }).then(() => {
//                 console.log(`El usuario buscado no se encuentra en BDD por tanto lo creamos: ${usuario_app}`);
//                 response.render('super_principal', {contenido: " ", usuario_propietario: usuario_app._id, todo: " ",title: "SUPER APP"});
//                 });
//               //response.send({contenido: docs, usuario_propietario: id});
//           }
//           //response.send(docs);
//           // response.send({contenido: docs, usuario_propietario: docs[0]._id,name:docs[0].name});
//      });
// });





//Opcion de boton inicio de sesion, busca en la bdd y sino lo crea
//!!!!app.post pero no renderiza!!!!!!!
// app.get('/sesion/:usuario/:contrasenia',function(request,response,next){//Para llegar aqi primero tiene q haber un nombre en la etiqueta name_user
//     console.log("Midelware Buscamos usuario ->"+request.user);
    
//     console.log("Midelware Buscamos password ->"+request.contrasenia);
//      mongodb.User.find({name: request.user, contrasenia: request.contrasenia},function(err,docs){
         
//           if(docs.length > 0){
//         //         //console.log("Error:"+err);
//         //         console.log("Id de usuario:"+docs[0]._id);
//         //         /*var id = new ObjectId(data[0]._id);
//         //         console.log("Id:"+id._id);*/
//         //         const id = mongoose.Types.ObjectId(docs[0]._id);
//         //         console.log("Id:"+id);
//         //         console.log("NAME: "+docs[0].name);
//         //         console.log("FIND: "+ mongodb.Acumulador.find({_creator: id}));
//         //         mongodb.Acumulador.find({_creator: id},function(err,docs_acum){//BUsca en acumulador y devuelve lo relacionado a ID
//         //             if(err) {
//         //                 console.error("Se ha producido un error->"+err);
//         //             } else {
//         //                 console.log("EL USUARIO EXISTE EN LA BDD")
//         //                 console.log("ACUMULADOR: "+docs_acum.acu);
//         //                 console.log("Buscamos por la ID del usuario: "+docs[0].name+"  Acumulador:"+docs_acum);    
//         //             }
//                      //response.send({contenido: docs[0].name, usuario_propietario: id,todo:docs_acum});
//                      //console.alert("Usuario ya existente"); 
//                      //response.send(docs);
//                     response.render('super_principal',{/*name: docs[0].name, usuario_propietario: id,*/title:"Bienvenido a su SUPER APP"});
                
//           }else{
//               //response.send({contenido: docs, usuario_propietario: id});
//               console.log("El usuario no se encuentra en la BDD");
//               response.render('error', {title:"ERROR NO EXISTE EN LA BDD"});
//           }
//      });
//           //response.render('error', {title:"ERROR NO EXISTE EN LA BDD"});
//           //next();
//           //response.send(docs);
//           // response.send({contenido: docs, usuario_propietario: docs[0]._id,name:docs[0].name});
//      //});
//      response.render('error', {title:"ERROR NO EXISTE EN LA BDD"});
// });



//PRUEBA**********************************

app.get('/sesion',function(request,response,next){//Para llegar aqi primero tiene q haber un nombre en la etiqueta name_user
    console.log("NOMBRE EN SESION: "+request.query.name);
    console.log("CONTRASEÑA EN SESION: "+request.query.contrasenia);
    
      mongodb.User.find({contrasenia: request.query.contrasenia},function(err,docs){
         console.log("BUScamos en la BDD de userS, tamanio del documento"+docs.length);
          
           if(docs.length > 0){
               
               console.log("Entro en el documento a buscar");
                    response.render('super_principal',{title:"Bienvenido a su SUPERonline",name:'request.query.name'});
                
           }else{
               //response.send({contenido: docs, usuario_propietario: id});
               console.log("El usuario no se encuentra en la BDD");
               response.render('error', {title:"ERROR NO EXISTE EN LA BDD"});
           }
     });
    

});



//Creacion de usuarios en BDD mongo

app.get('/newuser',function(request,response,next){//Para llegar aqi primero tiene q haber un nombre en la etiqueta name_user
    console.log("NOMBRE EN SESION dentro de NEWUSER: "+request.query.name);
    console.log("CONTRASEÑA EN SESION dentro de NEWUSER: "+request.query.correo);
    console.log("CONTRASEÑA EN SESION dentro de NEWUSER: "+request.query.contrasenia);
    
    console.log("Entramos en new user");
                    let name_user = request.query.name;
                    let pass = request.query.contrasenia;
                    let correo = request.query.correo;
                    
                 
                    console.log("nombre: "+name_user);
                    console.log("valor de password: "+pass);
                    console.log("valor de correo: "+correo);
                    let usuario_app = new mongodb.User({
                        name:name_user,
                        contrasenia: pass,
                        correo:correo
                    });
                    usuario_app.save(function(err){
                        if(err) return console.log(err);
                    console.log(`Saved en new user: ${usuario_app}`);
                    });
    
    
    response.render('super_principal',{title:"MY APP NEW USER"});
    
    // if (response.headersSent) return;
    // response['redisInfo'] = response;
    // response.status(200).send({"test message from SmartConnect": response});
    //    // TypeError: Converting circular structure to JSON
    //    // at Object.stringify (native)
    
    //   mongodb.User.find({name:request.query.name,contrasenia: request.query.contrasenia},function(err,docs){
    //      console.log("Buscamos en docuemtno BDD newuser con long: "+docs.length);
          
    //       if(docs.length > 0){
               
    //           console.log("Entro en el documento a buscar");
    //                 //response.render('super_principal',{title:"Bienvenido a su SUPERonline",name:'request.query.name'});
    //                 // response.render('error', {title:"El usuario actual Se encuentra en BDD"});
    //       }else{
    //           //response.send({contenido: docs, usuario_propietario: id});
    //           console.log("El usuario no se encuentra en la BDD");
    //           //response.render('super_principal',{title:"Bienvenido a su SUPERonline",name:'request.query.name'});
    //           // response.render('error', {title:"El usuario actual no posee facturas"});
    //       }
    //  });
    
    
});

// app.get('/newuser', function (request, response,next){//midelware para la creacion de un usuario a la bdd
//     console.log("NOMBRE EN NEW USR: "+request.query.name1);
//     console.log("CORREO EN NEW USER"+request.query.correo1);
//     console.log("CONTRASEÑA EN NEW USER: "+request.query.contrasenia1);

    
//       mongodb.User.find({name:request.query.name1,contrasenia: request.query.contrasenia1},function(err,docs){
//          console.log("BUScamos en la BDD de userS de newuser, tamanio del documento"+docs.length);
          
//           if(docs.length > 0){
               
//               console.log("Entro en el documento a buscar");
//               response.render('error', {title:"ERROR YA EXISTE EN LA BDD"});
              
//                     //response.render('super_principal',{title:"Bienvenido a su SUPERonline",name:'request.query.name'});
                
//           }else{
//               //response.send({contenido: docs, usuario_propietario: id});
//               console.log("El usuario no se encuentra en la BDD");
//               console.log("Entramos en new user");
//                     let name_user = request.query.name1;
//                     let pass = request.query.contrasenia1;
//                     let correo = request.query.correo1;
                    
                 
//                     console.log("nombre: "+name_user);
//                     console.log("valor de password: "+pass);
//                     console.log("valor de correo: "+correo);
//                     let usuario_app = new mongodb.User({
//                         name:name_user,
//                         contrasenia: pass,
//                         correo:correo
//                     });
//                     usuario_app.save(function(err){
//                         if(err) return console.log(err);
//                     console.log(`Saved en new user: ${usuario_app}`);
//                     });
//               response.render('super_principal',{title:"Bienvenido a su SUPERonline",name:'request.query.name'});
//               //response.render('error', {title:"ERROR NO EXISTE EN LA BDD"});
//           }
//      });
   
    
//     //response.render('error',{title:"LLEGAMO AQIII"});
// });


//FACTURA PRUEBA donde guardamos la factura en la BDD y la enviamos para crear el template

app.get('/generar/:usuario',function(request,response,next){//Para llegar aqi primero tiene q haber un nombre en la etiqueta name_user
    console.log("request user"+request.user);
    console.log("VALOR DE FACTURA EN GENERAR: "+request.query.factura);
    console.log("TOTAL DE LA FACTURA"+request.query.total);
    
    mongodb.User.find({name: request.user},function(err,docs){
        console.log("longitud devuelta"+docs.length);
         if(docs.length > 0){
                //console.log("Error:"+err);
                console.log("Id de usuario:"+docs[0]._id);
                /*var id = new ObjectId(data[0]._id);
                console.log("Id:"+id._id);*/
                const id = mongoose.Types.ObjectId(docs[0]._id);
                console.log("Id:"+id);
                console.log("NAME: "+docs[0].name);
                console.log("correo: "+docs[0].correo);
                console.log("password: "+docs[0].contrasenia);
                console.log("FIND: "+ mongodb.Acumulador.find({_creator: id}));
                mongodb.Acumulador.find({_creator: id},function(err,docs_a){
                    console.log("Dentro de acumulador de facturas: " + docs_a.length);
                    let nueva_factura = new mongodb.Acumulador({
                            factura: request.query.factura,
                            _creator: id
                    });
                    //Guardamos tabla en BD
                    nueva_factura.save(function(err){
                           if(err) return console.log(err); 
                           console.log(`Guardada nueva factura: ${nueva_factura}`+`ID del creador ${nueva_factura._creator}`);
                    });
                });
                response.send({name:request.user,factura:request.query.factura,total: request.query.total});
         }else{
             //El usuario no existe;
             console.log("El usuario no existe");
             response.send({error:"El usuario introducido no es correcto"});
         }
        
    });
    
    //response.send({name:request.user,factura:request.query.factura,total: request.query.total});
    

});


//Registrarse

// app.get('/buscar',function(request,response,next){//Para llegar aqi primero tiene q haber un nombre en la etiqueta name_user
    
//     console.log("Midelware Buscamos usuario ->"+request.query.name);
//     console.log("Midelware Buscamos cprreo ->"+request.query.correo);
//     console.log("Midelware Buscamos password ->"+request.query.contrasenia);
//      mongodb.User.find({name:request.query.name,contrasenia: request.query.contrasenia},function(err,docs){
//          console.log("BUScamos en la BDD de userS en buscar, tamanio del documento"+docs.length);
          
//           if(docs.length > 0){
               
//               console.log("Entro en el documento a buscar");
                    
                
//           }else{
//               //response.send({contenido: docs, usuario_propietario: id});
//               console.log("El usuario no se encuentra en la BDD");
//               let usuario_app = new mongodb.User({
//                     name:request.user,
//                     correo: request.correo,
//                     contrasenia: request.contrasenia
//                 });
//                 usuario_app.save(function(err){
//                 if(err) return console.log(err);
//                 console.log(`Guardada nuevo usuario: ${usuario_app}`+`nombre del creador :${usuario_app.name}`);
//                 console.log("Antes de enviar respuesta");
//                 //response.next({contenido: " ", usuario_propietario: usuario_app._id, todo: " "});
//                 //response.render('super_principal', {contenido: " ", usuario_propietario: usuario_app._id, todo: " ",title: "SUPER APP"});
//                 });
               
               
//               response.render('super_principal',{title:"Bienvenido a su SUPERonline",name:request.query.name});
//           }
//      });

//     //       if(docs.length > 0){
//     //             //console.log("Error:"+err);
//     //             console.log("Id de usuario:"+docs[0]._id);
//     //             /*var id = new ObjectId(data[0]._id);
//     //             console.log("Id:"+id._id);*/
//     //             const id = mongoose.Types.ObjectId(docs[0]._id);
//     //             console.log("Id:"+id);
//     //             console.log("NAME: "+docs[0].name);
//     //             console.log("FIND: "+ mongodb.Acumulador.find({_creator: id}));
//     //             mongodb.Acumulador.find({_creator: id},function(err,docs_acum){//BUsca en acumulador y devuelve lo relacionado a ID
//     //                 if(err) {
//     //                     console.error("Se ha producido un error->"+err);
//     //                 } else {
//     //                     console.log("EL USUARIO EXISTE EN LA BDD")
//     //                     console.log("ACUMULADOR: "+docs_acum.acu);
//     //                     console.log("Buscamos por la ID del usuario: "+docs[0].name+"  Acumulador:"+docs_acum);    
//     //                 }
//     //                  //response.send({contenido: docs[0].name, usuario_propietario: id,todo:docs_acum});
//     //                  //console.alert("Usuario ya existente");
//     //                  //response.send(docs);
//     //                 response.render('super_principal',{name: docs[0].name, usuario_propietario: id,title: "SUPER APP"});
//     //             });
//     //       }else{
    
//     //           let usuario_app = new mongodb.User({
//     //                 name:request.user,
//     //                 correo: request.correo,
//     //                 contrasenia: request.contrasenia
//     //             });
//     //             usuario_app.save(function(err){
//     //             if(err) return console.log(err);
//     //             console.log("Antes de enviar respuesta");
//     //             //response.next({contenido: " ", usuario_propietario: usuario_app._id, todo: " "});
//     //             //response.render('super_principal', {contenido: " ", usuario_propietario: usuario_app._id, todo: " ",title: "SUPER APP"});
//     //             }).then(() => {
//     //             console.log(`El usuario buscado no se encuentra en BDD por tanto lo creamos: ${usuario_app}`);
//     //             response.render('super_principal', {contenido: " ", usuario_propietario: usuario_app._id, todo: " ",title: "SUPER APP"});
//     //             });
//     //           //response.send({contenido: docs, usuario_propietario: id});
//     //       }
//     //       //response.send(docs);
//     //       // response.send({contenido: docs, usuario_propietario: docs[0]._id,name:docs[0].name});
//     //  });
// });

/************************
 * 
 * /////////////buscar_facturas/////////*/
 
 app.get('/factura/:usuario',function(request,response,next){//Para llegar aqi primero tiene q haber un nombre en la etiqueta name_user
    console.log("NOMBRE EN buscar factura dentro de facturas: "+request.user);
     mongodb.User.find({name: request.user},function(err,data){
        if(err){
            console.error("Se ha producido un error al acceder a la BDD (User): "+err);
        }else{
            if(data.length > 0){
                console.log("Id de usuario:"+data[0]._id);
                const id = mongoose.Types.ObjectId(data[0]._id);
                console.log("Id:"+id);
                mongodb.Acumulador.find({_creator: id},function(err,docs){
                    if(err){
                        console.error("Se ha producido un error al acceder a la BDD (Acumulador): "+err);
                    }else{
                        console.log("Facturas asociada:"+docs);    
                    }
                    response.send({name:request.user,factura: docs});
                });
            }else{
                console.log("El usuario no tiene facturas");
            }
        }
    });
//       mongodb.User.find({name: request.user},function(err,docs){
//          console.log("estamos en facturaaaaa buscando por user long: "+docs.length);
          
//           if(docs.length > 0){
//               console.log("Entro en el documento USER a buscar");
//               console.log("Id de usuario: "+docs[0]._id);
// //     //             /*var id = new ObjectId(data[0]._id);
// //     //             console.log("Id:"+id._id);*/
//                 const id = mongoose.Types.ObjectId(docs[0]._id);
//               mongodb.Acumulador.find({_creator:docs[0].id}),function(err,docs){
//                   console.log("Entro en el documento ACUMULADOR buscando por id"+id+docs.length);
//                   if(err){
//                         console.error("Se ha producido un error al acceder: "+err);
//                     }else{
//                         console.log("Enviando dattos a csv.js => Tablas asociadas:"+docs);    
//                     }
//                     //response
//               };
//               console.log("Volvemos a user");
//                     //response.render('super_principal',{title:"Bienvenido a su SUPERonline",name:'request.query.name'});
                
//           }else{
//               //response.send({contenido: docs, usuario_propietario: id});
//               console.log("El usuario no se encuentra en la BDD");
//               //response.render('error', {title:"El usuario actual no posee facturas"});
//           }
//      });
    

});
 
 
 
 /*****************/

//******************************************

/*****************************************
app.get('/sesion',function(request,response,next){//Para llegar aqi primero tiene q haber un nombre en la etiqueta name_user   
    var nom = request.user;
    var key = request.contrasenia;
// console.log("Midelware Buscamos usuario ->"+request.user);
    console.log("Midelware Buscamos usuario ---------------------------->"+request.user);
    console.log("Midelware Buscamos password ->"+request.contrasenia);
     mongodb.User.find({name: nom, contrasenia: key},function(err,docs){
         
           if(docs.length > 0){
                console.log("ENTRAMOS EN LA BUSQUEDA:");
                console.log("Id de usuario:"+docs[0]._id);
                var id = new ObjectId(data[0]._id);
                console.log("Id:"+id._id);
                const id = mongoose.Types.ObjectId(docs[0]._id);
                console.log("Id:"+id);
                console.log("NAME: "+docs[0].name);
                console.log("FIND: "+ mongodb.Acumulador.find({_creator: id}));
                mongodb.Acumulador.find({_creator: id},function(err,docs_acum){//BUsca en acumulador y devuelve lo relacionado a ID
                    if(err) {
                        console.error("Se ha producido un error->"+err);
                    } else {
                        console.log("EL USUARIO EXISTE EN LA BDD")
                        console.log("ACUMULADOR: "+docs_acum.acu);
                        console.log("Buscamos por la ID del usuario: "+docs[0].name+"  Acumulador:"+docs_acum);    
                    }
                     //response.send({contenido: docs[0].name, usuario_propietario: id,todo:docs_acum});
                     //console.alert("Usuario ya existente"); 
                     //response.send(docs);
                    response.render('super_principal',{name: docs[0].name, usuario_propietario: id,title:"Bienvenido a su SUPER APP"});
                });
           }else{
               //response.send({contenido: docs, usuario_propietario: id});
               console.log("El usuario no se encuentra en la BDD");
               response.render('error', {title:"ERROR NO EXISTE EN LA BDD"});
           }
           //response.render('error', {title:"ERROR NO EXISTE EN LA BDD"});
           //next();
           //response.send(docs);
          // response.send({contenido: docs, usuario_propietario: docs[0]._id,name:docs[0].name});
     });
     //response.render('error', {title:"ERROR NO EXISTE EN LA BDD"});
});


/*******************************************/

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});