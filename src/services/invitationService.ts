import { InviteMemberDto } from "../interfaces/InviteMemberDto";
import { TeamInvitation } from "../interfaces/TeamInvitation";
import httpClient from "./httpClient";

export const invitationService = {
    async getActiveInvitations(email: string): Promise<TeamInvitation[]> {
      const response = await httpClient.get<TeamInvitation[]>(`/TeamInvitation/active?email=${encodeURIComponent(email)}`);
      return response.data;
    },
  
    async inviteMember(dto: InviteMemberDto): Promise<void> {
      await httpClient.post('/TeamInvitation/invite', dto);
    },
  
    async respondToInvitation(invitationId: number, accept: boolean): Promise<void> {
      await httpClient.post('/TeamInvitation/respond', { invitationId, accept });
    },
  };