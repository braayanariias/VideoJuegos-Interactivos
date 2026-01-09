<script setup>
import { ref, onMounted, watch } from 'vue';
import Carta from '@/components/gamemoria/CardGameMemoria.vue';
import Boton from '@/components/button/ButtonCustom.vue';

const simbolos = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'];
const cartas = ref([]);
const seleccionadas = ref([]);
const parejaEncontrada = ref([]);
const tiempoInicio = ref(0);
const tiempoTranscurrido = ref(0);
const mejoresResultados = ref([]);
const intervalId = ref(null);

// Obtener el nombre de usuario desde localStorage
const username = ref(localStorage.getItem('username') || 'Usuario');

const reiniciar = () => {
  seleccionadas.value = [];
  parejaEncontrada.value = [];
  cartas.value = [...simbolos, ...simbolos]
    .sort(() => Math.random() - 0.5)
    .map((simbolo, index) => ({ id: index, simbolo }));

  tiempoInicio.value = Date.now();
  tiempoTranscurrido.value = 0;

  if (intervalId.value) {
    clearInterval(intervalId.value);
  }

  intervalId.value = setInterval(() => {
    tiempoTranscurrido.value = (Date.now() - tiempoInicio.value) / 1000;
  }, 100);
};

const guardarMejoresResultados = (tiempo) => {
  const resultadosPrevios = JSON.parse(localStorage.getItem('mejoresResultados')) || [];
  resultadosPrevios.push({ username: username.value, tiempo });
  const mejores = resultadosPrevios
    .sort((a, b) => a.tiempo - b.tiempo)
    .slice(0, 5);
  localStorage.setItem('mejoresResultados', JSON.stringify(mejores));
  mejoresResultados.value = mejores;
};

const eliminarMejoresResultados = () => {
  localStorage.removeItem('mejoresResultados');
  mejoresResultados.value = [];
};

const manejarClick = (index) => {
  if (seleccionadas.value.length < 2 && !seleccionadas.value.includes(index) && !parejaEncontrada.value.includes(index)) {
    seleccionadas.value.push(index);
  }
};

watch(seleccionadas, (nuevasSeleccionadas) => {
  if (nuevasSeleccionadas.length === 2) {
    const [primeraCarta, segundaCarta] = nuevasSeleccionadas;
    if (cartas.value[primeraCarta].simbolo === cartas.value[segundaCarta].simbolo) {
      parejaEncontrada.value.push(primeraCarta, segundaCarta);
      seleccionadas.value = [];

      if (parejaEncontrada.value.length === cartas.value.length) {
        clearInterval(intervalId.value);
        const tiempoFinal = tiempoTranscurrido.value;
        guardarMejoresResultados(tiempoFinal);
      }
    } else {
      setTimeout(() => {
        seleccionadas.value = [];
      }, 1000);
    }
  }
}, { deep: true });

onMounted(() => {
  reiniciar();
  mejoresResultados.value = JSON.parse(localStorage.getItem('mejoresResultados')) || [];
});
</script>

<template>
  <div class="game-container">
    <div class="game-content">
      <div class="game-board">
        <div class="tablero">
          <Carta v-for="(carta, index) in cartas" :key="carta.id" :carta="carta.simbolo"
            :volteada="seleccionadas.includes(index) || parejaEncontrada.includes(index)"
            @click="manejarClick(index)" />
        </div>
        <div class="tiempo-transcurrido">
          Tiempo: {{ tiempoTranscurrido.toFixed(1) }} segundos
        </div>
      </div>
      <div class="side-panel">
        <div class="mejores-resultados">
          <h3>Mejores Resultados</h3>
          <ul v-if="mejoresResultados.length > 0">
            <li v-for="(resultado, index) in mejoresResultados" :key="index">
              {{ index + 1 }}. {{ resultado.username }}: {{ resultado.tiempo.toFixed(1) }} segundos
            </li>
          </ul>
          <p v-else>No hay resultados guardados</p>
        </div>
        <div class="button-container">
          <Boton :title="'Reiniciar'" @click="reiniciar" class="custom-button" />
          <Boton :title="'Eliminar Resultados'" @click="eliminarMejoresResultados" class="custom-button" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.game-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 900px;
  width: 100%;
  background-color: #31363F;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.game-board {
  flex: 1;
  margin-right: 30px;
}

.tablero {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
}

.tiempo-transcurrido {
  font-size: 1.2em;
  color: #e94560;
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #222831;
  border-radius: 8px;
}

.side-panel {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
}

.mejores-resultados {
  background-color: #222831;
  padding: 20px;
  border-radius: 10px;
  color: #e94560;
  margin-bottom: 20px;
}

.mejores-resultados h3 {
  font-size: 1.2em;
  margin-bottom: 15px;
  text-align: center;
  color: #e94560;
}

.mejores-resultados ul {
  list-style-type: none;
  padding: 0;
}

.mejores-resultados li {
  margin-bottom: 10px;
  font-size: 0.9em;
  color: #ffffff;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.custom-button {
  width: 100%;
  padding: 10px 15px;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

@media (max-width: 768px) {
  .game-content {
    flex-direction: column;
    align-items: center;
  }

  .game-board {
    margin-right: 0;
    margin-bottom: 30px;
  }

  .tablero {
    grid-template-columns: repeat(4, 1fr);
  }

  .side-panel {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .tablero {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>