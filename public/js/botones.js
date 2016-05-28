(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

   
    /***************** IMPORTANTE *****************************/
    // Para trabajar con la ocultacion de divs y eso
    // necesitamos incluir de alguna manera las partes
    // del html con las que trabajar.
    // En el ejemplo de mongose se declara arriba lo siguiente 
    
    //     const resultTemplate = `
    // <div class="pantalla">
    //       <textarea class="drop_zone" id="result">
    //           <% _.each(rows, (row) => { %>
    //           <tr class="<%=row.type%>">
    //               <% _.each(row.items, (name) =>{ %>
    //               <td><%= name %></td>
    //               <% }); %>
    //           </tr>
    //           <% }); %>
    //       </textarea>
    //   </p>
    // </div>
    // `;
    //<textarea class = "drop_zone" cols = "74" rows = "5" id="screen" name="screen">0</textarea>
    
    // Creo que gracias a esto podemos trabajar con "contenido" en
    // ese caso y con result. Pienso que igual necesitamos algo similar,
    // sin tabla, sino que adecuado a nuestro html, pero no lo sé seguro.
    

// /* Volcar la tabla con el resultado en el HTML */
    const Datos = (data) => {
    //console.log("dato de datos "+ data);
    console.log("valor en funcion datos"+data.valor);
    $("#screen").html(data.valor);//Introducimos el valor en la pantalla
    //-----------------------------------------------------------------------------------------
    console.log("valor depsues de asignar"+screen.value);
  
    acu: $("#screen").val()
};




/* Volcar en la textarea de entrada
 * #original el contenido del fichero fileName */
const dump = (fileName) => {
 console.log("Nombre del fichero: " + fileName);
  $.get(fileName,function (data){
    $("#screen").val(data);
  });
};

//ficheros
const handleFileSelect = (evt) => {
  evt.stopPropagation();//evita que los controladores de eventos de los padres sean ejecutados
  evt.preventDefault();//los link los deja inutilizables(la accion que pertenece al bojeto no ocurrira)

 var files=evt.target.files;
 console.log("mostramos lo contenido con target" + files);

 var reader = new FileReader();
 console.log("READER" + reader);
 reader.onload = (e) => {
  console.log("valor e target: " +e.target.result);
  $("#screen").val(e.target.result);

 };
 reader.readAsText(files[0])
}

// /* Drag and drop: el fichero arrastrado se vuelca en la textarea de entrada */
const handleDragFileSelect = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    var reader = new FileReader();
    reader.onload = (e) => {

      $("#screen").val(e.target.result);
      evt.target.style.background = "yellow";
    };
    reader.readAsText(files[0])
}

const handleDragOver = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  evt.target.style.background = "green";
}

const botonesTemplate =  `
<div class="example">
  <% _.each(buttons, (button) => { %>
  <button class="example" type="button" style="width:20%" style="background-color: #87CEEB;"><%= button.nombre %></button>
  <% }); %>
</div>
`;


const textTemplate =  ` <% _.each(values, (value) => { %>
  <textarea class="prueba" type="button" style="width:20%" style="background-color: #87CEEB;"><%= value %><%= usuario_propietario %><%=todo%></textarea>
  <% }); %>`;

const botontemplate = ` <% _.each(values, (value) => { %>
  <button class="prueba" type="button" style="width:20%" style="background-color: #87CEEB;"><%= value %><%= usuario_propietario %><%=todo%></button>
  <% }); %>`

const botones_ejemplos = (data) => {
  //let user_actual = data.name;
  //console.log("Valor de data en botones ejemplo:"+user_actual);
  //console.log("Valor de data:"+data[0].name);
  console.log("LLegamos a la creacion de ejemplo");
  
  console.log("name: "+data.contenido);
  console.log("ID: "+data.usuario_propietario);
  console.log("TODO: "+data.todo);
  
 
  //$("#area").html("TODO: "+data.todo+" ID: "+data.usuario_propietario+" nombre: "+data.contenido);//Introducimos el valor en la pantalla
    
    $("#prueba").html(_.template(textTemplate, { values: data.contenido, usuario_propietario: data.usuario_propietario, todo:data.todo}));//textarea
    //$("#prueba").html(_.template(botontemplate, { values: data.contenido, usuario_propietario: data.usuario_propietario, todo:data.todo}));//botones
  //$("#botones").html(_.template(botonesTemplate, { buttons: data.contenido, usuario_propietario: data.usuario_propietario}));


}


