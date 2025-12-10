<script setup lang="ts">
import { onMounted } from 'vue';
import { useLoanRecords } from '@/composables/use-loan-records';
import { useRouter } from 'vue-router';

const { records, isLoading, reload } = useLoanRecords();
const router = useRouter();

onMounted(() => {
  reload();
});

function goToDetail(id: string) {
  router.push(`/loan-records/${id}`);
}
</script>

<template>
  <div class="page">
    <h1>Loan Records</h1>

    <div v-if="isLoading">Loading...</div>

    <ul v-else class="record-list">
      <li
        v-for="record in records"
        :key="record.id"
        class="record-item"
        @click="goToDetail(record.id)"
      >
        <p><strong>{{ record.deviceId }}</strong> → {{ record.status }}</p>
        <small>User: {{ record.userId }} | Due: {{ record.dueDate }}</small>
      </li>
    </ul>

    <div class="actions">
      <button @click="$router.push('/')" class="btn btn--back">⬅ Back to Home</button>
      <button @click="reload" class="btn btn--reload" :disabled="isLoading">
        Reload
      </button>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.record-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.record-item {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.record-item:hover {
  background: #f3f4f6;
}

.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn--back {
  background-color: #6b7280;
  color: white;
}

.btn--reload {
  background-color: #3b82f6;
  color: white;
}
</style>
