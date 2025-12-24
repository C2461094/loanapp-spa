<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth0Client } from '@/composables/use-auth';

const router = useRouter();

onMounted(async () => {
  const auth0 = getAuth0Client();

  // Redirect to Auth0 login
  await auth0.loginWithRedirect({
    appState: { target: '/' }, // after login, go home
  });
});
</script>

<template>
  <div class="page">
    <p>Redirecting to login...</p>
  </div>
</template>
