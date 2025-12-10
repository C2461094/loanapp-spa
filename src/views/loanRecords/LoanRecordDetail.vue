<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLoanRecords } from '@/composables/use-loan-records';
import type { LoanRecord } from '@/app/loanRecords//loan-record';

const route = useRoute();
const { records, isLoading } = useLoanRecords();
const record = ref<LoanRecord | undefined>();

onMounted(() => {
  const recordId = route.params.id as string;
  record.value = records.value.find((r) => r.id === recordId);
});

function markAsReturned() {
  alert(`Marking loan record ${record.value?.id} as returned`);
  // TODO: POST /returns or PATCH loan record status
}

function extendLoan() {
  alert(`Extending loan for record ${record.value?.id}`);
  // TODO: POST to /extensions or similar
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
      <button @click="$router.back()" class="btn btn--back">
        Back to Loan Records
      </button>
      <button @click="extendLoan" class="btn btn--primary">
        Extend Loan
      </button>
      <button @click="markAsReturned" class="btn btn--secondary">
        Mark as Returned
      </button>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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

.btn--primary {
  background-color: #3b82f6;
  color: white;
}
.btn--secondary {
  background-color: #5ca0ec;
  color: white;
}
</style>
