<script setup lang="ts">
const { user, loggedIn } = useUserSession();
if (!loggedIn.value) {
  navigateTo("/");
}
</script>

<template>
  <div v-if="user && loggedIn" class="w-dvw h-dvh flex flex-col items-center justify-center gap-4">
    <span class="text-4xl font-semibold">Hello, {{ user.displayName }}! You are now logged in.</span>
    <span class="text-xl">You can close this page.</span>
  </div>
</template>
