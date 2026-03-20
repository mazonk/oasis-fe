import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TeamInvitation } from '../interfaces/TeamInvitation';
import type { InviteMemberDto } from '../interfaces/InviteMemberDto';
import { invitationService } from '../services/invitationService';
import { useAuthStore } from '../stores/AuthStore';
import { useTeamStore } from './TeamStore';

export const useInvitationStore = defineStore('invitation', () => {
  const invitations = ref<TeamInvitation[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchMyInvitations() {
    const email = useAuthStore().loggedInMember.email;
    if (!email) return;

    isLoading.value = true;
    error.value = null;
    try {
      invitations.value = await invitationService.getActiveInvitations(email);
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch invitations';
    } finally {
      isLoading.value = false;
    }
  }

  async function inviteMember(dto: InviteMemberDto) {
    isLoading.value = true;
    error.value = null;
    try {
      await invitationService.inviteMember(dto);
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to send invitation';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  async function respondToInvitation(invitationId: number, accept: boolean) {
    isLoading.value = true;
    error.value = null;
    try {
      await invitationService.respondToInvitation(invitationId, accept);
      invitations.value = invitations.value.filter(inv => inv.invitationId !== invitationId);

      if (accept) {
        const teamStore = useTeamStore();
        await teamStore.fetchMyTeam();
      }
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to respond to invitation';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    invitations,
    isLoading,
    error,
    fetchMyInvitations,
    inviteMember,
    respondToInvitation,
  };
});