(function(exports){
//(() => {
"use strict";

 window.onload = function(){ //Acciones tras cargar la página
 screen =document.getElementById("screen"); //elemento pantalla de salida
 console.log(":::"+screen);
 }

// // flags para el tratamiento de la inserción
 var num_screen = "0";//cadena para poder concatenar posteriormente
 var flag_num = 1; //valor a 1-> iniciamos numero, 0-> no
 var flag_coma = 0;  //lo utilizaremos para impedir varias comas en un mismo num



const numero = (digito) => {  //recoge el número pulsado en el argumento.
    
    console.log("->"+digito);
    ////////////////
         if (digito == "AC"){
             screen.innerHTML = "0";
             num_screen = "0";
             flag_coma = 0;
         }else{
             
         
         if(digito == "+" || digito == "-" || digito == "/" || digito == "*")
         flag_coma = 0;
         
         if ( num_screen =="0" || flag_num == 1  ) {  // inicializar un número, 
            screen.innerHTML = digito; //mostrar en pantalla
            console.log("---->"+screen.innerHTML);
            num_screen = digito; //guardar número;
            if(digito ==","){
                screen.innerHTML = "0,";
                num_screen = digito;
                flag_coma = 1; 
                console.log("ingresando coma con 0");
            }
        }
         else { //si ya hay numero, continuarlo
            if(digito == "," && flag_coma==0){
                screen.innerHTML += digito;
                num_screen+=digito;
                flag_coma = 1;
                console.log("ingresando coma sin 0 y coma=0");
            }
            else if (digito == "," && flag_coma == 1) {}
            else{
                screen.innerHTML += digito;
                num_screen += digito;
                console.log("ingresando coma sin 0 y coma=1");
                
            }
        }
        flag_num = 0; //el número está iniciado y podemos ampliarlo.
        console.log("Chivato final numero en pantalla: "+num_screen);
    }
             
};


 //module.exports = numero;
 exports.numero = numero;
})(this);




