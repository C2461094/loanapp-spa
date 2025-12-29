<script setup lang="ts">
import { onMounted } from 'vue';
import { login } from '@/composables/use-auth';


onMounted(async () => {
  await login();
  });

</script>

<template>
  <div class="page">
    <p>Redirecting to login...</p>
  </div>
</template>
