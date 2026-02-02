#  Solitario Triangular | Peg Solitaire

**Proyecto Full Stack — Ingeniería Web I**  
Universidad Alfonso X el Sabio (UAX)

**Autora:** Luz Rubio Bolger  
**Fecha:** Enero 2025

---

##  Objetivo del Proyecto

Desarrollar una **aplicación web completa** (Full Stack) que implemente el clásico juego de mesa **Solitario Triangular** (también conocido como *Peg Solitaire*).

El juego consiste en un tablero triangular con **15 posiciones** dispuestas en 5 filas. Al inicio, todas las posiciones están ocupadas por fichas excepto una. El jugador debe ir **saltando fichas** sobre otras adyacentes para eliminarlas del tablero, con el objetivo de dejar **una sola ficha** al final de la partida.


---

## Funcionalidades

### Juego

- **Tablero interactivo** de 15 posiciones con forma triangular.
- **Selección y movimiento** de fichas mediante clic o toque en pantalla.
- **Validación de movimientos**: solo se permiten saltos sobre fichas adyacentes hacia un hueco vacío.
- **Sistema de deshacer** (undo) para revertir el último movimiento.
- **Pistas**: el juego sugiere un movimiento válido cuando el jugador se atasca.
- **Detección automática** de fin de partida (victoria o derrota).
- **Selección de hueco inicial**: el jugador puede elegir desde qué posición empezar.

### Estadísticas y Puntuación

- **Contador de fichas restantes** actualizado en tiempo real.
- **Contador de movimientos** realizados.
- **Cronómetro** que mide el tiempo de cada partida.
- **Sistema de puntuación** que combina fichas eliminadas, movimientos, tiempo y bonificaciones especiales.

### Ranking y Persistencia

- **Formulario de registro** de puntuación con validación de campos (nombre, email).
- **Almacenamiento en base de datos MySQL** de las puntuaciones.
- **Tabla de ranking** con los mejores jugadores, cargada de forma asíncrona.
- **API REST** en PHP para la comunicación entre el frontend y la base de datos.

### Experiencia de Usuario

- **Diseño responsivo** adaptado a escritorio, tablet y móvil.
- **Animaciones CSS** para mejorar la retroalimentación visual (selección, captura, victoria).
- **Modal de resultados** al finalizar cada partida.
- **Navegación fluida** con menú hamburguesa en dispositivos móviles.
- **Accesibilidad**: atributos ARIA, navegación por teclado y soporte para movimiento reducido.

---

## Tecnologías Utilizadas

| Unidad Didáctica | Tecnologías | Uso en el Proyecto |
|---|---|---|
| **UD2** — HTML y CSS | HTML5, CSS3 | Estructura semántica del sitio (`header`, `nav`, `main`, `section`, `footer`). Estilos con CSS Custom Properties, Flexbox, Grid y animaciones con `@keyframes`. |
| **UD3** — JavaScript y DOM | JavaScript ES6+ | Lógica del juego implementada con clases. Manipulación dinámica del DOM, manejo de eventos (`click`, `submit`, `keydown`) y validación de formularios. |
| **UD4** — PHP y MySQL | PHP 8, MySQL, SQL | Backend con PHP para procesar solicitudes. Base de datos MySQL para almacenar puntuaciones. Consultas con `prepared statements` para prevenir SQL Injection. |
| **UD5** — PHP Orientado a Objetos | PHP (POO) | Clase `Puntuacion` con encapsulación (propiedades `private`, getters/setters con validación). Clase `Database` con patrón Singleton. Clase `APIController` para gestionar la API. |
| **UD6** — AJAX y Diseño Responsivo | Fetch API, JSON, CSS Media Queries | Comunicación asíncrona con el servidor mediante `fetch()` y `async/await`. Intercambio de datos en formato JSON. Diseño adaptable con media queries en 3 breakpoints (1024px, 768px, 480px). |

---

##  Seguridad

- **SQL Injection**: prevenido mediante `prepared statements` (`mysqli_prepare` + `bind_param`).
- **XSS (Cross-Site Scripting)**: prevenido con `htmlspecialchars()` en PHP y escapado de HTML en JavaScript.
- **Validación doble**: tanto en el cliente (JavaScript) como en el servidor (PHP) para garantizar la integridad de los datos.

---

##  Estructura del Proyecto

```
solitario_triangular/
├── index.html              ← Página principal (HTML5 semántico)
├── css/
│   └── style.css           ← Estilos, responsive design y animaciones
├── js/
│   └── script.js           ← Lógica del juego, DOM, eventos, Fetch API
├── php/
│   ├── config.php          ← Configuración de BD (Singleton)
│   ├── Puntuacion.php      ← Clase POO para gestionar puntuaciones
│   └── api.php             ← API REST (endpoints JSON)
├── sql/
│   └── database.sql        ← Script de creación de la base de datos
└── README.md               ← Este archivo
```

---

## Instalación y Configuración (Clase 7)

### Requisitos Previos
- **XAMPP** (o WAMP/MAMP) instalado y ejecutándose
- Apache y MySQL activos en el panel de control de XAMPP

### Paso 1: Copiar el proyecto
Copiar la carpeta del proyecto dentro de la carpeta `htdocs` de XAMPP:
```
C:\xampp\htdocs\solitario\    (Windows)
/opt/lampp/htdocs/solitario/  (Linux)
/Applications/XAMPP/htdocs/solitario/  (Mac)
```

### Paso 2: Crear la Base de Datos
1. Abrir **phpMyAdmin**: `http://localhost/phpmyadmin/`
2. Ir a la pestaña **SQL**
3. Copiar y pegar el contenido de `sql/database.sql`
4. Pulsar **Ejecutar**

