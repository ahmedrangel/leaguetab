<script setup lang="ts">
const { user, loggedIn } = useUserSession();
if (!loggedIn.value) {
  navigateTo("/");
}
const loading = ref(true);
const verified = ref(false);

onMounted(async () => {
  const response = await $fetch<{ verified: boolean }>(`${SITE.localhost}/verify`, { method: "POST" }).catch(() => null);
  verified.value = response?.verified ?? false;
  loading.value = false;
});
</script>

<template>
  <main class="text-center overflow-hidden w-dvw h-dvh flex flex-col items-center justify-center gap-4">
    <template v-if="loading">
      <span class="text-4xl font-semibold">Verifying session...</span>
    </template>
    <template v-else-if="user && loggedIn && verified">
      <span class="text-4xl font-semibold">Hello, {{ user.displayName }}! You are now logged in.</span>
      <span class="text-xl">You can close this page.</span>
    </template>
    <template v-else-if="!verified">
      <span class="text-4xl font-semibold">Session verification failed.</span>
      <span class="text-xl">Make sure the local service is running and try again.</span>
    </template>
  </main>
</template>
