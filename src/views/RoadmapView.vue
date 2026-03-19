<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-vue-next';
import MoodBean from '../components/MoodBean.vue';
import gsap from 'gsap';

// Join date: March 2025
const joinDate = new Date(2025, 2, 1);
const currentDate = ref(new Date());
const viewDate = ref(new Date());

// Mock mood data
const moodData = ref<Record<string, 'awful' | 'bad' | 'neutral' | 'good' | 'great'>>({
  '2026-03-01': 'good',
  '2026-03-02': 'bad',
  '2026-03-03': 'neutral',
  '2026-03-04': 'neutral',
  '2026-03-05': 'good',
  '2026-03-06': 'great',
  '2026-03-07': 'great',
  '2026-03-08': 'awful',
  '2026-03-09': 'bad',
  '2026-03-10': 'great',
  '2026-03-11': 'neutral',
  '2026-03-12': 'good',
  '2026-03-13': 'good',
  '2026-03-14': 'good',
  '2026-03-15': 'neutral',
  '2026-03-16': 'bad',
  '2026-03-17': 'good',
  '2026-03-18': 'great',
  '2026-03-19': 'good',
});

const monthName = computed(() => {
  return viewDate.value.toLocaleString('default', { month: 'long', year: 'numeric' });
});

const daysInMonth = computed(() => {
  const year = viewDate.value.getFullYear();
  const month = viewDate.value.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  
  const calendarDays = [];
  
  // Padding for the first week
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ day: null, date: null });
  }
  
  for (let i = 1; i <= days; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    calendarDays.push({ 
      day: i, 
      date: dateStr,
      mood: moodData.value[dateStr] || 'none'
    });
  }
  
  return calendarDays;
});

const canGoPrev = computed(() => {
  const prevMonth = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() - 1, 1);
  return prevMonth >= joinDate;
});

const canGoNext = computed(() => {
  const nextMonth = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + 1, 1);
  return nextMonth <= currentDate.value;
});

const prevMonth = () => {
  if (!canGoPrev.value) return;
  
  gsap.to('.calendar-grid', {
    x: 50,
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() - 1, 1);
      gsap.fromTo('.calendar-grid', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
    }
  });
};

const nextMonth = () => {
  if (!canGoNext.value) return;
  
  gsap.to('.calendar-grid', {
    x: -50,
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + 1, 1);
      gsap.fromTo('.calendar-grid', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
    }
  });
};

const selectDayMood = (date: string) => {
  const moods: ('awful' | 'bad' | 'neutral' | 'good' | 'great')[] = ['awful', 'bad', 'neutral', 'good', 'great'];
  const currentMood = moodData.value[date];
  const nextIndex = (moods.indexOf(currentMood as any) + 1) % moods.length;
  moodData.value[date] = moods[nextIndex];
  
  // Subtle bounce animation on click
  gsap.fromTo(`.mood-bean-${date.replace(/-/g, '')}`, 
    { scale: 0.8 }, 
    { scale: 1, duration: 0.5, ease: 'back.out(2)' }
  );
};

onMounted(() => {
  gsap.from('.roadmap-header', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' });
  gsap.from('.calendar-card', { y: 40, opacity: 0, duration: 1, delay: 0.2, ease: 'power2.out' });
});
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <header class="roadmap-header flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-bold text-gray-900 tracking-tight">Mood Roadmap</h1>
        <p class="text-gray-500 mt-2">Track your emotional journey and see how your team vibes affect you.</p>
      </div>
      <div class="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-2xl text-indigo-600 font-bold text-sm">
        <CalendarIcon class="w-4 h-4" />
        Joined March 2025
      </div>
    </header>

    <div class="calendar-card bg-white rounded-[40px] p-8 shadow-sm border border-gray-50">
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-2xl font-bold text-gray-900">{{ monthName }}</h2>
        <div class="flex items-center gap-4">
          <button 
            @click="prevMonth" 
            :disabled="!canGoPrev"
            class="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft class="w-6 h-6" />
          </button>
          <button 
            @click="nextMonth" 
            :disabled="!canGoNext"
            class="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight class="w-6 h-6" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-4 mb-4">
        <div v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']" :key="day" class="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
          {{ day }}
        </div>
      </div>

      <div class="calendar-grid grid grid-cols-7 gap-y-8 gap-x-4">
        <div v-for="(item, index) in daysInMonth" :key="index" class="flex flex-col items-center gap-2">
          <span v-if="item.day" class="text-xs font-bold text-gray-400">{{ item.day }}</span>
          <MoodBean 
            v-if="item.day" 
            :mood="item.mood" 
            size="42px"
            :active="item.date === '2026-03-19'"
            :class="`mood-bean-${item.date.replace(/-/g, '')}`"
            @click="selectDayMood(item.date!)"
          />
          <div v-else class="w-[42px] h-[42px]" />
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-50">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <div class="flex items-center gap-2">
            <MoodBean mood="awful" size="24px" />
            <span class="text-xs font-bold text-gray-500">Awful</span>
          </div>
          <div class="flex items-center gap-2">
            <MoodBean mood="bad" size="24px" />
            <span class="text-xs font-bold text-gray-500">Bad</span>
          </div>
          <div class="flex items-center gap-2">
            <MoodBean mood="neutral" size="24px" />
            <span class="text-xs font-bold text-gray-500">Neutral</span>
          </div>
          <div class="flex items-center gap-2">
            <MoodBean mood="good" size="24px" />
            <span class="text-xs font-bold text-gray-500">Good</span>
          </div>
          <div class="flex items-center gap-2">
            <MoodBean mood="great" size="24px" />
            <span class="text-xs font-bold text-gray-500">Great</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-emerald-50 rounded-[40px] p-8 border border-emerald-100 flex items-start gap-6">
      <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
        <Info class="w-6 h-6 text-emerald-600" />
      </div>
      <div>
        <h3 class="text-lg font-bold text-emerald-900">Monthly Insight</h3>
        <p class="text-emerald-800/70 text-sm mt-1 leading-relaxed">
          You've been feeling "Great" on 40% of your workdays this month! This correlates with your high social interaction score with the team. Keep it up!
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-grid {
  will-change: transform, opacity;
}
</style>
