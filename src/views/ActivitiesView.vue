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

// add below existing refs
const showSuggestModal = ref(false);
const suggestLocation = ref('');
const suggestWeather = ref(false);
const suggestTeamSize = ref<number | undefined>(undefined);
  const showComingSoon = ref(false);

async function handleSuggest() {
  await activityStore.suggestActivity({
    location: suggestLocation.value || undefined,
    includeWeather: suggestWeather.value,
    teamSize: suggestTeamSize.value,
  });
}

function closeSuggestModal() {
  showSuggestModal.value = false;
  activityStore.clearSuggestion();
}

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
  <div class="flex gap-3">

    <button      @click="showSuggestModal = true" class="bg-indigo-600 cursor-pointer text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-100">
      <Plus class="w-5 h-5" />
      Propose New
    </button>
  </div>
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
  <!-- AI Suggest Modal -->
<Teleport to="body">
  <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
  enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
  leave-from-class="opacity-100" leave-to-class="opacity-0">
  <div v-if="showComingSoon"
    class="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
    @click.self="showComingSoon = false">
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="showComingSoon" class="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-xl text-center">
        <div class="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Sparkles class="w-8 h-8 text-amber-500" />
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Coming Soon!</h2>
        <p class="text-sm text-gray-400 mb-6">We're working on this feature. Stay tuned!</p>
        <button
          @click="showComingSoon = false"
          class="w-full py-3 rounded-2xl bg-amber-500 text-sm font-bold text-white hover:bg-amber-600 transition-colors cursor-pointer"
        >
          Got it
        </button>
      </div>
    </Transition>
  </div>
</Transition>
  <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="showSuggestModal"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="closeSuggestModal">
      <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <div v-if="showSuggestModal" class="bg-white rounded-[32px] p-8 w-full max-w-md shadow-xl">

          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-bold text-gray-900">AI Activity Suggestion</h2>
              <p class="text-sm text-gray-400 mt-1">Let AI pick the perfect activity for your team.</p>
            </div>
            <button @click="closeSuggestModal"
              class="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors text-gray-400 cursor-pointer">
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Result card -->
          <div v-if="activityStore.suggestedActivity"
  class="mb-6 p-6 bg-amber-50 rounded-3xl border border-amber-100">
  <div class="flex items-center justify-between mb-3">
    <span :class="cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full', getCategoryStyle(activityStore.suggestedActivity.categoryName))">
      {{ activityStore.suggestedActivity.categoryName }}
    </span>
    <div class="flex items-center gap-1 text-amber-500 font-black">
      <Zap class="w-4 h-4 fill-current" />
      {{ activityStore.suggestedActivity.experience }} XP
    </div>
  </div>
  <h3 class="font-bold text-gray-900 text-lg mb-2">{{ activityStore.suggestedActivity.title }}</h3>
  <p class="text-sm text-gray-500 leading-relaxed">{{ activityStore.suggestedActivity.description }}</p>
  <p class="text-xs text-gray-400 mt-3">
    {{ activityStore.suggestedActivity.minMember }}–{{ activityStore.suggestedActivity.maxMember }} members
  </p>
  <button
  @click="showComingSoon = true"
  class="mt-4 w-full py-2.5 rounded-2xl bg-amber-500 text-sm font-bold text-white hover:bg-amber-600 transition-colors cursor-pointer"
>
  Let's do it!
</button>
</div>

          <div v-if="activityStore.suggestionError" class="mb-6 p-4 bg-rose-50 rounded-2xl border border-rose-100">
            <p class="text-sm text-rose-600">{{ activityStore.suggestionError }}</p>
          </div>

          <!-- Form -->
          <div class="space-y-4">
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-2">
                Location
                <span class="text-gray-400 font-normal ml-1">(optional)</span>
              </label>
              <div class="relative">
                <MapPin class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input v-model="suggestLocation" type="text" placeholder="e.g. Copenhagen, Denmark"
                  class="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent text-gray-900 placeholder-gray-300 transition-all" />
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <label class="text-sm font-semibold text-gray-700">Include live weather</label>
              <button
                @click="suggestWeather = !suggestWeather"
                :class="suggestWeather ? 'bg-amber-500' : 'bg-gray-200'"
                class="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer"
              >
                <span :class="suggestWeather ? 'translate-x-6' : 'translate-x-1'"
                  class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 block" />
              </button>
            </div>

            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-2">
                Team size
                <span class="text-gray-400 font-normal ml-1">(optional)</span>
              </label>
              <input v-model.number="suggestTeamSize" type="number" min="2" max="100" placeholder="e.g. 8"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent text-gray-900 placeholder-gray-300 transition-all" />
            </div>

            <button
              @click="handleSuggest"
              :disabled="activityStore.isSuggesting"
              class="w-full py-3 rounded-2xl bg-amber-500 text-sm font-semibold text-white hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              <Loader2 v-if="activityStore.isSuggesting" class="w-4 h-4 animate-spin" />
              <Sparkles v-else class="w-4 h-4" />
              {{ activityStore.isSuggesting ? 'Thinking...' : activityStore.suggestedActivity ? 'Suggest Another' : 'Suggest Activity' }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</Teleport>
</template>