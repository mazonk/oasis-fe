<script setup lang="ts">
import { Trophy, Users, Zap } from 'lucide-vue-next';
import { SOCIAL_INTERACTIONS } from '../constants';
import { Motion } from '@motionone/vue';
</script>

<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-4xl font-bold text-gray-900 tracking-tight">Good morning, Katka!</h1>
        <p class="text-gray-500 mt-2">You're doing great today. Ready for some team vibes?</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-4">
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
      <Motion 
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        class="md:col-span-2 bg-white rounded-[40px] p-8 shadow-sm border border-gray-50"
      >
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Users class="w-5 h-5 text-indigo-500" />
            Top Social Interactions
          </h2>
          <button class="text-sm font-semibold text-indigo-600 hover:underline">View all</button>
        </div>
        
        <div class="space-y-6">
          <div v-for="person in SOCIAL_INTERACTIONS" :key="person.userId" class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="relative">
                <img :src="person.avatar" :alt="person.userName" class="w-12 h-12 rounded-2xl object-cover" />
                <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <p class="font-bold text-gray-900">{{ person.userName }}</p>
                <p class="text-xs text-gray-400">Team Member</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-indigo-600">{{ person.count }}</p>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Interactions</p>
            </div>
          </div>
        </div>
      </Motion>

      <!-- Daily Goal Card -->
      <Motion 
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.1 }"
        class="bg-indigo-600 rounded-[40px] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden"
      >
        <div class="relative z-10">
          <Zap class="w-10 h-10 mb-6 text-indigo-200" />
          <h2 class="text-2xl font-bold mb-2">Daily Goal</h2>
          <p class="text-indigo-100 text-sm mb-8">Complete 2 social activities today to earn bonus XP.</p>
          
          <div class="space-y-4">
            <div class="flex justify-between text-sm font-bold">
              <span>Progress</span>
              <span>50%</span>
            </div>
            <div class="h-3 bg-indigo-500/50 rounded-full overflow-hidden">
              <Motion 
                :initial="{ width: 0 }"
                :animate="{ width: '50%' }"
                class="h-full bg-white rounded-full"
              />
            </div>
          </div>
          
          <button class="mt-10 w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl hover:bg-indigo-50 transition-colors">
            Start Activity
          </button>
        </div>
        
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl" />
        <div class="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl" />
      </Motion>
    </div>

    <!-- Health Score Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-[#FDF8F3] rounded-[40px] p-8 flex items-center gap-8">
        <div class="relative w-32 h-32 flex items-center justify-center">
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
          <button class="mt-4 text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">View Insights</button>
        </div>
      </div>

      <div class="bg-white rounded-[40px] p-8 border border-gray-50 flex flex-col justify-center">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Zap class="w-5 h-5 text-purple-600" />
          </div>
          <h3 class="font-bold text-gray-900">Right to Disconnect</h3>
        </div>
        <p class="text-sm text-gray-500">Hard lock enabled after 17:00. We'll stop all notifications to help you recharge.</p>
      </div>
    </div>
  </div>
</template>
