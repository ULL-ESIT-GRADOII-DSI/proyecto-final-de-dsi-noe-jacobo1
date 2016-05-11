(() => {
"use strict";
// Comprobar el correcto funcionamiento de XRegExp
//var Operaciones = require("./operaciones.js");
var XRegExp = require('xregexp');
//var patron = XRegExp( '(?<operando1> [+-]?[0-9]+)(,?[+-]?[0-9]+)? #operando1 (?<operacion> [+|-|*|/])? #operacion (?<operando2> [+-]?[0-9]+)(,?[+-]?[0-9]+)? #operando2','ix');

var patron = XRegExp( '(?<operando1> [+-]?[0-9]+(,?[+-]?[0-9]+)?) #operando1  \n'+
                      '(?<operacion> [-\+\*/]) #operacion \n'+
                      '(?<operando2> [+-]?[0-9]+(,?[+-]?[0-9]+)?) #operando2','ix');




/**/
//Clase operandos
function Operandos(operando1,operando2)
{
 this.operando1=operando1 ;
 this.operando2=operando2 ;
}


Operandos.constructor = Operandos;
Operandos.measures = Operandos.measures || {};

Operandos.match = function(entrada)
{
var expre=XRegExp.exec(entrada, patron);
return expre;
}

//  Operandos.measures.s = Suma;
//  Operandos.measures.r = Resta;
//  Operandos.measures.m = Multiplicacion;
//  Operandos.measures.d = Division;






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
    if(simbolo_entrada == "*")
    return "m";
    if(simbolo_entrada == "/")
    return "d";

};
/**********************/


if(match){
 console.log("La expresión casó y estamos dentro del match.");
 var operando1 = parseInt(match.operando1);
 var operando2 = parseInt(match.operando2);
 //var simbolo = match.operacion;
 var simbolo = traduccion(match.operacion);
 console.log("\n--------------------->Contenido de símbolo -------> "+simbolo);
 console.log("operando1 :"+operando1+"  op  "+simbolo+ "  operando_2  "+operando2); //aquí llegan bien los datos.
 
 var source = new measures[simbolo](operando1,operando2);
 var resultado = source.resultado_operacion();
 
 console.log(">Resultado--->"+resultado);
}else {
    console.log("Fracaso");
}
    //console.log("Mostramos la entrada en conversion "+entrada);
    

    
};
 module.exports = Conversion;
 
})(this);