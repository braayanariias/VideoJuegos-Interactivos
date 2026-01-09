# 🎮 Juegos Interactivos Unimayor

Una aplicación web moderna que implementa tres juegos interactivos educativos desarrollada con **Vue 3** y **Vite**.

## 📋 Descripción

**Juegos Unimayor** es una plataforma que ofrece tres juegos diseñados para poner a prueba diferentes habilidades:

- **Atrapa el cuadrado**: Demuestra tus reflejos haciendo clic en un cuadrado que se mueve aleatoriamente. Tienes 30 segundos para acumular la mayor puntuación posible.

- **Memoria**: Un juego clásico de parejas donde debes encontrar cartas idénticas. Ejercita tu memoria y concentración intentando completarlo en el menor tiempo.

- **Simón Dice**: Sigue las órdenes del líder, pero solo si incluyen "Simón dice". ¡Demuestra tu rapidez de reacción y atención!

## 🚀 Tecnologías Utilizadas

- **Vue 3**: Framework JavaScript reactivo para construir interfaces de usuario
- **Vue Router 4**: Enrutamiento de aplicaciones de una página (SPA)
- **Vite**: Herramienta de construcción rápida y moderna
- **JavaScript**: Lenguaje de programación base

## 📦 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/braayanariias/VideoJuegos-Interactivos.git
cd VideoJuegos-Interactivos
```

### 2. Instalar dependencias

```bash
npm install
```

## 🎯 Uso

### Modo Desarrollo

Inicia el servidor de desarrollo con recarga en caliente:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Compilar para Producción

Genera una versión optimizada lista para desplegar:

```bash
npm run build
```

### Vista Previa de Producción

Obtén una vista previa de la compilación de producción:

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
├── src/
│   ├── components/              # Componentes reutilizables
│   │   ├── button/             # Botones personalizados
│   │   ├── card/               # Tarjetas de información
│   │   ├── gamecuadrado/       # Juego del cuadrado
│   │   ├── gamemoria/          # Juego de memoria
│   │   ├── icons/              # Iconos personalizados
│   │   ├── nav/                # Navegación
│   │   └── simondice/          # Juego Simón Dice
│   ├── views/                   # Vistas principales
│   │   ├── HomeView.vue        # Página de inicio
│   │   ├── Cuadrado.vue        # Vista del juego Atrapa el cuadrado
│   │   ├── Memoria.vue         # Vista del juego de Memoria
│   │   ├── SimonDice.vue       # Vista del juego Simón Dice
│   │   └── Register.vue        # Página de registro
│   ├── router/
│   │   └── index.js            # Configuración de rutas
│   ├── assets/
│   │   └── main.css            # Estilos globales
│   ├── App.vue                 # Componente raíz
│   └── main.js                 # Punto de entrada
├── public/
│   └── sounds/                 # Efectos de sonido
├── package.json                # Dependencias del proyecto
├── vite.config.js             # Configuración de Vite
└── README.md                   # Este archivo
```

## 🎮 Cómo Jugar

### Atrapa el Cuadrado
1. Haz clic en el botón "Comenzar" para iniciar el juego
2. Tienes 30 segundos para hacer clic en el cuadrado
3. Cada clic exitoso suma puntos
4. Intenta obtener la mayor puntuación posible

### Memoria
1. Observa las cartas y memoriza sus posiciones
2. Voltea dos cartas en cada turno
3. Si coinciden, permanecen boca arriba
4. Encuentra todas las parejas en el menor tiempo posible

### Simón Dice
1. Escucha las órdenes que se pronuncian
2. Solo sigue órdenes que comienzan con "Simón dice"
3. Si sigues una orden sin esa frase, pierdes
4. Sé el último jugador en pie

## 💻 IDE Recomendado

- [VSCode](https://code.visualstudio.com/)
- Extensión: [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (desactiva Vetur si la tienes instalada)

## 📖 Referencias

- [Documentación Vue 3](https://vuejs.org/)
- [Documentación Vue Router](https://router.vuejs.org/)
- [Documentación Vite](https://vite.dev/)

## 👨‍💻 Autor

Desarrollado como proyecto educativo para el curso de Herramientas Visuales de Programación.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerir mejoras.
