(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

    

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
    $("#carrito").val(data);
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
  $("#carrito").val(e.target.result);

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

      $("#carrito").val(e.target.result);
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
// <div class="facturas">
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
      <nav class="carrito_fact">
      <h3>Servicio Factura a nombre de: <%=name%></h4>
      <textarea cols="95" rows="5"><%=fact%></textarea>
      <h4>Con un importe de: <%=total%>€</h4>
      </nav>
`;

const errorTemplate = `
      <nav class="carrito_fact">
      <h2><%=error%></h2>
      </nav>
`;

const buscfactTemplate = `
     
      <%var i = 1%>
      <h3> Facturas a nombre de: <%=name%></h4>
      <% _.each(it, (fact) => { %>
      <h4>Factura numero: <%=i%><h4>
      <nav class="carrito_fact">
      <textarea cols="95" rows="5"><%=fact.factura%></textarea>
      <%++i%>
      </nav>
      <%});%>
      
`;


const generar_factura = (data) => {
    console.log("Nombre: "+data.name);
    console.log("valor de data: "+data.factura);
    console.log("VALOR TOTAL: "+data.total);
    console.log("VALOR error: "+data.error);
    if(!data.error){
     $("#prueba").html(_.template(resultTemplate, {name:data.name, fact: data.factura,total:data.total }));
     //$("#prueba").html(_.template(errorTemplate, {error:"El usuario introducido es incorrecto"}));
    }else{
        $("#prueba").html(_.template(errorTemplate, {error:"El usuario introducido es incorrecto"}));
       // $("#prueba").html(_.template(resultTemplate, {name:data.name, fact: data.factura,total:data.total }));
    }
}
const buscar_factura = (data) => {
    console.log("Nombre: "+data.name);
    console.log("valor de data: "+data.factura);
    console.log("valor de data2: "+data.factura[0].factura);
     $("#prueba").html(_.template(buscfactTemplate, {it:data.factura,name:data.name, fact: data.factura[0].factura }));
     
} 


$(document).ready(() => {
    
    
    //boton registrarse registro.ejs
    $("#registro").click(() => {
         console.log("\n\n Mostrando valor de iniciar registro user: "+nombre_user.value+"\n");
         console.log("\n\n Mostrando valor de iniciar registro password: "+coreo.value+"\n");
         console.log("\n\n Mostrando valor de iniciar registro password: "+contra.value+"\n");
        
        $.get('/newuser',
        {   name:nombre_user.value,
            correo:coreo.value,
            contrasenia:contra.value
        });
      });
 
     
    //boton iniciar seesion iniciar.ejs
      
      $("#inicio").click(() => {
         console.log("\n\n Mostrando valor de iniciar sesion user: "+nombre_usuario.value+"\n");
         console.log("\n\n Mostrando valor de iniciar sesion password: "+contrasenia.value+"\n");
        
        $.get('/sesion',
        {   name:nombre_usuario.value,
            contrasenia:contrasenia.value
        },
        'json'
      );
      });
      
      //boton generar factura charctueria.ejs
      
      $("#generar_factura").click(() => {
         console.log("\n\n Dentro de generar factura: \n");
         console.log("Valor de textarea"+carrito.value);
         console.log("Valor de textarea"+nombre_usuario.value);
         
        
        $.get('/generar/'+$("#nombre_usuario").val(),
        {   name:$("nombre_usuario").val(),
            factura:carrito.value,
            total:TOTAL
        },
        generar_factura,
        'json'
      );
        
    });
    //buscar factura 
    $("#buscar_factura").click(() => {
         console.log("\n\n Dentro de buscar factura: \n");
         console.log("Valor de textarea: "+nombre_usuario.value);
         
        
        $.get('/factura/'+$("#nombre_usuario").val(),
        {   name:$("nombre_usuario").val() },
        buscar_factura,
        'json'
      );
        
    });
    
         /*************************
     *  probando facturas
     * ***********************/
        $("#facturas").click(() => {
                $.get('/facturas',
                {   name:nombre_usuario.value,
                    contrasenia:contrasenia.value
                },
                 crear_nombre,
                 'json'
              );
      });
     
     /**************************/
      
//********************************Botones para generar facturas ejemplos*****************************      
      //Nuevos botones ejemplos de charcuteria con class login-button
$('button.login-buttonc').each( (_,y) => {
     $(y).click( (evt) => { 
         dump(`${$(y).text()}.txt`); 
      evt.target.style.background = "red";
     });
  });
  
  //botones fruteria
  $('button.login-buttonf').each( (_,y) => {
     $(y).click( (evt) => { 
         dump(`${$(y).text()}.txt`); 
      evt.target.style.background = "green";
     });
  });
  //botones pescaderia
  $('button.login-buttonp').each( (_,y) => {
     $(y).click( (evt) => { 
         dump(`${$(y).text()}.txt`); 
      evt.target.style.background = "blue";
     });
  });
  
  
      
        //cargamos ejemplos input.txt(Calculadora) con class example
    $('button.example').each( (_,y) => {
     $(y).click( (evt) => { 
         dump(`${$(y).text()}.txt`); 
      evt.target.style.background = "green";
     });
  });
//*************************************************************    

//*************************** Calculadora**********************************    
   
    $("#igual").click( () => {
        console.log("\n\n Mostrando screen dentro de igual: "+screen.value+"\n\n");
         $.get("/conv", /* Request AJAX para que se calcule la tabla lo devuleve a app*/
          { input: screen.value },
           Datos,//funcion que pasamos para guardar nuestro dato(mas arriba declarada)
          'json'
        );
       // console.log("FUERA DEL GET"+screen.value);//muestra antes de hacer el get
    });
    
 
    
    
  
    
    
//*************************************************************Botoenes para pintar en el carrito **************************    
    

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
        var precio = parseFloat(valor * 9.55).toFixed(2);
        
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
        var precio = parseFloat(valor * 1.85).toFixed(2) ;
        
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
    
//************************************************************* 


    /********************Drop Zone****************/

    // Setup the drag and drop listeners.
    //var dropZone = document.getElementsByClassName('drop_zone')[0];
    let dropZone = $('.drop_zone')[0];
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleDragFileSelect, false);
    let inputFile = $('.inputfile')[0];
    inputFile.addEventListener('change', handleFileSelect, false);


 });
})();