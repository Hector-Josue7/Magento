
function setEditor(){
   
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
ClassicEditor.create(document.querySelector('#editorEncabezado')).catch(error => {console.error(error);});
ClassicEditor.create(document.querySelector('#editorPagina')).catch(error => {console.error(error);});
ClassicEditor.create(document.querySelector('#editorPiePagina')).catch(error => {console.error(error);});


function validarCamposPaginaPrincipal(){
    let paginaPrincipal = {
        editorEncabezado: document.getElementById('editorEncabezado').vallue,
        editorPagina: document.getElementById('editorPagina').vallue,
        editorPiePagina: document.getElementById('tituloPagina').vallue,
        tituloPagina: document.getElementById('tituloPagina').vallue,
        descripcionPagina: document.getElementById('descripcionPagina').vallue,
        // favicon: document.getElementById('favicon').vallue,
        // logoPagina: document.getElementById('logoPagina').vallue,
        palabrasClave: document.getElementById('palabrasClave').vallue,
        editorCss: document.getElementById('editorCss').vallue,
        editorJs:document.getElementById('editorJs').vallue
}
    return paginaPrincipal;
}

function registrarPaginaPrincipal(){
    let paginaPrincipal =  validarCamposPaginaPrincipal();
if (paginaPrincipal== null || paginaPrincipal == undefined)
return;

    let parametros = ` editorEncabezado=${paginaPrincipal.editorEncabezado}&editorPagina =${paginaPrincipal.editorPagina}&editorPiePagina=${paginaPrincipal.editorPiePagina}&tituloPagina=${paginaPrincipal.tituloPagina}&descripcionPagina=${paginaPrincipal.descripcionPagina}&palabrasClave=${paginaPrincipal.palabrasClave}&editorCss=${paginaPrincipal.editorCss}&editorJs=${paginaPrincipal.editorJs}`
    console.log('Información a enviar: ' + parametros);
    $.ajax({
                url:'/paginaestatica',
                method:'POST',
                data:parametros,
                dataType:'json',
                success:(res)=>{
                    console.log(res);
                    // if (res._id != undefined)
                    //     anexarFilaTabla(res);
                },
                error:(error)=>{
                    console.error(error);
                }
            });

}












        