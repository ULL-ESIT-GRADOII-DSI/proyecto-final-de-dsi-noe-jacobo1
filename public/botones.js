(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

   
    /***************** IMPORTANTE *****************************/
    // Para trabajar con la ocultacion de divs y eso
    // necesitamos incluir de alguna manera las partes
    // del html con las que trabajar.
    // En el ejemplo de mongose se declara arriba lo siguiente 
    
        const resultTemplate = `
    <div class="pantalla">
          <textarea class="drop_zone" id="result">
              <% _.each(rows, (row) => { %>
              <tr class="<%=row.type%>">
                  <% _.each(row.items, (name) =>{ %>
                  <td><%= name %></td>
                  <% }); %>
              </tr>
              <% }); %>
          </textarea>
      </p>
    </div>
    `;
    //<textarea class = "drop_zone" cols = "74" rows = "5" id="screen" name="screen">0</textarea>
    
    // Creo que gracias a esto podemos trabajar con "contenido" en
    // ese caso y con result. Pienso que igual necesitamos algo similar,
    // sin tabla, sino que adecuado a nuestro html, pero no lo sé seguro.
    

// /* Volcar la tabla con el resultado en el HTML */
    const Datos = (data) => {
    console.log("dato de datos "+ data);
    console.log("valor en funcion datos"+data.valor);
    //screen.innerHTML = data.valor;
    //$("#screen").html(_.template(resultTemplate, { rows: data.rows }));
    $("#screen").html(data.valor);
};




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
    let screen = document.getElementById("screen");
   
    //console.log("\n\n Mostrando original: "+original+"\n\n");
    
    $("#igual").click( () => {
       // if (window.localStorage) localStorage.original = original.value;
       // console.log("#valor text area LocalStorage -> "+original.value);
        //console.log("\n\n Mostrando original: "+original.value+"\n\n");
         $.get("/conv", /* Request AJAX para que se calcule la tabla lo devuleve a app*/
          { input: screen.value },
           Datos,
          'json'
        );
    });
    
 
    $('#boton_nombre').click(() => {
     // Aquí deberemos guardar el nombre que está contenido 
     // en el input con id y nombre = "nombre_usuario"
     // Ocultamos el div de registro y mostramos el nuevo (cambio_usuario)
     console.log("nombre de usuario: "+ nombre_usuario.value);
     
     $("#registro").css("display","none");
     $("#cambio_usuario").css("display","inline");
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


 });
})();