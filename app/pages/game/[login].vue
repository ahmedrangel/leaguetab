<script setup lang="ts">
useHead({
  title: "League Scoreboard"
});
const { login } = useRoute("game-login").params;
const data = ref<GameData | null>(null);

const MAX_RECONNECT_ATTEMPTS = 10;
const BASE_RECONNECT_DELAY = 1000;
const reconnectAttempts = ref(0);
const isReconnecting = ref(false);
const ws = ref<WebSocket | null>(null);

const attemptReconnect = () => {
  if (isReconnecting.value) return;
  if (reconnectAttempts.value < MAX_RECONNECT_ATTEMPTS) {
    isReconnecting.value = true;
    reconnectAttempts.value++;
    const delay = BASE_RECONNECT_DELAY * Math.pow(2, reconnectAttempts.value - 1);
    setTimeout(() => {
      connectWebSocket();
      isReconnecting.value = false;
    }, delay);
  }
  else {
    console.warn("Max reconnect attempts reached");
  }
};

const connectWebSocket = () => {
  const protocol = import.meta.dev ? "ws" : "wss";
  ws.value = new WebSocket(`${protocol}://${SITE.domain}/ws/${login}`);
  ws.value.onopen = () => {
    reconnectAttempts.value = 0;
    console.info("WebSocket connected");
  };
  ws.value.onmessage = (event) => {
    try {
      const { data: parsedData } = JSON.parse(event.data);
      data.value = parsedData;
    }
    catch (error) {
      console.warn("Failed to parse WebSocket message:", error);
    }
  };
  ws.value.onclose = () => {
    console.info("WebSocket connection closed");
    attemptReconnect();
  };
  ws.value.onerror = (error) => {
    console.warn("WebSocket error:", error);
    attemptReconnect();
  };
};

onMounted(() => {
  connectWebSocket();
});
onUnmounted(() => {
  ws.value?.close();
  ws.value = null;
});
</script>

<template>
  <main>
    <ScoreboardMain v-if="data" :data="data" />
  </main>
</template>
