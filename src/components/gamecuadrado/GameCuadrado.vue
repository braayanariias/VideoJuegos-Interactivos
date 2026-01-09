<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import ButtonCustom from '../button/ButtonCustom.vue';

const puntos = ref(0);
const posicion = ref({ top: '50%', left: '50%' });
const tiempo = ref(30);
const jugando = ref(false);
const imagenSeleccionada = ref('');
let timerInterval = null;

const nombreJuego = 'cuadrado'; // Nombre del juego para identificar los puntajes
const mejoresPuntajes = ref([]);

// Obtener el nombre de usuario desde localStorage
const username = ref(localStorage.getItem('username') || 'Usuario');

// Función para guardar los puntajes en localStorage
const guardarPuntajesEnLocalStorage = () => {
    localStorage.setItem(nombreJuego, JSON.stringify(mejoresPuntajes.value));
};

// Función para cargar los puntajes desde localStorage
const cargarPuntajesDesdeLocalStorage = () => {
    const puntajesGuardados = localStorage.getItem(nombreJuego);
    if (puntajesGuardados) {
        mejoresPuntajes.value = JSON.parse(puntajesGuardados);
    }
};

const reiniciarPuntajes = () => {
    mejoresPuntajes.value = [];
    localStorage.removeItem(nombreJuego);
};

const imagenesDisponibles = [
    { src: '/goku.png', nombre: 'Goku' },
    { src: '/pikachu.png', nombre: 'Pikachu' },
    { src: '/mario.png', nombre: 'Mario' }
];

const iniciarJuego = () => {
    if (!imagenSeleccionada.value) {
        alert("Por favor, selecciona una imagen para empezar el juego.");
        return;
    }
    puntos.value = 0;
    tiempo.value = 30;
    jugando.value = true;
    moverCuadrado();
    iniciarTimer();
};

const moverCuadrado = () => {
    posicion.value = {
        top: Math.random() * 90 + '%',
        left: Math.random() * 90 + '%'
    };
};

const manejarClick = () => {
    puntos.value++;
    moverCuadrado();
};

const juegoTerminado = computed(() => !jugando.value && tiempo.value === 0);

const iniciarTimer = () => {
    timerInterval = setInterval(() => {
        if (tiempo.value > 0) {
            tiempo.value--;
        } else {
            detenerJuego();
        }
    }, 1000);
};

const detenerJuego = () => {
    jugando.value = false;
    clearInterval(timerInterval);

    // Guardar el puntaje actual junto con el nombre de usuario y mantener solo los 5 mejores
    if (!mejoresPuntajes.value.some(puntaje => puntaje.puntos === puntos.value && puntaje.usuario === username.value)) { // Evita duplicados
        mejoresPuntajes.value.push({ puntos: puntos.value, usuario: username.value });
        mejoresPuntajes.value.sort((a, b) => b.puntos - a.puntos);
        if (mejoresPuntajes.value.length > 5) {
            mejoresPuntajes.value.pop();
        }
        guardarPuntajesEnLocalStorage(); // Guarda en localStorage cada vez que se actualiza
    }
};

watch(jugando, (nuevoValor) => {
    if (!nuevoValor) {
        detenerJuego();
    }
});

onMounted(() => {
    clearInterval(timerInterval);
    cargarPuntajesDesdeLocalStorage(); // Cargar puntajes al montar el componente
});

</script>

<template>
    <div class="app">
        <h1>¡Atrapa el cuadrado!</h1>
        <p>Puntuación: {{ puntos }}</p>
        <p>Tiempo restante: {{ tiempo }} segundos</p>

        <div v-if="!jugando">
            <h2>Selecciona una imagen para el cuadrado:</h2>
            <div class="imagenes-disponibles">
                <div v-for="(imagen, index) in imagenesDisponibles" :key="index" class="imagen-opcion"
                    @click="imagenSeleccionada = imagen.src"
                    :class="{ seleccionada: imagenSeleccionada === imagen.src }">
                    <img :src="imagen.src" :alt="imagen.nombre" />
                    <p>{{ imagen.nombre }}</p>
                </div>
            </div>
        </div>

        <div v-if="jugando" class="cuadrado"
            :style="{ position: 'absolute', top: posicion.top, left: posicion.left, backgroundImage: `url(${imagenSeleccionada})` }"
            @click="manejarClick"></div>

        <div v-if="!jugando">
            <button-custom class="boton-juego" title="Iniciar juego" @click="iniciarJuego" />
        </div>

        <h2 v-if="juegoTerminado">¡Juego terminado! Puntuación final: {{ puntos }}</h2>

        <!-- Panel de mejores puntajes -->
        <div v-if="!jugando" class="panel-puntajes"> <!-- Solo se muestra si no se está jugando -->
            <h3>Mejores Puntajes</h3>
            <ul>
                <li v-for="(puntaje, index) in mejoresPuntajes" :key="index">
                    {{ index + 1 }}. {{ puntaje.usuario }} - {{ puntaje.puntos }}
                </li>
                <button-custom title="Reiniciar puntajes" @click="reiniciarPuntajes" />
            </ul>
        </div>
    </div>
</template>


<style scoped>
.app {
    text-align: center;
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
}

.game-area {
position: relative;
width: 100%;
height: 70vh;
max-width: 800px;
margin: 0 auto;
}

.cuadrado {
width: 70px;
height: 70px;
background-size: cover;
cursor: pointer;
border-radius: 5px;
position: absolute;
}

.imagenes-disponibles {
display: flex;
justify-content: center;
gap: 20px;
margin-bottom: 20px;
}

.imagen-opcion {
cursor: pointer;
text-align: center;
border: 2px solid transparent;
padding: 10px;
border-radius: 10px;
}

.imagen-opcion img {
width: 70px;
height: 70px;
object-fit: cover;
border-radius: 5px;
}

.imagen-opcion.seleccionada {
border-color: #61dafb;
}

.boton-juego {
margin: 15px;
}

.panel-puntajes {
position: absolute;
right: 20px;
top: 20px;
background-color: #31363F;
padding: 15px;
border-radius: 10px;
color: white;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.panel-puntajes h3 {
margin: 0 0 10px;
}

.panel-puntajes ul {
list-style: none;
padding: 0;
}

.panel-puntajes li {
margin-bottom: 5px;
}
</style>
