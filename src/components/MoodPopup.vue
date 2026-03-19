<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { X } from 'lucide-vue-next';
import { MOODS } from '../constants';
import { cn } from '../lib/utils';
import { isWithinInterval, setHours, setMinutes } from 'date-fns';
import { Motion } from '@motionone/vue';

const isOpen = ref(false);
const lastCheck = ref(0);

const checkTime = () => {
  const now = new Date();
  const workStart = setMinutes(setHours(now, 9), 0);
  const workEnd = setMinutes(setHours(now, 17), 0);

  const isWorkTime = isWithinInterval(now, { start: workStart, end: workEnd });
  const twoHoursInMs = 2 * 60 * 60 * 1000;

  if (isWorkTime && now.getTime() - lastCheck.value > twoHoursInMs) {
    isOpen.value = true;
    lastCheck.value = now.getTime();
  }
};

let interval: any;

onMounted(() => {
  interval = setInterval(checkTime, 60000);
  checkTime();
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <Motion
        :initial="{ scale: 0.9, opacity: 0, y: 20 }"
        :animate="{ scale: 1, opacity: 1, y: 0 }"
        class="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        <button
          @click="isOpen = false"
          class="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X class="w-5 h-5 text-gray-400" />
        </button>

        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Vibe check:</h2>
          <p class="text-gray-500">How are you today?</p>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <Motion
            v-for="mood in MOODS"
            :key="mood.id"
            as="button"
            :while-hover="{ scale: 1.05 }"
            :while-tap="{ scale: 0.95 }"
            @click="isOpen = false"
            class="flex flex-col items-center gap-2"
          >
            <div :class="cn(
              'w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm',
              mood.color
            )">
              {{ mood.emoji }}
            </div>
            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
              {{ mood.label }}
            </span>
          </Motion>
        </div>
      </Motion>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
