<script setup>
import { ref, computed, onMounted } from 'vue'
import ButtonCustom from '../button/ButtonCustom.vue';

const round = ref(0)
const userPosition = ref(0)
const totalRounds = 10
const sequence = ref([])
const speed = ref(1000)
const blockedButtons = ref(true)
const isPlaying = ref(false)
const isWinner = ref(false)
const errorMessage = ref('')
const tiempoInicio = ref(0)
const tiempoTranscurrido = ref(0)
const mejoresResultados = ref([])
const intervalId = ref(null)

const username = ref(localStorage.getItem('username') || 'Usuario')

const colors = ref([
    { name: 'red', isActive: false },
    { name: 'yellow', isActive: false },
    { name: 'blue', isActive: false },
    { name: 'green', isActive: false }
])

let errorSound
let buttonSounds = []

onMounted(() => {
    errorSound = new Audio('../sounds/error.mp3')
    buttonSounds = [
        new Audio('./sounds/1.mp3'),
        new Audio('./sounds/2.mp3'),
        new Audio('./sounds/3.mp3'),
        new Audio('./sounds/4.mp3'),
    ]
    mejoresResultados.value = JSON.parse(localStorage.getItem('mejoresResultadosSimon')) || []
})

const displayRound = computed(() => {
    return round.value === '🏆' ? '🏆' : `Round ${round.value}`
})

const createSequence = () => {
    return Array.from({ length: totalRounds }, () => Math.floor(Math.random() * 4))
}

const flashButton = async (index) => {
    colors.value[index].isActive = true
    await new Promise(resolve => setTimeout(resolve, 300))
    colors.value[index].isActive = false
}

const showSequence = async () => {
    blockedButtons.value = true

    for (let i = 0; i <= round.value; i++) {
        await new Promise(resolve => setTimeout(resolve, speed.value))
        const currentIndex = sequence.value[i]
        buttonSounds[currentIndex].play().catch(e => console.error('Error playing sound:', e))
        await flashButton(currentIndex)
    }

    blockedButtons.value = false
}

const startGame = async () => {
    isPlaying.value = true
    isWinner.value = false
    errorMessage.value = ''
    colors.value.forEach(color => color.isActive = false)
    round.value = 0
    userPosition.value = 0
    sequence.value = createSequence()
    tiempoInicio.value = Date.now()

    if (intervalId.value) {
        clearInterval(intervalId.value)
    }

    intervalId.value = setInterval(() => {
        tiempoTranscurrido.value = (Date.now() - tiempoInicio.value) / 1000
    }, 100)

    await showSequence()
}

const reiniciarJuego = async () => {
    if (intervalId.value) {
        clearInterval(intervalId.value)
    }
    tiempoTranscurrido.value = 0
    await startGame()
}

const buttonClick = async (value) => {
    if (!blockedButtons.value) {
        await validateChosenColor(value)
    }
}

const validateChosenColor = async (value) => {
    if (sequence.value[userPosition.value] === value) {
        buttonSounds[value].play().catch(e => console.error('Error playing sound:', e))
        await flashButton(value)

        if (userPosition.value === round.value) {
            round.value++
            userPosition.value = 0
            speed.value = Math.max(speed.value / 1.02, 300)

            if (round.value === totalRounds) {
                gameWon()
            } else {
                await showSequence()
            }
        } else {
            userPosition.value++
        }
    } else {
        gameLost()
    }
}

const guardarMejoresResultados = (ronda, tiempo) => {
    const resultadosPrevios = JSON.parse(localStorage.getItem('mejoresResultadosSimon')) || []
    resultadosPrevios.push({
        username: username.value,
        ronda: ronda,
        tiempo: tiempo
    })

    const mejores = resultadosPrevios
        .sort((a, b) => {
            if (b.ronda !== a.ronda) {
                return b.ronda - a.ronda
            }
            return a.tiempo - b.tiempo
        })
        .slice(0, 5)

    localStorage.setItem('mejoresResultadosSimon', JSON.stringify(mejores))
    mejoresResultados.value = mejores
}

const eliminarMejoresResultados = () => {
    localStorage.removeItem('mejoresResultadosSimon')
    mejoresResultados.value = []
}

const gameLost = () => {
    errorSound.play().catch(e => console.error('Error playing sound:', e))
    isPlaying.value = false
    blockedButtons.value = true
    colors.value.forEach(color => color.isActive = false)
    errorMessage.value = '¡Has perdido! Inténtalo de nuevo.'

    if (round.value > 0) {
        guardarMejoresResultados(round.value, tiempoTranscurrido.value)
    }

    if (intervalId.value) {
        clearInterval(intervalId.value)
    }
}

