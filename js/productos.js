// Importo los datos
import {productos} from "./datos.js";
//importo la funcion de renderizado
import {renderizarProductos} from "./creaTarjetas.js";
//importo la funcion que arma la tabla
import {renderizarTabla} from "./creaTabla.js";

//Selecciono en donde van a ir las filas de la tabla
const cuerpoTabla = document.getElementById("tabla-productos");

// Ejecuto el renderizado de la tabla
renderizarTabla(productos, cuerpoTabla);

//Selecciono en donde van a ir las tarjetas
const divTarjetas = document.getElementById("tarjetas");

// Ejecuto el renderizado
renderizarProductos(productos, divTarjetas, { rutaImg: "../img/", rutaProductos: "./productos.html" });