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
    ec.setTheme("ace/theme/vibrant_ink");
    ec.getSession().setMode("ace/mode/css");


    window.ejs = ace.edit('editorJs');
    ejs.setTheme("ace/theme/vibrant_ink");
    ejs.getSession().setMode("ace/mode/css");
    // ejs.getSession().on('change',function(){
    //     update();
    // });
}
setEditor();
// update();

var db;   

$(document).ready(function(){
   

    // $("#des-html").append(
    //     `<a href="" download="Archivos Html" id="descargar" ><i class="fas fa-download"></i></a>`
    // )

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
