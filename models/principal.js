(() => {
"use strict";
// Comprobar el correcto funcionamiento de XRegExp

var XRegExp = require('xregexp');
//var patron = XRegExp( '(?<operando1> [+-]?[0-9]+)(,?[+-]?[0-9]+)? #operando1 (?<operacion> [+|-|*|/])? #operacion (?<operando2> [+-]?[0-9]+)(,?[+-]?[0-9]+)? #operando2','ix');

var patron = XRegExp( '(?<operando1> [+-]?[0-9]+(,?[+-]?[0-9]+)?) #operando1  \n'+
                      '(?<operacion> [*|-|*|/]) #operacion \n'+
                      '(?<operando2> [+-]?[0-9]+(,?[+-]?[0-9]+)?) #operando2','ix');


//Clase operandos
function Operandos(operando1,operando2){
 console.log("OP1 y OP"+operando1 + operando2);
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
  
 console.log("operando1 :"+operando1+ "  operando_2  "+operando2+"  simbolo  "+simbolo);

}else {
    console.log("Fracaso");
}
    //console.log("Mostramos la entrada en conversion "+entrada);
    

    
};

 module.exports = Conversion;
})();