// function update(){
//     var res =document.getElementById('iframe').contentWindow.document;

//     res.open();
//     res.write(eh.getValue());
//     res.write('<style>'+ec.getValue()+'</style>');
//     res.write('<script>'+ ejs.getValue()+'</script>');
//     res.close(); 
// }
function setEditor(){
    // window.eh = ace.edit('editorHtml');
    // eh.setTheme("ace/theme/cobalt");
    // eh.getSession().setMode("ace/mode/html");
    // eh.getSession().on('change',function(){
    //     update();
    // });

    window.ec = ace.edit('editorCss');
    ec.setTheme("ace/theme/cobalt");
    ec.getSession().setMode("ace/mode/css");
    // ec.getSession().on('change',function(){
    //     update();
    // });

    window.ejs = ace.edit('editorJs');
    ejs.setTheme("ace/theme/cobalt");
    ejs.getSession().setMode("ace/mode/css");
    // ejs.getSession().on('change',function(){
    //     update();
    // });
}
setEditor();
// update();

var db;   

$(document).ready(function(){
    verificarArchivos();
    obtenerSesion();
    $("#des-html").append(
        `<a href="" download="Archivos Html" id="descargar" ><i class="fas fa-download"></i></a>`
    )
    $("#des-css").append(
        `<a href="" download="Archivos css" id="descargar1" ><i class="fas fa-download"></i></a>`
    )
    $("#des-js").append(
        `<a href="" download="Archivos js" id="descargar2" ><i class="fas fa-download"></i></a>`
    )
    if (!('indexedDB' in window)){
        console.err("El navegador no soporta indexedDB");
        return;
    }

    //open crea la base de datos si no existe, en caso contrario la abre para utilizarla
    var solicitud = window.indexedDB.open("proyectoEmilia", 1);//Parametros: nombre, version. La version debe ser entero
    
    solicitud.onsuccess = function(evento){
        db = solicitud.result;
        console.log("Se abrio o se creo la BD");
        // actualizarTabla();
    }
        solicitud.onerror = function(evento){
            console.error(evento);
        }
        solicitud.onupgradeneeded = function(evento){
            console.log('Se creo o actualizo la BD');
            db = evento.target.result;


        var objectStoreProyectos = db.createObjectStore("proyectos", {keyPath: "codigo", autoIncrement: true});
        var objectStoreArchivo = db.createObjectStore("archivo", {keyPath: "codigo", autoIncrement: true});
        objectStoreProyectos.transaction.oncomplete = function(evento){
            console.log("El object store de Proyectos se creo con exito");
        }
        objectStoreProyectos.transaction.onerror = function(evento){
            console.log("Error al crear el object store de proyectos");
        }
        objectStoreArchivo.transaction.oncomplete = function(evento){
            console.log("El object store de Archivos se creo con exito");
        }
        objectStoreArchivo.transaction.onerror = function(evento){
            console.log("Error al crear el object store de Archivos");
        }
    }
    

});
var codProyecto = window.location.search.substring(1); //codigo Proyecto
// var archivos=[];
var extenciones=[];
var idUsuario=0;
function verificarArchivos(){
    $.ajax({
        url:"/archivos",
        method:"get",
        datatype:"json",
        success:function(res){
            for (let i = 0; i < res.length; i++) {
                if(!(res[i].codigoProyeto==0)){
                    if(res[i].codigoProyecto==codProyecto){
                        switch(res[i].extencion) {
                            case 1: eh.setValue(res[i].contenido);
                            document.getElementById("des-html").innerHTML="";
                            $("#des-html").append(
                                `<a href="" download="Archivos Html" id="descargar" ><i class="fas fa-download"></i></a>`
                            )
                            contenidoDeArchivos=res[i].contenido;
                            elem = document.getElementById("descargar");

                            elem.download= `${res[i].contenido}.html`;
                            elem.href="data:application/octet-stream,"+ encodeURIComponent(contenidoDeArchivos);

                            break;
                            case 2: ec.setValue(res[i].contenido);
                            document.getElementById("des-css").innerHTML="";
                            $("#des-css").append(
                                `<a href="" download="Archivos css" id="descargar1" ><i class="fas fa-download"></i></a>`
                            )
                            contenidoDeArchivos=res[i].contenido;
                            elem = document.getElementById("descargar1");

                            elem.download= `${res[i].contenido}.css`;
                            elem.href="data:application/octet-stream,"+ encodeURIComponent(contenidoDeArchivos);
                            break;
                            case 3: ejs.setValue(res[i].contenido);
                            document.getElementById("des-js").innerHTML="";
                            $("#des-js").append(
                                `<a href="" download="Archivos js" id="descargar2" ><i class="fas fa-download"></i></a>`
                            )
                            contenidoDeArchivos=res[i].contenido;
                            elem = document.getElementById("descargar2");

                            elem.download= `${res[i].contenido}.js`;
                            elem.href="data:application/octet-stream,"+ encodeURIComponent(contenidoDeArchivos);
                            break;                            
                            default: puts("Error");
                            }
                    }
                }                 
                
            }
        }
        
    })
    

}

