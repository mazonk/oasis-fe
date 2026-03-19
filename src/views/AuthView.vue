<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-[#FAFAFA] font-quicksand overflow-hidden">
    <div class="auth-container max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      <div class="auth-illustration hidden lg:block space-y-8 relative">
        
        <div class="space-y-4 relative z-10">
          <div class="flex items-center gap-6 mb-8">
            <Mascot size="100px" />
              <div class="w-8 h-8 bg-white rounded-full animate-ping" />
          </div>
          <h1 class="text-6xl font-black text-oasis-navy leading-[1.1]">
            Your mental <br/>
            <span class="text-oasis-lime">well-being</span> <br/>
            starts here.
          </h1>
          <p class="text-xl text-oasis-navy/60 max-w-md leading-relaxed font-medium">
            Join thousands of teams using Oasis to stay connected, mindful, and productive.
          </p>
        </div>

        <div class="space-y-6">
          <div v-for="(feature, i) in ['Daily mood check-ins', 'Team activities & XP', 'Personal growth roadmap']" 
               :key="i"
               class="flex items-center gap-4 text-oasis-navy/80 font-bold"
          >
            <div class="w-6 h-6 rounded-full bg-oasis-lime/20 flex items-center justify-center text-oasis-moss">
              <CheckCircle2 class="w-4 h-4" />
            </div>
            {{ feature }}
          </div>
        </div>
      </div>

      <div class="relative perspective-2000">
        <div class="auth-card bg-white rounded-[40px] shadow-2xl shadow-oasis-navy/10 border border-white/50 relative preserve-3d min-h-[620px] w-full transition-shadow duration-500">
          
          <div 
            class="absolute inset-0 p-10 backface-hidden flex flex-col justify-center transition-opacity duration-300"
            :class="isLogin ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
          >
            <LoginForm 
              @toggle="toggleAuth"
              @success="handleSuccess"
            />
          </div>

          <div 
            class="absolute inset-0 p-10 backface-hidden rotate-y-180 flex flex-col justify-center transition-opacity duration-300"
            :class="!isLogin ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
          >
            <RegisterForm 
              @toggle="toggleAuth"
              @success="handleSuccess"
            />
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { CheckCircle2 } from 'lucide-vue-next';
import Mascot from '../components/Mascot.vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';

const emit = defineEmits<{
  (e: 'login'): void;
}>();

const isLogin = ref(true);

const toggleAuth = () => {
  // Switch the state immediately for the cross-fade opacity
  isLogin.value = !isLogin.value;

  // Animate the physical card flip
  gsap.to('.auth-card', {
    rotateY: isLogin.value ? 0 : 180,
    duration: 0.8,
    ease: 'back.out(1.1)', // Subtle overshoot for a organic feel
    transformOrigin: "center center"
  });
};

onMounted(() => {
  const tl = gsap.timeline();

  tl.from('.auth-container', {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power4.out'
  })
  .from('.auth-illustration > *', {
    opacity: 0,
    x: -30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out'
  }, "-=0.6");
});

const handleSuccess = () => {
  gsap.to('.auth-container', {
    scale: 0.9,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in',
    onComplete: () => emit('login')
  });
};
</script>

<style scoped>
.perspective-2000 {
  perspective: 2000px;
}

.preserve-3d {
  transform-style: preserve-3d;
  /* Ensures the card doesn't jitter during rotation */
  will-change: transform;
}

.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

/* Fix for Safari 3D rendering */
.auth-card div {
  -webkit-font-smoothing: antialiased;
}
</style>