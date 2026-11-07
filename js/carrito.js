//importo la funciones
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";

// El carrito guarda un elemento por unidad (3 tazas = 3 objetos iguales).
// Esta funcion los agrupa por titulo para mostrar una sola fila con su cantidad.
// Guarda tambien el indice de la primera unidad, que es el que necesita eliminarProducto.
const agruparProductos = (carrito) => {
    const grupos = {};
    carrito.forEach((producto, indice) => {
        if (!grupos[producto.titulo]) {
            grupos[producto.titulo] = { producto, cantidad: 0, indice };
        }
        grupos[producto.titulo].cantidad++;
    });
    return Object.values(grupos);
};

// Crea una celda de texto
const crearCelda = (texto) => {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
};

// Crea la fila de un producto: nombre, precio unitario, cantidad, subtotal y boton quitar
const crearFilaCarrito = ({ producto, cantidad, indice }) => {
    const fila = document.createElement("tr");

    const celdaAccion = document.createElement("td");
    const botonQuitar = document.createElement("button");
    botonQuitar.type = "button";
    botonQuitar.textContent = "Quitar uno";
    botonQuitar.classList.add("btn", "btn--secundario");
    botonQuitar.addEventListener("click", () => {
        eliminarProducto(indice);
        renderizarCarrito(); // volvemos a dibujar con el carrito actualizado
    });
    celdaAccion.appendChild(botonQuitar);

    fila.appendChild(crearCelda(producto.titulo));
    fila.appendChild(crearCelda(`$${producto.precio}`));
    fila.appendChild(crearCelda(cantidad));
    fila.appendChild(crearCelda(`$${producto.precio * cantidad}`));
    fila.appendChild(celdaAccion);

    return fila;
};

// Crea la tabla completa con encabezado y una fila por producto
const crearTablaCarrito = (grupos, total) => {
    const tabla = document.createElement("table");
    tabla.classList.add("products-table", "carrito-tabla"); // reutiliza el estilo de la tabla de productos

    const encabezado = document.createElement("thead");
    const filaEncabezado = document.createElement("tr");
    for (const titulo of ["Producto", "Precio unitario", "Cantidad", "Subtotal", ""]) {
        const th = document.createElement("th");
        th.textContent = titulo;
        filaEncabezado.appendChild(th);
    }
    encabezado.appendChild(filaEncabezado);

    const cuerpo = document.createElement("tbody");
    for (const grupo of grupos) {
        cuerpo.appendChild(crearFilaCarrito(grupo));
    }

    // Ultima fila: el total queda justo debajo de la columna de subtotales
    const pie = document.createElement("tfoot");
    const filaTotal = document.createElement("tr");

    const celdaEtiqueta = crearCelda("Total");
    celdaEtiqueta.colSpan = 3; // ocupa las columnas Producto, Precio unitario y Cantidad
    celdaEtiqueta.classList.add("carrito-total__etiqueta");

    const celdaMonto = crearCelda(`$${total}`);
    celdaMonto.classList.add("carrito-total__monto");

    filaTotal.append(celdaEtiqueta, celdaMonto, document.createElement("td")); // ultima celda vacia (columna del boton)
    pie.appendChild(filaTotal);

    tabla.appendChild(encabezado);
    tabla.appendChild(cuerpo);
    tabla.appendChild(pie);
    return tabla;
};

export const renderizarCarrito = () => {
    //Leemos cantidad de productos en carrito para mostrar
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    //Accedemos al nodo donde vamos a mostrar la tabla del carrito
    const contenedor = document.getElementById("contenedor-carrito");

    // Botones de acciones
    const divAcciones = document.getElementById("acciones-carrito");

    //Esta lineas limpian los contenedor antes de renderizar tabla y botones
    contenedor.innerHTML = "";
    divAcciones.innerHTML = "";

    // Carrito vacio: mostramos un mensaje y no dibujamos nada mas
    if (carrito.length === 0) {
        const vacio = document.createElement("div");
        vacio.classList.add("carrito-vacio");

        const icono = document.createElement("span");
        icono.classList.add("material-symbols-outlined");
        icono.setAttribute("aria-hidden", "true");
        icono.textContent = "shopping_cart";

        const titulo = document.createElement("h3");
        titulo.classList.add("carrito-vacio__titulo");
        titulo.textContent = "Tu carrito está vacío";

        const texto = document.createElement("p");
        texto.classList.add("carrito-vacio__texto");
        texto.textContent = "Todavía no agregaste productos.";

        // Enlace para volver a la tienda
        const botonProductos = document.createElement("a");
        botonProductos.href = "./productos.html";
        botonProductos.classList.add("btn");
        botonProductos.textContent = "Ver productos";

        vacio.append(icono, titulo, texto, botonProductos);
        contenedor.appendChild(vacio);
        return;
    }

    // Total: suma del precio de cada unidad guardada en el carrito
    const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

    // Tabla con una fila por producto y el total al final
    contenedor.appendChild(crearTablaCarrito(agruparProductos(carrito), total));

    // Boton para vaciar todo el carrito
    const botonVaciar = document.createElement("button");
    botonVaciar.type = "button";
    botonVaciar.textContent = "Vaciar carrito";
    botonVaciar.classList.add("btn", "btn--secundario");
    botonVaciar.addEventListener("click", () => {
        vaciarCarrito();
        renderizarCarrito();
    });

    // Boton comprar: por ahora no hace nada (href "#")
    const botonComprar = document.createElement("a");
    botonComprar.href = "#";
    botonComprar.textContent = "Comprar";
    botonComprar.classList.add("btn");

    divAcciones.append(botonVaciar, botonComprar);
};

// Dibujamos el carrito al cargar la pagina
renderizarCarrito();
