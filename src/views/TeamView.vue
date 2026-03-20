<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { UserPlus, Check, X, ShieldCheck, Users, Mail, Zap } from 'lucide-vue-next';
import gsap from 'gsap';
import { useTeamStore } from '../stores/TeamStore';
import { useInvitationStore } from '../stores/InvitationStore';

const teamStore = useTeamStore();
const invitationStore = useInvitationStore();

const team = computed(() => teamStore.team);
const invitations = computed(() => invitationStore.invitations);

// Create team modal
const showCreateModal = ref(false);
const teamName = ref('');
const teamDescription = ref('');
const isSubmitting = ref(false);
const error = ref<string | null>(null);

// Invite modal
const showInviteModal = ref(false);
const inviteEmail = ref('');
const isInviting = ref(false);
const inviteError = ref<string | null>(null);
const inviteSuccess = ref(false);

function openCreateModal() {
  teamName.value = '';
  teamDescription.value = '';
  error.value = null;
  showCreateModal.value = true;
}

function closeCreateModal() {
  showCreateModal.value = false;
}

function openInviteModal() {
  inviteEmail.value = '';
  inviteError.value = null;
  inviteSuccess.value = false;
  showInviteModal.value = true;
}

function closeInviteModal() {
  showInviteModal.value = false;
}

async function handleCreateTeam() {
  if (!teamName.value.trim()) {
    error.value = 'Team name is required';
    return;
  }
  if (teamName.value.trim().length < 3) {
    error.value = 'Team name must be at least 3 characters';
    return;
  }
  try {
    isSubmitting.value = true;
    error.value = null;
    await teamStore.createTeam(
      teamName.value.trim(),
      teamDescription.value.trim() || null,
      Number(sessionStorage.getItem('memberId'))
    );
    closeCreateModal();
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to create team. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
}

async function handleInviteMember() {
  if (!inviteEmail.value.trim()) {
    inviteError.value = 'Email is required';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.value)) {
    inviteError.value = 'Please enter a valid email address';
    return;
  }
  if (!team.value) return;

  try {
    isInviting.value = true;
    inviteError.value = null;
    await invitationStore.inviteMember({
      teamId: team.value.teamId,
      email: inviteEmail.value.trim(),
      inviterId: Number(sessionStorage.getItem('memberId'))
    });
    inviteSuccess.value = true;
    inviteEmail.value = '';
  } catch (e: any) {
    inviteError.value = e?.response?.data ?? e?.message ?? 'Failed to send invitation.';
  } finally {
    isInviting.value = false;
  }
}

onMounted(() => {
  teamStore.fetchMyTeam();
  invitationStore.fetchMyInvitations();
  gsap.from('.team-header', { y: 20, opacity: 0, duration: 1, ease: 'power2.out' });
  gsap.from('.invitation-item', { x: -20, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.3, ease: 'power2.out' });
  gsap.from('.sidebar-card', { x: 30, opacity: 0, duration: 1, stagger: 0.2, delay: 0.7, ease: 'power2.out' });
});

