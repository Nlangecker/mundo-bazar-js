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
const producto1 = new Producto(1, "Vasos", 2500, 20);
const producto2 = new Producto(2, "Platos", 4000, 15);
const producto3 = new Producto(3, "Botellas", 6000, 10);
producto1.vender(3);
const productosIniciales = [producto1, producto2, producto3];
let productos = JSON.parse(localStorage.getItem("productos")) ?? productosIniciales;

const inputNombre = document.querySelector("#nombre-producto");
const inputPrecio = document.querySelector("#precio-producto");
const inputStock = document.querySelector("#stock-producto");
const botonAgregar = document.querySelector("#btn-agregar");
const mensaje = document.querySelector("#mensaje");
const buscador = document.querySelector("#buscador");
const contenedorProductos = document.querySelector("#contenedor-productos");

function renderizarProductos(lista){
    contenedorProductos.innerHTML = "";

    for(const producto of lista) {
        const { id, nombre, precio, stock } = producto;
        contenedorProductos.innerHTML += `
        <div> 
            <h3>${nombre}<h3>
            <p>Precio: $${precio}</p>
            <p>Stock: ${stock}</p>
            <button class="btn-eliminar" data-id="${id}">Elminar</button>
        </div>
        `;
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

botonAgregar.addEventListener("click", () =>{
    try{
        const nombre = inputNombre.value.trim();
        const precio = parseFloat(inputPrecio.value);
        const stock = parseInt(inputStock.value);
        if (nombre === "" || isNaN(precio) || precio <= 0 || isNaN(stock) || stock < 0){
            throw new Error("Completa correctamente el nombre, precio y stock.");
            
        }
        const nuevoProducto = new Producto(
            productos.length + 1,
            nombre,
            precio,
            stock
        );

        productos.push(nuevoProducto);
        localStorage.setItem("productos", JSON.stringify(productos));
        renderizarProductos(productos);

        mensaje.textContent = stock > 0
            ? "Producto agregado correctamente"
            : "Producto agregado sin stock";

    } catch (error) {
        mensaje.textContent = "No se pudo agregar el producto: " + error.message;

    } finally {
        console.log("Finalizó el intento de agregar producto.");
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