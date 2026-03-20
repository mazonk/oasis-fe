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
} from "lucide-vue-next";
import { cn } from "../utils/utils";

defineProps<{
  activeTab: string;
}>();

const emit = defineEmits<{
  (e: "update:activeTab", tab: string): void;
  (e: "logout"): void;
}>();

const moodPopup = ref<any>(null);

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
      <div class="nav-logo flex items-center gap-3">
        <Mascot 
          size="40px" 
          color="#4F46E5" 
          class="cursor-pointer hover:scale-110 transition-transform" 
          @click="openMoodPopup" 
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
            'nav-item flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 group font-medium',
            activeTab === item.id ? 'bg-oasis-sky text-white' : 'text-gray-50 hover:bg-gray-50 hover:text-gray-600'
          )"
        >
          <component :is="item.icon" class="w-5 h-5" />
          {{ item.label }}
        </button>
      </div>

      <div class="nav-user flex items-center gap-4">
        <div class="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-gray-50 border border-gray-100">
          <UserIcon class="w-5 h-5 text-gray-400" />
          <span class="text-sm font-semibold text-gray-900">User</span>
        </div>
        <button @click="emit('logout')" class="p-2 text-gray-400 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all">
          <LogOut class="w-5 h-5" />
        </button>
      </div>
    </div>
  </nav>
</template>