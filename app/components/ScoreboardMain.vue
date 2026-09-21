<script setup lang="ts">
const props = defineProps<{
  data: GameData;
}>();
const bluePlayers = props.data.players.filter(player => player.team === "blue");
const redPlayers = props.data.players.filter(player => player.team === "red");

onMounted(() => {
  adjustScale(document, "scoreboard");
  window.addEventListener("resize", () => adjustScale(document, "scoreboard"));
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", () => adjustScale(document, "scoreboard"));
});
</script>

<template>
  <div id="scoreboard" class="overflow-hidden border border-slate-600/70 text-slate-200">
    <ScoreboardTeamStatsHeader :teams="data.teams" />
    <div class="grid grid-cols-2">
      <section class="min-w-0 border-r border-slate-500/40">
        <ScoreboardPlayerRow :players="bluePlayers" />
      </section>
      <section class="min-w-0">
        <ScoreboardPlayerRow :players="redPlayers" />
      </section>
    </div>
  </div>
</template>

<style scoped>
#scoreboard {
  background: linear-gradient(90deg, rgba(16, 27, 49, 0.97) 0%, rgba(12, 29, 29, 0.8) 50%, rgba(30, 13, 18, 0.96) 100%);
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 1920px;
  overflow: hidden;
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