Esto creará:
- Base de datos: `solitario_db`
- Tabla `usuarios`: almacena los jugadores
- Tabla `puntuaciones`: almacena las puntuaciones de cada partida
- Datos de ejemplo para verificar que funciona

### Paso 3: Verificar la Conexión
Abrir en el navegador:
```
http://localhost/Full_stack_proyect/php/test_conexion.php
```
Deben aparecer todos los tests en verde.

### Paso 4: Acceder al juego
```
http://127.0.0.1:5500/index.html
```

## Conceptos UD4/UD5 Aplicados

### PHP Básico
- **Variables** (`$nombre`, `$conexion`): empiezan con `$`, tipado débil
- **Funciones** (`calcularPuntuacion()`): definición y llamada
- **Estructuras de control**: `if/elseif/else`, `foreach`, `while`
- **Operadores**: aritméticos, comparación, concatenación (`.`)

### Variables Superglobales
- `$_POST`: datos enviados por formulario con método POST
- `$_SERVER`: información del servidor (`REQUEST_METHOD`)
- `php://input`: cuerpo de la petición HTTP (para JSON)

### Conexión a Base de Datos (mysqli)
- `mysqli_connect()`: establece la conexión
- `mysqli_query()`: ejecuta consultas SQL
- `mysqli_fetch_assoc()`: obtiene filas como arrays asociativos
- `mysqli_prepare()`: prepara consultas (seguridad)
- `mysqli_stmt_bind_param()`: vincula parámetros
- `mysqli_stmt_execute()`: ejecuta consultas preparadas
- `mysqli_close()`: cierra la conexión

### Seguridad 
- **Consultas preparadas**: previenen inyección SQL
- **password_hash()**: hasheo seguro de contraseñas (bcrypt)
- **password_verify()**: verificación de contraseñas
- **htmlspecialchars()**: previene ataques XSS
- **Validación doble**: tanto en cliente (JS) como en servidor (PHP)

### SQL (UD4 §6.1)
- `CREATE DATABASE/TABLE`: creación de estructura
- `INSERT INTO`: inserción de datos
- `SELECT ... JOIN ... ORDER BY`: consultas con relaciones
- `FOREIGN KEY`: claves foráneas entre tablas

## Base de Datos

### Tabla `usuarios`
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT (PK, AUTO_INCREMENT) | Identificador único |
| nombre | VARCHAR(50) | Nombre del jugador |
| email | VARCHAR(100) | Email (opcional) |
| password | VARCHAR(255) | Contraseña hasheada |
| fecha_registro | TIMESTAMP | Fecha de registro |

### Tabla `puntuaciones`
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT (PK, AUTO_INCREMENT) | Identificador único |
| usuario_id | INT (FK → usuarios.id) | Referencia al usuario |
| fichas_restantes | INT | Fichas al terminar |
| movimientos | INT | Movimientos realizados |
| tiempo_segundos | INT | Duración en segundos |
| puntuacion | INT | Puntuación calculada |
| fecha | TIMESTAMP | Fecha de la partida |

## Registro de Usuarios y Seguridad

### Nuevos archivos
| Archivo | Descripción |
|---------|-------------|
| `php/registro.php` | Registro con $_POST, prepared statements, password_hash |
| `php/login.php` | Login con password_verify() y $_SESSION |
| `php/logout.php` | Cierre de sesión con session_destroy() |

### Conceptos de Seguridad Implementados 

**Prevención de Inyección SQL:**
- Todas las consultas usan `mysqli_prepare()` + `mysqli_stmt_bind_param()`
- Los marcadores `?` separan la instrucción SQL de los datos del usuario
- Los datos NUNCA se concatenan directamente en las consultas

**Prevención de XSS (Cross-Site Scripting):**
- `htmlspecialchars(ENT_QUOTES, 'UTF-8')` en toda salida de datos
- Los datos del usuario se sanitizan antes de mostrarse en HTML

**Almacenamiento Seguro de Contraseñas:**
- `password_hash(PASSWORD_DEFAULT)` genera hashes bcrypt con salt
- `password_verify()` compara contraseñas de forma segura
- Las contraseñas NUNCA se almacenan en texto plano

**Gestión de Sesiones:**
- `session_start()` al inicio de cada script PHP
- `$_SESSION` almacena datos del usuario entre páginas
- `session_regenerate_id()` previene session fixation
- `session_destroy()` limpia la sesión al cerrar

**Validación Doble (Cliente + Servidor):**
- JavaScript valida en el navegador (feedback rápido)
- PHP valida en el servidor (seguridad real)
- El servidor NUNCA confía en los datos del cliente

### URLs del sistema
- Registro: `http://localhost/Full_stack_proyect/php/registro.php`
- Login: `http://localhost/Full_stack_proyect/php/login.php`
- Juego: `http://localhost/Full_stack_proyect/index.php`

Full_stack_proyect/
├── index.php          ← MODIFICADO (session_start, nav, auto-fill)
├── index.html         ← Sin cambios
├── css/
│   └── style.css      ← Sin cambios
├── js/
│   └── script.js      ← MODIFICADO (1 cambio menor)
├── php/
│   ├── config.php     ← Sin cambios
│   ├── process.php    ← Sin cambios
│   ├── get_ranking.php ← Sin cambios
│   ├── test_conexion.php ← Sin cambios
│   ├── registro.php   ← NUEVO (Clase 8)
│   ├── login.php      ← NUEVO (Clase 8)
│   └── logout.php     ← NUEVO (Clase 8)
├── sql/
│   └── database.sql   ← Sin cambios
└── README.md          ← MODIFICADO (nueva sección)
