// Importo los datos
import {productos} from "./datos.js";
//importo la funcion de renderizado
import {renderizarProductos} from "./creaTarjetas.js";

//Extraigo de productos los 3 productos más vendidos
const top3Productos = productos.toSorted((a, b) => b.cantVentas - a.cantVentas).slice(0, 3); //resta de a pares la cantidad de ventas si me da positivo b es más grande. luego el slice se queda con los 3 más grandes.

//Selecciono en donde van a ir las tarjetas
const divTarjetas = document.getElementById("tarjetas");

// Ejecuto el renderizado
renderizarProductos(top3Productos, divTarjetas);