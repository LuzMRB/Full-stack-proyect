<?php
session_start();
require_once __DIR__ . '/config.php';

$errores = [];
$exito = false;
$nombre = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // PASO 1: SANITIZACION DE ENTRADAS (Prevencion XSS)
    // htmlspecialchars(): Convierte caracteres especiales en
    // entidades HTML para que NO se ejecuten como codigo.
    // ENT_QUOTES: Convierte comillas simples Y dobles
    // trim(): Elimina espacios en blanco al inicio y final.

    $nombre = htmlspecialchars(trim($_POST['nombre'] ?? ''), ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars(trim($_POST['email'] ?? ''), ENT_QUOTES, 'UTF-8');
    $password = $_POST['password'] ?? '';
    $passwordConfirm = $_POST['password_confirm'] ?? '';

    // PASO 2: VALIDACION EN EL SERVIDOR
    // NUNCA confiar solo en la validacion del cliente (JavaScript).

    if (empty($nombre)) {
        $errores[] = 'El nombre es obligatorio.';
    } elseif (strlen($nombre) < 2 || strlen($nombre) > 50) {
        $errores[] = 'El nombre debe tener entre 2 y 50 caracteres.';
    }

    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = 'El formato del email no es valido.';
    }

    if (empty($password)) {
        $errores[] = 'La contrasena es obligatoria.';
    } elseif (strlen($password) < 6) {
        $errores[] = 'La contrasena debe tener al menos 6 caracteres.';
    } elseif (!preg_match('/[0-9]/', $password)) {
        $errores[] = 'La contrasena debe contener al menos un numero.';
    }

    if ($password !== $passwordConfirm) {
        $errores[] = 'Las contrasenas no coinciden.';
    }

    // PASO 3: VERIFICAR SI EL USUARIO YA EXISTE
    // Consulta preparada para prevenir inyeccion SQL

    if (empty($errores)) {
        $sqlBuscar = "SELECT id FROM usuarios WHERE nombre = ?";
        $stmtBuscar = mysqli_prepare($conexion, $sqlBuscar);
        mysqli_stmt_bind_param($stmtBuscar, 's', $nombre);
        mysqli_stmt_execute($stmtBuscar);
        $resultado = mysqli_stmt_get_result($stmtBuscar);

        if (mysqli_num_rows($resultado) > 0) {
            $errores[] = 'Este nombre de usuario ya esta registrado.';
        }

        mysqli_stmt_close($stmtBuscar);
    }

    // PASO 4: CREAR EL USUARIO
    // password_hash(PASSWORD_DEFAULT): Genera hash bcrypt con salt

    if (empty($errores)) {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $emailParaBD = !empty($email) ? $email : null;
        $sqlInsertar = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
        $stmtInsertar = mysqli_prepare($conexion, $sqlInsertar);
        mysqli_stmt_bind_param($stmtInsertar, 'sss', $nombre, $emailParaBD, $passwordHash);

        if (mysqli_stmt_execute($stmtInsertar)) {
            $nuevoId = mysqli_insert_id($conexion);

            // PASO 5: CREAR SESION
            $_SESSION['usuario_id'] = $nuevoId;
            $_SESSION['usuario_nombre'] = $nombre;
            $_SESSION['logueado'] = true;
            $exito = true;

            header('Location: ../index.php?registro=exitoso');
            exit;
        } else {
            $errores[] = 'Error al crear el usuario.';
        }

        mysqli_stmt_close($stmtInsertar);
    }
}

mysqli_close($conexion);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - Solitario</title>
    <link rel="stylesheet" href="../css/style.css">
    <style>
        .auth-container {
            max-width: 500px;
            margin: 40px auto;
            padding: 30px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .auth-container h2 {
            text-align: center;
            color: #5d4037;
            margin-bottom: 25px;
        }
        .auth-link { text-align: center; margin-top: 20px; }
        .auth-link a { color: #8b5e3c; text-decoration: none; font-weight: bold; }
        .auth-link a:hover { text-decoration: underline; }
        .error-lista {
            background-color: #ffebee;
            border-left: 4px solid #d32f2f;
            padding: 12px 20px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .error-lista li { color: #d32f2f; margin: 5px 0; }
        .volver-juego { text-align: center; margin-top: 15px; }
        .volver-juego a { color: #555; text-decoration: none; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>Solitario</h1>
            <p class="subtitulo">Registro de usuario</p>
        </div>
    </header>
    <main>
        <div class="auth-container">
            <h2>Crear Cuenta</h2>
            <?php if (!empty($errores)): ?>
                <ul class="error-lista">
                <?php foreach ($errores as $error): ?>
                    <li><?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></li>
                <?php endforeach; ?>
                </ul>
            <?php endif; ?>
            <form action="registro.php" method="POST" class="formulario">
                <div class="form-grupo">
                    <label for="nombre">Nombre de usuario:</label>
                    <input type="text" id="nombre" name="nombre"
                           value="<?php echo htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8'); ?>"
                           placeholder="Tu nombre de usuario"
                           required minlength="2" maxlength="50">
                </div>
                <div class="form-grupo">
                    <label for="email">Email (opcional):</label>
                    <input type="email" id="email" name="email"
                           value="<?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?>"
                           placeholder="tu@email.com">
                </div>
                <div class="form-grupo">
                    <label for="password">Contrasena:</label>
                    <input type="password" id="password" name="password"
                           placeholder="Minimo 6 caracteres, 1 numero"
                           required minlength="6">
                </div>
                <div class="form-grupo">
                    <label for="password_confirm">Confirmar contrasena:</label>
                    <input type="password" id="password_confirm" name="password_confirm"
                           placeholder="Repite tu contrasena"
                           required minlength="6">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    Registrarse
                </button>
            </form>
            <div class="auth-link">
                <p>Ya tienes cuenta? <a href="login.php">Inicia sesion</a></p>
            </div>
            <div class="volver-juego">
                <p><a href="../index.php">Volver al juego</a></p>
            </div>
        </div>
    </main>
    <footer>
        <p>&copy; 2025 Solitario - Luz Rubio Bolger - UAX</p>
    </footer>
</body>
</html>