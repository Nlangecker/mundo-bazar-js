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
const mostrarResultado = (nombre, producto, cantidad, total) =>{
    const mensaje= 
"Hola " + nombre +
",elegiste " + cantidad +
"unidad/es de " + producto +
". El total de tu compra es $ " + total;
console.log(mensaje);
alert(mensaje);
};


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