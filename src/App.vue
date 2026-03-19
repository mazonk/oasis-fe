<script setup lang="ts">
import { ref } from 'vue';
import '@/assets/main.css';
import Navbar from '@/components/Navbar.vue';
import HomeView from './views/HomeView.vue';
import TeamView from './views/TeamView.vue';
import ActivitiesView from './views/ActivitiesView.vue';
import MoodPopup from './components/MoodPopup.vue';
import AuthView from './views/AuthView.vue';
import { Motion } from '@motionone/vue';

const activeTab = ref('home');
const isAuthenticated = ref(false);

const handleLogin = () => {
  isAuthenticated.value = true;
};

const handleLogout = () => {
  isAuthenticated.value = false;
  activeTab.value = 'home';
};
</script>
<template>
  <div class="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
    <template v-if="isAuthenticated">
      <Navbar v-model:activeTab="activeTab" @logout="handleLogout" />
      
      <main class="min-h-screen transition-all duration-300">
        <div class="p-6 md:p-12 lg:p-16">
          <Transition name="fade" mode="out-in">
            <div :key="activeTab">
              <HomeView v-if="activeTab === 'home'" />
              <TeamView v-else-if="activeTab === 'team'" />
              <ActivitiesView v-else-if="activeTab === 'activities'" />
              
              <div v-else-if="activeTab === 'roadmap'" class="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <div class="w-24 h-24 bg-indigo-100 rounded-[32px] flex items-center justify-center">
                  <span class="text-4xl">🗺️</span>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">XP Roadmap</h2>
                <p class="text-gray-500 max-w-md">Your journey to becoming a Wellness Master is being mapped out. Check back soon!</p>
              </div>
              
              <div v-else-if="activeTab === 'settings'" class="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <div class="w-24 h-24 bg-gray-100 rounded-[32px] flex items-center justify-center">
                  <span class="text-4xl">⚙️</span>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">Preferences</h2>
                <p class="text-gray-500 max-w-md">Customize your notifications, work hours, and profile settings here.</p>
              </div>
            </div>
          </Transition>
        </div>
      </main>

     <MoodPopup />
    </template>
    <template v-else>
      <AuthView @login="handleLogin" />
    </template>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
