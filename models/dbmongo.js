(function() {
  "use strict";
  
  const util = require('util');
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/calcula', function(err) {  
      if(err) {
          console.log('ERROR: connecting to Database. ' + err);
      }else{
          console.log("Ha accedido con exito a mongodb");
      }
  });
    
  let Schema = mongoose.Schema;


  let UserSchema = new Schema({
         name: String,
         correo: String,
         contrasenia:String
        // _creator: [{type: Schema.Types.ObjectId, ref: 'Acumulador'}]
         
     });
   
   
    let AcumuladorSchema = new Schema({
        factura: String,
        total: Number,
        _creator: [{type: Schema.Types.ObjectId, ref: 'User'}]//Schema.Types.ObjectId
    });

    const Acumulador  = mongoose.model('Acumulador', AcumuladorSchema);
    const User = mongoose.model('User', UserSchema);
    
    
     User.remove({}).then(() => {
        Acumulador.remove({}).then(() => {
            
               
               let usuario_prueba1 = new User({
                    name: "Joaquin",
                    correo : "joaqin@gmail.com",
                    contrasenia : "1234"
               });
               
               
               usuario_prueba1.save(function(err){
                    if(err) return console.log(err);
                   console.log(`Saved: ${usuario_prueba1}`);
                
                
                
                let operacion_1 = new Acumulador({
                        factura: '5kg de pollo, 8€, 3 KG de chuleta 6€ ',
                        total:14,
                        _creator: usuario_prueba1._id
                });
                    //Guardamos tabla en BD
                operacion_1.save(function(err){
                       if(err) return console.log(err); 
                       //console.log(`Saved: ${operacion_1}`);
                }).then(()=>{
                        Acumulador
                        .findOne({factura:9})
                        .populate('_creator')
                        .exec(function(err,docs){
                            if(err) return console.log(err);
                         //   console.log('Propietario de resultado: %s',docs._creator);
                        }).then( () => {
                           //mongoose.connection.close(); 
                        });
                });
              });
               
               
               let usuario_prueba2 = new User({
                    name: "Fausto",
                    correo : "fausto@gmail.com",
                    contrasenia : "5678"
               });
               usuario_prueba2.save(function(err){
                    if(err) return console.log(err);
                   console.log(`Saved: ${usuario_prueba2}`);
                    //Ejemplos por defecto
                    let operacion_2 = new Acumulador({
                        factura: '5kg de platano 7€, 6 KG de tomate 6€ ',
                        total: 13,
                        _creator: usuario_prueba2._id
                    });
                    //Guardamos tabla en BD
                    operacion_2.save(function(err){
                       if(err) return console.log(err); 
                       //console.log(`Saved: ${operacion_2}`);
                    }).then(()=>{
                        Acumulador
                        .findOne({factura:'12'})
                        .populate('_creator','name')
                        .exec(function(err,docs){
                            if(err) return console.log(err);
                            //console.log('Propietario de resultado: %s',docs._creator);
                        }).then( () => {
                           //mongoose.connection.close(); 
                        });
                    });
               });
                        /*** Usuario 3 ***/
                        let usuario_prueba3 = new User({
                            name: "Pepe",
                            correo : "pepe@gmail.com",
                            contrasenia : "pepe1"
                        });
                        
                         usuario_prueba3.save(function(err){
                    if(err) return console.log(err);
                    console.log(`Saved: ${usuario_prueba3}`);
                
                
                
                let operacion_3 = new Acumulador({
                        factura: '5kg de sardinas 12€, 3 KG de vicuda 9€ ',
                        total: 21,
                        _creator: usuario_prueba3._id
                });
                    //Guardamos tabla en BD
                operacion_3.save(function(err){
                       if(err) return console.log(err); 
                       //console.log(`Saved: ${operacion_3}`);
                }).then(()=>{
                        User
                        .findOne({name:'Pepe'})
                        .populate('_creator')
                        .exec(function(err,docs){
                            if(err) return console.log(err); 
                            //console.log('Documentos de Fausto: %s',docs);
                            //console.log('Total de elementos en la BDD %s'docs.count());
                        }).then( () => {
                           //mongoose.connection.close(); 
                        //   if(docs.name == "Fausto")
                        //   console.log('Documentos de Fausto: %s',docs);
                        });
                });
              });
            //
                        
                        // Intentando buscar todos los documentos de un usuario
        
            
            
        });
    });
 
  
  
  module.exports = { User:User, Acumulador:Acumulador };
})();