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
const productos = [producto1, producto2, producto3];

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
        contenedorProductos.innerHTML += `
        <div> 
            <h3>${producto.nombre}<h3>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
            <button class="btn-eliminar" data-id="${producto.id}">Elminar</button>
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
        renderizarProductos(productos);

        mensaje.textContent = "Producto eliminado correctamente";
    });
}
}
renderizarProductos(productos);

botonAgregar.addEventListener("click", () =>{
    const nombre = inputNombre.value;
    const precio = parseFloat(inputPrecio.value);
    const stock = parseInt(inputStock.value);

    const nuevoProducto = new Producto(
        productos.length + 1,
        nombre,
        precio,
        stock
    );
    productos.push(nuevoProducto);
    renderizarProductos(productos);
    mensaje.textContent = "Producto agregado correctamente";

});

buscador.addEventListener("keyup", () => {
    const textoBuscado = buscador.value;

    const productosFiltrados = productos.filter(
        producto => producto.nombre.toLowerCase().includes(textoBuscado.toLowerCase())
    );

    renderizarProductos(productosFiltrados);
});