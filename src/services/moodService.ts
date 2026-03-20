import api from '../router';
import type { Mood } from '../types';
import e from 'express';

export interface MoodLog {
  id: string;
  userId: string;
  moodId: string;
  date: string;
  note?: string;
}

export const moodService = {
  async getMoods(): Promise<Mood[]> {
    const response = await api.get<Mood[]>('/moods');
    return response.data;
  },
  async getMoodLogs(userId: string): Promise<MoodLog[]> {
    const response = await api.get<MoodLog[]>(`/moods/logs/${userId}`);
    return response.data;
  },
  async logMood(data: { moodId: string; date: string; note?: string }): Promise<MoodLog> {
    const response = await api.post<MoodLog>('/moods/log', data);
    return response.data;
  },
};
