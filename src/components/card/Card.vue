<script setup>
import router from '@/router';
import ButtonCustom from '../button/ButtonCustom.vue';
const props = defineProps(['title', 'description','url']);
</script>

<template>
    <div class="game-content">
        <h2 class="game-title">{{ props.title }}</h2>
        <p class="game-description">{{ props.description }}</p>
        <button-custom :title="'Jugar'" @click="router.push(props.url)" />
    </div>
</template>

<style scoped>

.game-content {
    padding: 1.5rem;
}

.game-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #EEEEEE;
}

.game-description {
    font-size: 1rem;
    color: #EEEEEE;
    margin-bottom: 1rem;
}
</style>