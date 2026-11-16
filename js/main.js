class Producto{
    constructor(id, nombre, precio, stock){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
vender(cantidad){
    this.stock = this.stock - cantidad;
}
}
let productos = JSON.parse(localStorage.getItem("productos")) || [];


productos.forEach(producto => {
    if (!producto.imagen) {
        const nombre = producto.nombre.toLowerCase();

        if (nombre === "vasos") producto.imagen = "./assets/vasos-bazar.png";
        else if (nombre === "mate") producto.imagen = "./assets/mates-bazar.png";
        else if (nombre === "canasto") producto.imagen = "./assets/canasto-bazar.png";
        else if (nombre === "mesa plegable") producto.imagen = "./assets/mesaplegable-bazar.png";
    }
});
localStorage.setItem("productos", JSON.stringify(productos));

const inputNombre = document.querySelector("#nombre-producto");
const inputPrecio = document.querySelector("#precio-producto");
const inputStock = document.querySelector("#stock-producto");
const botonAgregar = document.querySelector("#btn-agregar");
const mensaje = document.querySelector("#mensaje");
const buscador = document.querySelector("#buscador");
const contenedorProductos = document.querySelector("#contenedor-productos");
let idEnEdicion = null

function renderizarProductos(lista){
    let tarjetasHTML = "";

    for(const producto of lista) {
        const { id, nombre, precio, stock, imagen } = producto;
        tarjetasHTML += `
        <div>  
            <img src="${imagen}" alt= "Imagen de ${nombre}" class="imagen-producto">
            <h3>${nombre}</h3>
            <p>Precio: $${precio.toLocaleString("es-AR")}</p>
            <p>Stock: ${stock === 0 ? "Agotado" : stock}</p>
            <button class="btn-editar" data-id="${id}">Editar</button>
            <button class="btn-eliminar" data-id="${id}">Eliminar</button>
            <button class="btn-vender" data-id="${id}">Agregar a venta</button>
        </div>
        `;
    }
    contenedorProductos.innerHTML = tarjetasHTML;
const botonesEditar = document.querySelectorAll(".btn-editar");

for (const boton of botonesEditar){
    boton.addEventListener("click", () =>{

        const idProducto = parseInt(boton.dataset.id);
        const productoEditar = productos.find(
            producto => producto.id === idProducto
        );
        idEnEdicion = idProducto;
        botonAgregar.textContent = "Guardar cambios";
        inputNombre.value = productoEditar.nombre;
        inputPrecio.value = productoEditar.precio;
        inputStock.value = productoEditar.stock;
        document.getElementById("seccion-formulario").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        mensaje.textContent = "Estas editando un producto.Modificá los datos y guardá los cambios.";
    } ); 
}
const botonesEliminar = document.querySelectorAll(".btn-eliminar");


for (const boton of botonesEliminar) {
    boton.addEventListener("click", () => {
        const idProducto = parseInt(boton.dataset.id);

        const posicion = productos.findIndex(
            producto => producto.id === idProducto
        );

        productos.splice(posicion, 1);
        localStorage.setItem("productos", JSON.stringify(productos));
        renderizarProductos(productos);

        mensaje.textContent = "Producto eliminado correctamente";
    });
    }
}

botonAgregar.addEventListener("click", () => {
    try {
        const nombre = inputNombre.value.trim();
        const precio = parseFloat(inputPrecio.value);
        const stock = parseInt(inputStock.value);

        if (nombre === "" || isNaN(precio) || precio <= 0 || isNaN(stock) || stock < 0) {
            throw new Error("Completá correctamente el nombre, precio y stock.");
        }

        const productoDuplicado = productos.some(producto =>
            producto.nombre.trim().toLowerCase() === nombre.toLowerCase() &&
            producto.id !== idEnEdicion
        );
        if (productoDuplicado) {
            throw new Error("Ya existe un producto con ese nombre.");
        }

        if (idEnEdicion !== null) {

            const productoEditar = productos.find(
                producto => producto.id === idEnEdicion
            );

            if (!productoEditar) {
                throw new Error("No se encontró el producto para editar.");
            }

            productoEditar.nombre = nombre;
            productoEditar.precio = precio;
            productoEditar.stock = stock;

            const nuevaImagen = document.getElementById("imagen-producto").value.trim();
            if (nuevaImagen !== ""){
                productoEditar.imagen= nuevaImagen;
            }

            mensaje.textContent = "Producto modificado correctamente";
            mensaje.style.color = "green";

            idEnEdicion = null;
            botonAgregar.textContent = "Agregar producto";

        } else {

            const nuevoID = productos.reduce(
                (mayor, producto) => producto.id > mayor ? producto.id : mayor,
                0

            ) + 1;

            const nuevoProducto = new Producto(
                nuevoID,
                nombre,
                precio,
                    stock
            );
        
        nuevoProducto.imagen = document.getElementById("imagen-producto").value.trim();

            productos.push(nuevoProducto);

            mensaje.textContent = stock > 0
                ? "Producto agregado correctamente"
                : "Producto agregado sin stock";
                mensaje.style.color = "green";
        }

        localStorage.setItem("productos", JSON.stringify(productos));
        renderizarProductos(productos);

        inputNombre.value = "";
        inputPrecio.value = "";
        inputStock.value = "";

    } catch (error) {
        mensaje.textContent = "No se pudo guardar el producto: " + error.message;
        mensaje.style.color = "red";
    } 
});

buscador.addEventListener("keyup", () => {
    const textoBuscado = buscador.value;

    const productosFiltrados = productos.filter(
        producto => producto.nombre.toLowerCase().includes(textoBuscado.toLowerCase())
    );

    renderizarProductos(productosFiltrados);
});

const mensajeBienvenida = document.querySelector("#mensaje-bienvenida");
setTimeout(() =>{
    mensajeBienvenida.textContent =
        "¡Bienvenido a Mundo Bazar! Recordá revisar el stock disponible de nuestros productos";
}, 3000);


async function cargarProductos() {
    mensaje.textContent = "Cargando productos...";
    try {
        const response = await fetch("./data/data.json");
        if (!response.ok){
            throw new Error(" No se pudieron cargar los productos");
        }
        const datos = await response.json();
        if (localStorage.getItem("productos") === null || productos.length === 0) {
            productos = datos;
            localStorage.setItem("productos", JSON.stringify(productos));
}
renderizarProductos(productos);
mensaje.textContent = "Productos cargados correctamente";
Toastify({
    text:"Productos cargados correctamente",
    duration: 3000,
    gravity: "top",
    position:"right",
    style:{
        background:"#5d4037"
    }
}).showToast();

} catch (error) {
    mensaje.textContent= "Error al cargar productos: " + error.message;
    console.error(error);
    Toastify({
    text: "Error al cargar los productos",
    duration: 4000,
    gravity: "top",
    position:"right",
    style:{
        background:"#b3261e"
    }
}).showToast();
}
}
cargarProductos();



