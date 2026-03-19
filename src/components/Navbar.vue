<script setup lang="ts">
import { 
  Home, 
  Users, 
  Activity, 
  Map, 
  Settings, 
  LogOut,
  User as UserIcon
} from 'lucide-vue-next';
import { cn } from '../lib/utils';

defineProps<{
  activeTab: string;
}>();

const emit = defineEmits<{
  (e: 'update:activeTab', tab: string): void;
}>();

const menuItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'team', icon: Users, label: 'Team' },
  { id: 'activities', icon: Activity, label: 'Activities' },
  { id: 'roadmap', icon: Map, label: 'Roadmap' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];
</script>

<template>
  <nav class="w-full bg-[#6B8834] sticky top-0 z-40 px-6 py-3">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#B6CF33] rounded-xl flex items-center justify-center">
          <div class="w-5 h-5 bg-white rounded-full animate-pulse" />
        </div>
        <span class="font-bold text-xl tracking-tight text-gray-900">Oasis</span>
      </div>

      <div class="hidden md:flex items-center gap-1">
        <button
          v-for="item in menuItems"
          :key="item.id"
          @click="emit('update:activeTab', item.id)"
          :class="cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 group font-medium',
            activeTab === item.id 
              ? 'bg-[#B6CF33] text-[#6B8834]' 
              : 'text-gray-200 hover:bg-[#B6CF33]/30 hover:text-[#6B8834]'
          )"
        >
          <component :is="item.icon" :class="cn(
            'w-5 h-5',
            activeTab === item.id ? 'text-[#6B8834]' : 'text-gray-400 group-hover:text-gray-600'
          )" />
          {{ item.label }}
        </button>
      </div>

      <div class="flex items-center gap-4">
        <div class="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-gray-50 border border-gray-100">
          <UserIcon class="w-5 h-5 text-gray-400" />
          <span class="text-sm font-semibold text-gray-900">Katie</span>
        </div>
        <button class="p-2 text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-colors rounded-xl">
          <LogOut class="w-5 h-5" />
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu (simplified) -->
    <div class="md:hidden flex items-center justify-around mt-3 pt-3 border-t border-gray-50">
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="emit('update:activeTab', item.id)"
        :class="cn(
          'p-2 rounded-lg',
          activeTab === item.id ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400'
        )"
      >
        <component :is="item.icon" class="w-6 h-6" />
      </button>
    </div>
  </nav>
</template>
