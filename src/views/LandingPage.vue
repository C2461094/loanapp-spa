<script setup lang="ts">
import { useRouter } from 'vue-router';
import { isAuthenticated, user, login, logout } from '@/composables/use-auth';

const router = useRouter();

function goTo(path: string) {
  router.push(path);
}
</script>

<template>
  <section class="landing">
    <h1 class="title">Welcome to LoanApp</h1>

    <div class="buttons">
      <button @click="goTo('/login')">Login</button>
      <button @click="goTo('/devices')">Devices Catalogue</button>
      <button @click="goTo('/loan-records')">Loan Records</button>
    </div>
  </section>
</template>



