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
let productos = JSON.parse(localStorage.getItem("productos")) ?? [];

const inputNombre = document.querySelector("#nombre-producto");
const inputPrecio = document.querySelector("#precio-producto");
const inputStock = document.querySelector("#stock-producto");
const botonAgregar = document.querySelector("#btn-agregar");
const mensaje = document.querySelector("#mensaje");
const buscador = document.querySelector("#buscador");
const contenedorProductos = document.querySelector("#contenedor-productos");
let idEnEdicion = null

function renderizarProductos(lista){
    contenedorProductos.innerHTML = "";

    for(const producto of lista) {
        const { id, nombre, precio, stock } = producto;
        contenedorProductos.innerHTML += `
        <div> 
            <h3>${nombre}<h3>
            <p>Precio: $${precio}</p>
            <p>Stock: ${stock}</p>
            <button class="btn-editar" data-id="${id}">Editar</button>
            <button class="btn-eliminar" data-id="${id}">Elminar</button>
        </div>
        `;
    }
const botonesEditar = document.querySelectorAll(".btn-editar");

for (const boton of botonesEditar){
    boton.addEventListener("click", () =>{
        console.log("HTML del boton:", boton.outerHTML);
        console.log("Data ID:", boton.dataset.id);
        const idProducto = parseInt(boton.dataset.id);
        console.log("ID seleccionado:", idProducto);
        console.log("Productos disponibles:", productos);
        const productoEditar = productos.find(
            producto => producto.id === idProducto
        );
        idEnEdicion = idProducto;
        botonAgregar.textContent = "Guardar cambios";
        inputNombre.value = productoEditar.nombre;
        inputPrecio.value = productoEditar.precio;
        inputStock.value = productoEditar.stock;
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
renderizarProductos(productos);

botonAgregar.addEventListener("click", () => {
    try {
        const nombre = inputNombre.value.trim();
        const precio = parseFloat(inputPrecio.value);
        const stock = parseInt(inputStock.value);

        if (nombre === "" || isNaN(precio) || precio <= 0 || isNaN(stock) || stock < 0) {
            throw new Error("Completá correctamente el nombre, precio y stock.");
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

            mensaje.textContent = "Producto modificado correctamente";

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

            productos.push(nuevoProducto);

            mensaje.textContent = stock > 0
                ? "Producto agregado correctamente"
                : "Producto agregado sin stock";
        }

        localStorage.setItem("productos", JSON.stringify(productos));
        renderizarProductos(productos);

        inputNombre.value = "";
        inputPrecio.value = "";
        inputStock.value = "";

    } catch (error) {
        mensaje.textContent = "No se pudo guardar el producto: " + error.message;

    } finally {
        console.log("Finalizó el intento de guardar producto.");
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
        "¡Bienvenido a Mundo Bazar! Recorda revisar el stock disponible de nuestros productos";
}, 3000);


async function cargarProductos() {
    mensaje.textContent = "Cargando productos...";
    try {
        const response = await fetch("./data.json");
        if (!response.ok){
            throw new Error(" No se pudieron cargar los productos");
        }
        const datos = await response.json();
        if (localStorage.getItem("productos") === null) {
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
} finally {
    console.log("Finalizo la carga de productos");
}
}
cargarProductos();



