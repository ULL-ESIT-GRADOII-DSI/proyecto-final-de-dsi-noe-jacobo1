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
      acu: String,
      _creator: [{type: Schema.Types.ObjectId, ref: 'User'}]
    });
    
    
    const User = mongoose.model('User', UserSchema);
    const Acumulador  = mongoose.model('Acumulador', AcumuladorSchema);
    
    
     User.remove({}).then(() => {
        Acumulador.remove({}).then(() => {
              
              
            let user1  = new User({
                  name: "Eustaquio"
            });
               
            user1.save(function(err){
                if(err) return console.log(err);
                console.log(`Saved usuario : ${user1}`);
                    
            //Ejemplos por defecto
            let acum = new Acumulador({
                        acu : "9",
                        _creator: user1._id
            });
                    
            acum.save(function(err){
                if(err) return console.log(err); 
                    console.log(`Saved entrada: ${acum}`);
            }).then(()=>{
                Acumulador
                .findOne({ acu: "9", })
                .populate('_creator')
                .exec(function(err,docs){
                        if(err) return console.log(err);
                        console.log('Mostramos las entrada: %s',docs._creator);
                }).then( () => {
                           //mongoose.connection.close(); 
                        });
              });
            });
        });
    });

   
   
 
  
  
  module.exports = { Datos:User, Entrada:Acumulador };
})();