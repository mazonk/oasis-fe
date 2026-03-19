<script setup lang="ts">
import { UserPlus, Check, X, ShieldCheck, Users } from 'lucide-vue-next';
import { PENDING_INVITATIONS } from '../constants';
import { Motion } from '@motionone/vue';
</script>

<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <header>
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
              {{ PENDING_INVITATIONS.length }} New
            </span>
          </div>

          <div class="space-y-4">
            <Motion 
              v-for="inv in PENDING_INVITATIONS"
              :key="inv.id"
              layout
              class="flex items-center justify-between p-4 bg-gray-50 rounded-3xl"
            >
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Users class="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p class="font-bold text-gray-900">{{ inv.teamName }}</p>
                  <p class="text-xs text-gray-400">Invited by {{ inv.invitedBy }}</p>
                </div>
              </div>
              <div class="flex gap-2">
                <button class="p-2 bg-white text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors shadow-sm">
                  <Check class="w-5 h-5" />
                </button>
                <button class="p-2 bg-white text-rose-600 rounded-xl hover:bg-rose-50 transition-colors shadow-sm">
                  <X class="w-5 h-5" />
                </button>
              </div>
            </Motion>
          </div>
        </section>

        <section class="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Your Teams</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
              <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck class="w-5 h-5 text-indigo-600" />
              </div>
              <h3 class="font-bold text-gray-900">Product Blobs</h3>
              <p class="text-xs text-indigo-600 font-medium mt-1">8 Members · Active</p>
            </div>
            <button class="p-6 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:border-indigo-200 hover:text-indigo-400 transition-all">
              <UserPlus class="w-8 h-8 mb-2" />
              <span class="font-bold text-sm">Create New Team</span>
            </button>
          </div>
        </section>
      </div>

      <div class="space-y-6">
        <div class="bg-amber-50 rounded-[40px] p-8 border border-amber-100">
          <h3 class="font-bold text-amber-900 mb-2">Did you know?</h3>
          <p class="text-sm text-amber-800/80 leading-relaxed">
            A person can join a team only if an existing team member has invited them. This ensures a safe and trusted environment for everyone.
          </p>
        </div>
        
        <div class="bg-white rounded-[40px] p-8 border border-gray-50">
          <h3 class="font-bold text-gray-900 mb-4">Team Activity</h3>
          <div class="space-y-4">
            <div v-for="i in [1, 2, 3]" :key="i" class="flex gap-3">
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
  </div>
</template>
