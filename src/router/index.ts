import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '../router/authGuard';
import { useAuthStore } from '../stores/AuthStore';

const router = createRouter ({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/team',
    name: 'TeamView',
    component: () => import('../views/TeamView.vue'),
    beforeEnter: authGuard,
  },

    {
    path: '/roadmap',
    name: 'RoadMap',
    component: () => import('../views/RoadmapView.vue'),
    beforeEnter: authGuard,
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/login',
    name: 'auth',
    component: () => import('@/views/AuthView.vue'),
    beforeEnter: async (_to, _from, next) => {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        next({ name: 'Home' })  // ✅ capital H — matches the route definition
      } else {
        next()
      }
    }
  },]
})

export default router