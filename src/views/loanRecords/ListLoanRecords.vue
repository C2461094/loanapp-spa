<script setup lang="ts">
import { useLoanRecords } from '@/composables/use-loan-records';

const { records, isLoading, error, reload } = useLoanRecords();
</script>

<template>
  <section class="page">
    <header class="page__header">
      <h1>Loan Records</h1>
      <button @click="reload" class="btn btn--reload" :disabled="isLoading">
        Reload
      </button>
    </header>

    <div v-if="isLoading" class="state">Loading...</div>
    <div v-else-if="error" class="state state--error">{{ error }}</div>

    <ul v-else-if="records.length" class="grid">
      <li v-for="record in records" :key="record.id" class="card">
        <strong>User:</strong> {{ record.userId }}<br />
        <strong>Device:</strong> {{ record.deviceId }}<br />
        <strong>Status:</strong> {{ record.status }}<br />
        <strong>Due:</strong>
        {{ new Date(record.dueDate).toLocaleDateString() }}
      </li>
    </ul>

    <p v-else class="state">No loan records found.</p>
  </section>
</template>

<style scoped>
.page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}
.page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn--reload {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
.grid {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}
.card {
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}
.state {
  margin-top: 2rem;
  color: #6b7280;
}
.state--error {
  color: #b91c1c;
}
</style>
