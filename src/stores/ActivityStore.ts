import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Activity } from '../types';
import { activityService, type ActivityLog } from '../services/activityService';

export const useActivityStore = defineStore('activity', () => {
  const activities = ref<Activity[]>([]);
  const recentActivityLogs = ref<ActivityLog[]>([]);
  const isLoading = ref(false);

  async function fetchActivities() {
    isLoading.value = true;
    try {
      activities.value = await activityService.getActivities();
    } finally {
      isLoading.value = false;
    }
  }

  async function logActivity(data: { activityId: string; date: string }) {
    const newLog = await activityService.logActivity(data);
    recentActivityLogs.value.unshift(newLog);
    return newLog;
  }

  async function fetchRecentActivities(userId: string) {
    isLoading.value = true;
    try {
      recentActivityLogs.value = await activityService.getRecentActivities(userId);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    activities,
    recentActivityLogs,
    isLoading,
    fetchActivities,
    logActivity,
    fetchRecentActivities,
  };
});