$("#btn-guardar").click(function(){
   var archivos=[]; 
   var arHtml= eh.getValue();
   var arhCss = ec.getValue();
   var arhJs = ejs.getValue();

   if(!(arHtml==0)){
    archivos.push(arHtml);
    extenciones.push(1);

   } 
   if(!(arhCss==0)){
    archivos.push(arhCss);
    extenciones.push(2);
   }
   if(!(arhJs==0)){
    archivos.push(arhJs);
    extenciones.push(3);
   }

  
   var data="";
   for (var i = 0; i < archivos.length; i++) {
       data = "&codigoProyecto="+codProyecto + "&extencion="+ extenciones[i] + "&contenido=" + archivos[i]+"&usarioCreador="+ idUsuario;
    $.ajax({
               url:"/archivos",
               method:"post",
               data: data,
               datatype:"Json",
               success: function(res){
                Push.create("Afirmacion", {
                    body: "Guardado con exito!",
                    timeout: 4000,
                    onClick: function () {
                        window.focus();
                        this.close();
                    }
                });
               },
               error: function(error){
                   console.log(error);
               }
           })
       
   }
   
})


   function obtenerSesion() {
    $.ajax({
        url:"/obtener-sesion",
        dataType:"json",
        method:"get",
        success: function(res){
            // console.log(res.correo);
                $.ajax({
                    url:"/usuarios",
                    method: "get",
                    datatype:"json",
                    success: function(respuesta){
                        for (var i = 0; i < respuesta.length; i++) {
                            if (res.correo==respuesta[i].correo) {
                               idUsuario= respuesta[i]._id;

                            }
                            
                        }
                    }
                })
        },
        error: function(error){
            console.error(error);
        }

    })
}



// indexed db para guardar oftline los proyectos y usuarios.

$("#btn-ofline").click(function(){
  
    $.ajax({
        url:"/proyectos/"+ codProyecto,
        method:"get",
        datatype:"json",
        success:function(res){ 
            console.log(res[0]._id);
            if(res[0]._id==codProyecto){
            var transaccion = db.transaction(["proyectos"],"readwrite");///readwrite: Escritura/lectura, readonly: Solo lectura
            var objectStoreProyectos = transaccion.objectStore("proyectos");          
            var solicitud = objectStoreProyectos.add({
                id:res[0]._id,
                nombre:res[0].nombre,
                usuarioCreador:res[0].usuarioCreador,
                carpetaPadre: res[0].carpetaPadre,
                usuarioCreador: idUsuario
            });
            solicitud.onsuccess = function(evento){
                 console.log("Se agrego el registro con éxito, Actualizar tabla");
                 Push.create("Afirmacion", {
                    body: "Guardado con exito!",
                    // icon: '../img/logoV10_fondo_transparente.png',
                    timeout: 4000,
                    onClick: function () {
                        window.focus();
                        this.close();
                    }
                });
                 agregarArchivos();
            }
        }
        },
        error: function(error){
            console.log("error")
        }
    })               
     agregarArchivos(); 
     Push.create("Afirmacion", {
        body: "Guardado con exito!",
        timeout: 4000,
        onClick: function () {
            window.focus();
            this.close();
        }
    });                


  
})

