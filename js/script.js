// 
// SCRIPT.JS — Solitario Triangular
// Aquí implementamos la lógica del juego y la interactividad
// 

'use strict'; // Activa el modo estricto de JavaScript 

//  VARIABLES DEL ESTADO DEL JUEGO 
// let: variables que cambian durante la partida
// const: valores que no cambian nunca

// Array de 15 posiciones: true = tiene ficha, false = vacío
// Posición 0 empieza vacía (el hueco inicial)
let tablero = [
    false,          // Posición 0 (vacía al inicio)
    true, true,     // Posiciones 1-2
    true, true, true,           // Posiciones 3-5
    true, true, true, true,     // Posiciones 6-9
    true, true, true, true, true // Posiciones 10-14
];

let fichaSeleccionada = null;  // Posición de la ficha seleccionada (null = ninguna)
let movimientos = 0;            // Contador de movimientos realizados
let fichasRestantes = 14;       // Empieza con 14 fichas (15 - 1 hueco)
let tiempoSegundos = 0;         // Segundos transcurridos
let temporizador = null;        // Referencia al setInterval del timer
let juegoActivo = false;        // ¿El juego ha empezado?
let historialMovimientos = [];  // Array como pila para deshacer (push/pop)

//  MAPA DE CONEXIONES 
// Objeto: cada posición tiene un array de movimientos posibles
// Cada movimiento es [posición_intermedia, posición_destino]
// Ejemplo: desde la posición 0, puedes saltar sobre la 1 y caer en la 3
const CONEXIONES = {
    0:  [[1,3], [2,5]],
    1:  [[0,2], [3,6], [4,8]],  // añadido salto diagonal
    2:  [[0,1], [4,7], [5,9]],  // añadido salto diagonal
    3:  [[1,0], [4,5], [6,10], [7,12]],
    4:  [[7,11], [8,13]],
    5:  [[2,0], [4,3], [8,12], [9,14]],
    6:  [[1,0], [3,1], [7,8], [11,13]],  // corregido
    7:  [[4,2], [8,9]],
    8:  [[4,1], [7,6]],
    9:  [[5,2], [8,7]],
    10: [[6,3], [11,12]],
    11: [[7,4], [12,13]],
    12: [[7,3], [8,5], [11,10], [13,14]],
    13: [[8,4], [12,11]],
    14: [[9,5], [13,12]]
};

// SELECCIÓN DE ELEMENTOS DEL DOM 
// document.getElementById(): selecciona un elemento por su ID
// document.querySelectorAll(): selecciona varios elementos por selector CSS

const elementosTablero = document.querySelectorAll('.posicion');
const spanFichas = document.getElementById('fichas-restantes');
const spanMovimientos = document.getElementById('movimientos');
const spanTiempo = document.getElementById('tiempo');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnDeshacer = document.getElementById('btn-deshacer');
const btnPista = document.getElementById('btn-pista');
const formPuntuacion = document.getElementById('form-puntuacion');

//  FUNCIÓN: INICIALIZAR JUEGO 
// Resetea todo el estado y actualiza el DOM
function inicializarJuego() {
    // Resetear variables
    tablero = [
        false,
        true, true,
        true, true, true,
        true, true, true, true,
        true, true, true, true, true
    ];
    fichaSeleccionada = null;
    movimientos = 0;
    fichasRestantes = 14;
    tiempoSegundos = 0;
    juegoActivo = false;
    historialMovimientos = [];

    // Detener el temporizador si estaba corriendo
    if (temporizador !== null) {
        clearInterval(temporizador);
        temporizador = null;
    }

    // Actualizar el DOM: recorrer cada posición del tablero
    elementosTablero.forEach((elemento, indice) => {
        // Limpiar todas las clases extra
        elemento.classList.remove('ficha', 'vacia', 'seleccionada');

        // Añadir la clase correcta según el estado
        if (tablero[indice]) {
            elemento.classList.add('ficha');    // Tiene ficha
        } else {
            elemento.classList.add('vacia');    // Está vacía
        }
    });

    // Actualizar los textos de las estadísticas
    actualizarEstadisticas();

    console.log('Juego inicializado');
}

//  FUNCIÓN: ACTUALIZAR ESTADÍSTICAS EN PANTALLA 
// Modifica el contenido de los <span> del DOM con textContent
function actualizarEstadisticas() {
    spanFichas.textContent = fichasRestantes;
    spanMovimientos.textContent = movimientos;
    spanTiempo.textContent = formatearTiempo(tiempoSegundos);
}

