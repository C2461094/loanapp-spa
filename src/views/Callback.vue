<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { initAuth0, isAuthenticated } from '@/composables/use-auth';

const router = useRouter();

onMounted(async () => {
  await initAuth0();

  // Optionally: redirect after successful login
  if (isAuthenticated.value) {
    router.push('/');
  }
});
</script>

<template>
  <div class="page">
    <p>Logging you in...</p>
  </div>
</template>
