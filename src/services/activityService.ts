import instance from '../services/httpClient';
import type { Activity } from '../interfaces/Activity';
import { mapToActivity } from '../utils/mapper';

export interface AiPromptRequest {
  location?: string;
  includeWeather?: boolean;
  teamSize?: number;
}

export const activityService = {
  async getActivities(): Promise<Activity[]> {
    try {
      const response = await instance.get('Activity');
      return response.data.map(mapToActivity);
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  },

  async suggestActivity(request: AiPromptRequest): Promise<Activity> {
    const response = await instance.post('Ai/prompt', request);
    return response.data;
  },
};