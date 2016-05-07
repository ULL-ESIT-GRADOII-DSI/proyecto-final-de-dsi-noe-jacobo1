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
    let original = document.getElementById("numero");
    if (window.localStorage && localStorage.original) {
      original.value = localStorage.original;
      console.log("Pillamos el valor" + original.value);
    }
    
    $("#igual").click( () => {
        if (window.localStorage) localStorage.original = original.value;
        console.log("LLegamos al click igual")
       
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
   
 
        
//      //boton de guardar nueva entrada   
//      $("#Guardar").click(() => {
//         if (window.localStorage) localStorage.original = original.value;
        
//                     //textbox a rellenar
//                     $("#div_oculto").css("display", "block");
        
//                     $("#Boton_enviar").click( () => {
//                         console.log(DB.value);
//                         console.log(original.value);
//                     //ocultamos textbox
//                     $("#div_oculto").css("display", "none");
        
//             $.get("/entrada", {
//                 name: $("#DB").val(),
//                 content: $("#original").val()
//             });
          
//             var non = $("#DB").val();
//             var r= $('<button class="example" type="button" id="' + non +  '">'+ non + '</button>');
//             $(".example").append(r); //se muestra la ultima entrada repetida arreglar
        
        
//         $('button.example').each( (_,y) => {
//         $(y).click( () => {                                     
//             $.get("/findMongo",{name: $(y).text()},(data) => {
//                 $("#original").val(data[0].content);///////////////////////////////////////////////////////////////////////////////////////
//             });
//         });
//         });
//         });
//     });
       
        
//          //mostramos botones almacenados en mongodb
//     $.get("/showButtons", {}, (data) => {
//             for (var i = 0; i < 4; i++) {
//                 $('button.example').get(i).className = "examples";///////////////////////////////////7////////
//             }
//     });

//         //buscariamos al clikar y devolveriamso el contenido de mongodb a la etiqueta original
//     $('button.example').each( (_,y) => {
//         $(y).click( () => {                         
//             $.get("/findMongo",{name: $(y).text()},(data) => {
//                         $("#original").val(data[0].content);////////////////////////////////////////////////////////
//             });
//         });
//     });
   

//     // Setup the drag and drop listeners.
//     //var dropZone = document.getElementsByClassName('drop_zone')[0];
//     let dropZone = $('.drop_zone')[0];
//     dropZone.addEventListener('dragover', handleDragOver, false);
//     dropZone.addEventListener('drop', handleDragFileSelect, false);
//     let inputFile = $('.inputfile')[0];
//     inputFile.addEventListener('change', handleFileSelect, false);
 });
})();