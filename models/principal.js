(() => {
"use strict";
// Comprobar el correcto funcionamiento de XRegExp

var XRegExp = require('xregexp');
//var patron = XRegExp( '(?<operando1> [+-]?[0-9]+)(,?[+-]?[0-9]+)? #operando1 (?<operacion> [+|-|*|/])? #operacion (?<operando2> [+-]?[0-9]+)(,?[+-]?[0-9]+)? #operando2','ix');

var patron = XRegExp( '(?<operando1> [+-]?[0-9]+(,?[+-]?[0-9]+)?) #operando1  \n'+
                      '(?<operacion> [+|-|*|/]) #operacion \n'+
                      '(?<operando2> [+-]?[0-9]+(,?[+-]?[0-9]+)?) #operando2','ix');

/////////////////////SUMAA/////////////////////////
function Suma(operando1,operando2){
    
  console.log("dentro de constrcutor celsius"+ "simbolo:"+operando1+"operando2"+operando2);
  Operandos.call(this,operando1,operando2);
}
Suma.prototype = new Operandos();
Suma.prototype.constructor = Suma;
Operandos.measures.s = Suma;

Suma.prototype.toSuma = function(){
  return ((this.operando1 + this.operando2));
};
//////////////////////////////////


//Clase operandos
function Operandos(operando1,operando2){
 console.log("OP1 y OP2"+operando1 + operando2);
 this.operando1=operando1;
 this.operando2=operando2;
 console.log("operando1 :"+operando1+ "  operando_2  "+operando2);
}


Operandos.constructor = Operandos;
Operandos.measures = Operandos.measures || {};

Operandos.match = function(entrada){
 var expre=XRegExp.exec(entrada, patron);
 console.log("Hecho el match->"+expre);
 return expre;
}


const Conversion = (entrada) => {  //recoge el número pulsado en el argumento.

var measures = Operandos.measures;
var match = Operandos.match(entrada);

console.log("Measures creado"+measures);

if(match){
 console.log("La expresión casó.");
 var operando1 = match.operando1;
 var operando2 = match.operando2;
 var simbolo = match.operacion;
  var prueba = 'suma';
  console.log(prueba);
 console.log("operando1 :"+operando1+"  op  "+simbolo+ "  operando_2  "+operando2);
 //Operandos.Suma(operando1,operando2);
 var source = new measures['s'];
 //var source = new measures[simbolo].name;
 console.log(">Source"+source);
}else {
    console.log("Fracaso");
}
    //console.log("Mostramos la entrada en conversion "+entrada);
    

    
};
 exports.Suma = Suma;
 module.exports = Conversion;
 //module.exports = Suma;
 
})(this);