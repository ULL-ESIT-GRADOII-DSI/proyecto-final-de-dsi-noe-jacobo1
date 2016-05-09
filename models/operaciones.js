(function(exports){
  "use strict";//utiliza el modo estricto donde no se puede utilizar variables no declaradas

/////////////////////SUMA/////////////////////////
function Suma(operando1,operando2){
    
console.log("dentro de constrcutor suma"+ "simbolo:"+operando1+"operando2"+operando2);
Operandos.call(this,operando1,operando2);
}


Suma.prototype = new Operandos();
Suma.prototype.constructor = Suma;
Operandos.measures.s = Suma;

Suma.prototype.resultado_operacion = function(){
   var op1 = parseInt(this.operando1);
   var op2 = parseInt(this.operando2);
return (op1 + op2);
};
//////////////////////////////////

////////// Resta ////////////
function Resta(operando1, operando2)
{
    Operandos.call(this, operando1, operando2);
}

Resta.prototype = new Operandos();
Resta.prototype.constructor = Resta;
Operandos.measures.r = Resta;

Resta.prototype.resultado_operacion = function(){
   var op1 = parseInt(this.operando1);
    var    op2 = parseInt(this.operando2);
return (op1 - op2);
};



exports.Suma=Suma;
exports.Resta=Resta;

})(this);