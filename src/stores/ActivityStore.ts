import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Activity } from '../interfaces/Activity';
import { activityService  } from '../services/activityService';

export const useActivityStore = defineStore('activityStore', {
  state: () => ({
    activities: [] as Activity[],
  }),

  actions: {
    async fetchActivities(): Promise<void> {
      try {
        const data = await activityService.getActivities();
        this.activities = data;
      } catch (e: any) {
          console.error("Error fetching all activities:", e);
          throw e;
        }
    },
  },
});
