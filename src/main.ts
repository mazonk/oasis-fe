import { createApp } from 'vue';
import { createPinia } from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from './router';
import './assets/main.css'
import './index.css';
import { useAuthStore } from './stores/AuthStore';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

const authStore = useAuthStore();
await authStore.initAuth();
app.mount('#root');
