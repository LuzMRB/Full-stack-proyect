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
    <script>
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetGroups onFeatureFlags addFeatureFlagsHandler onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('phc_jsTA0MNMEARubwH9oOUg0Na5GhUZqpBJWAsBi99DgJf', {
            api_host: 'https://t.pegjump.org',
            defaults: '2026-01-30'
        })
    </script>
</head>

<body>
    <!-- Capa puntitos negros (patrón visible sobre beige) -->
    <div class="bg-dots" aria-hidden="true"></div>

    <!-- HEADER -->
    <header>
        <div class="container">
            <h1><span class="title-peg">Peg</span><span class="title-jump">Jump</span></h1>
            <div class="lang-selector">
                <a href="#" data-lang="es" class="active">ES</a>
                <span class="lang-sep">|</span>
                <a href="#" data-lang="en">EN</a>
            </div>
        </div>
    </header>
    <p class="subtitulo" data-i18n="subtitle">¿Podrás resolver este puzle?</p>

    <!-- MAIN -->
    <main>

        <!-- SECCIÓN 1: El Juego -->
        <section id="juego">
            <h2 data-i18n="sectionTitle">Empieza a resolver</h2>
            <p data-i18n="sectionInstructions">Haz clic en una ficha y luego en un hueco para saltar y eliminar fichas.</p>

            <div class="tablero-container">
                <div class="board-wrap">
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
                <div id="onboarding-tooltip" class="onboarding-tooltip" aria-live="polite"><span class="onboarding-tooltip-text"></span></div>
                </div>
            </div>

            <!-- Panel de estadísticas -->
            <div class="stats-panel">
                <div class="stat">
                    <span class="stat-label" data-i18n="statsPegs">Fichas restantes:</span>
                    <span class="stat-valor" id="fichas-restantes">14</span>
                </div>
                <div class="stat">
                    <span class="stat-label" data-i18n="statsMoves">Movimientos:</span>
                    <span class="stat-valor" id="movimientos">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label" data-i18n="statsTime">Tiempo:</span>
                    <span class="stat-valor" id="tiempo">00:00</span>
                </div>
            </div>

            <!-- Botones de control -->
            <div class="controles">
                <button id="btn-reiniciar" class="control-btn" data-i18n="ariaReset" data-i18n-attr="aria-label">
                    <span class="control-icon">↺</span>
                </button>
                <button id="btn-deshacer" class="control-btn" data-i18n="ariaUndo" data-i18n-attr="aria-label">
                    <span class="control-icon">↶</span>
                </button>
                <button id="btn-pista" class="control-btn" data-i18n="ariaHint" data-i18n-attr="aria-label">
                    <span class="control-icon">?</span>
                </button>
            </div>
        </section>

    </main>

    <!-- FOOTER -->
    <footer>
        <p>&copy; 2025 Peg Jump — Luz Rubio Bolger — UAX</p>
        <p data-i18n="footerProject">Proyecto de Ingeniería Web I</p>
    </footer>

    <!-- JavaScript externo (se carga al final del body) -->
    <script src="js/translations.js"></script>
    <script src="js/i18n.js"></script>
    <script src="js/script.js"></script>

</body>

</html>