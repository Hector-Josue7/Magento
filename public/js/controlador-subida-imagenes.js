
  

      // Like Button Request
//   $('#btn-carga-imagen').click(function(e) {
//     e.preventDefault();
//     let imgId = $(this).data('id');
//     console.log(imgId)
//     $.post('/images/' + imgId + '/like')
//       .done(data => {
//       console.log('back:', data)
//         $('.likes-count').text(data.likes);
//       });
//   });

// $("#btn-guardar-pelicula").click(function(){
//     var parametros = $("#formulario").serialize() + "&nombreCategoria="+$("#categoria option:selected").text();
//     console.log("Información a guardar: " + parametros);
//     $.ajax({
//         url:"http://localhost:3335/peliculas/",
//         method:"post",
//         data: parametros,
//         dataType: "json",
//         success:function(res){
//             console.log(res);
//             $("#modalAgregarPelicula").modal("hide");
//             var estrellas="";
//             for (var j=0;j<res.calificacion;j++)
//                 estrellas+='<i class="fas fa-star"></i>';
//             //Anexar la pelicula guardada
//             $("#"+res.categoria._id).append( 
//                 `<div class="col-xl-3 col-sm-12 col-xs-12" id="${res._id}">
//                     <div>
//                        <div class="encabezado" style="background-image: url(${res.caratula});"></span><span class="">${ res.original?'<img src="img/logo-netflix-small.png">':'' }</span></div>
//                         <div class="descripcion">
//                             <div class="titulo-descripcion">${res.nombre}</div>
//                             <div class="canal">${res.descripcion}</div>
//                             <div class="visualizaciones">${estrellas}</div>
//                             <div class="visualizaciones"><a href="" onclick="verMas(event, '${res._id}')">Ver más</a> | <a href="" onclick="eliminar(event, '${res._id}')">Eliminar</a></div>
//                         </div>
//                     </div>
//                 </div>`);
//         },
//         error:function(error){
//             console.log(error);
//             $("#modalVerMas").modal("hide");
//         }
//     });
// });


// $("#btn-registrar").click(function(){
//  //   var parametros = `nombre=${$("#nombre").val()}&apellido=${$("#apellido").val()}&correo=${$("#email").val()}&usuario=${$("#usuario").val()}&pais=${$("#pais").val()}&password=${$("#password").val()}`;
//  //var parametros = $("#modalSubidaImagenes").serialize();
//  var parametros = `nombre=${$("#nombre").val()}&apellido=${$("#apellido").val()}&correo=${$("#email").val()}&usuario=${$("#usuario").val()}&pais=${$("#pais").val()}&password=${$("#password").val()}`;
//  console.log("Informacion a enviar: " + parametros);
//     $.ajax({
//         url:"/imagenes/guardaImagen",
//         method:"POST",
//         data: parametros, //Cadena en formato URLEncoded
//         dataType: 'json', //Formato de la respuesta: text, html, xml, json...
//         success: function(respuesta){ //En el parametro respuesta viene todo lo que el servidor envia
//             console.log(respuesta);
//         },
//         error: function(error){ //En caso de fallar por algun error HTTP
//             console.log(error);
//         }
//     });
// });