// const resultTemplate = `
// <div class="contenido">
//       <table class="center" id="result">
//           <% _.each(rows, (row) => { %>
//           <tr class="<%=row.type%>">
//               <% _.each(row.items, (name) =>{ %>
//               <td><%= name %></td>
//               <% }); %>
//           </tr>
//           <% }); %>
//       </table>
//   </p>
// </div>
// `;

const resultTemplate = `
    <textarea cols="36" rows="10"><%=rows%></textarea>
`;

const generar_factura = (data) => {
    console.log("valor de data"+data.factura);
     $("#prueba").html(_.template(resultTemplate, { rows: data.factura }));
    //  $("#prueba").html(data.factura);
    
} 


$(document).ready(() => {
    let screen = document.getElementById("screen");
    
    //boton registrarse registro.ejs
    $("#registrarse").click( () => {
        
        console.log("\n\n Mostrando valor de registrarse: "+nombre_usuario.value+"\n");
        console.log("\n\n Mostrando valor de registrarse: "+correo.value+"\n");
        console.log("\n\n Mostrando valor de registrarse: "+contrasenia.value+"\n");
        
        $.get('/buscar/'+$("#nombre_usuario").val()+'/'+$("#contrasenia").val()+'/'+$("#correo").val(),
        { name: $("nombre_usuario").val(),
            correo: $("correo").val(),
            contrasenia: $("contrasenia").val(),
        },
        botones_ejemplos,
        'json'
      );
        
    });
    
    //boton iniciar seesion iniciar.ejs
      
      $("#inicio").click(() => {
         console.log("\n\n Mostrando valor de iniciar sesion user: "+nombre_usuario.value+"\n");
         console.log("\n\n Mostrando valor de iniciar sesion password: "+contrasenia.value+"\n");
        
        $.get('/sesion',
        {   name:nombre_usuario.value,
            contrasenia:contrasenia.value
        },
        botones_ejemplos,
        'json'
      );
      });
      
      //boton generar factura charctueria.ejs
      
      $("#generar_factura").click(() => {
         console.log("\n\n Dentro de generar factura: \n");
         console.log("Valor de textarea"+carrito.value);
         
        
        $.get('/generar',
        {   factura:carrito.value
        },
        generar_factura,
        'json'
      );
        
    });
    
        //cargamos ejemplos input.txt(Calculadora)
    $('button.example').each( (_,y) => {
     $(y).click( (evt) => { 
         dump(`${$(y).text()}.txt`); 
      evt.target.style.background = "green";
     });
  });
    
    //(Calculadora)
    $("#igual").click( () => {
        console.log("\n\n Mostrando screen dentro de igual: "+screen.value+"\n\n");
         $.get("/conv", /* Request AJAX para que se calcule la tabla lo devuleve a app*/
          { input: screen.value },
           Datos,//funcion que pasamos para guardar nuestro dato(mas arriba declarada)
          'json'
        );
       // console.log("FUERA DEL GET"+screen.value);//muestra antes de hacer el get
    });
    
 
    
    //Igual que registrarse
     $("#buscar_usuario").click( (event) => {//este boton implementado ahora mismo como busqeda y sino pues lo crea
      event.preventDefault();
      console.log("CLick buscar user");
      
        $.get('/buscar/'+$("#nombre_usuario").val()+'/'+$("#contrasenia").val()+'/'+$("#correo").val(),
        { name: $("nombre_usuario").val(),
            correo: $("correo").val(),
            contrasenia: $("contrasenia").val(),
        },
        botones_ejemplos,
        'json'
      );
    });
    
    
  
    
    
    
    

//Botones text area diferentes modulos
   var TOTAL = parseFloat(0);
    var ALL_TEXT = " ";
    
     $("#c1").click(() => {
        var valor = parseFloat(document.getElementById("i1").value);
        var precio = parseFloat(valor * 3.46).toFixed(2);
        
        TOTAL = (parseFloat(TOTAL) + parseFloat(precio)).toFixed(2);
        var nuevo = ""+valor+" Kg de pechuga de pollo = "+precio+"€\n";
        ALL_TEXT += nuevo;
        $("#carrito").val(ALL_TEXT);
    });
    
    $("#c2").click(() => {
        var valor = parseFloat(document.getElementById("i2").value);
        var precio = parseFloat(valor).toFixed(2) * 2.55;
        
        TOTAL = (parseFloat(TOTAL) + parseFloat(precio)).toFixed(2);
        var nuevo = " + "+valor+" Kg de chuleta de cerdo = "+TOTAL+"€" ;
        ALL_TEXT += nuevo;
        $("#carrito").val(ALL_TEXT);
    });
    $("#c3").click(() => {
        var valor = parseFloat(document.getElementById("i3").value);
        var precio = parseFloat(valor * 4.99).toFixed(2);
        TOTAL = (parseFloat(TOTAL) + parseFloat(precio)).toFixed(2);
        var nuevo = " + "+valor+" Kg de carne mechada de res = "+TOTAL+"€";
        ALL_TEXT += nuevo;
        $("#carrito").val(ALL_TEXT);
    });
    
    /***** Botones Pescaderia *******/
    $("#p1").click(() => {
        var valor = parseFloat(document.getElementById("i1").value);
        var precio = parseFloat(valor * 11.26).toFixed(2);
        
        TOTAL = (parseFloat(TOTAL) + parseFloat(precio)).toFixed(2);
        var nuevo = " "+valor+" Kg de gambas frescas = "+TOTAL+"€";
        ALL_TEXT += nuevo;
        $("#carrito").val(ALL_TEXT);
    });
    $("p2").click(() => {
        var valor = parseFloat(document.getElementById("i2").value);
        var precio = parseFloat(valor).toFixed(2) * 9.55;
        
        TOTAL = (parseFloat(TOTAL) + parseFloat(precio)).toFixed(2);
        var nuevo = " + "+valor+" Kg de pulpo gallego = "+TOTAL+"€";
        console.log("valor de total y de alltext: "+TOTAL+ALL_TEXT+"€");
        ALL_TEXT += nuevo;
        $("#carrito").val(ALL_TEXT);
    });
    $("#p3").click(() => {
        var valor = parseFloat(document.getElementById("i3").value);
        var precio = parseFloat(valor * 6.35).toFixed(2);
        TOTAL = (parseFloat(TOTAL) + parseFloat(precio)).toFixed(2);
        var nuevo = " + "+valor+" Kg de dorada = "+TOTAL;
        console.log("valor de total y de alltext: "+TOTAL+ALL_TEXT+"€");
        ALL_TEXT += nuevo;
        $("#carrito").val(ALL_TEXT);
    });
    /*********************************/
    
    /************* Fruteria *************/
    $("#f1").click(() => {
        var valor = parseFloat(document.getElementById("i1").value);
        var precio = parseFloat(valor * 3.77).toFixed(2);
        
        TOTAL = (parseFloat(TOTAL) + parseFloat(precio)).toFixed(2);
        var nuevo = "  "+valor+" Kg de piña = "+TOTAL;
        ALL_TEXT += nuevo;
        $("#carrito").val(ALL_TEXT);
    });
    $("f2").click(() => {
        var valor = parseFloat(document.getElementById("i2").value);
        var precio = parseFloat(valor).toFixed(2) * 1.85;
        
        TOTAL = (parseFloat(TOTAL) + parseFloat(precio)).toFixed(2);
        var nuevo = " + "+valor+" Kg de manzana golden = "+TOTAL;
        
        ALL_TEXT += nuevo;
        $("#carrito").val(ALL_TEXT);
    });
    $("#f3").click(() => {
        var valor = parseFloat(document.getElementById("i3").value);
        var precio = parseFloat(valor * 1.05).toFixed(2);
        TOTAL = (parseFloat(TOTAL) + parseFloat(precio)).toFixed(2);
        var nuevo = " + "+valor+" Kg de naranja zumo = "+TOTAL;
        
        ALL_TEXT += nuevo;
        $("#carrito").val(ALL_TEXT);
    });
    /************************************/

    // Setup the drag and drop listeners.
    //var dropZone = document.getElementsByClassName('drop_zone')[0];
    let dropZone = $('.drop_zone')[0];
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleDragFileSelect, false);
    let inputFile = $('.inputfile')[0];
    inputFile.addEventListener('change', handleFileSelect, false);


 });
})();