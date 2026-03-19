<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const props = defineProps<{
  size?: string;
  color?: string;
  mood?: 'happy' | 'calm' | 'energetic';
  clickable?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const mascotRef = ref<SVGElement | null>(null);
const eyeLeft = ref<SVGCircleElement | null>(null);
const eyeRight = ref<SVGCircleElement | null>(null);
const body = ref<SVGPathElement | null>(null);

onMounted(() => {
  if (!mascotRef.value) return;

  // Floating animation
  gsap.to(mascotRef.value, {
    y: -15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Breathing/Wobble animation for the body
  if (body.value) {
    gsap.to(body.value, {
      scaleX: 1.05,
      scaleY: 0.95,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: '50% 100%'
    });
  }

  // Blinking animation
  const blink = () => {
    const delay = gsap.utils.random(2, 5);
    gsap.to([eyeLeft.value, eyeRight.value], {
      scaleY: 0.1,
      duration: 0.1,
      repeat: 1,
      yoyo: true,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.delayedCall(delay, blink);
      }
    });
  };
  blink();
});

const handleHover = () => {
  gsap.to(mascotRef.value, {
    scale: 1.1,
    rotate: 5,
    duration: 0.4,
    ease: 'back.out(1.7)'
  });
};

const handleLeave = () => {
  gsap.to(mascotRef.value, {
    scale: 1,
    rotate: 0,
    duration: 0.4,
    ease: 'back.out(1.7)'
  });
};
</script>

<template>
  <div 
    class="mascot-wrapper inline-block"
    :class="{ 'cursor-pointer': clickable }"
    :style="{ width: size || '120px', height: size || '120px' }"
    @mouseenter="handleHover"
    @mouseleave="handleLeave"
    @click="clickable && emit('click')"
  >
    <svg 
      ref="mascotRef"
      viewBox="0 0 200 200" 
      class="w-full h-full drop-shadow-2xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Body -->
      <path 
        ref="body"
        d="M40,120 C40,60 80,40 100,40 C120,40 160,60 160,120 C160,180 140,180 100,180 C60,180 40,180 40,120 Z" 
        :fill="color || '#B6CF33'" 
      />
      
      <!-- Eyes -->
      <g class="eyes">
        <circle 
          ref="eyeLeft" 
          cx="75" cy="100" r="8" 
          fill="white" 
          style="transform-origin: 75px 100px"
        />
        <circle 
          ref="eyeRight" 
          cx="125" cy="100" r="8" 
          fill="white" 
          style="transform-origin: 125px 100px"
        />
      </g>

      <!-- Mouth -->
      <path 
        v-if="mood !== 'calm'"
        d="M85,130 Q100,145 115,130" 
        stroke="white" 
        stroke-width="4" 
        fill="none" 
        stroke-linecap="round" 
      />
      <line 
        v-else
        x1="90" y1="135" x2="110" y2="135" 
        stroke="white" 
        stroke-width="4" 
        stroke-linecap="round" 
      />

      <!-- Blush -->
      <circle cx="60" cy="115" r="6" fill="white" opacity="0.2" />
      <circle cx="140" cy="115" r="6" fill="white" opacity="0.2" />
    </svg>
  </div>
</template>

<style scoped>
.mascot-wrapper {
  transition: transform 0.3s ease;
}
</style>
