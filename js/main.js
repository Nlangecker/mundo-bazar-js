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

console.log(producto1);
console.log(producto2);
console.log(producto3);

function calcularTotal(precio, cantidad){
    return precio * cantidad
}
function clasificarCompra(total){
    if (total>= 20000){
    alert("Tu compra es grande");
} else if (total >= 10000){
    alert("Tu compra es mediana");
} else {
    alert("Tu compra es pequeña");
}}
function listarProductos(lista){
    console.log("---Productos Disponibles---");

    for (const producto of lista){
        console.log("Producto: " + producto);
    }
    console.log("Total de productos:" + lista.length);
}
const mostrarResultado = (nombre, producto, cantidad, total) =>{
    const mensaje= 
"Hola " + nombre +
",elegiste " + cantidad +
"unidad/es de " + producto +
". El total de tu compra es $ " + total;
console.log(mensaje);
alert(mensaje);
};
const productosDisponibles =[
    "Vasos",
    "Platos",
    "Cubiertos",
    "Organizadores",
    "Botellas",
];
productosDisponibles.push("Tazas");
productosDisponibles.unshift("Termos");
const productoEliminado = productosDisponibles.pop();
alert("Se ha eleminado el elemento" + productoEliminado);
const productoBuscado = prompt("Ingrese el producto que desea buscar");
if (productosDisponibles.includes(productoBuscado)){
    const posicion =productosDisponibles.indexOf(productoBuscado);
    alert("El producto esta disponible en la posicion" + posicion);
} else{
    alert("El producto no esta disponible");
}
productosDisponibles.splice(2,1, "Platos de vidrio");
listarProductos(productosDisponibles);


const nombre = prompt("Ingrese su nombre");
let continuar = "SI";
while (continuar === "SI") {

const producto = prompt("Ingrese el producto que desea comprar");
const precio = parseFloat(prompt ("Ingrese el precio del producto"));
const cantidad= parseInt(prompt("Ingrese cantidad que desea comprar"));

const total= calcularTotal (precio, cantidad);
clasificarCompra(total);
mostrarResultado(nombre, producto, cantidad, total);

continuar = prompt("¿Desea realizar otra compra? Escriba SI para continuar o Esc para salir");
}