(() => {
"use strict";
// Comprobar el correcto funcionamiento de XRegExp

var XRegExp = require('xregexp');
//var patron = XRegExp( '(?<operando1> [+-]?[0-9]+)(,?[+-]?[0-9]+)? #operando1 (?<operacion> [+|-|*|/])? #operacion (?<operando2> [+-]?[0-9]+)(,?[+-]?[0-9]+)? #operando2','ix');

var patron = XRegExp( '(?<operando1> [+-]?[0-9]+(,?[+-]?[0-9]+)?) #operando1  \n'+
                      '(?<operacion> [-\+\*/]) #operacion \n'+
                      '(?<operando2> [+-]?[0-9]+(,?[+-]?[0-9]+)?) #operando2','ix');













/**/
//Clase operandos
function Operandos(operando1,operando2){
 //console.log("OP1 y OP2"+operando1 + operando2);
 
 this.operando1=operando1;
 this.operando2=operando2;
 console.log("\noperando1 en la clase operandos :"+operando1+ " en la clase operandos operando_2  "+operando2);
}


Operandos.constructor = Operandos;
Operandos.measures = Operandos.measures || {};
/**/
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
    var    op2 = parseInt(this.operando2);
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


/***/

Operandos.match = function(entrada){
var expre=XRegExp.exec(entrada, patron);
console.log("Hecho el match->"+expre);
return expre;
}


const Conversion = (entrada) => {  //recoge el número pulsado en el argumento.

var measures = Operandos.measures;
var match = Operandos.match(entrada);

console.log("Measures creado"+measures);

/**********************/
function traduccion(simbolo_entrada)
{
    if(simbolo_entrada == "+")
    return "s";
    if(simbolo_entrada == "-")
    return "r";
};
/**********************/


if(match){
 console.log("La expresión casó y estamos dentro del match.");
 var operando1 = match.operando1;
 var operando2 = match.operando2;
 //var simbolo = match.operacion;
 var simbolo = traduccion(match.operacion);
 console.log("\nContenido de símbolo -------> "+simbolo);
 console.log("operando1 :"+operando1+"  op  "+simbolo+ "  operando_2  "+operando2); //aquí llegan bien los datos.
 
 var source = new measures[simbolo](operando1,operando2);
 var resultado = source.resultado_operacion();
 
 console.log(">Resultado--->"+resultado);
}else {
    console.log("Fracaso");
}
    //console.log("Mostramos la entrada en conversion "+entrada);
    

    
};
 exports.Suma = Suma;
 module.exports = Conversion;
 //module.exports = Suma;
 
})(this);