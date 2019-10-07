// function verHistoria(codigoUsuario){
//     console.log(`Ver historias del usuario ${codigoUsuario} `);
//     $.ajax({
//         url:`/usuarios/${codigoUsuario}/historias`,
//         method:"GET",
//         dataType:"json",
//         success:(res)=>{
//             console.log(res);
//             $("#historias").empty();
//             $("#usuario-historias").html(res.nombre);
//             for (let i = 0; i < res.historias.length; i++) {
//                 $("#historias").append(
//                     `<div class="historia">
//                         <div class="historia-image-post" style="background-image: url(${res.historias[i].imagenHistoria})">
//                             <div class="historia-titulo">${res.historias[i].tituloHistoria}</div>
//                         </div>
//                     </div>`
//                 );
//             }

//             $('#ver-historia').modal('show');
//         },
//         error:(error)=>{
//             console.error(error);
//         }
//     });
// }


// (() =>{ 

//     $.ajax({

//     });
// })();