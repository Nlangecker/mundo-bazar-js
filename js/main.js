const nombre = prompt("Ingrese su nombre");
const producto = prompt("Ingrese el producto que desea comprar")
const precio = parseFloat(prompt ("Ingrese el precio del producto"));
const cantidad= parseInt(prompt("Ingrese cantidad que desea comprar"))

const total= precio * cantidad;

const mensaje= 
"Hola " + nombre +
",elegiste " + cantidad +
"unidad/es de " + producto +
". El total de tu compra es $ " + total;
console.log(mensaje);
alert(mensaje);