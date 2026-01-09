<script setup>
const props = defineProps(['carta', 'volteada']);
const emit = defineEmits(['click']);
</script>

<template>
    <div :class="['carta', { 'volteada': volteada }]" @click="$emit('click')">
        <div class="contenido">
            {{ volteada ? carta : "❓" }}
        </div>
    </div>
</template>

<style>
.carta {
    width: 100px;
    height: 100px;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    cursor: pointer;
    margin: 10px;
    border-radius: 10px;
    transition: transform 0.3s;
}

.carta.volteada {
    background-color: white;
    transform: rotateY(180deg);
}

.contenido {
    transform: rotateY(180deg);
}
</style>