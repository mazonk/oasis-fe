import { defineStore } from 'pinia';
import { activityService, type AiPromptRequest } from '../services/activityService';
import type { Activity } from '../interfaces/Activity';

export const useActivityStore = defineStore('activityStore', {
  state: () => ({
    activities: [] as Activity[],
    suggestedActivity: null as Activity | null,
    isSuggesting: false,
    suggestionError: null as string | null,
  }),

  actions: {
    async fetchActivities() {
      try {
        const data = await activityService.getActivities();
        this.activities = [...data];
      } catch (e) {
        console.error('Store error:', e);
      }
    },

    async suggestActivity(request: AiPromptRequest) {
      this.isSuggesting = true;
      this.suggestionError = null;
      this.suggestedActivity = null;
      try {
        this.suggestedActivity = await activityService.suggestActivity(request);
      } catch (e: any) {
        this.suggestionError = e?.message ?? 'Failed to get suggestion';
        throw e;
      } finally {
        this.isSuggesting = false;
      }
    },

    clearSuggestion() {
      this.suggestedActivity = null;
      this.suggestionError = null;
    }
  },
});