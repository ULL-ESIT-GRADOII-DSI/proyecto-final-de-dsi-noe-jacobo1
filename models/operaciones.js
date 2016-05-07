(() => {
"use strict";
// Comprobar el correcto funcionamiento de XRegExp



const conversion = (entrada) => {  //recoge el número pulsado en el argumento.

 var XRegExp = require('xregexp');
 var patron = XRegExp( '(?<op1> [+-]?[0-9]+)(,?[+-]?[0-9]+)? #op1 (?<operracion> [+-*/]) #operacion','x');


// ?<operando_a> [+-]?[0-9]+(,[+-]?[0-9])?)\n'+
//                         '(?<op> [+-*/])\n'+
//                         '(?<operando_b> [+-]?[0-9]+(,[+-]?[0-9])?)', 'x'

    
var mch = XRegExp.exec(entrada, patron);
if(mch)
console.log("La expresión casó.");
else 
    console.log("Fracaso");
    
    //console.log("Mostramos la entrada en conversion "+entrada);
    

    
};

 module.exports = conversion;
})();