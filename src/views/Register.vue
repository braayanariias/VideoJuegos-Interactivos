<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'
import Boton from '@/components/button/ButtonCustom.vue'

const username = ref('')
const savedUsername = ref('')

const saveUsername = () => {
    if (username.value.trim()) {
        localStorage.setItem('username', username.value.trim())
        savedUsername.value = username.value.trim()
        router.push('/home')
    }
}

const clearUsername = () => {
    localStorage.removeItem('username')
    savedUsername.value = ''
}

onMounted(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
        savedUsername.value = storedUsername
    }
})
</script>

<template>
    <div class="container">
        <div class="form-box">
            <h1 v-if="!savedUsername">Registrar nombre de usuario</h1>
            <h1 v-else>¡Bienvenido, {{ savedUsername }}!</h1>

            <form v-if="!savedUsername" @submit.prevent="saveUsername">
                <div class="input-group">
                    <label for="username">Nombre de usuario</label>
                    <input type="text" id="username" v-model="username" required
                        placeholder="Ingresar nombre de usuario" />
                </div>
                <Boton title="Registrar" @click="saveUsername" />
            </form>

            <div v-else>
                <Boton title="Continuar" @click="() => router.push('/home')" />
                <Boton title="Cambiar nombre de usuario" @click="clearUsername" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.form-box {
    background-color: #31363F;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
    color: aliceblue;
}

.input-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: aliceblue;
}

input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 0.5rem;
}

.saved-username {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.875rem;
    color: #e94560;
}
</style>
