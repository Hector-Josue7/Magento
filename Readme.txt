# Magento
### El objetivo es una aplicación CMS que posea las siguientes funcionalidades

## Usuario Administrador->
Administración del banco de imagenes, videos y archivos genericos
* imagenes
* videos
* Archivos genericos: Dicho código servirá para poder incrustar este tipo de recursos mediante shortcuts

### Administrar página principal y configuraciones del sitio -> apartados
* Crear un encabezado de página genericos
* Pie de página genérico
* Titulo de la página
* Subir favicon
* Descripción
* Palabras clave
* CSS extra -> Opciones {
   * Pagina de la lista de páginas creadas
   * Enlace fijo el cual tendrá que indicar 
}

La edición de la pagina es mediante un ediator HTML tipo wysiwyg y con la funcionalidad de incrustar shortcuts o códigos cortos

### Creación y administración de paginas
 * Paginas estáticas (HTML) -> Se visualizará un editor HTML tipo wysiwyg, en dicha pagina se podran incrustrar diferentes shortcuts o códigos cortos para generar contenido dinamico
 * Paginas de entradas o posts -> Se seleccionara una categoria de posts o entradas en un formato cornologico usar la libreria timeago.<i class="fa fa-jsfiddle" aria-hidden="true"></i>

 ### Creación y administracióm de entradas/posts -> Se crearan bloques de contenido informativo para luego ser utiizado en paginas o mediante shortcuts
 * Titulo de la entrada
 * Autor (Usuario autenticado)
 * Fecha/Hora (Automatica)
 * Contenido de la entrada (Se utiliza editor HTML wysiwyg)
 * Subir imagen representativa al post
 * Categoria a la que pertenece (Se utilizan opciones CRUD para las categorias)
 * Opción para indicar si se permiten comentarios o no 

###Incrustar componentes mediante Shortcuts (Códigos cortos) -> El formato propuesto para dichos shortcuts es JSON
* Login
* Galeria de imagenes
* Enlaces de descarga de archivos
* Post/entrada
* imagen
* Menú -> Serán componentes independientes que se podran incrustrar via shortcuts

### Administración de plantillas o temas 
* Titulo del tema 
* Descripción
* CSS (Editor en linea syntax highlighting)
* Javascript(Editor en linea syntax highlighting)
* Lista de iamgenes asociadas (Opcion de subir imagenes relacionadas al tema)

### Roles
* Paginas a las cuales tiene acceso el rol 
* Descripción
* Nombre del rol 

###Seguridad, creación de usuarios y roles 
 El administrador podrá crear usuarios de cualquier tipo, sin embargo un usuario cualquiera podría registrarse utilizando un rol generico




