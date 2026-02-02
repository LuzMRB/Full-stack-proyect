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
| **UD6** — AJAX y Diseño Responsivo | Fetch API, JSON, XML, YAML, CSS Custom Properties, Media Queries | Comunicación asíncrona con el servidor mediante `fetch()` y `async/await`. Intercambio de datos en formato JSON. Diseño adaptable con media queries en 3 breakpoints (1024px, 768px, 480px). Menú hamburguesa, animaciones CSS y accesibilidad. |

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
│   └── style.css           ← Estilos, responsive design, variables CSS y animaciones
├── js/
│   └── script.js           ← Lógica del juego, DOM, eventos, Fetch API, menú hamburguesa
├── data/                   ← NUEVO (Clase 11 - Formatos de datos)
│   ├── ranking_ejemplo.json    ← Ejemplo de datos en formato JSON
│   ├── ranking_ejemplo.xml     ← Ejemplo de datos en formato XML
│   └── ranking_ejemplo.yaml    ← Ejemplo de datos en formato YAML
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

## Diseño Responsivo Avanzado (Clase 11 — UD6 §3)

### CSS Custom Properties (Variables CSS)

Se implementaron **más de 40 variables CSS** en el selector `:root` para centralizar todos los valores de diseño. Esto permite modificar el aspecto completo del sitio cambiando un solo valor, en lugar de buscar y reemplazar en cientos de líneas.

```css
:root {
    --color-primario: #8b5e3c;
    --color-fondo: #2c1810;
    --espaciado-md: 15px;
    --radio-borde: 8px;
    --transicion-normal: all 0.3s ease;
    --tamano-ficha: 50px;
    /* ... más de 40 variables */
}

/* Uso en todo el CSS */
background-color: var(--color-primario);
border-radius: var(--radio-borde);
transition: var(--transicion-normal);
```

**Categorías de variables implementadas:**

| Categoría | Variables | Ejemplo |
|---|---|---|
| Colores | `--color-primario`, `--color-fondo`, `--color-texto`, etc. | `var(--color-primario)` → `#8b5e3c` |
| Espaciado | `--espaciado-xs` a `--espaciado-xl` | `var(--espaciado-md)` → `15px` |
| Bordes | `--radio-borde`, `--sombra-suave`, `--sombra-media` | `var(--radio-borde)` → `8px` |
| Tipografía | `--fuente-principal`, `--tamano-base`, `--tamano-h1` | `var(--tamano-h1)` → `2em` |
| Transiciones | `--transicion-rapida`, `--transicion-normal` | `var(--transicion-normal)` → `all 0.3s ease` |
| Tablero | `--tamano-ficha`, `--gap-tablero` | `var(--tamano-ficha)` → `50px` |

### Menú Hamburguesa

Se implementó un **menú hamburguesa** para la navegación en dispositivos móviles (< 768px), con animación del icono ≡ → ✕ al abrirse.

**HTML** (`index.php`):
```html
<button class="hamburguesa" id="btn-hamburguesa"
        aria-label="Abrir menú de navegación"
        aria-expanded="false">
    <span></span>
    <span></span>
    <span></span>
</button>
```

**CSS** (`style.css`):
```css
/* Oculto en desktop, visible en móvil */
.hamburguesa { display: none; }

@media (max-width: 768px) {
    .hamburguesa { display: flex; }
    .nav-links { display: none; }
    .nav-links.activo { display: flex; animation: deslizarAbajo 0.3s ease; }
}
```

**JavaScript** (`script.js`):
```javascript
btnHamburguesa.addEventListener('click', () => {
    btnHamburguesa.classList.toggle('activo');
    navLinks.classList.toggle('activo');
    btnHamburguesa.setAttribute('aria-expanded', estaAbierto);
});
```

### 3 Breakpoints con Media Queries

El diseño se adapta a **3 puntos de ruptura** para cubrir todos los tamaños de dispositivo:

| Breakpoint | Dispositivo | Cambios principales |
|---|---|---|
| `≤ 1024px` | Tablet / Desktop pequeño | Tipografía fluida con `clamp()`, ajuste de paddings |
| `≤ 768px` | Tablet / Móvil | Menú hamburguesa activo, Grid de 3 cols → 1 col, fichas más pequeñas |
| `≤ 480px` | Móvil pequeño | Fichas aún más pequeñas, texto reducido, layout simplificado |

**Tipografía fluida** (UD6 §3 — técnica avanzada):
```css
@media (max-width: 1024px) {
    h1 { font-size: clamp(1.3em, 4vw, 2em); }
}
```
La función `clamp(mínimo, preferido, máximo)` permite que el texto escale fluidamente con el ancho de la ventana, sin necesidad de definir un tamaño fijo para cada breakpoint.

