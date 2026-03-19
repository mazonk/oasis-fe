import api from './api';
import type { Activity } from '../types';

export interface ActivityLog {
  id: string;
  userId: string;
  activityId: string;
  date: string;
  xpEarned: number;
}

export const activityService = {
  async getActivities(): Promise<Activity[]> {
    const response = await api.get<Activity[]>('/activities');
    return response.data;
  },
  async logActivity(data: { activityId: string; date: string }): Promise<ActivityLog> {
    const response = await api.post<ActivityLog>('/activities/log', data);
    return response.data;
  },
  async getRecentActivities(userId: string): Promise<ActivityLog[]> {
    const response = await api.get<ActivityLog[]>(`/activities/recent/${userId}`);
    return response.data;
  },
};