//  FUNCIÓN: FORMATEAR TIEMPO 
// 
function formatearTiempo(segundos) {
    const min = Math.floor(segundos / 60);  // Parte entera de la división
    const seg = segundos % 60;               // Resto de la división
    // padStart(2, '0') → añade un 0 delante si tiene menos de 2 dígitos
    return String(min).padStart(2, '0') + ':' + String(seg).padStart(2, '0');
}

//  FUNCIÓN: OBTENER MOVIMIENTOS VÁLIDOS DESDE UNA POSICIÓN 
// Devuelve un array con los movimientos posibles [intermedia, destino]
function obtenerMovimientosValidos(posicion) {
    const movimientosValidos = [];

    // Si la posición no tiene ficha, no hay movimientos
    if (!tablero[posicion]) {
        return movimientosValidos;
    }

    // Obtener las conexiones de esta posición
    const conexiones = CONEXIONES[posicion];

    // Si no hay conexiones definidas, devolver vacío
    if (!conexiones) {
        return movimientosValidos;
    }

    // Recorrer cada posible movimiento con for-of (UD3: bucle for-of)
    for (const movimiento of conexiones) {
        const intermedia = movimiento[0];  // Ficha que salta por encima
        const destino = movimiento[1];      // Donde aterriza

        // Condiciones para que el movimiento sea válido:
        // 1. La posición intermedia tiene ficha (para saltar sobre ella)
        // 2. La posición destino está vacía (para aterrizar)
        if (tablero[intermedia] && !tablero[destino]) {
            movimientosValidos.push(movimiento);
        }
    }

    return movimientosValidos;
}

// --- FUNCIÓN: MANEJAR CLIC EN UNA POSICIÓN DEL TABLERO ---
function manejarClic(posicion) {
    // Si no hay ficha seleccionada todavía...
    if (fichaSeleccionada === null) {
        // Solo se puede seleccionar una posición con ficha
        if (tablero[posicion]) {
            // Verificar que tiene al menos un movimiento válido
            const validos = obtenerMovimientosValidos(posicion);
            if (validos.length > 0) {
                fichaSeleccionada = posicion;
                elementosTablero[posicion].classList.add('seleccionada');

                // Iniciar temporizador en el primer clic
                if (!juegoActivo) {
                    juegoActivo = true;
                    iniciarTemporizador();
                }
            }
        }
    } else {
        // Ya hay una ficha seleccionada...

        // Si hace clic en la misma ficha → deseleccionar
        if (posicion === fichaSeleccionada) {
            elementosTablero[posicion].classList.remove('seleccionada');
            fichaSeleccionada = null;
            return; // Salir de la función
        }

        // Si hace clic en otra ficha → cambiar selección
        if (tablero[posicion]) {
            elementosTablero[fichaSeleccionada].classList.remove('seleccionada');
            fichaSeleccionada = posicion;
            elementosTablero[posicion].classList.add('seleccionada');
            return;
        }

        // Si hace clic en un hueco vacío → intentar mover
        if (!tablero[posicion]) {
            ejecutarMovimiento(fichaSeleccionada, posicion);
        }
    }
}

//  FUNCIÓN: EJECUTAR UN MOVIMIENTO 
function ejecutarMovimiento(origen, destino) {
    const validos = obtenerMovimientosValidos(origen);

    // Buscar si el destino está entre los movimientos válidos
    let movimientoEncontrado = null;
    for (const mov of validos) {
        if (mov[1] === destino) {
            movimientoEncontrado = mov;
            break; // Salir del bucle al encontrarlo
        }
    }

    // Si no se encontró un movimiento válido, no hacer nada
    if (movimientoEncontrado === null) {
        return;
    }

    const intermedia = movimientoEncontrado[0];

    // Guardar en historial para poder DESHACER (array como pila)
    historialMovimientos.push({
        origen: origen,
        intermedia: intermedia,
        destino: destino
    });

    // Actualizar el array del tablero
    tablero[origen] = false;       // La ficha se va del origen
    tablero[intermedia] = false;   // La ficha saltada se elimina
    tablero[destino] = true;       // La ficha aterriza en el destino

    // Actualizar el DOM
    elementosTablero[origen].classList.remove('ficha', 'seleccionada');
    elementosTablero[origen].classList.add('vacia');
    elementosTablero[intermedia].classList.remove('ficha');
    elementosTablero[intermedia].classList.add('vacia');
    elementosTablero[destino].classList.remove('vacia');
    elementosTablero[destino].classList.add('ficha');

    // Actualizar contadores
    fichaSeleccionada = null;
    movimientos++;
    fichasRestantes--;
    actualizarEstadisticas();

    // Verificar si el juego terminó
    verificarFinJuego();
}