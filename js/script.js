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

function enviarPuntuacion() {
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

    // Si el usuario está logueado (campo readonly), el nombre
    // viene pre-rellenado desde PHP ($_SESSION) y no necesita
    // validación adicional del nombre en el cliente.

    // Ocultar mensajes anteriores
    const mensajeExito = document.getElementById('mensaje-exito');
    const mensajeError = document.getElementById('mensaje-servidor-error');
    mensajeExito.style.display = 'none';
    if (mensajeError) mensajeError.style.display = 'none';

    // fetch(): Envía una petición HTTP al servidor
    // Parámetros:
    //   - URL: 'php/process.php' (ruta al script PHP)
    //   - Opciones: method, headers, body
    
    // method: 'POST': Envío seguro de datos 
    // headers: Content-Type: application/json: Los datos van en formato JSON
    // body: JSON.stringify(datos): Convierte el objeto JS a cadena JSON
    //
    fetch('php/process.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    // .then(): Se ejecuta cuando el servidor RESPONDE 
    // response.json(): Parsea la respuesta JSON del servidor
    .then(response => response.json())
    // Segundo .then(): Procesa los datos parseados
    .then(data => {
        console.log('Respuesta del servidor:', data);

        if (data.exito) {
            // ÉXITO: Mostrar mensaje verde
            mensajeExito.textContent = data.mensaje;
            mensajeExito.style.display = 'block';

            // Ocultar después de 4 segundos
            setTimeout(() => {
                mensajeExito.style.display = 'none';
            }, 4000);

            // Actualizar la tabla del ranking sin recargar la página
            cargarRanking();

            // Limpiar el formulario
            document.getElementById('form-puntuacion').reset();
            // Quitar estilos de validación
            ['nombre', 'email', 'password'].forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    // Si el campo es readonly (usuario logueado),
                    // restaurar su valor desde la sesión
                    if (input.hasAttribute('readonly')) {
                        input.value = input.defaultValue;
                    }
                    input.classList.remove('input-valido', 'input-error');
                }
                const span = document.getElementById('error-' + id);
                if (span) span.textContent = '';
            });

        } else {
            // ERROR del servidor: Mostrar mensaje rojo
            if (mensajeError) {
                mensajeError.textContent = data.mensaje;
                mensajeError.style.display = 'block';
                setTimeout(() => {
                    mensajeError.style.display = 'none';
                }, 5000);
            }
        }
    })
    // .catch(): Se ejecuta si hay un ERROR de red (servidor caído, etc.)
    .catch(error => {
        console.error('Error de red:', error);
        if (mensajeError) {
            mensajeError.textContent = 'Error de conexión con el servidor. ¿Está XAMPP ejecutándose?';
            mensajeError.style.display = 'block';
        }
    });
}


//  FUNCIÓN: CARGAR RANKING DESDE EL SERVIDOR

// Hace una petición GET a php/get_ranking.php
// y actualiza la tabla HTML con los datos recibidos.

// Se llama:
//   1. Al cargar la página
//   2. Después de guardar una nueva puntuación

function cargarRanking() {
    fetch('php/get_ranking.php')
    .then(response => response.json())
    .then(data => {
        if (data.exito && data.ranking) {
            // Seleccionar el <tbody> de la tabla
            const tbody = document.getElementById('ranking-body');
            
            // Limpiar el contenido actual del tbody
            tbody.innerHTML = '';

            if (data.ranking.length === 0) {
                // Si no hay datos, mostrar mensaje
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;">No hay puntuaciones todavía.</td></tr>';
                return;
            }

            // Recorrer cada puntuación y crear una fila <tr>
            data.ranking.forEach((item, indice) => {
                // document.createElement(): Crea un elemento HTML nuevo
                const fila = document.createElement('tr');
                
                // innerHTML: Establece el contenido HTML de un elemento
                fila.innerHTML = 
                    '<td>' + (indice + 1) + '</td>' +
                    '<td>' + item.nombre + '</td>' +
                    '<td>' + item.fichas_restantes + '</td>' +
                    '<td>' + item.movimientos + '</td>' +
                    '<td>' + item.tiempo + '</td>' +
                    '<td>' + item.puntuacion + '</td>';
                
                // appendChild(): Añade el elemento como hijo del tbody
                tbody.appendChild(fila);
            });
        }
    })
    .catch(error => {
        console.log('No se pudo cargar el ranking:', error.message);
        // No mostrar error al usuario, el ranking PHP ya está cargado
    });
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