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