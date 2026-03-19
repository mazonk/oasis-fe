<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  mood?: 'awful' | 'bad' | 'neutral' | 'good' | 'great' | 'none';
  size?: string;
  active?: boolean;
}>();

const moodConfig = {
  awful: { color: '#4B5563', face: 'sad' }, // Gray
  bad: { color: '#065F46', face: 'sad' },   // Dark Green
  neutral: { color: '#A7F3D0', face: 'neutral' }, // Light Green
  good: { color: '#10B981', face: 'happy' },  // Medium Green
  great: { color: '#FDE68A', face: 'great' }, // Yellow
  none: { color: '#E5E7EB', face: 'none' }    // Light Gray
};

const config = computed(() => moodConfig[props.mood || 'none']);
</script>

<template>
  <div 
    class="mood-bean relative flex items-center justify-center rounded-full transition-all duration-300"
    :style="{ 
      width: size || '48px', 
      height: size || '48px', 
      backgroundColor: config.color,
      transform: active ? 'scale(1.1)' : 'scale(1)',
      boxShadow: active ? `0 0 20px ${config.color}80` : 'none'
    }"
  >
    <svg 
      v-if="mood !== 'none'"
      viewBox="0 0 100 100" 
      class="w-3/5 h-3/5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Eyes -->
      <g v-if="config.face === 'great'">
        <path d="M30,45 Q40,35 50,45" stroke="black" stroke-width="6" fill="none" stroke-linecap="round" />
        <path d="M50,45 Q60,35 70,45" stroke="black" stroke-width="6" fill="none" stroke-linecap="round" />
      </g>
      <g v-else-if="config.face === 'happy'">
        <circle cx="35" cy="45" r="4" fill="black" />
        <circle cx="65" cy="45" r="4" fill="black" />
      </g>
      <g v-else-if="config.face === 'neutral'">
        <circle cx="35" cy="45" r="4" fill="black" />
        <circle cx="65" cy="45" r="4" fill="black" />
      </g>
      <g v-else-if="config.face === 'sad'">
        <circle cx="35" cy="45" r="4" fill="black" />
        <circle cx="65" cy="45" r="4" fill="black" />
      </g>

      <!-- Mouth -->
      <path 
        v-if="config.face === 'great'"
        d="M30,65 Q50,85 70,65" 
        stroke="black" 
        stroke-width="6" 
        fill="none" 
        stroke-linecap="round" 
      />
      <path 
        v-else-if="config.face === 'happy'"
        d="M35,65 Q50,75 65,65" 
        stroke="black" 
        stroke-width="5" 
        fill="none" 
        stroke-linecap="round" 
      />
      <line 
        v-else-if="config.face === 'neutral'"
        x1="40" y1="70" x2="60" y2="70" 
        stroke="black" 
        stroke-width="5" 
        stroke-linecap="round" 
      />
      <path 
        v-else-if="config.face === 'sad'"
        d="M40,75 Q50,65 60,75" 
        stroke="black" 
        stroke-width="5" 
        fill="none" 
        stroke-linecap="round" 
      />
    </svg>
  </div>
</template>

<style scoped>
.mood-bean {
  cursor: pointer;
}
.mood-bean:hover {
  transform: scale(1.1);
}
</style>
