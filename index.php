<?php
// INDEX.PHP Página Principal del Solitario 

// Este archivo es la versión PHP de index.html.
// Contenido estático del juego Solitario Triangular.
?>
<!DOCTYPE html>
<!-- 
    DOCTYPE: Declara que este documento es HTML5.
    Ahora el archivo es .php pero genera HTML igualmente.
    PHP se ejecuta en el SERVIDOR y el navegador solo recibe HTML.
-->
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Peg Jump - Juego clásico de fichas - Proyecto Full Stack para Ingeniería Web I">
    <meta name="author" content="Luz Rubio Bolger">
    <title>Peg Jump | Luz Rubio Bolger</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <!-- Capa puntitos negros (patrón visible sobre beige) -->
    <div class="bg-dots" aria-hidden="true"></div>

    <!-- HEADER -->
    <header>
        <div class="container">
            <h1>Peg Jump</h1>
            <p class="subtitulo">¿Podrás resolver este puzle?</p>
            <nav>
                <ul class="nav-links" id="nav-links">
                    <li><a href="#juego">Juego</a></li>
                    <li><a href="#" id="nav-reglas">Reglas</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- MAIN -->
    <main>

        <!-- SECCIÓN 1: El Juego -->
        <section id="juego">
            <h2> Empieza a resolver</h2>
            <p>Haz clic en una ficha y luego en un hueco para saltar y eliminar fichas.</p>

            <div class="tablero-container">
                <div class="tablero" id="tablero">
                    <!-- Fila 1: 1 posición -->
                    <div class="fila">
                        <div class="posicion vacia" data-pos="0"></div>
                    </div>
                    <!-- Fila 2: 2 posiciones -->
                    <div class="fila">
                        <div class="posicion ficha" data-pos="1"></div>
                        <div class="posicion ficha" data-pos="2"></div>
                    </div>
                    <!-- Fila 3: 3 posiciones -->
                    <div class="fila">
                        <div class="posicion ficha" data-pos="3"></div>
                        <div class="posicion ficha" data-pos="4"></div>
                        <div class="posicion ficha" data-pos="5"></div>
                    </div>
                    <!-- Fila 4: 4 posiciones -->
                    <div class="fila">
                        <div class="posicion ficha" data-pos="6"></div>
                        <div class="posicion ficha" data-pos="7"></div>
                        <div class="posicion ficha" data-pos="8"></div>
                        <div class="posicion ficha" data-pos="9"></div>
                    </div>
                    <!-- Fila 5: 5 posiciones -->
                    <div class="fila">
                        <div class="posicion ficha" data-pos="10"></div>
                        <div class="posicion ficha" data-pos="11"></div>
                        <div class="posicion ficha" data-pos="12"></div>
                        <div class="posicion ficha" data-pos="13"></div>
                        <div class="posicion ficha" data-pos="14"></div>
                    </div>
                </div>
            </div>

            <!-- Panel de estadísticas -->
            <div class="stats-panel">
                <div class="stat">
                    <span class="stat-label">Fichas restantes:</span>
                    <span class="stat-valor" id="fichas-restantes">14</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Movimientos:</span>
                    <span class="stat-valor" id="movimientos">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Tiempo:</span>
                    <span class="stat-valor" id="tiempo">00:00</span>
                </div>
            </div>

            <!-- Botones de control -->
            <div class="controles">
                <button id="btn-reiniciar" class="control-btn" aria-label="Reiniciar partida">
                    <span class="control-icon">↺</span>
                </button>
                <button id="btn-deshacer" class="control-btn" aria-label="Deshacer último movimiento">
                    <span class="control-icon">↶</span>
                </button>
                <button id="btn-pista" class="control-btn" aria-label="Pista">
                    <span class="control-icon">?</span>
                </button>
            </div>
        </section>

    </main>

    <!-- Modal de Reglas -->
    <div id="rules-modal" class="modal-overlay" aria-hidden="true">
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="rules-title">
            <button class="modal-close" type="button" aria-label="Cerrar reglas">×</button>
            <h2 id="rules-title">Reglas del Juego</h2>
            <div class="reglas-grid">
                <div class="regla-card">
                    <h3>1. Objetivo</h3>
                    <p>Eliminar todas las fichas del tablero hasta dejar solo una.</p>
                </div>
                <div class="regla-card">
                    <h3>2. Movimiento</h3>
                    <p>Una ficha salta sobre otra adyacente y aterriza en un hueco vacío.</p>
                </div>
                <div class="regla-card">
                    <h3>3. Captura</h3>
                    <p>La ficha saltada se elimina del tablero automáticamente.</p>
                </div>
                <div class="regla-card">
                    <h3>4. Fin</h3>
                    <p>La partida termina cuando no quedan movimientos posibles.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- FOOTER -->
    <footer>
        <p>&copy; 2025 Peg Jump — Luz Rubio Bolger — UAX</p>
        <p>Proyecto de Ingeniería Web I</p>
    </footer>

    <!-- JavaScript externo (se carga al final del body) -->
    <script src="js/script.js"></script>

</body>

</html>