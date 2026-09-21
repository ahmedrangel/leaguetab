<script setup lang="ts">
useHead({
  title: "League Scoreboard"
});
</script>

<template>
  <main>
    <ScoreboardMain :data="testPayload" />
  </main>
</template>
