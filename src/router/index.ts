import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import AuthView from '../views/AuthView.vue'
import RoadmapView from '../views/RoadmapView.vue'
import TeamView from '../views/TeamView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/team',
    name: 'TeamView',
    component: TeamView,
    meta: { requiresAuth: true }
  },

    {
    path: '/roadmap',
    name: 'RoadMap',
    component: RoadmapView,
    meta: { requiresAuth: true }
  },


  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})



router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  const isAuthenticated = authStore.isAuthenticated;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Auth' });
  } 
  else if (to.name === 'Auth' && isAuthenticated) {
    next({ name: 'Home' });
  } 
  else {
    next();
  }
});

export default router