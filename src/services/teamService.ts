import httpClient from './httpClient';
import type { Team } from '../interfaces/Team';
import type { CreateTeamDto } from '../interfaces/CreateTeamDto';

export const teamService = {
  async createTeam(dto: CreateTeamDto): Promise<Team> {
    const response = await httpClient.post<Team>('/team', dto);
    return response.data;
  },

  async getAllTeams(): Promise<Team[]> {
    const response = await httpClient.get<Team[]>('/team');
    return response.data;
  },

  async getTeamById(id: number): Promise<Team> {
    const response = await httpClient.get<Team>(`/team/${id}`);
    return response.data;
  },

  async getTeamByMemberId(memberId: number): Promise<Team | null> {
    try {
      const response = await httpClient.get<Team>(`/team/member/${memberId}`);
      return response.data;
    } catch (e: any) {
      if (e?.response?.status === 404) return null;
      throw e;
    }
  },
};