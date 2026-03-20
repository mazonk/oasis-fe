import instance from '../services/httpClient';
import type { Activity } from '../types';
import { mapToActivity } from '../utils/mapper';

export const activityService = {
  async getActivities(): Promise<Activity[]> {
    try {
      const response = await instance.get('Activity');
      console.log(response.data)
      return response.data.map(mapToActivity);
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  },
};
