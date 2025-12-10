<script setup lang="ts">
import { useRouter } from 'vue-router';

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

<style scoped>
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f3f4f6;
  padding: 2rem;
  text-align: center;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #2563eb;
}
</style>
