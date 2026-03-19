import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Mood } from '../types';
import { moodService, type MoodLog } from '../services/moodService';

export const useMoodStore = defineStore('mood', () => {
  const moods = ref<Mood[]>([]);
  const moodLogs = ref<MoodLog[]>([]);
  const isLoading = ref(false);

  async function fetchMoods() {
    isLoading.value = true;
    try {
      moods.value = await moodService.getMoods();
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchMoodLogs(userId: string) {
    isLoading.value = true;
    try {
      moodLogs.value = await moodService.getMoodLogs(userId);
    } finally {
      isLoading.value = false;
    }
  }

  async function logMood(data: { moodId: string; date: string; note?: string }) {
    const newLog = await moodService.logMood(data);
    moodLogs.value.push(newLog);
    return newLog;
  }

  return {
    moods,
    moodLogs,
    isLoading,
    fetchMoods,
    fetchMoodLogs,
    logMood,
  };
});