watch(team, () => {
  nextTick(() => {
    gsap.from('.team-card', { scale: 0.95, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)' });
  });
}, { immediate: false });
</script>

<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <header class="team-header">
      <h1 class="text-4xl font-bold text-gray-900 tracking-tight">Team Hub</h1>
      <p class="text-gray-500 mt-2">Manage your team connections and invitations.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-6">

        <section class="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
              <UserPlus class="w-5 h-5 text-indigo-500" />
              Pending Invitations
            </h2>
            <span class="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">
              {{ invitations.length }} New
            </span>
          </div>

          <div class="space-y-4">
            <p v-if="invitations.length === 0" class="text-sm text-gray-400 text-center py-4">
              No pending invitations
            </p>
            <div v-for="inv in invitations" :key="inv.invitationId"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-3xl invitation-item hover:bg-gray-100 transition-colors duration-300">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Users class="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p class="font-bold text-gray-900">{{ inv.teamName }}</p>
                  <p class="text-xs text-gray-400">Invited by {{ inv.invitedByName }}</p>
                </div>
              </div>
              <div class="flex gap-2">
                <button @click="invitationStore.respondToInvitation(inv.invitationId, true)"
                  class="p-2 bg-white text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-sm hover:scale-110 cursor-pointer">
                  <Check class="w-5 h-5" />
                </button>
                <button @click="invitationStore.respondToInvitation(inv.invitationId, false)"
                  class="p-2 bg-white text-rose-600 rounded-xl hover:bg-rose-50 transition-all duration-300 shadow-sm hover:scale-110 cursor-pointer">
                  <X class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Your Teams</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div v-if="team"
  class="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 team-card transition-shadow duration-300 group"
>
  <div class="flex items-start justify-between mb-4">
    <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
      <ShieldCheck class="w-5 h-5 text-indigo-600" />
    </div>
    <button
      @click="openInviteModal"
      class="flex items-center gap-1.5 px-3 py-1.5 bg-white text-indigo-600 text-xs font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm cursor-pointer"
    >
      <UserPlus class="w-3.5 h-3.5" />
      Invite
    </button>
  </div>

  <h3 class="font-bold text-gray-900 text-lg">{{ team.name }}</h3>
  <p v-if="team.description" class="text-xs text-gray-400 mt-1">{{ team.description }}</p>

  <div class="mt-4 flex items-center justify-between">
    <div class="flex items-center gap-1.5">
      <span class="text-xs font-bold text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-full">
        {{ team.levelName ?? 'Unranked' }}
      </span>
    </div>
    <div class="flex items-center gap-1 text-amber-500 font-black text-sm">
      <Zap class="w-4 h-4 fill-current" />
      {{ team.experience }} XP
    </div>
  </div>

  <div class="mt-4 pt-4 border-t border-indigo-100 flex items-center justify-between">
    <span class="text-xs text-gray-400 font-medium">Team mood</span>
    <div class="flex items-center gap-1.5">
      <span class="text-lg">🤩</span>
      <span class="text-xs font-bold text-pink-500">Excited</span>
    </div>
  </div>
</div>

            <button v-else
              @click="openCreateModal"
              class="p-6 border-2 border-dashed cursor-pointer border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:border-indigo-200 hover:text-indigo-400 transition-all team-card hover:bg-indigo-50/30"
            >
              <UserPlus class="w-8 h-8 mb-2" />
              <span class="font-bold text-sm">Create New Team</span>
            </button>

          </div>
        </section>
      </div>

      <div class="space-y-6">
        <div class="bg-amber-50 rounded-[40px] p-8 border border-amber-100 sidebar-card">
          <h3 class="font-bold text-amber-900 mb-2">Did you know?</h3>
          <p class="text-sm text-amber-800/80 leading-relaxed">
            A person can join a team only if an existing team member has invited them. This ensures a safe and trusted environment for everyone.
          </p>
        </div>

        <div class="bg-white rounded-[40px] p-8 border border-gray-50 sidebar-card">
          <h3 class="font-bold text-gray-900 mb-4">Team Activity</h3>
          <div class="space-y-4">
            <div v-for="i in [1, 2, 3]" :key="i"
              class="flex gap-3 hover:translate-x-1 transition-transform duration-300 cursor-default">
              <div class="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
              <div class="text-xs">
                <p class="text-gray-900 font-semibold">Sarah M. <span class="text-gray-400 font-normal">scheduled a</span> Team Coffee Break</p>
                <p class="text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Team Modal -->
    <Teleport to="body">
      <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="showCreateModal"
          class="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          @click.self="closeCreateModal">
          <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-if="showCreateModal" class="bg-white rounded-[32px] p-8 w-full max-w-md shadow-xl">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h2 class="text-xl font-bold text-gray-900">Create a Team</h2>
                  <p class="text-sm text-gray-400 mt-1">Start fresh and invite your people.</p>
                </div>
                <button @click="closeCreateModal"
                  class="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer">
                  <X class="w-5 h-5" />
                </button>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="text-sm font-semibold text-gray-700 block mb-2">Team Name</label>
                  <input v-model="teamName" type="text" placeholder="e.g. Product Blobs" maxlength="50"
                    @keyup.enter="handleCreateTeam"
                    class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-gray-900 placeholder-gray-300 transition-all"
                    :class="{ 'border-rose-300 focus:ring-rose-300': error }" />
                </div>
                <div>
                  <label class="text-sm font-semibold text-gray-700 block mb-2">
                    Description
                    <span class="text-gray-400 font-normal ml-1">(optional)</span>
                  </label>
                  <textarea v-model="teamDescription" placeholder="What is this team about?" rows="3" maxlength="255"
                    class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-gray-900 placeholder-gray-300 transition-all resize-none" />
                </div>
                <p v-if="error" class="text-xs text-rose-500">{{ error }}</p>
                <div class="flex gap-3 pt-2">
                  <button @click="closeCreateModal"
                    class="flex-1 py-3 rounded-2xl cursor-pointer border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button @click="handleCreateTeam" :disabled="isSubmitting"
                    class="flex-1 py-3 rounded-2xl cursor-pointer bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ isSubmitting ? 'Creating...' : 'Create Team' }}
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Invite Member Modal -->
    <Teleport to="body">
      <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="showInviteModal"
          class="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          @click.self="closeInviteModal">
          <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-if="showInviteModal" class="bg-white rounded-[32px] p-8 w-full max-w-md shadow-xl">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h2 class="text-xl font-bold text-gray-900">Invite to {{ team?.name }}</h2>
                  <p class="text-sm text-gray-400 mt-1">Send an invitation by email.</p>
                </div>
                <button @click="closeInviteModal"
                  class="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer">
                  <X class="w-5 h-5" />
                </button>
              </div>

              <div class="space-y-4">
                <div v-if="inviteSuccess"
                  class="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <Check class="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <p class="text-sm text-emerald-700 font-medium">Invitation sent successfully!</p>
                </div>

                <div>
                  <label class="text-sm font-semibold text-gray-700 block mb-2">Email Address</label>
                  <div class="relative">
                    <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input v-model="inviteEmail" type="email" placeholder="colleague@company.com"
                      @keyup.enter="handleInviteMember"
                      class="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-gray-900 placeholder-gray-300 transition-all"
                      :class="{ 'border-rose-300 focus:ring-rose-300': inviteError }" />
                  </div>
                  <p v-if="inviteError" class="text-xs text-rose-500 mt-2">{{ inviteError}}</p>
                </div>

                <div class="flex gap-3 pt-2">
                  <button @click="closeInviteModal"
                    class="flex-1 py-3 rounded-2xl cursor-pointer border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
                    Close
                  </button>
                  <button @click="handleInviteMember" :disabled="isInviting"
                    class="flex-1 py-3 rounded-2xl cursor-pointer bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ isInviting ? 'Sending...' : 'Send Invite' }}
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>