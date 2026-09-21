<script setup lang="ts">
useHead({
  title: "League Scoreboard"
});
const { login } = useRoute("game-login").params;
const data = ref<GameData | null>(null);
onMounted(async () => {
  const protocol = import.meta.dev ? "ws" : "wss";
  const wss = new WebSocket(`${protocol}://${SITE.domain}/ws/${login}`);
  wss.onmessage = (event) => {
    try {
      const { data: parsedData } = JSON.parse(event.data);
      data.value = parsedData;
    }
    catch (error) {
      console.warn("Failed to parse WebSocket message:", error);
    }
  };
  wss.onclose = () => {
    console.info("WebSocket connection closed");
  };
  wss.onerror = (error) => {
    console.warn("WebSocket error:", error);
  };
});
</script>

<template>
  <main>
    <ScoreboardMain v-if="data" :data="data" />
  </main>
</template>
