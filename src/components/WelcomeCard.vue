<script setup lang="ts">
/**
 * Oasis Mental Health - Tailwind Edition
 */
interface Props {
  userName?: string;
  sessionCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  userName: 'Friend',
  sessionCount: 0
});

const emit = defineEmits<{
  (e: 'start'): void;
}>();
</script>

<template>
  <div class="max-w-md mx-auto my-10 p-10 bg-white border border-oasis-lime/20 rounded-oasis shadow-[0_20px_40px_rgba(11,57,90,0.08)] text-center font-quicksand">
    
    <div class="flex justify-center mb-6">
      <div class="w-20 h-20 bg-gradient-to-br from-oasis-lime to-oasis-moss rounded-2xl flex items-center justify-center text-4xl shadow-lg shadow-oasis-moss/20">
        🌿
      </div>
    </div>

    <div class="space-y-3">
      <h1 class="text-3xl font-bold text-oasis-navy tracking-tight">
        Hello, {{ props.userName }}
      </h1>
      
      <p class="text-lg text-oasis-sky leading-relaxed">
        Welcome to your Oasis. You've completed 
        <span class="font-bold text-oasis-moss">{{ props.sessionCount }}</span> 
        sessions this week. Ready to find some calm?
      </p>
    </div>

    <div class="mt-8 flex flex-col gap-3">
      <button 
        @click="emit('start')"
        class="w-full py-4 px-8 bg-oasis-navy text-white font-bold rounded-full hover:bg-oasis-sky hover:-translate-y-1 transition-all duration-300 shadow-md active:scale-95"
      >
        Start Daily Check-in
      </button>
      
      <button 
        class="w-full py-4 px-8 bg-transparent text-oasis-moss font-bold rounded-full hover:bg-oasis-moss/10 transition-colors duration-200"
      >
        View Progress
      </button>
    </div>
  </div>
</template>