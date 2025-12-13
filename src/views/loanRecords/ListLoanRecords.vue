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
        <p>
          <strong>{{ record.deviceModelName ?? record.deviceId }}</strong>
          →
          {{ record.status }}
        </p>
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
