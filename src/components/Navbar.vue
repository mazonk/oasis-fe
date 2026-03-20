<script setup lang="ts">
import MoodPopup from "./MoodPopup.vue";
import { ref } from "vue";
import Mascot from "./Mascot.vue";
import {
  Home,
  Users,
  Activity,
  Map,
  Settings,
  LogOut,
  User as UserIcon,
  Zap
} from 'lucide-vue-next';
import { cn } from '../utils/utils';
import { useAuthStore } from '../stores/AuthStore';
import { useMemberStore } from '../stores/MemberStore';

const authStore = useAuthStore();
const memberStore = useMemberStore();
const user = authStore.loggedInMember;
const member = memberStore.member;

defineProps<{
  activeTab: string;
}>();

const emit = defineEmits<{
  (e: "update:activeTab", tab: string): void;
  (e: "logout"): void;
}>();

const moodPopup = ref<InstanceType<typeof MoodPopup> | null>(null);

const openMoodPopup = () => {
  if (moodPopup.value) {
    moodPopup.value.isOpen = true;
  }
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
  <nav class="w-full bg-gradient-to-r from-oasis-navy via-oasis-sky to-oasis-lime sticky top-0 z-40 px-6 py-3 shadow-lg backdrop-blur-md bg-opacity-90">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div @click="openMoodPopup" class="nav-logo flex items-center gap-3">
        <Mascot
          size="40px"
          color="#4F46E5"
          class="cursor-pointer hover:scale-110 transition-transform"
        />
        <span class="font-bold text-xl tracking-tight text-gray-100">.oasis</span>
        <MoodPopup ref="moodPopup" />
      </div>

      <div class="hidden md:flex items-center gap-1">
        <button
          v-for="item in menuItems"
          :key="item.id"
          @click="emit('update:activeTab', item.id)"
          :class="cn(
            'nav-item flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 group font-medium cursor-pointer',
            activeTab === item.id
              ? 'bg-oasis-sky text-white'
              : 'text-gray-50 hover:bg-gray-50 hover:text-gray-600'
          )"
        >
          <component :is="item.icon" class="w-5 h-5" />
          {{ item.label }}
        </button>
      </div>

      <div class="nav-user flex items-center gap-4">
  <div class="relative group hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer">
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

    <!-- Tooltip -->
    <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
      <div class="flex items-center gap-1.5">
        <Zap class="w-3 h-3 text-amber-400 fill-current" />
        {{ member?.levelName ?? 'Unranked' }}
      </div>
      <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
    </div>
  </div>

  <button @click="emit('logout')" class="p-2 cursor-pointer text-gray-800 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all">
    <LogOut class="w-5 h-5" />
  </button>
</div>
    </div>
  </nav>
</template>