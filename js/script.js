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
    0: [[1, 3], [2, 5]],
    1: [[0, 2], [3, 6], [4, 8]],  // añadido salto diagonal
    2: [[0, 1], [4, 7], [5, 9]],  // añadido salto diagonal
    3: [[1, 0], [4, 5], [6, 10], [7, 12]],
    4: [[7, 11], [8, 13]],
    5: [[2, 0], [4, 3], [8, 12], [9, 14]],
    6: [[1, 0], [3, 1], [7, 8], [11, 13]],  // corregido
    7: [[4, 2], [8, 9]],
    8: [[4, 1], [7, 6]],
    9: [[5, 2], [8, 7]],
    10: [[6, 3], [11, 12]],
    11: [[7, 4], [12, 13]],
    12: [[7, 3], [8, 5], [11, 10], [13, 14]],
    13: [[8, 4], [12, 11]],
    14: [[9, 5], [13, 12]]
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

//  FUNCIÓN: MANEJAR CLIC EN UNA POSICIÓN DEL TABLERO 
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

    // Guardar en historial para poder deshacer
    //  (array como pila)
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

//  FUNCIÓN: VERIFICAR FIN DEL JUEGO
function verificarFinJuego() {
    // Comprobar si queda algún movimiento posible
    let hayMovimientos = false;

    // Bucle for clásico (UD3: bucle for)
    for (let i = 0; i < 15; i++) {
        if (tablero[i]) {
            const validos = obtenerMovimientosValidos(i);
            if (validos.length > 0) {
                hayMovimientos = true;
                break; // No hace falta seguir buscando
            }
        }
    }

    if (!hayMovimientos) {
        // Detener el temporizador
        clearInterval(temporizador);
        temporizador = null;
        juegoActivo = false;

        // Mostrar mensaje según resultado
        if (fichasRestantes === 1) {
            alert(' ¡VICTORIA! Has dejado solo 1 ficha en ' +
                movimientos + ' movimientos y ' +
                formatearTiempo(tiempoSegundos) + '.');
        } else {
            alert(' Fin de la partida. Quedan ' + fichasRestantes +
                ' fichas. ¡Inténtalo de nuevo!');
        }
    }
}

// FUNCIÓN: DESHACER ÚLTIMO MOVIMIENTO 
function deshacer() {
    // pop() saca el último elemento del array (UD3: arrays)
    if (historialMovimientos.length === 0) {
        return; // No hay nada que deshacer
    }

    const ultimo = historialMovimientos.pop();

    // Revertir el movimiento
    tablero[ultimo.origen] = true;
    tablero[ultimo.intermedia] = true;
    tablero[ultimo.destino] = false;

    // Actualizar el DOM
    elementosTablero[ultimo.origen].classList.remove('vacia');
    elementosTablero[ultimo.origen].classList.add('ficha');
    elementosTablero[ultimo.intermedia].classList.remove('vacia');
    elementosTablero[ultimo.intermedia].classList.add('ficha');
    elementosTablero[ultimo.destino].classList.remove('ficha');
    elementosTablero[ultimo.destino].classList.add('vacia');

    movimientos--;
    fichasRestantes++;
    actualizarEstadisticas();
}

//  FUNCIÓN: MOSTRAR PISTA 
function mostrarPista() {
    // Buscar el primer movimiento válido que exista
    for (let i = 0; i < 15; i++) {
        if (tablero[i]) {
            const validos = obtenerMovimientosValidos(i);
            if (validos.length > 0) {
                // Resaltar la ficha que puede moverse
                elementosTablero[i].classList.add('seleccionada');
                // Quitar el resaltado después de 1 segundo
                setTimeout(() => {
                    elementosTablero[i].classList.remove('seleccionada');
                }, 1000);
                return; // Solo mostrar una pista
            }
        }
    }
}

//  FUNCIÓN: INICIAR TEMPORIZADOR 
// setInterval ejecuta una función cada X milisegundos
function iniciarTemporizador() {
    temporizador = setInterval(() => {
        tiempoSegundos++;
        spanTiempo.textContent = formatearTiempo(tiempoSegundos);
    }, 1000); // 1000 ms = 1 segundo
}


// VALIDACIÓN DE FORMULARIOS 