### CSS Grid Avanzado

Se aplicaron técnicas avanzadas de CSS Grid más allá del uso básico:

```css
/* Grid auto-responsivo: se adapta SIN media queries */
.reglas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--espaciado-md);
}

/* Grid fijo para el panel de estadísticas */
.stats-panel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--espaciado-sm);
}
```

La combinación de `auto-fit` + `minmax()` permite que las tarjetas se redistribuyan automáticamente: en pantallas anchas aparecen 2 columnas, y en pantallas estrechas colapsan a 1 columna, sin necesitar una media query adicional.

### Flexbox Avanzado

Se mejoraron los layouts con Flexbox para adaptarse mejor a diferentes tamaños:

```css
/* Los botones saltan a nueva línea si no caben */
.controles {
    display: flex;
    flex-wrap: wrap;
    gap: var(--espaciado-sm);
    justify-content: center;
}
```

La propiedad `flex-wrap: wrap` permite que los elementos se redistribuyan en múltiples líneas cuando no caben en una sola, combinado con `gap` para mantener el espaciado uniforme.

### Animaciones CSS con @keyframes

Se crearon 3 animaciones para mejorar la experiencia visual:

| Animación | Elemento | Efecto |
|---|---|---|
| `@keyframes pulso` | Ficha seleccionada | Brillo dorado que pulsa (box-shadow) |
| `@keyframes aparecer` | Secciones de la página | Aparecen con fade-in + desplazamiento desde abajo |
| `@keyframes deslizarAbajo` | Menú hamburguesa | Se desliza hacia abajo al abrirse |

```css
@keyframes pulso {
    0%, 100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
    50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
}

.ficha.seleccionada {
    animation: pulso 1.5s ease-in-out infinite;
}
```

### Hoja de Estilos para Impresión

Se añadió un bloque `@media print` que adapta la página para ser impresa:

```css
@media print {
    body { background: white; color: black; }
    nav, .controles, .formulario-puntuacion, footer { display: none; }
    section { page-break-inside: avoid; }
}
```

Esto oculta los elementos interactivos (menú, botones, formulario) y optimiza colores para ahorro de tinta al imprimir con `Ctrl+P`.

### Accesibilidad

Se implementaron mejoras de accesibilidad según las buenas prácticas de la UD6:

**`prefers-reduced-motion`**: Desactiva todas las animaciones para usuarios que lo tienen configurado en su sistema operativo.
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

**Atributos ARIA**: El menú hamburguesa incluye `aria-label` para describir el botón y `aria-expanded` que se actualiza con JavaScript para indicar si el menú está abierto o cerrado.

**Tabla responsiva**: Se envolvió la tabla de ranking en un wrapper con `overflow-x: auto` para permitir scroll horizontal en pantallas pequeñas sin romper el layout.

### Otras mejoras responsivas

| Mejora | Técnica CSS | Propósito |
|---|---|---|
| Imágenes flexibles | `img { max-width: 100%; height: auto; }` | Las imágenes nunca desbordan su contenedor |
| Header fijo | `header { position: sticky; top: 0; }` | El header permanece visible al hacer scroll |
| Botones adaptables | `.controles { flex-wrap: wrap; }` | Los botones saltan a nueva línea si no caben |
| Hover mejorado | `.regla-card:hover { transform: translateY(-3px); }` | Feedback visual al pasar el ratón |

### Resumen de conceptos UD6 §3 aplicados

| Concepto | Implementación |
|---|---|
| CSS Custom Properties | `:root` con ~40 variables, `var()` en todo el CSS |
| Flexbox avanzado | `flex-wrap: wrap`, `gap`, distribución responsiva |
| CSS Grid avanzado | `repeat(auto-fit, minmax())`, `repeat(3, 1fr)` |
| Media Queries (3 breakpoints) | 1024px, 768px, 480px |
| Menú hamburguesa | HTML + CSS + JS con animación ≡ → ✕ |
| Animaciones @keyframes | pulso, aparecer, deslizarAbajo |
| Tipografía fluida | `clamp(1.3em, 4vw, 2em)` |
| Imágenes flexibles | `max-width: 100%; height: auto` |
| position: sticky | Header fijo al scroll |
| Tabla responsiva | `overflow-x: auto` en wrapper |
| @media print | Estilos optimizados para impresión |
| prefers-reduced-motion | Respeto de preferencias de accesibilidad |
| ARIA attributes | `aria-label`, `aria-expanded` en hamburguesa |

---

