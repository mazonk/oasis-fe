<script setup lang="ts">
import { onMounted, ref, nextTick, watch, computed } from 'vue';
import { gsap } from 'gsap';
import { 
  Coffee, Trees, Gamepad2, Palette, Plus, 
  Calendar, Zap, Star, Loader2, Heart, Users, HelpCircle
} from 'lucide-vue-next';
import { useActivityStore } from '../stores/activityStore';
import { cn } from '../utils/utils';
import { Motion } from '@motionone/vue';

const activityStore = useActivityStore();
const isLoading = ref(activityStore.activities.length === 0); // Start as loading if no activities
const activities = computed(()=> activityStore.activities)

// 2. Mappings
const iconMap: Record<string, any> = {
  'Coffee': Coffee,
  'Nature': Trees,
  'Gamepad2': Gamepad2,
  'Palette': Palette,
  'Wellness': Heart,
  'Social': Users,
  'Food & Drink': Coffee,
};

const categoryColors: Record<string, string> = {
  'Social': 'bg-blue-100 text-blue-600',
  'Nature': 'bg-green-100 text-green-600',
  'Wellness': 'bg-rose-100 text-rose-600',
  'Distraction': 'bg-orange-100 text-orange-600',
  'Games': 'bg-pink-100 text-pink-600',
  'Express Yourself': 'bg-purple-100 text-purple-600',
  'Food & Drink': 'bg-indigo-100 text-indigo-600',
  'Default': 'bg-gray-100 text-gray-500',
};

// Helper to get color safely
const getCategoryStyle = (categoryName?: string) => {
  return categoryColors[categoryName || ''] || categoryColors['Default'];
};

watch(isLoading, async (newVal) => {
  if (newVal === false) {
    // Wait for Vue to remove the Loader and render the Cards
    await nextTick();
    // A tiny delay ensures the browser has painted the elements
    setTimeout(() => {
      // runAnimations();
    }, 50); 
  }
});

onMounted(async () => {
  try {
    await activityStore.fetchActivities();
  } finally {
    isLoading.value = false;
  }
});

// const runAnimations = () => {
//   const cards = document.querySelectorAll('.activity-card');
  
//   if (cards.length > 0) {
//     const tl = gsap.timeline();
//     tl.from('.activities-header', { 
//       y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' 
//     })
//     .from(cards, { // Pass the direct elements instead of a string selector
//       scale: 0.9, 
//       opacity: 0, 
//       duration: 0.6, 
//       stagger: 0.1, 
//       ease: 'back.out(1.7)' 
//     }, "-=0.4")
//     .from('.info-section', { 
//       y: 30, opacity: 0, duration: 1, ease: 'power2.out' 
//     }, "-=0.2");
//   }
// };
</script>

<template>
  <div class="space-y-8 max-w-7xl mx-auto p-6">
    <header class="activities-header flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-bold text-gray-900 tracking-tight">Activities</h1>
        <p class="text-gray-500 mt-2">Join or organize activities to boost team spirit and earn XP.</p>
      </div>
      <button class="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-100">
        <Plus class="w-5 h-5" />
        Propose New
      </button>
    </header>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <Loader2 class="w-12 h-12 text-indigo-500 animate-spin mb-4" />
      <p class="text-gray-400 font-medium tracking-wide">Gathering the team...</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <Motion 
        v-for="activity in activities"
        :key="activity.activityId"
        :while-hover="{ y: -8 }"
        class="activity-card bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 flex flex-col"
      >
        <div class="flex items-start justify-between mb-6">
          <div :class="cn('p-4 rounded-3xl transition-colors', getCategoryStyle(activity.category?.name))">
            <component :is="iconMap[activity.icon] || HelpCircle" class="w-8 h-8" />
          </div>
          <div class="flex flex-col items-end">
            <div class="flex items-center gap-1 text-amber-500 font-black text-lg">
              <Zap class="w-5 h-5 fill-current" />
              {{ activity.experience }} XP
            </div>
            <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Reward</div>
          </div>
        </div>

        <div class="flex-1">
          <span :class="cn('text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3 inline-block', getCategoryStyle(activity.category?.name))">
            {{ activity.category?.name || 'General' }}
          </span>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ activity.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {{ activity.description || 'No description provided.' }}
          </p>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
          <div class="flex items-center gap-2 text-indigo-600">
            <Star class="w-4 h-4 fill-current" />
            <span class="text-xs font-bold">+{{ Math.round(activity.experience * 0.2) }} XP for organizing</span>
          </div>
          <button class="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors group">
            <Calendar class="w-4 h-4 transition-transform group-hover:rotate-12" />
            Schedule
          </button>
        </div>
      </Motion>
      
    </div>

    <div v-if="!isLoading && activityStore.activities.length === 0" class="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
      <p class="text-gray-500 font-medium">No activities found. Be the first to propose one!</p>
    </div>

    <section class="info-section bg-indigo-50 rounded-[40px] p-10 border border-indigo-100">
      <div class="flex flex-col md:flex-row items-center gap-10">
        <div class="flex-1">
          <h2 class="text-3xl font-bold text-indigo-900 mb-4">Why organize?</h2>
          <p class="text-indigo-800/70 leading-relaxed mb-6">
            Taking initiative is rewarded! You get extra XP for organizing activities for your team. It helps everyone stay connected.
          </p>
        </div>
        <div class="w-full md:w-64 h-64 bg-indigo-200 rounded-[40px] flex items-center justify-center relative overflow-hidden shadow-inner">
           <div class="w-32 h-32 bg-indigo-400 rounded-full animate-bounce shadow-xl" />
        </div>
      </div>
    </section>
  </div>
</template>