// FUNCIÓN: MOSTRAR ERROR EN UN CAMPO 
// Recibe el input y el mensaje, y lo muestra en el <span> correspondiente
function mostrarError(inputId, mensaje) {
    const input = document.getElementById(inputId);
    const spanError = document.getElementById('error-' + inputId);
    
    // Cambiar el texto del span de error
    spanError.textContent = mensaje;
    
    // Cambiar las clases del input para que se ponga rojo
    input.classList.remove('input-valido');
    input.classList.add('input-error');
}

// FUNCIÓN: LIMPIAR ERROR DE UN CAMPO 
function limpiarError(inputId) {
    const input = document.getElementById(inputId);
    const spanError = document.getElementById('error-' + inputId);
    
    spanError.textContent = '';
    input.classList.remove('input-error');
    input.classList.add('input-valido');
}

//  FUNCIÓN: VALIDAR NOMBRE 
// Retorna true si es válido, false si no
function validarNombre() {
    const nombre = document.getElementById('nombre').value.trim();
    
    if (nombre.length === 0) {
        mostrarError('nombre', 'El nombre es obligatorio.');
        return false;
    }
    if (nombre.length < 2) {
        mostrarError('nombre', 'El nombre debe tener al menos 2 caracteres.');
        return false;
    }
    if (nombre.length > 50) {
        mostrarError('nombre', 'El nombre no puede superar los 50 caracteres.');
        return false;
    }
    
    // Si llegamos aquí, es válido
    limpiarError('nombre');
    return true;
}

// FUNCIÓN: VALIDAR EMAIL 
// Usa una expresión regular (regex) para comprobar el formato
function validarEmail() {
    const email = document.getElementById('email').value.trim();
    
    // Si está vacío, es válido (el email es opcional)
    if (email.length === 0) {
        // Quitar cualquier estilo de error/válido
        const input = document.getElementById('email');
        const spanError = document.getElementById('error-email');
        spanError.textContent = '';
        input.classList.remove('input-error', 'input-valido');
        return true;
    }
    
    // Expresión regular para validar email
    // Busca: texto@texto.texto
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regexEmail.test(email)) {
        mostrarError('email', 'El formato del email no es válido. Ejemplo: nombre@dominio.com');
        return false;
    }
    
    limpiarError('email');
    return true;
}

//  FUNCIÓN: VALIDAR CONTRASEÑA 
// Requisitos: mínimo 6 caracteres, al menos 1 número
function validarPassword() {
    const password = document.getElementById('password').value;
    
    if (password.length === 0) {
        mostrarError('password', 'La contraseña es obligatoria.');
        return false;
    }
    if (password.length < 6) {
        mostrarError('password', 'La contraseña debe tener al menos 6 caracteres.');
        return false;
    }
    
    // Regex: busca al menos un dígito (0-9)
    const regexNumero = /[0-9]/;
    if (!regexNumero.test(password)) {
        mostrarError('password', 'La contraseña debe contener al menos un número.');
        return false;
    }
    
    limpiarError('password');
    return true;
}

//  FUNCIÓN: VALIDAR TODO EL FORMULARIO (evento submit) 
//  Ahora el formulario se envía al servidor PHP con fetch()
function validarFormulario(evento) {
    // preventDefault(): evita que el formulario recargue la página
    evento.preventDefault();
    
    // Ejecutar todas las validaciones (en el CLIENTE)
    const nombreOk = validarNombre();
    const emailOk = validarEmail();
    const passwordOk = validarPassword();
    
    // Solo si TODAS son válidas, enviamos al servidor
    if (nombreOk && emailOk && passwordOk) {
        // Llamar a la función que envía los datos al servidor PHP
        enviarPuntuacion();
    }
}


//  FUNCIÓN: ENVIAR PUNTUACIÓN AL SERVIDOR (fetch + PHP)

// fetch(): API moderna de JavaScript para hacer peticiones HTTP 
// Envía los datos al script PHP (php/process.php) que:
//   1. Valida los datos en el SERVIDOR (doble validación)
//   2. Guarda el usuario en la BD (INSERT INTO usuarios)
//   3. Guarda la puntuación en la BD (INSERT INTO puntuaciones)
//   4. Devuelve una respuesta JSON
//
// CONCEPTO IMPORTANTE:
//   La validación se hace en AMBOS lados:
//   - En el CLIENTE (JavaScript): para dar feedback rápido al usuario
//   - En el SERVIDOR (PHP): para garantizar la seguridad 
//   Un usuario malicioso podría desactivar JavaScript y enviar datos
//   directamente al servidor, así que la validación en PHP es ESENCIAL.


