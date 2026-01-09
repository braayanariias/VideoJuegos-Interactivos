<script setup>
const props = defineProps(['title']);
const emit = defineEmits(['click']);
</script>

<template>
    <button class="game-button" @click="emit('click')">{{ props.title }}</button>
</template>

<style scoped>
.game-button {
    background-color: #3490dc;
    color: #EEEEEE;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.game-button:hover {
    background-color: #76ABAE;
}

.game-button:active {
    transform: scale(0.98);
}
</style>