import httpClient from './httpClient';

export interface Level {
  levelId: number;
  name: string;
  minExp: number;
}

export const levelService = {
  async getAllLevels(): Promise<Level[]> {
    const response = await httpClient.get<Level[]>('/level');
    return response.data;
  },
};