//  CLASE 12: AJAX y Fetch API — Comunicacion Asincrona 

//
// CONCEPTO: async/await 
//   - async: Declara que una funcion es ASINCRONA (devuelve una Promesa)
//   - await: ESPERA a que una Promesa se resuelva antes de continuar
//   - try/catch: Maneja errores de forma limpia (sustituye a .catch())
//
// VENTAJA sobre .then():
//   - El codigo se lee de ARRIBA a ABAJO, como codigo sincrono
//   - Es mas facil de entender y depurar
//   - try/catch captura TODOS los errores (red, HTTP, parseo)
//
// COMPARACION:
//   CON .then() (Clase 7):
//     fetch(url).then(res => res.json()).then(data => { ... }).catch(err => { ... })
//
//   CON async/await (Clase 12):
//     const response = await fetch(url);
//     const data = await response.json();


async function enviarPuntuacion() {
    // Recoger los datos del formulario
    const campoNombre = document.getElementById('nombre');
    const campoEmail = document.getElementById('email');
    const campoPassword = document.getElementById('password');

    const datos = {
        nombre: campoNombre.value.trim(),
        email: campoEmail ? campoEmail.value.trim() : '',
        password: campoPassword ? campoPassword.value : '',
        fichas_restantes: fichasRestantes,
        movimientos: movimientos,
        tiempo_segundos: tiempoSegundos
    };

    // Si el usuario esta logueado (campo readonly), el nombre
    // viene pre-rellenado desde PHP ($_SESSION) y no necesita
    // validacion adicional del nombre en el cliente.

    // Ocultar mensajes anteriores
    const mensajeExito = document.getElementById('mensaje-exito');
    const mensajeError = document.getElementById('mensaje-servidor-error');
    mensajeExito.style.display = 'none';
    if (mensajeError) mensajeError.style.display = 'none';

    // CLASE 12: Indicador de carga (UX)
    // Mostramos un spinner mientras se envia la peticion
    // para que el usuario sepa que algo esta pasando.
    const btnGuardar = document.querySelector('#form-puntuacion button[type="submit"]');
    const textoOriginal = btnGuardar.textContent;
    btnGuardar.textContent = 'Enviando...';
    btnGuardar.disabled = true;

    // CLASE 12: try/catch con async/await
    // try: Intenta ejecutar el codigo
    // catch: Se ejecuta si CUALQUIER linea dentro del try falla
    // finally: Se ejecuta SIEMPRE, haya error o no
    try {
        // PASO 1: fetch() con await — Enviar peticion POST
        // await PAUSA la ejecucion hasta que fetch() responda
        // Sin await, response seria una Promesa (no los datos)
        const response = await fetch('php/process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        // Verificar respuesta HTTP
        // response.ok es true si el codigo HTTP es 200-299
        // IMPORTANTE: fetch() NO lanza error en codigos 400/500
        // Solo lanza error si hay fallo de RED (servidor caido)
        // Por eso necesitamos comprobar response.ok manualmente
        if (!response.ok) {
            throw new Error('Error del servidor: ' + response.status);
        }

        // PASO 2: Parsear la respuesta JSON con await
        // response.json() tambien devuelve una Promesa
        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        // PASO 3: Procesar la respuesta
        if (data.exito) {
            // EXITO: Mostrar mensaje verde
            mensajeExito.textContent = data.mensaje;
            mensajeExito.style.display = 'block';

            // Ocultar despues de 4 segundos
            setTimeout(() => {
                mensajeExito.style.display = 'none';
            }, 4000);

            // CLASE 12: Actualizar ranking SIN recargar la pagina
            // Esta es la esencia de AJAX: actualizacion parcial del DOM
            await cargarRanking();

            // Limpiar el formulario
            document.getElementById('form-puntuacion').reset();
            // Quitar estilos de validacion
            ['nombre', 'email', 'password'].forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    if (input.hasAttribute('readonly')) {
                        input.value = input.defaultValue;
                    }
                    input.classList.remove('input-valido', 'input-error');
                }
                const span = document.getElementById('error-' + id);
                if (span) span.textContent = '';
            });

        } else {
            // ERROR del servidor (validacion, etc.)
            if (mensajeError) {
                mensajeError.textContent = data.mensaje;
                mensajeError.style.display = 'block';
                setTimeout(() => {
                    mensajeError.style.display = 'none';
                }, 5000);
            }
        }

    } catch (error) {
        // catch: Captura CUALQUIER error:
        //   - Error de red (servidor caido, sin internet)
        //   - Error HTTP (response.ok = false)
        //   - Error de parseo JSON
        console.error('Error en enviarPuntuacion:', error);
        if (mensajeError) {
            mensajeError.textContent = 'Error de conexion con el servidor. ¿Esta XAMPP ejecutandose?';
            mensajeError.style.display = 'block';
        }

    } finally {
        // finally: Se ejecuta SIEMPRE (exito o error)
        // Restauramos el boton a su estado original
        btnGuardar.textContent = textoOriginal;
        btnGuardar.disabled = false;
    }
}


