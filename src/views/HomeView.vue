<script setup>
import Card from '@/components/card/Card.vue';
import { ref } from 'vue';
const games = ref([
  { title: 'Atrapa el cuadrado', description: 'En este juego, debes hacer clic en un cuadrado que se mueve aleatoriamente por la pantalla durante 30 segundos. Cada clic exitoso suma puntos, y el objetivo es alcanzar la mayor puntuación posible antes de que se acabe el tiempo. Es un desafío emocionante para poner a prueba tus reflejos y coordinación.', url: 'cuadrado' },
  { title: 'Memoria', description: 'En este juego de memoria, debes encontrar parejas de cartas idénticas. Todas las cartas están boca abajo, y puedes voltear dos en cada turno. Si coinciden, permanecen boca arriba; si no, se ocultan nuevamente. El objetivo es encontrar todas las parejas en el menor tiempo posible, midiendo cuánto tardas en completar el juego. ¡Es un desafío divertido para ejercitar tu memoria y concentración!', url: 'memoria' },
  {
    title: 'Simon dice', description: 'En "Simón Dice", un líder da órdenes que los jugadores deben seguir solo si comienzan con "Simón dice".Si la instrucción no incluye esa frase y los jugadores la siguen, quedan eliminados.El objetivo es ser el último jugador en pie, poniendo a prueba la atención y la rapidez de reacción.', url: 'simondice' },
]);
</script>

<template>
  <main>
    <div class="container">
      <h1 class="title">Juegos Unimayor</h1>

      <div class="games-grid">
        <div v-for="game in games" class="game-card">
          <card :title="game.title" :description="game.description" :url="game.url" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #EEEEEE;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
}

.game-card {
  background-color: #31363F;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
