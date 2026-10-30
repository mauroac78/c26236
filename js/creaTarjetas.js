// Funcion para generar una sola tarjeta
export function crearTarjeta(producto, rutaImg = "./img/", rutaProductos = "./pages/productos.html") { //pongo ruta imagen porque si la uso en index es una ruta y si la usa en productos es otra.
    
    // Creo el article para la tarjeta del producto
    const tarjetaProducto = document.createElement("article");
    tarjetaProducto.classList.add("card"); // Esto me agrega el estilo css ya defino 

    //Creo la imagen
    const img = document.createElement("img")
    if (producto.stock){
        img.src = rutaImg + producto.imagen
    }else{
        img.src = rutaImg + producto.imagen.slice(0, producto.imagen.indexOf(".")) + "_sin_stock.jpeg"; //extraigo el nombre del producto del archivo y le agrego _sin_stock
    }
    img.alt = producto.descripcion
    img.classList.add("card__image"); // Esto me agrega el estilo css ya defino

    //Creo el div para el contenido de la tarjeta
    const divTarjeta = document.createElement("div");
    divTarjeta.classList.add("card__content");

    // Creo el título y agrego el contenido
    const tituloProducto = document.createElement("h3");
    tituloProducto.textContent = producto.titulo;
    tituloProducto.classList.add("card__title");

    // Creo la descripción del producto
    const descripcionProducto = document.createElement("p");
    descripcionProducto.textContent = producto.descripcion;
    descripcionProducto.classList.add("card__description");

    // Creo el precio y agrego el contenido
    const precioProducto = document.createElement("p");
    precioProducto.textContent = `$${producto.precio}`;
    precioProducto.classList.add("card__price");

    // Creo el botón comprar
    const botonVerMas = document.createElement("a");
    botonVerMas.textContent = "Comprar";
    botonVerMas.href = rutaProductos
    if (producto.stock === true){
        botonVerMas.classList.add("btn");
    } else{
        botonVerMas.classList.add("btn", "btn--disabled");
    }

    // Agrego los elementos segun como quiero que se visualicen 
    // 1. La imagen primero
    tarjetaProducto.appendChild(img);
    // 2. Luego viene el div con el titulo del producto, el precio, la descripcion y el boton de compra
    tarjetaProducto.appendChild(divTarjeta);
    divTarjeta.appendChild(tituloProducto);
    divTarjeta.appendChild(precioProducto);
    divTarjeta.appendChild(descripcionProducto);
    divTarjeta.appendChild(botonVerMas);

    return tarjetaProducto;
}

//Funcion para renderizar las tarjetas de los productos
export function renderizarProductos(lista_productos, contenedor, opciones = {}) {
    for (const producto of lista_productos) {
        // Ejecuto la funcion que crea una tarjeta
        const Tarjeta = crearTarjeta(producto, opciones.rutaImg, opciones.rutaProductos)
        // Agrego la tarjeta al contenedor
        contenedor.appendChild(Tarjeta);
    }
}