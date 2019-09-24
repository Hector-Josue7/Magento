$(document).ready(function(){
    //Ya cargó el DOM
    llenarTabla();
});

var campos =  {id:'nombre-pagina', valido:false};


function validarCampos(){
    // for (let i = 0; i<campos.length; i++)
    //     campos[i].valido = validarCampoVacio(campos[i].id);
campos.valido = validarCampoVacio(campos.id);
    
    console.log(campos);
    // for (let i = 0; i<campos.length; i++)
        if (!campos.valido)
            return;
    

    
    let pagina = { nombrePagina: document.getElementById('nombre-pagina').value,}

    return pagina;
}

function registrarPagina(){
    let pagina = validarCampos();
    if (pagina==null || pagina == undefined)
        return;
    

    //Guardar en el servidor
    // let parametros = `firstName=${persona.firstName}&lastName=${persona.lastName}&email=${persona.email}&password=${persona.password}&month=${persona.birthdate.month}&day=${persona.birthdate.day}&year=${persona.birthdate.year}&gender=${persona.gender}`;
   let parametro = `nombrePagina=${pagina.nombrePagina}`
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
        url: '/paginaestatica/',
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
                        <td>${pagina.nombrePagina}</td>
                       <td><button type="button" onclick="eliminar('${pagina._id}')"><i class="fas fa-trash-alt"></i></button></td>
                        <td><a href="paginaPostDashboard.html"><button type="button"><i class="fas fa-edit"></i></button></a></td>
                    </tr>`;
}

function eliminar(id){
    $.ajax({
        // url:`http://localhost:8888/usuarios/${id}`,
        url:`paginaestatica/eliminaPagina/${id}`,
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