import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Team } from '../interfaces/Team';
import type { CreateTeamDto } from '../interfaces/CreateTeamDto';
import { teamService } from '../services/teamService';

export const useTeamStore = defineStore('team', () => {
  const team = ref<Team | null>(null);
  const allTeams = ref<Team[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchMyTeam() {
    const memberId = sessionStorage.getItem('memberId');
    if (!memberId) return;

    isLoading.value = true;
    error.value = null;
    try {
      team.value = await teamService.getTeamByMemberId(Number(memberId));
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch team';
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchAllTeams() {
    isLoading.value = true;
    error.value = null;
    try {
      allTeams.value = await teamService.getAllTeams();
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch teams';
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchTeamById(id: number) {
    isLoading.value = true;
    error.value = null;
    try {
      team.value = await teamService.getTeamById(id);
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch team';
    } finally {
      isLoading.value = false;
    }
  }

  async function createTeam(name: string, description: string | null, leaderId: number) {
    isLoading.value = true;
    error.value = null;
    try {
      const dto: CreateTeamDto = { name, description, leaderId };
      team.value = await teamService.createTeam(dto);
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to create team';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    team,
    allTeams,
    isLoading,
    error,
    fetchMyTeam,
    fetchAllTeams,
    fetchTeamById,
    createTeam,
  };
});