<script setup lang="ts">
const blueTeam: Player[] = [
  {
    name: "Hyndai",
    champion: "Jinx",
    level: 1,
    kills: 0,
    deaths: 0,
    assists: 0,
    gold: 0,
    championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Jinx.png",
    spell1: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerFlash.png",
    spell2: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerHeal.png",
    items: []
  }
];

const redTeam: Player[] = [
  {
    name: "Xayah Bot",
    champion: "Xayah",
    level: 1,
    kills: 0,
    deaths: 0,
    assists: 0,
    gold: 0,
    championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Xayah.png",
    spell1: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerFlash.png",
    spell2: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerHeal.png",
    items: []
  }
];

const blueProgress = Array.from({ length: 4 }, (_, index) => index);
const redProgress = Array.from({ length: 4 }, (_, index) => index);

const blueStats = [
  { icon: "♛", value: 0 },
  { icon: "◉", value: 0 },
  { icon: "✦", value: 0 },
  { icon: "♢", value: 0 }
];

const redStats = [
  { icon: "♢", value: 0 },
  { icon: "✦", value: 0 },
  { icon: "◉", value: 0 },
  { icon: "♛", value: 0 }
];
</script>

<template>
  <div class="scoreboard w-full overflow-hidden border border-slate-600/70 text-slate-200">
    <header class="scoreboard__top flex h-18 items-center justify-center border-b border-slate-500/40 gap-2">
      <div class="flex items-center">
        <div class="ml-auto flex items-center gap-2">
          <span v-for="dot in blueProgress" :key="`blue-${dot}`" class="h-10 w-10 rounded-full border border-slate-700/80" />
        </div>
      </div>

      <div class="mx-4 flex h-11 w-11 rotate-45 items-center justify-center border border-yellow-400/80 bg-slate-950">
        <span class="-rotate-45 text-lg text-cyan-300/60">xd</span>
      </div>

      <div class="flex items-center">
        <div class="flex items-center gap-2">
          <span v-for="dot in redProgress" :key="`red-${dot}`" class="h-10 w-10 rounded-full border border-slate-700/80" />
        </div>
      </div>
    </header>

    <div class="scoreboard__stats grid h-[76px] grid-cols-[1fr_160px_1fr] border-b border-slate-500/30">
      <div class="flex items-center justify-end gap-4 pr-7 text-sm font-bold text-slate-100 sm:gap-5 md:gap-6">
        <div v-for="stat in blueStats" :key="`blue-${stat.icon}`" class="flex min-w-[38px] items-center gap-1.5">
          <span class="text-base text-slate-400">{{ stat.icon }}</span>
          <span>{{ stat.value }}</span>
        </div>
      </div>

      <div class="flex items-center justify-center gap-2 text-xl font-extrabold">
        <span class="text-sky-400">0</span>
        <span class="text-yellow-400">⚔</span>
        <span class="text-rose-400">0</span>
      </div>

      <div class="flex items-center gap-4 pl-7 text-sm font-bold text-slate-100 sm:gap-5 md:gap-6">
        <div v-for="stat in redStats" :key="`red-${stat.icon}`" class="flex min-w-[38px] items-center gap-1.5">
          <span class="text-base text-slate-400">{{ stat.icon }}</span>
          <span>{{ stat.value }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2">
      <section class="min-w-0 border-r border-slate-500/40">
        <ScoreboardPlayerRow :team="blueTeam" />
      </section>
      <section class="min-w-0">
        <ScoreboardPlayerRow :team="redTeam" />
      </section>
    </div>
  </div>
</template>

<style scoped>
.scoreboard {
  background: linear-gradient(90deg, rgba(16, 27, 49, 0.97) 0%, rgba(12, 29, 29, 0.8) 50%, rgba(30, 13, 18, 0.96) 100%);
}

.scoreboard__top {
  background: linear-gradient(180deg, rgba(13, 31, 38, 0.98), rgba(4, 18, 25, 0.98));
}

.scoreboard__stats {
  background: linear-gradient(180deg, rgba(11, 35, 43, 0.96), rgba(5, 23, 30, 0.95));
}

.scoreboard__row {
  background: linear-gradient(180deg, rgba(8, 21, 28, 0.38), rgba(4, 16, 22, 0.4));
}
</style>
