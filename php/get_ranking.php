<?php
// GET_RANKING.PHP Obtener Ranking (Version POO)

// CLASE 9: Refactorizado para usar la clase Puntuacion
// ANTES: Consulta SQL directa con mysqli_query()
// AHORA: $puntuacion->obtenerRanking() encapsula toda la logica

header('Content-Type: application/json');

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/clases/Puntuacion.php';


// CREAR OBJETO Puntuacion
// new Puntuacion($conexion): Crea el objeto y le pasa la conexion
$puntuacion = new Puntuacion($conexion);

// OBTENER RANKING
// El metodo obtenerRanking() encapsula:
//   - La consulta SELECT con JOIN
//   - El formateo del tiempo
//   - La construccion del array de resultados
// Todo en una sola linea gracias a la POO
$ranking = $puntuacion->obtenerRanking(10);

// DEVOLVER RESPUESTA JSON
echo json_encode([
    'exito' => true,
    'ranking' => $ranking
]);

mysqli_close($conexion);