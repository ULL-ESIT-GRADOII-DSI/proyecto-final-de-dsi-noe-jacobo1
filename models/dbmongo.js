(function() {
  "use strict";
  
  const util = require('util');
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/calcula', function(err, res) {  
      if(err) {
          console.log('ERROR: connecting to Database. ' + err);
      }else{
          console.log("Ha accedido con exito a mongodb");
      }
  });
    
    let Schema = mongoose.Schema;

    

   
  let UserSchema = new Schema({
         name: String
     });
   
   
    let AcumuladorSchema = new Schema({
        acu: Number,
        _creator: [{type: Schema.Types.ObjectId, ref: 'User'}]//Schema.Types.ObjectId
    });

    const Acumulador  = mongoose.model('Acumulador', AcumuladorSchema);
    const User = mongoose.model('User', UserSchema);
    
    
     User.remove({}).then(() => {
        Acumulador.remove({}).then(() => {
            
               
               let usuario_prueba1 = new User({
                    name: "Joaquin"
               });
               
               
               usuario_prueba1.save(function(err){
                    if(err) return console.log(err);
                    console.log(`Saved: ${usuario_prueba1}`);
                
                
                
                let operacion_1 = new Acumulador({
                        acu: 9,
                        _creator: usuario_prueba1._id
                });
                    //Guardamos tabla en BD
                operacion_1.save(function(err){
                       if(err) return console.log(err); 
                       console.log(`Saved: ${operacion_1}`);
                }).then(()=>{
                        Acumulador
                        .findOne({acu:9})
                        .populate('_creator')
                        .exec(function(err,docs){
                            if(err) return console.log(err);
                            console.log('Propietario de resultado: %s',docs._creator);
                        }).then( () => {
                           //mongoose.connection.close(); 
                        });
                });
              });
               
               
               let usuario_prueba2 = new User({
                    name: "Fausto"
               });
               usuario_prueba2.save(function(err){
                    if(err) return console.log(err);
                    console.log(`Saved: ${usuario_prueba2}`);
                    //Ejemplos por defecto
                    let operacion_2 = new Acumulador({
                        acu: 12,
                        _creator: usuario_prueba2._id
                    });
                    //Guardamos tabla en BD
                    operacion_2.save(function(err)
                    {
                       if(err) return console.log(err); 
                       console.log(`Saved: ${operacion_2}`);
                    }).then(()=>{
                        Acumulador
                        .findOne({acu:'12'})
                        .populate('_creator','name')
                        .exec(function(err,docs){
                            if(err) return console.log(err);
                            console.log('Propietario de resultado: %s',docs._creator);
                        }).then( () => {
                           //mongoose.connection.close(); 
                        });
                    });
               });
            
        });
    });
 
  
  
  module.exports = { User:User, Acumulador:Acumulador };
})();