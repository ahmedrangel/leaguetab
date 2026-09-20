<script setup lang="ts">
defineProps<{
  team: {
    name: string;
    championIcon: string;
    champion: string;
    level: number;
    kills: number;
    deaths: number;
    assists: number;
    gold: number;
  }[];
}>();
</script>

<template>
  <div v-for="player in team" :key="player.name" class="scoreboard__row flex items-center border-b border-slate-500/20 p-3 gap-3">
    <div class="order-1 flex gap-1">
      <div class="flex shrink-0 flex-col gap-1">
        <div v-for="ability in abilitySlots(player)" :key="`${player.name}-${ability}`" class="h-6 w-6 overflow-hidden border border-slate-500/70 bg-slate-900">
          <img v-if="ability" :src="ability" alt="" class="h-full w-full object-cover">
        </div>
      </div>
      <div class="flex shrink-0 flex-col gap-1">
        <div v-for="ability in abilitySlots(player)" :key="`${player.name}-${ability}`" class="h-6 w-6 overflow-hidden border border-slate-500/70 bg-slate-900">
          <img v-if="ability" :src="ability" alt="" class="h-full w-full object-cover">
        </div>
      </div>
    </div>

    <div class="order-3 relative h-14 w-14 shrink-0">
      <img :src="player.championIcon" :alt="player.champion" class="h-full w-full rounded-full border-2 border-slate-300/80 object-cover">
      <span class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-slate-300/80 bg-slate-950 text-[10px] font-bold text-white">
        {{ player.level }}
      </span>
    </div>

    <div class="w-30 order-5 text-center text-base text-yellow-200">
      {{ player.gold }}
    </div>

    <div class="order-6 text-center text-base font-semibold text-slate-300">
      {{ player.kills }}/{{ player.deaths }}/{{ player.assists }}
    </div>

    <div class="order-7 flex flex-1 justify-center gap-1.5">
      <span v-for="i in 6" :key="`${player.name}-item-${i}`" class="block h-10 w-10 border border-slate-500/60" />
    </div>
  </div>
</template>
