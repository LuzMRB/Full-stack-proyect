<?php
// MODELO.PHP Clase Base (Padre)
// CLASE 9: Programacion Orientada a Objetos (POO)

// CONCEPTOS POO APLICADOS:
//   - class: Define una plantilla para crear objetos
//   - Atributos (propiedades): Variables dentro de una clase
//   - Metodos: Funciones dentro de una clase
//   - Constructor (__construct): Metodo especial que se ejecuta al crear un objeto
//   - $this: Referencia al objeto actual (accede a sus propiedades/metodos)
//   - Encapsulacion: Controlar el acceso a los atributos
//     * private: Solo accesible dentro de la propia clase
//     * protected: Accesible en la clase y en sus clases hijas (herencia)
//     * public: Accesible desde cualquier lugar
//
// ESTA CLASE ES LA CLASE PADRE:
//   - Usuario y Puntuacion HEREDAN de Modelo
//   - Esto evita repetir codigo de conexion en cada clase
//   - Es como el ejemplo de Animal -> Perro de la UD5,
//     donde Animal es la clase padre y Perro la hija


class Modelo {

    // ATRIBUTOS (propiedades)
    
    // protected: Accesible en esta clase Y en las clases hijas
    // Si fuera private, las clases hijas NO podrian acceder a $conexion
    // Si fuera public, cualquiera podria modificar la conexion desde fuera
    
    // protected es el nivel ideal para herencia: las hijas acceden,
    // pero el codigo externo no puede modificarlo directamente

    protected $conexion;   // Objeto de conexion a MySQL
    protected $tabla;      // Nombre de la tabla en la BD


    // CONSTRUCTOR: __construct()
    
    // Metodo especial que se ejecuta automaticamente al crear
    // un objeto con new. Ejemplo: $modelo = new Modelo($conexion);
    
    // Sirve para INICIALIZAR el objeto con los datos necesarios.
    // En este caso, recibe la conexion a la BD.
    
    // Parametros:
    //   $conexion: La conexion mysqli (viene de config.php)
    //   $tabla: Nombre de la tabla que maneja esta clase

    public function __construct($conexion, $tabla = '') {
        // $this->conexion: Accede al atributo $conexion de ESTE objeto
        // $this es la referencia al objeto actual 
        $this->conexion = $conexion;
        $this->tabla = $tabla;
    }


    // METODO: consultaPreparada()
    
    // Metodo reutilizable que ejecuta consultas preparadas.
    // Previene inyeccion SQL 
    // protected: Solo las clases hijas pueden usarlo.
    // El codigo externo NO puede llamar a este metodo directamente.
    // Esto es ENCAPSULACION: ocultar la implementacion interna.

    // Parametros:
    //   $sql: La consulta SQL con marcadores ? (ej: "SELECT * FROM usuarios WHERE nombre = ?")
    //   $tipos: String con los tipos de parametros ('s' = string, 'i' = integer, 'd' = double)
    //   $params: Array con los valores reales que reemplazan los ?

    // Devuelve: El statement ejecutado o false si falla

    protected function consultaPreparada($sql, $tipos = '', $params = []) {
        // mysqli_prepare(): Prepara la consulta separando instruccion de datos
        $stmt = mysqli_prepare($this->conexion, $sql);

        if (!$stmt) {
            return false;
        }

        // Si hay parametros, vincularlos con bind_param
        if (!empty($tipos) && !empty($params)) {
            // El operador ... (spread) descompone el array en argumentos individuales
            // Ejemplo: si $params = ['Juan', 'juan@mail.com']
            // se convierte en: bind_param('ss', 'Juan', 'juan@mail.com')
            mysqli_stmt_bind_param($stmt, $tipos, ...$params);
        }

        // Ejecutar la consulta preparada
        mysqli_stmt_execute($stmt);

        return $stmt;
    }


    // METODO: obtenerResultado()
    
    // Ejecuta una consulta SELECT y devuelve todas las filas.
    // public: Puede ser llamado desde fuera de la clase.
    
    // Devuelve: Array de arrays asociativos (cada fila es un array)

    public function obtenerResultado($sql, $tipos = '', $params = []) {
        $stmt = $this->consultaPreparada($sql, $tipos, $params);

        if (!$stmt) {
            return [];
        }

        $resultado = mysqli_stmt_get_result($stmt);
        $filas = [];

        while ($fila = mysqli_fetch_assoc($resultado)) {
            $filas[] = $fila;
        }

        mysqli_stmt_close($stmt);
        return $filas;
    }


    // METODO: ejecutar()

    // Ejecuta una consulta INSERT, UPDATE o DELETE.
    // Devuelve: true si tuvo exito, false si fallo.

    public function ejecutar($sql, $tipos = '', $params = []) {
        $stmt = $this->consultaPreparada($sql, $tipos, $params);

        if (!$stmt) {
            return false;
        }

        $exito = true; // La consulta ya se ejecuto en consultaPreparada()
        mysqli_stmt_close($stmt);
        return $exito;
    }


    // METODO: obtenerUltimoId()

    // Devuelve el ID generado por el ultimo INSERT (AUTO_INCREMENT)

    public function obtenerUltimoId() {
        return mysqli_insert_id($this->conexion);
    }


    // METODO GETTER: getConexion()

    // GETTER: Metodo publico que permite LEER un atributo protegido.
    // Es parte de la encapsulacion: no exponemos el atributo directamente,
    // sino que damos acceso controlado a traves de un metodo.

    // Ejemplo de uso: $conexion = $modelo->getConexion();

    public function getConexion() {
        return $this->conexion;
    }
}
