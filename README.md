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
| **UD5** — PHP OOP y Node.js | PHP (POO), Node.js, Express.js, npm | Refactorización del backend PHP con Programación Orientada a Objetos: clases `Modelo`, `Usuario` y `Puntuacion` con herencia y encapsulación. Reimplementación de la API con Node.js y Express.js conectando a MySQL. |
| **UD6** — AJAX y Diseño Responsivo | Fetch API, JSON, CSS Media Queries | Comunicación asíncrona con el servidor mediante `fetch()` y `async/await`. Intercambio de datos en formato JSON. Diseño adaptable con media queries en 3 breakpoints (1024px, 768px, 480px). |

---

##  Seguridad

- **SQL Injection**: prevenido mediante `prepared statements` (`mysqli_prepare` + `bind_param`).
- **XSS (Cross-Site Scripting)**: prevenido con `htmlspecialchars()` en PHP y escapado de HTML en JavaScript.
- **Validación doble**: tanto en el cliente (JavaScript) como en el servidor (PHP) para garantizar la integridad de los datos.

---

##  Estructura del Proyecto

```
Full_stack_proyect/
├── index.php               ← Página principal (session_start, nav condicional)
├── index.html              ← Página original HTML5
├── css/
│   └── style.css           ← Estilos, responsive design y animaciones
├── js/
│   └── script.js           ← Lógica del juego, DOM, eventos, Fetch API
├── php/
│   ├── config.php          ← Configuración de BD (try-catch, 127.0.0.1)
│   ├── clases/             ← NUEVO (Clase 9 - POO)
│   │   ├── Modelo.php      ← Clase padre: conexión BD, consultas preparadas
│   │   ├── Usuario.php     ← Clase hija: registro, login, sesiones
│   │   └── Puntuacion.php  ← Clase hija: guardar y consultar puntuaciones
│   ├── process.php         ← Procesar puntuación (refactorizado con POO)
│   ├── get_ranking.php     ← Obtener ranking (refactorizado con POO)
│   ├── registro.php        ← Registro de usuarios (refactorizado con POO)
│   ├── login.php           ← Login de usuarios (refactorizado con POO)
│   ├── logout.php          ← Cierre de sesión
│   └── test_conexion.php   ← Verificar conexión a BD
├── nodejs/                 ← NUEVO (Clase 10 - Node.js)
│   ├── package.json        ← Dependencias npm (express, mysql2, cors, bcrypt)
│   ├── package-lock.json   ← Versiones exactas de dependencias
│   ├── server_basico.js    ← Servidor HTTP con módulo nativo (UD5 §4.1)
│   ├── server.js           ← Servidor Express.js + MySQL (reimplementa API)
│   └── .gitignore          ← Ignora node_modules/
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
http://localhost/Full_stack_proyect/index.php
```

---

## Programación Orientada a Objetos (Clase 9 — UD5 §3.4)

### Refactorización a POO

El backend PHP fue refactorizado de programación estructurada a **Programación Orientada a Objetos**, aplicando los conceptos de la UD5 sección 3.4 (Clases y objetos).

### Diagrama de herencia

```
            Modelo (clase padre)
           /                    \
      Usuario                Puntuacion
    (clase hija)            (clase hija)
```

La clase padre `Modelo` centraliza la lógica de conexión y consultas preparadas. Las clases hijas `Usuario` y `Puntuacion` heredan de ella con `extends` y añaden sus propios métodos especializados. Es el mismo patrón que el ejemplo `Animal → Perro` de la UD5, pero aplicado al proyecto real.

### Conceptos POO implementados

| Concepto | Dónde se aplica | Ejemplo |
|---|---|---|
| **class** | Modelo.php, Usuario.php, Puntuacion.php | `class Modelo { }` |
| **Atributos** | Propiedades de cada clase | `protected $conexion`, `private $nombre` |
| **Métodos** | Funciones dentro de las clases | `buscarPorNombre()`, `guardar()` |
| **Constructor** | Inicialización de objetos | `public function __construct($conexion)` |
| **$this->** | Acceso a propiedades del objeto | `$this->conexion`, `$this->tabla` |
| **new** | Creación de objetos | `$usuario = new Usuario($conexion)` |
| **->** (flecha) | Acceso a métodos del objeto | `$usuario->buscarPorNombre($nombre)` |
| **extends** (herencia) | Clases hijas heredan del padre | `class Usuario extends Modelo` |
| **parent::** | Llamar al constructor del padre | `parent::__construct($conexion, 'usuarios')` |
| **private** (encapsulación) | Atributos solo accesibles internamente | `private $id`, `private $nombre` |
| **protected** | Accesible en clase e hijas | `protected $conexion` |
| **public** | Accesible desde cualquier lugar | `public function crear()` |
| **Getters** | Lectura controlada de atributos | `getId()`, `getNombre()`, `getEmail()` |
| **Setters** | Modificación controlada con validación | `setNombre($nombre)` |
| **static** | Métodos sin necesidad de instancia | `Usuario::hashPassword($password)` |

### Archivos de clases

