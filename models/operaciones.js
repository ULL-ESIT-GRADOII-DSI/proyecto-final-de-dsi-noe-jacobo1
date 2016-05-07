(function(exports){
  "use strict";//utiliza el modo estricto donde no se puede utilizar variables no declaradas




/********** SUMA **********/

function Suma(operando1,operando2){
    
  console.log("dentro de constrcutor celsius"+ "operando1:"+operando1+"operando2"+operando2);
  Conversion.call(this,operando1,"+");
}
Suma.prototype = new Conversion();//heredamos de temp
Suma.prototype.constructor = Suma;
//Medida.measures.c = Celsius;

// Suma.prototype.+ = function(){
//   return ((this.value * 9/5) + 32);
// };

/*************************/




exports.Suma=Suma;

})(this);