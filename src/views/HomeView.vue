<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Trophy, Users, Zap, Edit2, X } from 'lucide-vue-next';
import { SOCIAL_INTERACTIONS } from '../constants';
import { Motion } from '@motionone/vue';
import gsap from 'gsap';
import { useUserStore } from '../stores/UserStore';

const userStore = useUserStore();
const user = userStore.currentUser;

const dailyGoal = ref({
  title: 'Daily Goal',
  description: 'Complete 2 social activities today to earn bonus XP.',
  progress: 50
});
console.log('Current user:', user);

const isEditingGoal = ref(false);
const editForm = ref({ ...dailyGoal.value });

const openEditModal = () => {
  editForm.value = { ...dailyGoal.value };
  isEditingGoal.value = true;
};

const saveGoal = () => {
  dailyGoal.value = { ...editForm.value };
  isEditingGoal.value = false;
};

// Simple entrance animation for the header
onMounted(() => {
  gsap.from('.header-content', {
    opacity: 0,
    y: -20,
    duration: 0.8,
    ease: 'power3.out'
  });
});
</script>

<template>
  <div class="container h-[70vh] space-y-8 w-full mx-auto p-6 font-quicksand">
    
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-4 header-content">
      <div>
        <h1 class="text-6xl font-black text-oasis-lime tracking-tight">Good morning, {{ user?.member?.fname }}!</h1>
        <p class="text-oasis-navy/60 mt-2 font-medium">You're doing great today. Ready for some team vibes?</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-oasis-lime/20 rounded-2xl flex items-center justify-center">
            <Trophy class="w-6 h-6 text-oasis-moss" />
          </div>
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current XP</p>
            <p class="text-2xl font-black text-oasis-navy">2,450</p>
          </div>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
     

      <Motion 
        :initial="{ opacity: 0, scale: 0.95 }"
        :animate="{ opacity: 1, scale: 1 }"
        class="bg-oasis-lime rounded-[40px] p-8 text-white shadow-xl shadow-oasis-lime/20 relative overflow-hidden group"
      >
        <div class="relative z-10 h-full flex flex-col">
          <div class="flex justify-between items-start mb-6">
            <Zap class="w-10 h-10 text-white/50" />
            <button @click="openEditModal" class="p-2 bg-white/20 hover:bg-white/40 rounded-xl transition-all opacity-0 group-hover:opacity-100">
              <Edit2 class="w-4 h-4 text-white" />
            </button>
          </div>
          <h2 class="text-2xl font-black mb-2">{{ dailyGoal.title }}</h2>
          <p class="text-white/80 text-sm font-medium mb-8 leading-relaxed">{{ dailyGoal.description }}</p>
          
          <div class="mt-auto space-y-4">
            <div class="flex justify-between text-sm font-bold">
              <span>Progress</span>
              <span>{{ dailyGoal.progress }}%</span>
            </div>
            <div class="h-3 bg-white/30 rounded-full overflow-hidden">
              <Motion 
                :initial="{ width: 0 }"
                :animate="{ width: dailyGoal.progress + '%' }"
                class="h-full bg-white rounded-full shadow-sm"
              />
            </div>
            <button class="mt-6 w-full bg-oasis-navy text-white font-bold py-4 rounded-2xl hover:bg-oasis-moss transition-all transform hover:-translate-y-1">
              Start Activity
            </button>
          </div>
        </div>
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </Motion>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-[40px] p-8 flex flex-col sm:flex-row items-center gap-8 border border-oasis-lime/10">
        <div class="relative w-32 h-32 flex-shrink-0">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" class="text-white" />
            <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="10" fill="transparent" 
              stroke-dasharray="364" stroke-dashoffset="44" stroke-linecap="round" class="text-oasis-lime" />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-3xl font-black text-oasis-navy">8.8</span>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Health</span>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold text-oasis-navy">Your health score is up!</h3>
          <p class="text-sm text-oasis-navy/60 mt-1 font-medium">You've been 24% more active this week.</p>
          <button class="mt-4 text-xs font-bold text-white bg-oasis-navy px-5 py-2.5 rounded-xl hover:bg-oasis-sky transition-colors">
            View Insights
          </button>
        </div>
      </div>

      <div class="bg-white rounded-[40px] p-8 border border-gray-100 flex flex-col justify-center">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-10 h-10 bg-oasis-sky/10 rounded-xl flex items-center justify-center">
            <Zap class="w-5 h-5 text-oasis-sky" />
          </div>
          <h3 class="font-bold text-oasis-navy">Right to Disconnect</h3>
        </div>
        <p class="text-sm text-gray-500 leading-relaxed">Hard lock enabled after 17:00. We'll stop all notifications to help you recharge.</p>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isEditingGoal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-oasis-navy/20 backdrop-blur-md">
          <Motion
            :initial="{ scale: 0.9, opacity: 0 }"
            :animate="{ scale: 1, opacity: 1 }"
            class="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl relative border border-gray-50"
          >
            <button @click="isEditingGoal = false" class="absolute top-6 right-6 p-2 hover:bg-gray-50 rounded-full transition-colors">
              <X class="w-5 h-5 text-gray-300" />
            </button>
            <h2 class="text-2xl font-bold text-oasis-navy mb-6">Edit Daily Goal</h2>
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</label>
                <input v-model="editForm.title" type="text" class="w-full bg-gray-50 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-oasis-lime outline-none font-bold text-oasis-navy" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <textarea v-model="editForm.description" rows="3" class="w-full bg-gray-50 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-oasis-lime outline-none font-medium text-oasis-navy resize-none"></textarea>
              </div>
            </div>
            <div class="mt-8 flex gap-3">
              <button @click="saveGoal" class="w-full px-6 py-4 rounded-2xl font-black bg-oasis-navy text-white hover:bg-oasis-sky transition-all shadow-lg shadow-oasis-navy/10">
                Save Changes
              </button>
            </div>
          </Motion>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>