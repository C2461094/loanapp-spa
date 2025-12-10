<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoanRecords } from '@/composables/use-loan-records';
import type { LoanRecord } from '@/app/loanRecords/loan-record';

const route = useRoute();
const router = useRouter();
const { records, isLoading } = useLoanRecords();
const record = ref<LoanRecord | undefined>();

onMounted(() => {
  const recordId = route.params.id as string;
  record.value = records.value.find((r) => r.id === recordId);
});

function markAsCollected() {
  alert(`Marking loan record ${record.value?.id} as collected`);
}

function markAsReturned() {
  alert(`Marking loan record ${record.value?.id} as returned`);
}
</script>

<template>
  <div class="page">
    <h1>Loan Record Details</h1>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="record">
      <p><strong>User ID:</strong> {{ record.userId }}</p>
      <p><strong>Device ID:</strong> {{ record.deviceId }}</p>
      <p><strong>Status:</strong> {{ record.status }}</p>
      <p><strong>Reserved At:</strong> {{ record.reservedAt }}</p>
      <p v-if="record.collectedAt"><strong>Collected At:</strong> {{ record.collectedAt }}</p>
      <p v-if="record.returnedAt"><strong>Returned At:</strong> {{ record.returnedAt }}</p>
      <p><strong>Due Date:</strong> {{ record.dueDate }}</p>
    </div>

    <div v-else>
      <p>Loan record not found.</p>
    </div>

    <div class="actions">
      <button @click="router.back()" class="btn btn--back">Back</button>
      <button @click="markAsCollected" class="btn btn--primary">Mark as Collected</button>
      <button @click="markAsReturned" class="btn btn--secondary">Mark as Returned</button>
    </div>
  </div>
</template>

