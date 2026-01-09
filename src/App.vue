<script setup>
import { RouterView, useRoute } from 'vue-router'
import NavCustom from './components/nav/NavCustom.vue';

const route = useRoute();
</script>

<template>
  <!-- Muestra NavCustom solo si la ruta actual no es  "/" -->
  <NavCustom v-if="route.path !== '/'" />
  <RouterView />
</template>
