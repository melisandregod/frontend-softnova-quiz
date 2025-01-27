import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView  from '@/views/CartView.vue'
import SearchView from '@/views/SearchView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },{
      path: '/',
      name: 'cart',
      component: CartView,
    },{
      path: '/',
      name: 'search',
      component: SearchView,
    }
  ],
})

export default router
