<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { 
  Coffee, 
  Trees, 
  Gamepad2, 
  Palette, 
  Plus, 
  Calendar,
  Zap,
  Star
} from 'lucide-vue-next';
import { ACTIVITIES } from '../constants';
import { cn } from '../utils/utils';
import { Motion } from '@motionone/vue';

const iconMap: Record<string, any> = {
  Coffee,
  Trees,
  Gamepad2,
  Palette,
};

const categoryColors: Record<string, string> = {
  'Social': 'bg-blue-100 text-blue-600',
  'Nature': 'bg-green-100 text-green-600',
  'Distraction': 'bg-orange-100 text-orange-600',
  'Express Yourself': 'bg-purple-100 text-purple-600',
};

onMounted(() => {
  // Header animation
  gsap.from('.activities-header', {
    y: -20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Activity cards staggered entrance
  gsap.from('.activity-card', {
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)',
    delay: 0.2
  });

  // Info section entrance
  gsap.from('.info-section', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    delay: 0.6
  });
});
</script>

<template>
  <div class="space-y-8 max-w-7xl mx-auto">
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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <Motion 
        v-for="activity in ACTIVITIES"
        :key="activity.id"
        :while-hover="{ y: -5 }"
        class="activity-card bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 flex flex-col"
      >
        <div class="flex items-start justify-between mb-6">
          <div :class="cn('p-4 rounded-3xl', categoryColors[activity.category])">
            <component :is="iconMap[activity.icon]" class="w-8 h-8" />
          </div>
          <div class="flex flex-col items-end">
            <div class="flex items-center gap-1 text-amber-500 font-black text-lg">
              <Zap class="w-5 h-5 fill-current" />
              {{ activity.xpReward }} XP
            </div>
            <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Attendance Reward
            </div>
          </div>
        </div>

        <div class="flex-1">
          <span :class="cn('text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3 inline-block', categoryColors[activity.category])">
            {{ activity.category }}
          </span>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ activity.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{{ activity.description }}</p>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
          <div class="flex items-center gap-2 text-indigo-600">
            <Star class="w-4 h-4 fill-current" />
            <span class="text-xs font-bold">+{{ activity.organizerXpBonus }} XP for organizing</span>
          </div>
          <button class="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors">
            <Calendar class="w-4 h-4" />
            Schedule
          </button>
        </div>
      </Motion>
    </div>

    <section class="info-section bg-indigo-50 rounded-[40px] p-10 border border-indigo-100">
      <div class="flex flex-col md:flex-row items-center gap-10">
        <div class="flex-1">
          <h2 class="text-3xl font-bold text-indigo-900 mb-4">Why organize?</h2>
          <p class="text-indigo-800/70 leading-relaxed mb-6">
            Taking initiative is rewarded! You get extra XP for organizing activities for your team. It helps everyone stay connected and improves the collective health score.
          </p>
          <div class="flex gap-4">
            <div class="bg-white px-4 py-2 rounded-xl text-indigo-600 font-bold text-sm shadow-sm">
              +20% Initiative Bonus
            </div>
            <div class="bg-white px-4 py-2 rounded-xl text-indigo-600 font-bold text-sm shadow-sm">
              Team Multiplier
            </div>
          </div>
        </div>
        <div class="w-full md:w-64 h-64 bg-indigo-200 rounded-[40px] flex items-center justify-center relative overflow-hidden">
           <div class="w-32 h-32 bg-indigo-400 rounded-full animate-bounce" />
           <div class="absolute top-10 left-10 w-10 h-10 bg-indigo-300 rounded-full" />
           <div class="absolute bottom-10 right-10 w-16 h-16 bg-indigo-300 rounded-full" />
        </div>
      </div>
    </section>
  </div>
</template>
