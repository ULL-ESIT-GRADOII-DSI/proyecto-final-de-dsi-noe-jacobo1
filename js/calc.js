window.onload = function(){ //Acciones tras cargar la página
  parrafo =document.getElementById("screen"); //elemento pantalla de salida
}

// flags para el tratamiento de la inserción
var num_screen = "0";//cadena para poder concatenar posteriormente
var flag_num = 1; //valor a 1-> iniciamos numero, 0-> no
var flag_coma = 0;  //lo utilizaremos para impedir varias comas en un mismo num


function numero(digito) {  //recoge el número pulsado en el argumento.
console.log("->"+digito);
         if ( num_screen =="0" || flag_num == 1  ) {  // inicializar un número, 
            parrafo.innerHTML = digito; //mostrar en pantalla
            console.log("---->"+parrafo.innerHTML);
            num_screen = digito; //guardar número;
            }
         else { //si ya hay numero, continuarlo
            parrafo.innerHTML += digito; //añadimos y mostramos en pantalla.
            num_screen += digito; //añadimos y guardamos
            }
         flag_num = 0; //el número está iniciado y podemos ampliarlo.
         }