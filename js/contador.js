// Muestra al cargar la pagina cuantos productos hay guardados en el carrito
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

actualizarContador(obtenerCarrito());
