<script setup lang="ts">
defineProps<{
  players: Player[];
}>();
</script>

<template>
  <div v-for="player in players" :key="player.riotIdGameName" class="scoreboard__row flex items-center justify-between border-b border-slate-500/20 p-3 gap-3">
    <div class="order-1 flex gap-1">
      <div class="flex shrink-0 flex-col gap-1">
        <div v-for="spell in Object.values(player.summonerSpells)" :key="`${player.riotIdGameName}-${spell.displayName}`" class="h-12 w-12 overflow-hidden bg-slate-900">
          <img v-if="spell" :src="spell.iconURL" alt="" class="h-full w-full object-cover" :title="spell.displayName">
        </div>
      </div>
      <div class="flex shrink-0 flex-col gap-1">
        <div v-for="rune in [player.runes.keystone, player.runes.secondaryRuneTree]" :key="`${player.riotIdGameName}-${rune.displayName}`" class="h-12 w-12 overflow-hidden bg-slate-900">
          <img v-if="rune" :src="rune.iconURL" alt="" class="h-full w-full object-cover" :title="rune.displayName">
        </div>
      </div>
    </div>
    <div class="order-3 relative shrink-0">
      <img :src="player.champion.iconURL" class="h-28 w-28 rounded-full border-2 border-slate-300/80 object-cover" :title="player.champion.displayName">
      <span class="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/80 bg-slate-950 text-lg font-bold text-white">
        {{ player.level }}
      </span>
    </div>
    <div class="w-20 order-5 text-center text-2xl text-yellow-200">
      {{ player.scores.creepScore }}
    </div>
    <div class="w-40 order-6 text-center text-2xl font-semibold text-slate-300">
      {{ player.scores.kills }}/{{ player.scores.deaths }}/{{ player.scores.assists }}
    </div>
    <div class="order-7 flex flex-col justify-center gap-2">
      <div class="text-2xl">
        {{ player.riotIdGameName }}
      </div>
      <div class="flex justify-center gap-1.5">
        <div v-for="slot in 6" :key="`${player.riotIdGameName}-item-${slot}`" class="h-18 w-18 border border-slate-500/60">
          <img
            v-if="player.items.find(item => item.slot === slot)"
            :src="player.items.find(item => item.slot === slot)?.iconURL"
            :title="player.items.find(item => item.slot === slot)?.displayName"
            class="h-full w-full object-cover"
          >
        </div>
      </div>
    </div>
  </div>
</template>