## Formatos de Intercambio de Datos (Clase 11 — UD6 §4)

### ¿Qué son los formatos de intercambio de datos?

Son formatos estandarizados que permiten que diferentes sistemas (frontend, backend, APIs, servicios externos) intercambien información de forma estructurada. En el proyecto se crearon ejemplos comparativos con los mismos datos de ranking en los 3 formatos principales.

Los archivos de ejemplo se encuentran en la carpeta `data/`.

### JSON (JavaScript Object Notation) — `data/ranking_ejemplo.json`

Es el formato **más utilizado en aplicaciones web** actuales. Su sintaxis es idéntica a los objetos de JavaScript, lo que facilita su uso en el frontend.

```json
{
    "ranking": [
        {
            "posicion": 1,
            "nombre": "Ana García",
            "puntuacion": 9500
        }
    ]
}
```

**Características:**
- Pares `"clave": valor` separados por comas
- Objetos delimitados por `{ }`, arrays por `[ ]`
- Tipos de datos: string, number, boolean, null, object, array
- Ligero y fácil de parsear

**Uso en el proyecto:**
- El frontend envía datos con `JSON.stringify()` en las peticiones `fetch()`
- El backend PHP responde con `json_encode()` y `header('Content-Type: application/json')`
- Node.js usa `JSON.parse()` para leer y `res.json()` para responder

### XML (eXtensible Markup Language) — `data/ranking_ejemplo.xml`

Formato con etiquetas similar a HTML, muy usado en sistemas empresariales y tecnologías más antiguas (SOAP, RSS, configuraciones de Java/Android).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ranking>
    <jugador posicion="1">
        <nombre>Ana García</nombre>
        <puntuacion>9500</puntuacion>
    </jugador>
</ranking>
```

**Características:**
- Declaración `<?xml ?>` obligatoria al inicio
- Etiquetas de apertura `<tag>` y cierre `</tag>`
- Soporta atributos dentro de las etiquetas
- Extensible: puedes definir tus propias etiquetas
- Más verbose (ocupa más espacio que JSON)

### YAML (YAML Ain't Markup Language) — `data/ranking_ejemplo.yaml`

Formato basado en **sangrado** (indentación), sin llaves ni corchetes. Es el más legible por humanos y se usa principalmente en archivos de configuración.

```yaml
ranking:
  - posicion: 1
    nombre: "Ana García"
    puntuacion: 9500
```

**Características:**
- Estructura definida por la indentación (espacios, no tabuladores)
- Sin llaves `{}`, corchetes `[]` ni comillas obligatorias
- Listas con guion `-`
- Muy usado en: Docker Compose, Kubernetes, GitHub Actions, configuraciones

### Comparativa de formatos

| Aspecto | JSON | XML | YAML |
|---|---|---|---|
| **Legibilidad** | Media | Baja (verbose) | Alta |
| **Tamaño** | Ligero | Pesado (~2x JSON) | Ligero |
| **Uso principal** | APIs REST, web | Empresarial, SOAP, RSS | Configuración, DevOps |
| **Soporte en JS** | Nativo (`JSON.parse`) | Necesita parser (DOMParser) | Necesita librería externa |
| **Tipos de datos** | string, number, bool, null, array, object | Solo texto (todo es string) | string, number, bool, null, array, object |
| **Comentarios** | No soporta | Sí (`<!-- -->`) | Sí (`#`) |

### JSON en el proyecto: flujo completo

```
[Frontend JS]                    [Backend PHP]
     |                                |
     |  fetch('/php/process.php', {   |
     |    method: 'POST',             |
     |    body: JSON.stringify({      |  ← JSON.stringify() convierte
     |      nombre: "Ana",            |     objeto JS → texto JSON
     |      puntuacion: 9500          |
     |    })                          |
     |  })                            |
     |  ────────────────────────────> |
     |                                |  $datos = json_decode(
     |                                |    file_get_contents('php://input'),
     |                                |    true
     |                                |  );  ← json_decode() convierte
     |                                |        texto JSON → array PHP
     |                                |
     |                                |  // Procesa y guarda en MySQL...
     |                                |
     |                                |  echo json_encode([
     |                                |    'exito' => true
     |                                |  ]);  ← json_encode() convierte
     |  <──────────────────────────── |        array PHP → texto JSON
     |                                |
     |  .then(res => res.json())      |
     |  .then(data => {               |  ← res.json() convierte
     |    console.log(data.exito);    |     texto JSON → objeto JS
     |  })                            |
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

## AJAX y Fetch API Avanzado (Clase 12 — UD6 §5)

### ¿Qué es AJAX?

AJAX (Asynchronous JavaScript and XML) es una técnica que permite **actualizar partes de la página sin recargarla completamente**. En nuestro proyecto, el ranking se carga y actualiza dinámicamente sin que el usuario pierda el estado del juego.

### Funcionalidades implementadas con Fetch API

| Funcionalidad | Método HTTP | Endpoint PHP | Descripción |
|---|---|---|---|
| **Cargar ranking** | GET | `php/get_ranking.php` | Obtiene las 10 mejores puntuaciones |
| **Guardar puntuación** | POST | `php/process.php` | Envía datos del formulario al servidor |
| **Refrescar ranking** | GET | `php/get_ranking.php` | Actualiza la tabla sin recargar |

### Evolución: de `.then()` (Clase 7) a `async/await` (Clase 12)

**Versión Clase 7 — Cadena de `.then()`:**
```javascript
fetch('php/get_ranking.php')
    .then(response => response.json())
    .then(data => { /* procesar */ })
    .catch(error => { /* manejar error */ });
