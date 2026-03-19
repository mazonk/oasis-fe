<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Trophy, Users, Zap, Edit2, X } from 'lucide-vue-next';
import { SOCIAL_INTERACTIONS } from '../constants';
import { Motion } from '@motionone/vue';
import gsap from 'gsap';

const dailyGoal = ref({
  title: 'Daily Goal',
  description: 'Complete 2 social activities today to earn bonus XP.',
  progress: 50
});

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
</script>

<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-4 header-content">
      <div>
        <h1 class="text-4xl font-bold text-oasis-navy tracking-tight">Good morning, Katie!</h1>
        <p class="text-gray-500 mt-2">You're doing great today. Ready for some team vibes?</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
          <div class="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
            <Trophy class="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Current XP</p>
            <p class="text-2xl font-black text-gray-900">2,450</p>
          </div>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Social Interactions Card -->
      <div class="md:col-span-2 bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 social-card">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Users class="w-5 h-5 text-indigo-500" />
            Top Social Interactions
          </h2>
          <button class="text-sm font-semibold text-indigo-600 hover:underline">View all</button>
        </div>
        
        <div class="space-y-6">
          <div v-for="person in SOCIAL_INTERACTIONS" :key="person.userId" class="flex items-center justify-between social-item group cursor-pointer">
            <div class="flex items-center gap-4">
              <div class="relative">
                <img :src="person.avatar" :alt="person.userName" class="w-12 h-12 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300" />
                <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <p class="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{{ person.userName }}</p>
                <p class="text-xs text-gray-400">Team Member</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-indigo-600">{{ person.count }}</p>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Interactions</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Daily Goal Card -->
      <Motion 
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.1 }"
        class="bg-[#B6CF33] rounded-[40px] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group"
      >
        <div class="relative z-10">
          <div class="flex justify-between items-start mb-6">
            <Zap class="w-10 h-10 text-indigo-200" />
            <button 
              @click="openEditModal"
              class="p-2 bg-indigo-500/30 hover:bg-indigo-500/50 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
            >
              <Edit2 class="w-4 h-4 text-white" />
            </button>
          </div>
          <h2 class="text-2xl font-bold mb-2">{{ dailyGoal.title }}</h2>
          <p class="text-indigo-100 text-sm mb-8">{{ dailyGoal.description }}</p>
          
          <div class="space-y-4">
            <div class="flex justify-between text-sm font-bold">
              <span>Progress</span>
              <span>{{ dailyGoal.progress }}%</span>
            </div>
            <div class="h-3 bg-indigo-500/50 rounded-full overflow-hidden">
              <Motion 
                :initial="{ width: 0 }"
                :animate="{ width: dailyGoal.progress + '%' }"
                class="h-full bg-white rounded-full"
              />
            </div>
            
            <button class="mt-10 w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1">
              Start Activity
            </button>
          </div>
          
          <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl" />
          <div class="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl" />
        </div>
      </Motion>
      </div>
    </div>

    <!-- Edit Goal Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isEditingGoal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <Motion
            :initial="{ scale: 0.9, opacity: 0, y: 20 }"
            :animate="{ scale: 1, opacity: 1, y: 0 }"
            class="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              @click="isEditingGoal = false"
              class="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X class="w-5 h-5 text-gray-400" />
            </button>

            <h2 class="text-2xl font-bold text-gray-900 mb-6">Edit Daily Goal</h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                <input 
                  v-model="editForm.title"
                  type="text"
                  class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  v-model="editForm.description"
                  rows="3"
                  class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Progress ({{ editForm.progress }}%)</label>
                <input 
                  v-model.number="editForm.progress"
                  type="range"
                  min="0"
                  max="100"
                  class="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            <div class="mt-8 flex gap-3">
              <button 
                @click="isEditingGoal = false"
                class="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                @click="saveGoal"
                class="flex-1 px-6 py-4 rounded-2xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
              >
                Save Changes
              </button>
            </div>
          </Motion>
        </div>
      </Transition>
    </Teleport>

    <!-- Health Score Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-[#FDF8F3] rounded-[40px] p-8 flex items-center gap-8 health-score-card">
        <div class="relative w-32 h-32 flex items-center justify-center health-circle">
           <svg class="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" class="text-gray-100" />
              <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" stroke-dasharray="364" stroke-dashoffset="44" class="text-emerald-500" />
           </svg>
           <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-3xl font-black text-gray-900">8.8</span>
              <span class="text-[10px] font-bold text-gray-400 uppercase">Health</span>
           </div>
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-900">Your health score is up!</h3>
          <p class="text-sm text-gray-500 mt-1">You've been 24% more active this week compared to last.</p>
          <button class="mt-4 text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors">View Insights</button>
        </div>
      </div>

      <div class="bg-white rounded-[40px] p-8 border border-gray-50 flex flex-col justify-center disconnect-card">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Zap class="w-5 h-5 text-purple-600" />
          </div>
          <h3 class="font-bold text-gray-900">Right to Disconnect</h3>
        </div>
        <p class="text-sm text-gray-500">Hard lock enabled after 17:00. We'll stop all notifications to help you recharge.</p>
      </div>
    </div>  
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
