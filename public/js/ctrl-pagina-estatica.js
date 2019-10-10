$(document).ready(function(){
    //Ya cargó el DOM
    llenarTabla();
});

var campos =  {id:'tituloPaginaEstatica', valido:false};


function validarCampos(){
    // for (let i = 0; i<campos.length; i++)
    //     campos[i].valido = validarCampoVacio(campos[i].id);
campos.valido = validarCampoVacio(campos.id);
    
    console.log(campos);
    // for (let i = 0; i<campos.length; i++)
        if (!campos.valido)
            return;
    

    
    let pagina = { tituloPaginaEstatica: document.getElementById('tituloPaginaEstatica').value,}

    return pagina;
}

function registrarPagina(){
    let pagina = validarCampos();
    if (pagina==null || pagina == undefined)
        return;
    

    //Guardar en el servidor
    // let parametros = `firstName=${persona.firstName}&lastName=${persona.lastName}&email=${persona.email}&password=${persona.password}&month=${persona.birthdate.month}&day=${persona.birthdate.day}&year=${persona.birthdate.year}&gender=${persona.gender}`;
   let parametro = `paginaEstatica=${pagina.paginaEstatica}`
    console.log('Información a enviar: ' + parametro);
    $.ajax({
        url:'/paginaestatica/guardaPagina',
        method:'POST',
        data:parametro,
        dataType:'json',
        success:(res)=>{
            console.log(res);
            if (res._id != undefined)
                anexarFilaTabla(res);
        },
        error:(error)=>{
            console.error(error);
        }
    });
}

function validarCampoVacio(id){
    let resultado = (document.getElementById(id).value=="")?false:true;
    marcarInput(id,resultado);
    return resultado; 
    
}


function marcarInput(id, valido){
    if (valido){
        document.getElementById(id).classList.remove('is-invalid');
        document.getElementById(id).classList.add('is-valid');
    }else{
        document.getElementById(id).classList.remove('is-valid');
        document.getElementById(id).classList.add('is-invalid');
    }
}


function llenarTabla(){
    document.getElementById('tabla-registros').innerHTML = '';
    $.ajax({
        // url:'http://localhost:8888/usuarios/',
        url: '/paginaestatica',
        method:'GET',
        dataType:'json',
        success:(res)=>{
            console.log('Success');
            console.log(res);
            for(let i=0;i<res.length;i++)
                anexarFilaTabla(res[i]);
        },
        error:(error)=>{
            console.log('Error');
            console.log(error);
        }
    });
}

function anexarFilaTabla(pagina){
    document.getElementById('tabla-registros').innerHTML += 
                    `<tr id="${pagina._id}">
                        <td>${pagina.tituloPaginaEstatica}</td>
                       <td><button type="button" onclick="eliminar('${pagina._id}')"><i class="fas fa-trash-alt"></i></button></td>
                        <td><a href="paginaEstaticaDashboard.html"><button type="button"><i class="fas fa-edit"></i></button></a></td>
                    </tr>`;
}

function eliminar(id){
    $.ajax({
        // url:`http://localhost:8888/usuarios/${id}`,
        url:`/paginaestatica/eliminaPagina/${id}`,
        method:'delete',
        dataType:'json',
        success:(res)=>{
            console.log(res);
            if (res.ok == 1)
                $(`#${id}`).remove();
        },
        error:(error)=>{
            console.log(error);
        }
    });
}

// function editar(id){
//     console.log("Editar registro "+id);
//     document.getElementById('_id').value=id;
    
//     $.ajax({
//         // url:`http://localhost:8888/usuarios/${id}`,

//         method:'GET',
//         dataType:'json',
//         success:(persona)=>{
//             console.log(persona);
//             document.getElementById('first-name').value = persona.firstName;
//             document.getElementById('last-name').value = persona.lastName;
//             document.getElementById('email').value = persona.email;
//             document.getElementById('password').value = persona.password;
//             document.getElementById('month').value = persona.birthdate.month;
//             document.getElementById('day').value = persona.birthdate.day;
//             document.getElementById('year').value = persona.birthdate.year;
//             let opcionesGenero = document.querySelectorAll('input[type="radio"][name="gender"]');
//             for(let i=0; i<opcionesGenero.length;i++){ 
//                 if (opcionesGenero[i].value == persona.gender){
//                     opcionesGenero[i].checked = true;
//                 }
//             }
//             document.getElementById('boton-update').style.display = 'block';
//             document.getElementById('boton-clear').style.display = 'block';
//             document.getElementById('boton-sign-in').style.display = 'none';
//         },
//         error:(error)=>{
//             console.error(error);
//         }
//     });
// }

// function limpiar(){
//     document.getElementById('first-name').value = '';
//     document.getElementById('last-name').value = '';
//     document.getElementById('email').value = '';
//     document.getElementById('password').value = '';
//     document.getElementById('month').value = '';
//     document.getElementById('day').value = '';
//     document.getElementById('year').value = '';

//     document.getElementById('boton-update').style.display = 'none';
//     document.getElementById('boton-clear').style.display = 'none';
//     document.getElementById('boton-sign-in').style.display = 'block';
// }

// function actualizarUsuario(){
//     let persona = validarCampos();
//     if (persona==null || persona == undefined)
//         return;
    

//     //Guardar en el servidor
//     let parametros = `firstName=${persona.firstName}&lastName=${persona.lastName}&email=${persona.email}&password=${persona.password}&month=${persona.birthdate.month}&day=${persona.birthdate.day}&year=${persona.birthdate.year}&gender=${persona.gender}`;
//     console.log('Información a enviar: ' + parametros);
//     $.ajax({
//         url:`http://localhost:8888/usuarios/${document.getElementById('_id').value}`,
//         method:'PUT',
//         data:parametros,
//         dataType:'json',
//         success:(res)=>{
//             console.log(res);
//             /*if (res._id != undefined)
//                 anexarFilaTabla(res);*/
//         },
//         error:(error)=>{
//             console.error(error);
//         }
//     });
    
// }