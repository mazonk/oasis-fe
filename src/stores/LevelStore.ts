import { defineStore } from 'pinia';
import { ref } from 'vue';
import { levelService, type Level } from '../services/levelService';

export const useLevelStore = defineStore('level', () => {
  const levels = ref<Level[]>([]);
  const isLoading = ref(false);

  async function fetchLevels() {
    if (levels.value.length > 0) return; // already loaded
    isLoading.value = true;
    try {
      levels.value = await levelService.getAllLevels();
    } finally {
      isLoading.value = false;
    }
  }

  return { levels, isLoading, fetchLevels };
});