const gameWon = () => {
    isPlaying.value = false
    blockedButtons.value = true
    isWinner.value = true
    round.value = '🏆'

    guardarMejoresResultados(totalRounds, tiempoTranscurrido.value)

    if (intervalId.value) {
        clearInterval(intervalId.value)
    }
}
</script>
<template>
    <div class="simon">
        <div class="title">Simon dice</div>
        <div class="controls">
            <ButtonCustom title="Iniciar" @click="startGame" :disabled="isPlaying" />
            <ButtonCustom title="Reiniciar" @click="reiniciarJuego" :disabled="!isPlaying" />
        </div>
        <div class="game-container">
            <div class="game-section">
                <div class="buttonContainer">
                    <div v-for="(color, index) in colors" :key="index"
                        :class="['square', color.name, { active: color.isActive, winner: isWinner }]"
                        @click="buttonClick(index)"></div>
                </div>
                <div class="round">{{ displayRound }}</div>
                <div class="tiempo">Tiempo: {{ tiempoTranscurrido.toFixed(1) }} segundos</div>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </div>

            <div class="ranking-section">
                <div class="mejores-resultados">
                    <h3>Mejores Resultados</h3>
                    <ul v-if="mejoresResultados.length > 0">
                        <li v-for="(resultado, index) in mejoresResultados" :key="index">
                            {{ index + 1 }}. {{ resultado.username }} -
                            Ronda: {{ resultado.ronda }},
                            Tiempo: {{ resultado.tiempo.toFixed(1) }}s
                        </li>
                    </ul>
                    <p v-else>No hay resultados guardados</p>
                    <ButtonCustom title="Eliminar Resultados" @click="eliminarMejoresResultados" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* Contenedor principal */
.simon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    min-height: 100vh;
    color: aliceblue;
}

/* Sección del título y los controles */
.controls-container {
    width: 100%;
    max-width: 350px;
    background-color: #31363F;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    text-align: center;
}

.title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: aliceblue;
}

.controls {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

button[title="Iniciar"],
button[title="Reiniciar"] {
    background-color: #e94560;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;
}

button[title="Iniciar"]:hover,
button[title="Reiniciar"]:hover {
    background-color: #ff5c77;
}

/* Contenedor del juego */
.game-container {
    display: flex;
    gap: 30px;
    max-width: 1200px;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
}

.game-section {
    width: 100%;
    max-width: 350px;
    background-color: #31363F;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.buttonContainer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 20px;
}

/* Estilos de los cuadrados */
.square {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border: 5px solid #333;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.square:hover {
    filter: brightness(1.2);
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.square:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Colores de los cuadrados */
.red {
    background-color: #ff0000;
}

.yellow {
    background-color: #ffff00;
}

.blue {
    background-color: #0000ff;
}

.green {
    background-color: #00ff00;
}

.active {
    filter: brightness(1.5);
}

/* Efectos de iluminación */
.square.red.active {
    background-color: #ff6666 !important;
    box-shadow: 0 0 20px #ff0000;
}

.square.yellow.active {
    background-color: #ffff66 !important;
    box-shadow: 0 0 20px #ffff00;
}

.square.blue.active {
    background-color: #6666ff !important;
    box-shadow: 0 0 20px #0000ff;
}

.square.green.active {
    background-color: #66ff66 !important;
    box-shadow: 0 0 20px #00ff00;
}

.winner {
    animation: pulse 1s infinite;
}

.round {
    font-size: 1.5rem;
    margin-top: 20px;
    color: aliceblue;
}

.tiempo {
    font-size: 1.2em;
    color: aliceblue;
    margin-top: 10px;
}

.error-message {
    color: #ff4444;
    font-size: 1.2rem;
    margin-top: 10px;
    font-weight: bold;
}

/* Panel de ranking */
.ranking-section {
    width: 100%;
    max-width: 350px;
    background-color: #31363F;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 20px;
}

.mejores-resultados {
    color: #e94560;
    width: 100%;
}

.mejores-resultados h3 {
    font-size: 1.4em;
    margin-bottom: 15px;
    color: #e94560;
    border-bottom: 2px solid #e94560;
    padding-bottom: 5px;
}

.mejores-resultados ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 15px;
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
}

.mejores-resultados li {
    background-color: #374151;
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 6px;
    color: #ffffff;
    font-size: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mejores-resultados li span {
    font-weight: bold;
    color: #f3f4f6;
}

.mejores-resultados p {
    font-size: 1em;
    color: #94a3b8;
    margin-bottom: 10px;
}

button[title="Eliminar Resultados"] {
    background-color: #e94560;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.3s;
}

button[title="Eliminar Resultados"]:hover {
    background-color: #ff5c77;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

/* Responsive */
@media (max-width: 1024px) {
    .square {
        width: 90px;
        height: 90px;
    }
}

@media (max-width: 768px) {
    .game-container {
        flex-direction: column;
        align-items: center;
    }

    .ranking-section,
    .game-section,
    .controls-container {
        width: 100%;
    }

    .square {
        width: 80px;
        height: 80px;
    }
}

@media (max-width: 480px) {
    .square {
        width: 60px;
        height: 60px;
    }

    .title {
        font-size: 2rem;
    }
}
</style>
