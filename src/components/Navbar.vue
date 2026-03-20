<script setup lang="ts">
import MoodPopup from "./MoodPopup.vue";
import { ref, computed, onMounted } from "vue";
import Mascot from "./Mascot.vue";
import {
  Home, Users, Activity, Map, Settings,
  LogOut, User as UserIcon, Zap, X, Trophy
} from 'lucide-vue-next';
import { cn } from '../utils/utils';
import { useAuthStore } from '../stores/AuthStore';
import { useMemberStore } from '../stores/MemberStore';
import { useLevelStore } from '../stores/LevelStore';

const authStore = useAuthStore();
const memberStore = useMemberStore();
const levelStore = useLevelStore();

const user = authStore.loggedInMember;
const member = computed(() => memberStore.member);
const showLevelsModal = ref(false);

onMounted(() => {
  levelStore.fetchLevels();
});

defineProps<{ activeTab: string }>();

const emit = defineEmits<{
  (e: "update:activeTab", tab: string): void;
  (e: "logout"): void;
}>();

const moodPopup = ref<InstanceType<typeof MoodPopup> | null>(null);
const openMoodPopup = () => {
  if (moodPopup.value) moodPopup.value.isOpen = true;
};

const menuItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "team", icon: Users, label: "Team" },
  { id: "activities", icon: Activity, label: "Activities" },
  { id: "roadmap", icon: Map, label: "Roadmap" },
  { id: "settings", icon: Settings, label: "Settings" },
];
</script>

<template>
  <nav
    class="w-full bg-gradient-to-r from-oasis-navy via-oasis-sky to-oasis-lime sticky top-0 z-40 px-6 py-3 shadow-lg backdrop-blur-md bg-opacity-90">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div @click="openMoodPopup" class="nav-logo flex items-center gap-3">
        <Mascot size="40px" color="#4F46E5" class="cursor-pointer hover:scale-110 transition-transform" />
        <span class="font-bold text-xl tracking-tight text-gray-100">.oasis</span>
        <MoodPopup ref="moodPopup" />
      </div>

      <div class="hidden md:flex items-center gap-1">
        <button v-for="item in menuItems" :key="item.id" @click="emit('update:activeTab', item.id)" :class="cn(
          'nav-item flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium cursor-pointer',
          activeTab === item.id
            ? 'bg-oasis-sky text-white'
            : 'text-gray-50 hover:bg-gray-50 hover:text-gray-600'
        )">
          <component :is="item.icon" class="w-5 h-5" />
          {{ item.label }}
        </button>
      </div>

      <div class="nav-user flex items-center gap-4">
        <div
          class="relative group hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer"
          @click="showLevelsModal = true">
          <UserIcon class="w-5 h-5 text-gray-400" />
          <div class="flex flex-col leading-tight">
            <span class="text-sm font-semibold text-gray-900">{{ user.fname }}</span>
            <div class="flex items-center gap-1">
              <span v-if="member?.levelName" class="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">
                {{ member.levelName }}
              </span>
              <span v-if="member?.levelName && member?.experience !== null" class="text-[10px] text-gray-300">·</span>
              <div v-if="member?.experience !== null" class="flex items-center gap-0.5">
                <Zap class="w-2.5 h-2.5 text-amber-400 fill-current" />
                <span class="text-[10px] font-bold text-amber-500">{{ member?.experience ?? 0 }} XP</span>
              </div>
            </div>
          </div>
          <div
            class="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
            <div class="flex items-center gap-1.5">
              <Zap class="w-3 h-3 text-amber-400 fill-current" />
              {{ member?.levelName ?? 'Getting started' }}
            </div>
            <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        </div>

        <button @click="emit('logout')"
          class="p-2 cursor-pointer text-gray-800 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all">
          <LogOut class="w-5 h-5" />
        </button>
      </div>
    </div>
  </nav>

  <!-- Levels Modal -->
  <Teleport to="body">
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="showLevelsModal"
        class="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click.self="showLevelsModal = false">
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
          <div v-if="showLevelsModal" class="bg-white rounded-[32px] p-8 w-80 shadow-xl max-h-[70vh] flex flex-col">

            <div class="flex items-center justify-between mb-6 flex-shrink-0">
              <div>
                <h2 class="text-xl font-bold text-gray-900">Levels</h2>
                <p class="text-sm text-gray-400 mt-1">Earn XP to level up.</p>
              </div>
              <button @click="showLevelsModal = false"
                class="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors text-gray-400 cursor-pointer">
                <X class="w-5 h-5" />
              </button>
            </div>

            <div class="space-y-2 overflow-y-auto pr-1">
              <div v-for="level in levelStore.levels" :key="level.levelId" :class="cn(
                'flex items-center justify-between px-4 py-3 rounded-2xl transition-colors',
                member?.levelId === level.levelId
                  ? 'bg-indigo-50 border border-indigo-100'
                  : 'bg-gray-50'
              )">
                <div class="flex items-center gap-3">
                  <div :class="cn(
                    'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0',
                    member?.levelId === level.levelId ? 'bg-indigo-600' : 'bg-gray-200'
                  )">

                    <Trophy
                      :class="cn('w-4 h-4', member?.levelId === level.levelId ? 'text-white' : 'text-gray-400')" />

                  </div>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <p
                        :class="cn('text-sm font-bold', member?.levelId === level.levelId ? 'text-indigo-700' : 'text-gray-700')">
                        {{ level.name }}
                      </p>
                      <span class="text-[12px] text-gray-500 font-medium">#{{ level.levelId }}</span>
                    </div>
                    <p class="text-[12px] text-gray-400">{{ level.minExp }} XP required</p>
                  </div>
                </div>
                <span v-if="member?.levelId === level.levelId"
                  class="text-[10px] font-black text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0">
                  You
                </span>
              </div>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>