Mundo Bazar 

Descripción del proyecto

Mundo Bazar es una aplicación web desarrollada con HTML, CSS y JavaScript que permite administrar productos y registrar ventas de un comercio de artículos de bazar.
El proyecto fue desarrollado como trabajo práctico para el curso de JavaScript de Coderhouse, aplicando conceptos de programación, manipulación del DOM, almacenamiento local y consumo de datos mediante JSON.

Funcionalidades

Visualizar productos con nombre, precio, stock e imagen.

Agregar nuevos productos al inventario.

Editar y eliminar productos existentes.

Validar los datos ingresados y detectar nombres duplicados.

Buscar productos.

Agregar productos a una venta.

Calcular importes y registrar ventas.

Consultar el historial de ventas.

Guardar información mediante localStorage.

Mostrar notificaciones y mensajes de error.

Tecnologías utilizadas

HTML5: estructura de la aplicación.

CSS3: diseño y presentación visual.

JavaScript: lógica, eventos y manipulación del DOM.

JSON y Fetch API: carga de datos de productos.

localStorage: persistencia de información en el navegador.

SweetAlert2 y Toastify: notificaciones e interacción con el usuario.

Estructura del proyecto

mundo-bazar/
|─ assets/
|    |─ Imágenes de productos
|─ css/
|    |─ styles.css
|─ data/
|    |─ data.json
|─ js/
|    |─ main.js
|    |─ ventas.js
|─ index.html
|─ README.md


Cómo ejecutar el proyecto

Descargar o clonar el repositorio.

Abrir la carpeta del proyecto en Visual Studio Code.

Instalar la extensión Live Server, si todavía no está instalada.

Abrir index.html utilizando Live Server.

Utilizar la aplicación desde el navegador.

Se recomienda ejecutar el proyecto mediante un servidor local porque utiliza fetch() para cargar el archivo JSON.

Persistencia de datos

La aplicación utiliza localStorage para conservar los productos y el historial de ventas entre sesiones del navegador.

Los datos iniciales de productos se encuentran en data/data.json.

Autor

Proyecto desarrollado como entrega del curso de JavaScript de Coderhouse.