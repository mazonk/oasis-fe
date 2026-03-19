import api from '../api';
import type { User, TeamInvitation, SocialInteraction } from '../types';

export interface Team {
  id: string;
  name: string;
  members: User[];
  vibeScore: number;
}

export const teamService = {
  async getTeam(): Promise<Team> {
    const response = await api.get<Team>('/team');
    return response.data;
  },
  async inviteMember(email: string): Promise<TeamInvitation> {
    const response = await api.post<TeamInvitation>('/team/invite', { email });
    return response.data;
  },
  async getInvitations(): Promise<TeamInvitation[]> {
    const response = await api.get<TeamInvitation[]>('/team/invitations');
    return response.data;
  },
  async respondToInvitation(invitationId: string, status: 'accepted' | 'declined'): Promise<void> {
    await api.post(`/team/invitations/${invitationId}/respond`, { status });
  },
  async getSocialInteractions(): Promise<SocialInteraction[]> {
    const response = await api.get<SocialInteraction[]>('/team/social-interactions');
    return response.data;
  },
};
