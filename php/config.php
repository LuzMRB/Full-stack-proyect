<?php
// CONFIG.PHP Configuración de la Base de Datos
// Establece la CONEXIÓN con MySQL.
// Se incluirá (require) desde otros scripts PHP.


//   - mysqli_connect(): Establece conexión con MySQL.
//     Parámetros: host, usuario, contraseña, base de datos, puerto.
//   - mysqli_connect_error(): Devuelve el error de conexión.
//   - mysqli_set_charset(): Establece la codificación de caracteres.


// 1. DATOS DE CONEXIÓN (Variables)
// En PHP, las variables empiezan con $ 
// Credenciales por defecto de XAMPP.

$servidor = "127.0.0.1";
$usuario = "root";
$clave = "";
$baseDatos = "solitario_db";


// 2. ESTABLECER LA CONEXIÓN
// mysqli_connect(): Conecta PHP con MySQL 
// Recibe: host, usuario, clave, base de datos, puerto.
// Puerto 3306: Puerto por defecto de MySQL.
// Se especifica explícitamente para forzar conexión TCP
// en Mac, donde el socket Unix puede no encontrarse.

// try-catch: En PHP 8+, mysqli_connect() lanza una excepción
// (mysqli_sql_exception) si falla, en vez de devolver false.
// Sin try-catch, la excepción no se captura y PHP muestra error 500.

try {
    $conexion = mysqli_connect($servidor, $usuario, $clave, $baseDatos, 3306);
} catch (mysqli_sql_exception $e) {
    die("Error de conexión a la base de datos: " . $e->getMessage());
}


// 3. VERIFICAR LA CONEXIÓN
// mysqli_connect_error(): Devuelve el error si la conexión falló.
// die(): Detiene la ejecución y muestra un mensaje.

if (!$conexion) {
    die("Error de conexión a la base de datos: " . mysqli_connect_error());
}


// 4. ESTABLECER CODIFICACIÓN UTF-8
// Necesario para que tildes, ñ, emojis funcionen correctamente.

mysqli_set_charset($conexion, "utf8mb4");

?>