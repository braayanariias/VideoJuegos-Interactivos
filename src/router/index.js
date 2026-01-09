import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cuadrado from '../views/Cuadrado.vue'
import Memoria from '../views/Memoria.vue'
import SimonDice from '@/views/SimonDice.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cuadrado',
      name: 'cuadrado',
      component: Cuadrado
    },
    {
      path: '/memoria',
      name: 'memoria',
      component: Memoria
    },
    {
      path: '/simondice',
      name: 'simondice',
      component: SimonDice
    }
  ]
})

export default router
