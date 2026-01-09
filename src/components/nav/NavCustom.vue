<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const username = ref('')

// Obtener el nombre de usuario guardado al cargar el componente
onMounted(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
        username.value = storedUsername
    }
})
</script>

<template>
    <nav class="navbar">
        <div class="navbar-left">
            <h1>
                <RouterLink to="/home">{{ username || 'Invitado' }}</RouterLink>
            </h1>
        </div>
        <div class="navbar-right">
            <ul>
                <li>
                    <RouterLink to="/home">Inicio</RouterLink>
                </li>
                <li>
                    <RouterLink to="/">Nombre usuario</RouterLink>
                </li>
                <li>
                    <RouterLink to="/cuadrado">Cuadrado</RouterLink>
                </li>
                <li>
                    <RouterLink to="/memoria">Memoria</RouterLink>
                </li>
                <li>
                    <RouterLink to="/simondice">Simon dice</RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #222831;
    padding: 10px 20px;
    color: white;
    box-shadow: 0 0.1px 8px rgba(0, 0, 0, 0.5);
}

.navbar-left h1 {
    margin: 0;
    font-size: 1.5rem;
}

.navbar-right ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
}

.navbar-right li {
    margin-left: 20px;
}

a {
    text-decoration: none;
    color: white;
    font-size: 1.2rem;
    transition: color 0.3s;
}

.navbar-right a:hover {
    color: #3490dc;
}
</style>
