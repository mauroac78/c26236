//importo la funcion de renderizado
import { renderizarProductos } from "./creaTarjetas.js";
//importo la funcion que arma la tabla
import { renderizarTabla } from "./creaTabla.js";

// Traigo los datos desde el json
fetch('../data/datos.json')
    .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
    })
    .then((productos) => {
        //Selecciono en donde van a ir las filas de la tabla
        const cuerpoTabla = document.getElementById("tabla-productos");

        // Ejecuto el renderizado de la tabla
        renderizarTabla(productos, cuerpoTabla);

        //Selecciono en donde van a ir las tarjetas
        const divTarjetas = document.getElementById("tarjetas");

        // Ejecuto el renderizado
        renderizarProductos(productos, divTarjetas, { rutaImg: "../img/", rutaProductos: "./productos.html" });
    })
    .catch((error) => console.error('Error al obtener productos: ', error));