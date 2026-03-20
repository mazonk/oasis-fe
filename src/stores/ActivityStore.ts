import { defineStore } from 'pinia';
import { activityService } from '../services/activityService';
import type { Activity } from '../interfaces/Activity';

export const useActivityStore = defineStore('activityStore', {
  state: () => ({
    activities: [] as Activity[],
  }),

  actions: {
    async fetchActivities() {
      try {
        const data = await activityService.getActivities();
        // Ensure we are assigning a fresh array to trigger Vue's reactivity
        this.activities = [...data]; 
        console.log("Store activities updated:", this.activities.length);
      } catch (e) {
        console.error("Store error:", e);
      }
    },
  },
});