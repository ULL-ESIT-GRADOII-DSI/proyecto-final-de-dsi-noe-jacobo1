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

 /*******************************************************************************
 *                                                                              *    
 *              CLASES PARA CADA UNA DE LAS OPERACIONES SOPORTADAS              *
 *                                                                              *
 * *****************************************************************************/

/////////////////////SUMA/////////////////////////
function Suma(operando1,operando2)
{
//console.log("dentro de constrcutor suma"+ "simbolo:"+operando1+"operando2"+operando2);
Operandos.call(this,operando1,operando2);
}


Suma.prototype = new Operandos();
Suma.prototype.constructor = Suma;
Operandos.measures.s = Suma;

Suma.prototype.resultado_operacion = function(){
return (this.operando1 + this.operando2);
};
//__________________________________________________


////////////////// Resta /////////////////
function Resta(operando1, operando2)
{
    Operandos.call(this, operando1, operando2);
}

Resta.prototype = new Operandos();
Resta.prototype.constructor = Resta;
Operandos.measures.r = Resta;

Resta.prototype.resultado_operacion = function(){
return (this.operando1 - this.operando2);
};
//__________________________________________________


////////////////// Multiplicacion /////////////////
function Multiplicacion(operando1, operando2)
{
    Operandos.call(this, operando1, operando2);
}

Multiplicacion.prototype = new Operandos();
Multiplicacion.prototype.constructor = Multiplicacion;
Operandos.measures.m = Multiplicacion;

Multiplicacion.prototype.resultado_operacion = function(){
return (this.operando1 * this.operando2);
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
return (this.operando1 / this.operando2);
};
//__________________________________________________

/*******************************************************************************/




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

     var simbolo = traduccion(match.operacion);

     
     var source = new measures[simbolo](operando1,operando2);
     var resultado = source.resultado_operacion();

     return resultado;
     
    
    }else {
        console.log("Fracaso");
    }
        
};
 module.exports = Conversion;
 
})(this);