//  FUNCIÓN: CARGAR RANKING DESDE EL SERVIDOR

// Hace una petición GET a php/get_ranking.php
// y actualiza la tabla HTML con los datos recibidos.

// Se llama:
//   1. Al cargar la página
//   2. Después de guardar una nueva puntuación


//  CLASE 12: cargarRanking() con async/await

// Solicitud GET asincrona al servidor.
//
// GET vs POST:
//   GET: Solicitar/obtener datos (cargarRanking)
//   POST: Enviar/crear datos (enviarPuntuacion)
//
// Flujo AJAX completo:
//   1. JS llama a fetch() → peticion HTTP al servidor
//   2. PHP recibe la peticion, consulta MySQL
//   3. PHP devuelve JSON con json_encode()
//   4. JS recibe el JSON, actualiza el DOM (sin recargar)
//
// Se llama:
//   1. Al cargar la pagina (inicializacion)
//   2. Despues de guardar una nueva puntuacion
//   3. Al pulsar el boton "Refrescar Ranking"
//

async function cargarRanking() {
    // CLASE 12: Indicador de carga en la tabla
    const tbody = document.getElementById('ranking-body');
    const textoAnterior = tbody.innerHTML;
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;">Cargando ranking...</td></tr>';

    try {
        // PASO 1: Peticion GET con await
        // Al no especificar method, fetch() usa GET por defecto
        const response = await fetch('php/get_ranking.php');

        // CLASE 12: Verificar que la respuesta HTTP es correcta
        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }

        // PASO 2: Parsear JSON
        const data = await response.json();

        // PASO 3: Actualizar el DOM con los datos recibidos
        if (data.exito && data.ranking) {
            // Limpiar el contenido actual del tbody
            tbody.innerHTML = '';

            if (data.ranking.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;">No hay puntuaciones todavia.</td></tr>';
                return;
            }

            // Recorrer cada puntuacion y crear una fila <tr>
            // ESTO ES AJAX: Actualizamos PARTE de la pagina sin recargar TODA
            data.ranking.forEach((item, indice) => {
                // document.createElement(): Crea un elemento HTML nuevo en memoria
                const fila = document.createElement('tr');

                // innerHTML: Establece el contenido HTML del elemento
                fila.innerHTML =
                    '<td>' + (indice + 1) + '</td>' +
                    '<td>' + item.nombre + '</td>' +
                    '<td>' + item.fichas_restantes + '</td>' +
                    '<td>' + item.movimientos + '</td>' +
                    '<td>' + item.tiempo + '</td>' +
                    '<td>' + item.puntuacion + '</td>';

                // appendChild(): Anade el elemento como hijo del tbody
                tbody.appendChild(fila);
            });

            console.log('Ranking actualizado: ' + data.ranking.length + ' entradas');
        }

    } catch (error) {
        // Si hay error, restaurar contenido anterior o mostrar mensaje
        console.log('No se pudo cargar el ranking:', error.message);
        tbody.innerHTML = textoAnterior || '<tr><td colspan="6" style="text-align:center;color:#999;">Error al cargar ranking</td></tr>';
    }
}

// EVENT LISTENERS: Conectar HTML con JavaScript


// Clic en cada posición del tablero
elementosTablero.forEach((elemento, indice) => {
    elemento.addEventListener('click', () => {
        manejarClic(indice);
    });
});

