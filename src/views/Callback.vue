<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth0Client } from '@/composables/use-auth';

const router = useRouter();

onMounted(async () => {
  const client = getAuth0Client();
  await client.handleRedirectCallback(); 
  router.replace('/'); 
});
</script>

<template>
  <div class="page">
    <p>Logging in...</p>
  </div>
</template>
