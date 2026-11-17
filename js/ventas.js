const contenedorVenta = document.querySelector("#contenedor-venta");
const totalVenta = document.querySelector("#total-venta");
const botonConfirmarVenta = document.querySelector("#btn-confirmar-venta");
const mensajeVenta = document.querySelector("#mensaje-venta");

let carrito = [];

let historialVentas = [];

try {
    historialVentas = JSON.parse(localStorage.getItem("historialVentas")) ?? [];
} catch (error) {
    console.error("Error al cargar el historial de ventas:", error);
}
const contenedorHistorial = document.querySelector("#contenedor-historial");
const resumenVentas = document.querySelector("#resumen-ventas")
const botonVaciarHistorial = document.getElementById("boton-vaciar-historial");

contenedorProductos.addEventListener("click", (evento) =>{
    if (evento.target.classList.contains("btn-vender")){
        const idProducto = Number(evento.target.dataset.id);
        const productoSeleccionado = productos.find(
            producto => producto.id === idProducto
        );
        if (!productoSeleccionado || productoSeleccionado.stock <= 0){
            mensajeVenta.textContent = "El producto no tiene stock disponible";
            return;
        }
        const productoEnCarrito = carrito.find(
            producto => producto.id === idProducto
);
        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad >= productoSeleccionado.stock) {
                mensajeVenta.textContent = "No hay más stock disponible.";
                return;
    }

    productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            precio: productoSeleccionado.precio,
            cantidad: 1
    });
}

        mensajeVenta.textContent = "Producto agregado a la venta correctamente";
        mostrarCarrito();
        }
});
function mostrarCarrito() {
    let carritoHTML = "";

    for (const producto of carrito) {
        carritoHTML += `
        <p>${producto.nombre} - Cantidad ${producto.cantidad} - Precio: $${producto.precio}</p>
        <button class="btn-sumar" data-id="${producto.id}">+</button>
        <button class="btn-restar" data-id="${producto.id}">-</button>
        <button class="btn-quitar" data-id="${producto.id}">Quitar</button>
        `;
    }
    contenedorVenta.innerHTML = carritoHTML;
    const total= carrito.reduce(
        (acumulador, producto) => acumulador + producto.precio * producto.cantidad,     
        0
    );
    totalVenta.textContent = `Total: $${total}`;
}
contenedorVenta.addEventListener("click", (evento) =>{
    if(evento.target.classList.contains("btn-sumar")){
        const idProducto = Number(evento.target.dataset.id);


        const productoEnCarrito = carrito.find(
            producto => producto.id === idProducto
        );

const productoInventario = productos.find(
    producto => producto.id === idProducto
);
if (!productoEnCarrito || !productoInventario){
    return;
}
if (productoEnCarrito.cantidad >=productoInventario.stock){
    mensajeVenta.textContent = "No hay mas stock disponible.";
    return;
}
productoEnCarrito.cantidad++;
mostrarCarrito();
}
if (evento.target.classList.contains("btn-restar")){
    const idProducto = Number(evento.target.dataset.id);

    const productoEnCarrito = carrito.find(
        producto =>producto.id === idProducto
    );
    if (!productoEnCarrito){
        return;
    }
if (productoEnCarrito.cantidad > 1){
    productoEnCarrito.cantidad --;
    mostrarCarrito();
} else {
    mensajeVenta.textContent = "La cantidad minima es 1. Usá quitar para eliminar el producto.";
}
}
if (evento.target.classList.contains("btn-quitar")) {
    const idProducto = Number(evento.target.dataset.id);

    carrito = carrito.filter(
        producto => producto.id !== idProducto
    );

    mostrarCarrito();
    mensajeVenta.textContent = "Producto quitado de la venta correctamente.";
}
});
botonConfirmarVenta.addEventListener("click", () => {
    if (carrito.length === 0){
        mensajeVenta.textContent = "No hay productos para confirmar la venta.";
        return;
    }

        const stockInsuficiente = carrito.some(item => {
        const productoInventario = productos.find(
            producto => producto.id === item.id
        );

        return !productoInventario || productoInventario.stock < item.cantidad;
    });

    if (stockInsuficiente) {
        mensajeVenta.textContent = "No se puede confirmar la venta: stock insuficiente.";
        return;
    }

    const nuevaVenta = {
        fecha: new Date().toLocaleString("es-AR"),
        productos: carrito.map(item => ({ ...item })),
        total: carrito.reduce(
            (acumulador, item) => acumulador + item.precio * item.cantidad,
            0
        )
    };

    historialVentas.push(nuevaVenta);
    localStorage.setItem("historialVentas", JSON.stringify(historialVentas));

    for(const item of carrito) {
        const productoInventario = productos.find(
            producto => producto.id === item.id
        );

        if (productoInventario){
            productoInventario.stock -= item.cantidad;
        }
    }   

    localStorage.setItem("productos", JSON.stringify(productos));
    renderizarProductos(productos);

    carrito = [];
    mostrarCarrito();
    mensajeVenta.textContent = "Venta confirmada correctamente";
    mostrarHistorial();
    mostrarResumenVentas();
});

function mostrarHistorial(){
    let historialHTML = "";
    if(historialVentas.length === 0){
        contenedorHistorial.textContent = "Todavia no hay ventas registradas";
        return;
    }

    for (const venta of [... historialVentas].reverse()){
        historialHTML += `
        <div class="venta-historial">
        <p>Fecha: ${venta.fecha}</p>
        <p>Producto vendidos:</p>
        <ul>
        ${venta.productos.map(producto => `
    <li>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio.toLocaleString("es-AR")} 
    - Subtotal: $${(producto.precio * producto.cantidad).toLocaleString("es-AR")}</li>
    `).join("")}
        </ul>
        <p>Total: $${venta.total.toLocaleString("es-AR")}</p>
        </div>
        `;
    }
    contenedorHistorial.innerHTML = historialHTML;
}
mostrarHistorial();

function mostrarResumenVentas(){
    const cantidadVentas = historialVentas.length;

    const totalVendido = historialVentas.reduce(
        (acumulador, venta) => acumulador + venta.total,
        0
    );
    resumenVentas.innerHTML = `
    <p>Ventas realizadas: ${cantidadVentas}</p>
    <p>Total vendido: $${totalVendido.toLocaleString("es-AR")}</p>
    `;
}



botonVaciarHistorial.addEventListener("click", () => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se borrará todo el historial de ventas.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "brown",
        cancelButtonColor: "gray"
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            historialVentas = [];
            localStorage.removeItem("historialVentas");

            mostrarHistorial();
            mostrarResumenVentas();
        }
    });
});