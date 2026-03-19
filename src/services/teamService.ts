import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TeamInvitation, SocialInteraction } from '../types';
import { teamService, type Team } from '../services/teamService';

export const useTeamStore = defineStore('team', () => {
  const team = ref<Team | null>(null);
  const invitations = ref<TeamInvitation[]>([]);
  const socialInteractions = ref<SocialInteraction[]>([]);
  const isLoading = ref(false);

  async function fetchTeam() {
    isLoading.value = true;
    try {
      team.value = await teamService.getTeam();
    } finally {
      isLoading.value = false;
    }
  }

  async function inviteMember(email: string) {
    const invitation = await teamService.inviteMember(email);
    invitations.value.push(invitation);
    return invitation;
  }

  async function fetchInvitations() {
    isLoading.value = true;
    try {
      invitations.value = await teamService.getInvitations();
    } finally {
      isLoading.value = false;
    }
  }

  async function respondToInvitation(invitationId: string, status: 'accepted' | 'declined') {
    await teamService.respondToInvitation(invitationId, status);
    invitations.value = invitations.value.filter(inv => inv.id !== invitationId);
    if (status === 'accepted') {
      await fetchTeam();
    }
  }

  async function fetchSocialInteractions() {
    isLoading.value = true;
    try {
      socialInteractions.value = await teamService.getSocialInteractions();
    } finally {
      isLoading.value = false;
    }
  }

  return {
    team,
    invitations,
    socialInteractions,
    isLoading,
    fetchTeam,
    inviteMember,
    fetchInvitations,
    respondToInvitation,
    fetchSocialInteractions,
  };
});
