((){
  "use strict";//utiliza el modo estricto donde no se puede utilizar variables no declaradas
//var Operandos = require("./principal.js");


/////////////////////SUMA/////////////////////////
function Suma(operando1,operando2)
{
//console.log("dentro de constrcutor suma"+ "simbolo:"+operando1+"operando2"+operando2);
Operando.call(this,operando1,operando2);
}


Suma.prototype = new Operandos();
Suma.prototype.constructor = Suma;
Operandos.measures.s = Suma;

Suma.prototype.resultado_operacion = function(){
return (op1 + op2);
};
//__________________________________________________


////////////////// Resta /////////////////
function Resta(operando1, operando2)
{
    Operandos.call(this, operando1, operando2);
}

Resta.prototype = new Operandos();
Resta.prototype.constructor = Resta;
//Operandos.measures.r = Resta;

Resta.prototype.resultado_operacion = function(){
return (op1 - op2);
};
//__________________________________________________


////////////////// Multiplicacion /////////////////
function Multiplicacion(operando1, operando2)
{
    Operandos.call(this, operando1, operando2);
}

Multiplicacion.prototype = new Operandos();
Multiplicacion.prototype.constructor = Multiplicacion;
//Operandos.measures.m = Multiplicacion;

Multiplicacion.prototype.resultado_operacion = function(){
return (op1 * op2);
};
//__________________________________________________


////////////////// Division /////////////////
function Division(operando1, operando2)
{
    Operandos.call(this, operando1, operando2);
}

Division.prototype = new Operandos();
Division.prototype.constructor = Division;
Operandos.measures.d = Division;

Division.prototype.resultado_operacion = function(){
return (op1 / op2);
};
//__________________________________________________

 module.exports = { Suma:Suma, Resta:Resta, Multiplicacion:Multiplicacion, Division:Division, Operandos:Operandos };


})();