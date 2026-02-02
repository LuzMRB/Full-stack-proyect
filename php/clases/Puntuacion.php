<?php
// PUNTUACION.PHP  Clase Puntuacion (Hija de Modelo)

// HERENCIA:
//   Puntuacion extiende (hereda de) Modelo, al igual que Usuario.
//   Ambas clases hijas comparten los metodos del padre (Modelo)
//   pero cada una tiene sus propios metodos especializados.

//   Modelo (padre)
//     |-- Usuario (hija): Operaciones de usuarios
//     |-- Puntuacion (hija): Operaciones de puntuaciones
//
// Esto es como el ejemplo de la UD5:
//   Animal (padre)
//     |-- Perro (hija): tiene ladrar()
//     |-- Gato (hija): tendria maullar()


require_once __DIR__ . '/Modelo.php';


class Puntuacion extends Modelo {

    // ATRIBUTOS PRIVADOS (encapsulacion)
    private $usuarioId;
    private $fichasRestantes;
    private $movimientos;
    private $tiempoSegundos;
    private $puntuacion;


    // CONSTRUCTOR
    // Llama al constructor del padre y establece la tabla

    public function __construct($conexion) {
        parent::__construct($conexion, 'puntuaciones');
    }


  
    // METODOS PUBLICOS

    // METODO: guardar()
    
    // Guarda una nueva puntuacion en la BD.
    // Calcula la puntuacion automaticamente antes de insertar.
    
    // Parametros:
    //   $usuarioId: ID del usuario
    //   $fichas: Fichas restantes al terminar
    //   $movimientos: Numero de movimientos realizados
    //   $tiempo: Tiempo en segundos
    
    // Devuelve: Array con los datos guardados o false si falla

    public function guardar($usuarioId, $fichas, $movimientos, $tiempo) {
        // Calcular puntuacion usando el metodo estatico
        $puntos = self::calcularPuntuacion($fichas, $movimientos, $tiempo);

        // Guardar en atributos del objeto
        $this->usuarioId = $usuarioId;
        $this->fichasRestantes = $fichas;
        $this->movimientos = $movimientos;
        $this->tiempoSegundos = $tiempo;
        $this->puntuacion = $puntos;

        // INSERT con consulta preparada (metodo heredado del padre)
        $sql = "INSERT INTO puntuaciones (usuario_id, fichas_restantes, movimientos, tiempo_segundos, puntuacion)
                VALUES (?, ?, ?, ?, ?)";

        $resultado = $this->ejecutar($sql, 'iiiii', [
            $usuarioId, $fichas, $movimientos, $tiempo, $puntos
        ]);

        if ($resultado) {
            return [
                'puntuacion' => $puntos,
                'fichas_restantes' => $fichas,
                'movimientos' => $movimientos,
                'tiempo_segundos' => $tiempo
            ];
        }
        return false;
    }


    // METODO: obtenerRanking()
    
    // Obtiene el ranking de mejores puntuaciones.
    // Usa SELECT con JOIN para combinar datos de usuarios y puntuaciones.
    
    // Parametro: $limite - Numero maximo de resultados (default 10)
    // Devuelve: Array con el ranking formateado

    public function obtenerRanking($limite = 10) {
        $sql = "SELECT
                    u.nombre,
                    p.fichas_restantes,
                    p.movimientos,
                    p.tiempo_segundos,
                    p.puntuacion,
                    p.fecha
                FROM puntuaciones p
                JOIN usuarios u ON p.usuario_id = u.id
                ORDER BY p.puntuacion DESC
                LIMIT ?";

        // 'i' = parametro de tipo integer
        $resultados = $this->obtenerResultado($sql, 'i', [$limite]);

        // Formatear el tiempo de cada resultado
        $ranking = [];
        foreach ($resultados as $fila) {
            $minutos = floor($fila['tiempo_segundos'] / 60);
            $segundos = $fila['tiempo_segundos'] % 60;

            $ranking[] = [
                'nombre' => $fila['nombre'],
                'fichas_restantes' => intval($fila['fichas_restantes']),
                'movimientos' => intval($fila['movimientos']),
                'tiempo' => sprintf('%02d:%02d', $minutos, $segundos),
                'puntuacion' => intval($fila['puntuacion']),
                'fecha' => $fila['fecha']
            ];
        }

        return $ranking;
    }


    // METODO ESTATICO: calcularPuntuacion()

    // static: Se puede llamar sin crear un objeto.
    // Uso: Puntuacion::calcularPuntuacion(1, 13, 150)

    // Formula:
    //   (15 - fichas) * 100 + max(0, 200 - movs * 5) + max(0, 500 - tiempo * 2)

    public static function calcularPuntuacion($fichas, $movimientos, $tiempo) {
        $puntosFichas = (15 - $fichas) * 100;
        $puntosMovimientos = max(0, 200 - $movimientos * 5);
        $puntosTiempo = max(0, 500 - $tiempo * 2);
        return $puntosFichas + $puntosMovimientos + $puntosTiempo;
    }


    // GETTERS

    public function getPuntuacion() {
        return $this->puntuacion;
    }

    public function getFichasRestantes() {
        return $this->fichasRestantes;
    }

    public function getMovimientos() {
        return $this->movimientos;
    }

    public function getTiempoSegundos() {
        return $this->tiempoSegundos;
    }
}