function agregarArchivos(){
    var archivos=[]; 
    var arHtml= eh.getValue();
    var arhCss = ec.getValue();
    var arhJs = ejs.getValue();

    if(!(arHtml==0)){
        archivos.push(arHtml);
        extenciones.push(1);
    } 
    if(!(arhCss==0)){
        archivos.push(arhCss);
        extenciones.push(2);
    }
    if(!(arhJs==0)){
        archivos.push(arhJs);
        extenciones.push(3);
    }
    var data="";
    for (var i = 0; i < archivos.length; i++) {
        
    var transaccion = db.transaction(["archivo"],"readwrite");///readwrite: Escritura/lectura, readonly: Solo lectura
    var objectStoreArchivo = transaccion.objectStore("archivo");          
    var solicitud = objectStoreArchivo.add({
        usuarioCreador:idUsuario,
        extencion:extenciones[i],
        codigoProyecto: codProyecto,
        contenido:archivos[i]
        
    });
    solicitud.onsuccess = function(evento){
        console.log("Se agrego el archivos con éxito,");
    }
    
}
}


$("#guardarArchivo").click(function(){
    console.log("hola");
    var extencion= 0;
    var imagen= "";
    var data= "&nombre="+$("#txt-nombre").val();
    var campo = $("#txt-nombre").val();
    if($("#txt-nombre").val() !==""){
        var partes= campo.split(".");
        parte = partes[1].toLowerCase();

        if (parte=="html") {
            extencion=1;
            imagen = '../img/img-html.jpg';

        }else if(parte=="css"){
            extencion=2;
            imagen = '../img/imgCss.png';
        }else if(parte=="js"){
            extencion=3;
            imagen = '../img/js.png';
        }else{
            return;
        }
        $.ajax({
            url:"/archivos",
            method: "Post",
            data: data +"&extencion="+extencion+"&imagen="+imagen+ "&usuarioCreador="+ idUsuario, 
            dataType:"json",               
            success: function(res){
                Push.create("Afirmacion", {
                    body: "Archivo Guardado!",
                    // icon: '../img/logoV10_fondo_transparente.png',
                    timeout: 4000,
                    onClick: function () {
                        window.focus();
                        this.close();
                    }
                });
                console.log("registro Guardado");
            },
            error: function(res){
                console.log(res);
                
            }
        })
    }
});

var cantidad=[];
$("#btn-guardarPc").click( function(){
    valor=true;
    $.ajax({
        url:"/proyectos",
        method:"get",
        datatype:"json",
        success:function(res){
            for (let i = 0; i < res.length; i++) {
                if(res[i].usuarioCreador==idUsuario){
                    cantidad.push(res[i]._id);
                }
                
            }
        }
    })
    var data= "&nombre="+ $("#txt-proyecto").val()+ "&usuarioCreador="+ idUsuario;
    
   
    $.ajax({
        url:"/usuarios",
        method:"get",
        datatype:"json",
        success: function(res){
           
            // console.log(res)
            for (let i = 0; i < res.length; i++) {
                if((res[i]._id==idUsuario)){
                    if((res[i].tipoPlan=="gratis")){
                        if((cantidad.length<2)){
                                $.ajax({
                                    url:"/proyectos",
                                    method:"Post",
                                    datatype:"Json",
                                    data: data,
                                    success: function(res){              
                                        Push.create("Afirmacion", {
                                            body: "Proyecto Guardado",
                                            timeout: 4000,
                                            onClick: function () {
                                                window.focus();
                                                this.close();
                                            }
                                        });
                                    },
                                    error:function(error){
                                        console.error(error)
                                    }
                                }) 

                        }                                   
                        else{
                            console.log("sin guarad")
                            Push.create("Alerta", {
                                body: "Lo sentimos su numero de proyectos ha sido limitado, pasate a Premiun",
                                // icon: '../img/logoV10_fondo_transparente.png',
                                timeout: 4000,
                                onClick: function () {
                                    window.focus();
                                    this.close();
                                }
                            });
                            console.log("ya no puedes guardar"); 
                        }

                    }else if(res[i].tipoPlan=="premiun"){
                        $.ajax({
                            url:"/proyectos",
                            method:"Post",
                            datatype:"Json",
                            data: data,
                            success: function(res){              
                                Push.create("Afirmacion", {
                                    body: "Proyecto Guardado",
                                    // icon: '../img/logoV10_fondo_transparente.png',
                                    timeout: 4000,
                                    onClick: function () {
                                        window.focus();
                                        this.close();
                                    }
                                });
                            },
                            error:function(error){
                                console.error(error)
                            }
                        }) 

                    }
                    
                }
                
            }
             
            
        }
    })
    
});

