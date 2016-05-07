(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it



// /* Volcar la tabla con el resultado en el HTML */
//     const fillTable = (data) => {
//     console.log("dato d filltable"+ resultTemplate);
//     $("#finaltable").html(_.template(resultTemplate, { rows: data.rows }));
// };

// /* Volcar en la textarea de entrada
//  * #original el contenido del fichero fileName */
// const dump = (fileName) => {
//   $.get(fileName,function (data){
//     $("#original").val(data);
//   });
// };

// //ficheros
// const handleFileSelect = (evt) => {
//   evt.stopPropagation();//evita que los controladores de eventos de los padres sean ejecutados
//   evt.preventDefault();//los link los deja inutilizables(la accion que pertenece al bojeto no ocurrira)

//  var files=evt.target.files;
//  console.log("mostramos lo contenido con target" + files);

//  var reader = new FileReader();
//  console.log("READER" + reader);
//  reader.onload = (e) => {
//   $("#original").val(e.target.result);
//  };
//  reader.readAsText(files[0])
// }

// /* Drag and drop: el fichero arrastrado se vuelca en la textarea de entrada */
// const handleDragFileSelect = (evt) => {
//     evt.stopPropagation();
//     evt.preventDefault();

//     var files = evt.dataTransfer.files; // FileList object.
//     var reader = new FileReader();
//     reader.onload = (e) => {

//       $("#original").val(e.target.result);
//       evt.target.style.background = "grey";
//     };
//     reader.readAsText(files[0])
// }

// const handleDragOver = (evt) => {
//   evt.stopPropagation();
//   evt.preventDefault();
//   evt.target.style.background = "light-grey";
// }

$(document).ready(() => {
    let original = document.getElementById("original");
    if (window.localStorage && localStorage.original) {
      original.value = localStorage.original;
      console.log("LocalStorage" + original.value);
    }
    
    $("#igual").click( () => {
        if (window.localStorage) localStorage.original = original.value;
        console.log("#valor text area"+original.value);
        console.log("LLegamos al click igual")
        
       
    });
     $('button.example').each( (_,y) => {
     $(y).click( () => { 
         console.log("#0".value);
         
         var boton =document.getElementById("#0").innerHTML;
         console.log(boton);
         console.log("Pinchamos en los botones numericos");
     });
     });
    
    
//     //cargamos ejemplos input.txt
//     $('button.example').each( (_,y) => {
//      $(y).click( () => { 
//          dump(`${$(y).text()}.txt`); });
//   });

//     //Analizamos
//     $("#parse").click( () => {
//         if (window.localStorage) localStorage.original = original.value;
//         $.get("/csv", 
//           { input: original.value },
//           fillTable,
//           'json'
//         );
//     });

   

//     // Setup the drag and drop listeners.
//     //var dropZone = document.getElementsByClassName('drop_zone')[0];
//     let dropZone = $('.drop_zone')[0];
//     dropZone.addEventListener('dragover', handleDragOver, false);
//     dropZone.addEventListener('drop', handleDragFileSelect, false);
//     let inputFile = $('.inputfile')[0];
//     inputFile.addEventListener('change', handleFileSelect, false);

window.onload = function(){ //Acciones tras cargar la página
 var screen =document.getElementById("original").innerHTML; //elemento pantalla de salida
 console.log(":::"+screen);
}

// flags para el tratamiento de la inserción
var num_screen = "0";//cadena para poder concatenar posteriormente
var flag_num = 1; //valor a 1-> iniciamos numero, 0-> no
var flag_coma = 0;  //lo utilizaremos para impedir varias comas en un mismo num


function numero(digito) {  //recoge el número pulsado en el argumento.
console.log("->"+digito);
         if ( num_screen =="0" || flag_num == 1  ) {  // inicializar un número, 
            screen.innerHTML = digito; //mostrar en pantalla
            console.log("---->"+screen.innerHTML);
            num_screen = digito; //guardar número;
            }
         else { //si ya hay numero, continuarlo
            screen.innerHTML += digito; //añadimos y mostramos en pantalla.
            num_screen += digito; //añadimos y guardamos
            }
         flag_num = 0; //el número está iniciado y podemos ampliarlo.
         }
 });
})();