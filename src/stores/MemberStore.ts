import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Member } from '../interfaces/Member';
import type { UpdateMemberDto } from '../interfaces/UpdateMemberDto';
import { memberService } from '../services/memberService';

export const useMemberStore = defineStore('member', () => {
  const member = ref<Member | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchMember() {
    isLoading.value = true;
    error.value = null;
    try {
      member.value = await memberService.getMember();
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch member';
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchById(id: number) {
    isLoading.value = true;
    error.value = null;
    try {
      member.value = await memberService.getById(id);
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch member';
    } finally {
      isLoading.value = false;
    }
  }

  async function updateMember(dto: UpdateMemberDto) {
    isLoading.value = true;
    error.value = null;
    try {
      await memberService.updateMember(dto);
      await fetchMember();
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to update member';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    member,
    isLoading,
    error,
    fetchMember,
    fetchById,
    updateMember,
  };
});