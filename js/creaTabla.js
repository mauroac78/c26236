// Funcion para generar una sola fila de la tabla
export function crearFila(producto) {

    // Creo la fila
    const fila = document.createElement("tr");

    // Creo la celda del nombre del producto
    const celdaTitulo = document.createElement("td");
    celdaTitulo.textContent = producto.titulo;

    // Creo la celda de la descripcion
    const celdaDescripcion = document.createElement("td");
    celdaDescripcion.textContent = producto.descripcion;

    // Creo la celda del precio
    const celdaPrecio = document.createElement("td");
    celdaPrecio.textContent = `$${producto.precio}`;

    // Creo la celda del stock con el color segun si hay o no
    const celdaStock = document.createElement("td");
    if (producto.stock === true){
        celdaStock.textContent = "SI";
        celdaStock.classList.add("stock-yes");
    } else{
        celdaStock.textContent = "NO";
        celdaStock.classList.add("stock-no");
    }

    // Agrego las celdas en el mismo orden que las columnas del encabezado
    fila.appendChild(celdaTitulo);
    fila.appendChild(celdaDescripcion);
    fila.appendChild(celdaPrecio);
    fila.appendChild(celdaStock);

    return fila;
}

//Funcion para renderizar las filas de la tabla
export function renderizarTabla(lista_productos, contenedor) {
    for (const producto of lista_productos) {
        // Ejecuto la funcion que crea una fila
        const fila = crearFila(producto);
        // Agrego la fila al cuerpo de la tabla
        contenedor.appendChild(fila);
    }
}