// Clic en los botones de control
btnReiniciar.addEventListener('click', inicializarJuego);
btnDeshacer.addEventListener('click', deshacer);
btnPista.addEventListener('click', mostrarPista);

// Envío del formulario
formPuntuacion.addEventListener('submit', validarFormulario);



// INICIALIZACIÓN  Se ejecuta al cargar la página

inicializarJuego();
console.log(' Solitario — JS cargado correctamente');

// Cargar el ranking desde el servidor 
// Si el servidor no está disponible, se mantienen los datos
// que PHP ya generó al cargar la página.
cargarRanking();

//  EVENT LISTENERS DE VALIDACIÓN EN TIEMPO REAL

// Evento 'blur': se dispara cuando el usuario SALE del campo
// Ideal para validar cuando termina de escribir
document.getElementById('nombre').addEventListener('blur', validarNombre);
document.getElementById('email').addEventListener('blur', validarEmail);
document.getElementById('password').addEventListener('blur', validarPassword);

// Evento 'input': se dispara con CADA tecla que escribe el usuario
// Limpia el error mientras escribe (feedback inmediato)
document.getElementById('nombre').addEventListener('input', () => {
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre.length >= 2) {
        limpiarError('nombre');
    }
});

// Evento 'change': se dispara cuando el campo CAMBIA de valor y pierde el foco
// Diferente de 'input' porque solo se activa al terminar de editar
document.getElementById('email').addEventListener('change', validarEmail);

// Evento 'focus': se dispara cuando el usuario ENTRA en el campo
// Útil para dar instrucciones o quitar mensajes
document.getElementById('password').addEventListener('focus', () => {
    const spanError = document.getElementById('error-password');
    // Si no hay error, mostrar una pista
    if (spanError.textContent === '') {
        spanError.textContent = 'Mínimo 6 caracteres y 1 número';
        spanError.style.color = '#3effe2ff'; 
    }
});

// Al salir del campo password, quitar la pista si es válido
document.getElementById('password').addEventListener('blur', () => {
    const spanError = document.getElementById('error-password');
    if (spanError.style.color === 'rgb(121, 85, 72)') {
        spanError.textContent = '';
        spanError.style.color = '';  // Resetear color
    }
    validarPassword();
});



//  CLASE 11: Menu Hamburguesa (UD6 §3 - Diseno Responsivo)

// classList.toggle(): Anade la clase si NO esta, la quita si SI esta
// Esto permite alternar el menu abierto/cerrado con un solo metodo.
// aria-expanded: Atributo de accesibilidad (UD6 §3)
//   Indica a lectores de pantalla si el menu esta abierto o cerrado.

const btnHamburguesa = document.getElementById('btn-hamburguesa');
const navLinks = document.getElementById('nav-links');

if (btnHamburguesa && navLinks) {
    btnHamburguesa.addEventListener('click', () => {
        btnHamburguesa.classList.toggle('activo');
        navLinks.classList.toggle('activo');
        const estaAbierto = navLinks.classList.contains('activo');
        btnHamburguesa.setAttribute('aria-expanded', estaAbierto);
    });

    // Cerrar menu al hacer clic en un enlace (navegacion)
    navLinks.querySelectorAll('a').forEach(enlace => {
        enlace.addEventListener('click', () => {
            btnHamburguesa.classList.remove('activo');
            navLinks.classList.remove('activo');
            btnHamburguesa.setAttribute('aria-expanded', 'false');
        });
    });
}



//  CLASE 12: Boton Refrescar Ranking 

// Permite al usuario actualizar el ranking manualmente
// sin necesidad de recargar toda la pagina.
// Esto demuestra la potencia de AJAX: carga parcial de datos.

const btnRefrescar = document.getElementById('btn-refrescar-ranking');
if (btnRefrescar) {
    btnRefrescar.addEventListener('click', async () => {
        // Cambiar texto mientras carga (feedback visual)
        btnRefrescar.textContent = 'Actualizando...';
        btnRefrescar.disabled = true;

        // await: Espera a que cargarRanking() termine
        await cargarRanking();

        // Restaurar boton
        btnRefrescar.textContent = 'Refrescar Ranking';
        btnRefrescar.disabled = false;
    });
}

console.log('Clase 12: async/await y Fetch API avanzado cargados');