```

**Versión Clase 12 — `async/await`:**
```javascript
async function cargarRanking() {
    try {
        const response = await fetch('php/get_ranking.php');
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const data = await response.json();
        // procesar data
    } catch (error) {
        // manejar error
    }
}
```

**Ventajas de `async/await`:**
- El código se lee de arriba a abajo (como código síncrono)
- `try/catch` captura todos los errores (red, HTTP, parseo)
- `response.ok` detecta errores HTTP que `.then()` no captura
- Se pueden encadenar varias llamadas con `await` secuenciales

### Indicador de carga (UX)

Se añadió feedback visual para que el usuario sepa que la petición está en curso:

```javascript
// Mientras se envía
btnGuardar.textContent = 'Enviando...';
btnGuardar.disabled = true;

// Al terminar (finally)
btnGuardar.textContent = textoOriginal;
btnGuardar.disabled = false;
```

### Botón Refrescar Ranking

Se añadió un botón que permite actualizar la tabla de ranking **sin recargar la página**, demostrando la esencia de AJAX:

```javascript
btnRefrescar.addEventListener('click', async () => {
    btnRefrescar.textContent = 'Actualizando...';
    await cargarRanking();  // Petición GET asíncrona
    btnRefrescar.textContent = 'Refrescar Ranking';
});
```

### Flujo completo AJAX en el proyecto

```
┌─────────────────┐   fetch() POST    ┌──────────────────┐
│   FRONTEND      │ ────────────────→  │    BACKEND        │
│   (JavaScript)  │                    │    (PHP/Node.js)  │
│                 │   JSON response    │                   │
│  1. Recoger     │ ←──────────────── │  3. Validar       │
│     datos form  │                    │     datos         │
│  2. JSON.       │                    │  4. Consultar     │
│     stringify() │                    │     MySQL         │
│  5. Actualizar  │                    │  5. json_encode() │
│     DOM         │                    │     respuesta     │
└─────────────────┘                    └──────────────────┘

Ejemplo flujo GET (cargar ranking):
  JS: await fetch('php/get_ranking.php')
  PHP: SELECT ... FROM puntuaciones → json_encode($ranking)
  JS: data = await response.json() → forEach → appendChild()

Ejemplo flujo POST (guardar puntuación):
  JS: await fetch('php/process.php', { method: 'POST', body: JSON.stringify(datos) })
  PHP: json_decode(php://input) → INSERT INTO → json_encode(['exito' => true])
  JS: data = await response.json() → mostrar mensaje → await cargarRanking()
```

### Conceptos AJAX/Fetch aplicados (UD6 §5)

| Concepto | Implementación | Archivo |
|---|---|---|
| `fetch()` GET | `await fetch('php/get_ranking.php')` | script.js |
| `fetch()` POST | `await fetch('php/process.php', {method:'POST'...})` | script.js |
| `async/await` | `async function cargarRanking()` | script.js |
| `response.ok` | `if (!response.ok) throw new Error(...)` | script.js |
| `response.json()` | `const data = await response.json()` | script.js |
| `JSON.stringify()` | `body: JSON.stringify(datos)` | script.js |
| `try/catch/finally` | Manejo completo de errores | script.js |
| `json_encode()` | `echo json_encode(['exito' => true])` | process.php |
| `json_decode()` | `json_decode(file_get_contents('php://input'))` | process.php |
| Indicador de carga | `btnGuardar.textContent = 'Enviando...'` | script.js |
| Actualización parcial DOM | `createElement('tr')` + `appendChild()` | script.js |
| `preventDefault()` | Envío de formulario sin recargar | script.js |

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