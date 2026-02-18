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
    <!-- PostHog HTML snippet (add within head) -->
    <script>
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetGroups onFeatureFlags addFeatureFlagsHandler onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('phc_jsTA0MNMEARubwH9oOUg0Na5GhUZqpBJWAsBi99DgJf',{api_host:'https://eu.i.posthog.com',defaults:'2026-01-30'})
    </script>
</head>

<body>
    <!-- Capa puntitos negros (patrón visible sobre beige) -->
    <div class="bg-dots" aria-hidden="true"></div>

    <!-- HEADER -->
    <header>
        <div class="container">
            <h1><span class="title-peg">Peg</span><span class="title-jump">Jump</span></h1>
        </div>
    </header>
    <p class="subtitulo">¿Podrás resolver este puzle?</p>
    <nav>
        <ul class="nav-links" id="nav-links">
            <li><a href="#juego">Juego</a></li>
            <li><a href="#" id="nav-reglas">Reglas</a></li>
        </ul>
    </nav>

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
                    <h3><span class="regla-num">01</span><span class="regla-title">Objetivo</span></h3>
                    <p>Eliminar todas las fichas del tablero hasta dejar solo una.</p>
                </div>
                <div class="regla-card">
                    <h3><span class="regla-num">02</span><span class="regla-title">Movimiento</span></h3>
                    <p>Una ficha salta sobre otra adyacente y aterriza en un hueco vacío.</p>
                </div>
                <div class="regla-card">
                    <h3><span class="regla-num">03</span><span class="regla-title">Captura</span></h3>
                    <p>La ficha saltada se elimina del tablero automáticamente.</p>
                </div>
                <div class="regla-card">
                    <h3><span class="regla-num">04</span><span class="regla-title">Fin</span></h3>
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