| Archivo | Descripción |
|---|---|
| `php/clases/Modelo.php` | Clase padre con conexión a BD, consultas preparadas (`consultaPreparada()`, `obtenerResultado()`, `ejecutar()`), getter de conexión. Atributos `protected` para que las hijas accedan. |
| `php/clases/Usuario.php` | Hereda de Modelo. Métodos: `buscarPorNombre()`, `crear()`, `verificarPassword()`, `hashPassword()` (estático), `iniciarSesion()`. Atributos `private` con getters/setters. |
| `php/clases/Puntuacion.php` | Hereda de Modelo. Métodos: `guardar()`, `obtenerRanking()`, `calcularPuntuacion()` (estático). Encapsula toda la lógica de puntuaciones. |

### Archivos refactorizados

| Archivo | Antes (estructurado) | Después (POO) |
|---|---|---|
| `php/process.php` | Consultas SQL sueltas, ~100 líneas repetidas | `$usuario = new Usuario($conexion)` + `$puntuacion->guardar()` |
| `php/get_ranking.php` | SELECT + bucle manual | `$puntuacion->obtenerRanking(10)` (1 línea) |
| `php/registro.php` | Consultas preparadas sueltas | `$usuario->crear()`, `Usuario::hashPassword()` |
| `php/login.php` | password_verify directo | `$usuario->verificarPassword()`, `$usuario->iniciarSesion()` |

---

## Introducción a Node.js (Clase 10 — UD5 §4)

### Servidor HTTP básico (módulo nativo)

Se creó un servidor web básico usando **solo el módulo `http` nativo** de Node.js, siguiendo el ejemplo de la UD5 sección 4.1:

```javascript
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hola desde Node.js');
});
server.listen(3000, '127.0.0.1');
```

El archivo `nodejs/server_basico.js` implementa:
- `require('http')`: Importar módulo nativo
- `http.createServer((req, res) => { })`: Crear servidor con función flecha
- `res.writeHead()` y `res.end()`: Cabeceras y cuerpo de respuesta
- `req.on('data')` y `req.on('end')`: Lectura de datos POST
- `server.listen(3000)`: Poner el servidor a escuchar

### Servidor Express.js + MySQL (reimplementación de API)

Se reimplementó parte del backend PHP usando **Express.js** como framework y **mysql2** para la conexión a la base de datos. Ambos servidores (PHP en puerto 80 y Node.js en puerto 3000) conectan a la **misma base de datos** `solitario_db`.

**Endpoints reimplementados:**

| Método | Ruta Node.js | Equivalente PHP | Descripción |
|---|---|---|---|
| GET | `/api/estado` | — | Estado del servidor y conexión BD |
| GET | `/api/ranking` | `get_ranking.php` | Ranking de mejores puntuaciones |
| POST | `/api/puntuacion` | `process.php` | Guardar nueva puntuación |

**Equivalencias PHP → Node.js:**

| PHP | Node.js | Descripción |
|---|---|---|
| `json_decode()` / `json_encode()` | `JSON.parse()` / `JSON.stringify()` | Parseo de JSON |
| `password_hash()` | `bcrypt.hash()` | Hash de contraseñas |
| `password_verify()` | `bcrypt.compare()` | Verificar contraseñas |
| `mysqli_prepare()` + `bind_param()` | `pool.query('...?', [params])` | Consultas preparadas |
| `mysqli_insert_id()` | `resultado.insertId` | Último ID insertado |
| `require_once` | `require()` | Importar módulos |
| Apache (XAMPP) | Express.js | Servidor web |
| Composer | npm | Gestor de paquetes |

### npm y gestión de paquetes (UD5 §4.1)

El proyecto Node.js usa **npm** (Node Package Manager) para gestionar dependencias:

| Paquete | Versión | Descripción |
|---|---|---|
| `express` | ^4.18.2 | Framework web (rutas, middleware) |
| `mysql2` | ^3.6.0 | Conector MySQL con soporte async/await |
| `cors` | ^2.8.5 | Permitir peticiones cross-origin |
| `bcrypt` | ^5.1.1 | Hash seguro de contraseñas |

### Cómo ejecutar el servidor Node.js

```bash
# Servidor básico (sin dependencias)
cd nodejs
node server_basico.js
# Abrir http://127.0.0.1:3000

# Servidor Express + MySQL
cd nodejs
npm install          # Solo la primera vez
node server.js
# Abrir http://127.0.0.1:3000/api/ranking
```

### PHP vs Node.js

| Aspecto | PHP (XAMPP) | Node.js |
|---|---|---|
| Servidor | Apache (incluido en XAMPP) | Node.js es su propio servidor |
| Puerto | 80 (por defecto) | 3000 (configurable) |
| Ejecución | Cada petición = nuevo proceso | Event loop (un solo proceso) |
| Lenguaje | PHP | JavaScript (mismo del frontend) |
| Base de datos | mysqli extension | mysql2 package |
| Paquetes | Composer | npm |

---

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
- API Node.js: `http://127.0.0.1:3000/`
- Ranking Node.js: `http://127.0.0.1:3000/api/ranking`