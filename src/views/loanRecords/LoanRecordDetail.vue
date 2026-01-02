<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoanRecords } from "@/composables/use-loan-records";
import type { LoanRecord } from "@/app/loanRecords/loan-record";

const route = useRoute();
const router = useRouter();
const { records, isLoading } = useLoanRecords();

const record = ref<LoanRecord | undefined>();
const isSubmitting = ref(false);
const error = ref<string | null>(null);

onMounted(() => {
  const recordId = route.params.id as string;
  record.value = records.value.find((r) => r.id === recordId);
});

async function markAsCollected() {
  if (!record.value) return;

  isSubmitting.value = true;
  error.value = null;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/records/${record.value.id}/collect`,
      { method: "POST" }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    record.value = await response.json();
  } catch (err: any) {
    error.value = err.message ?? "Failed to mark as collected";
  } finally {
    isSubmitting.value = false;
  }
}

async function markAsReturned() {
  if (!record.value) return;

  isSubmitting.value = true;
  error.value = null;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/records/${record.value.id}/return`,
      { method: "POST" }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    record.value = await response.json();
  } catch (err: any) {
    error.value = err.message ?? "Failed to mark as returned";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
    <div class="page">
    <h1>Loan Record Details</h1>

    <div v-if="isLoading" class="message message-loading">Loading...</div>

    <div v-else-if="record" class="loan-details">
      <p><strong>User ID:</strong> {{ record.userId }}</p>

      <p>
        <strong>Device:</strong>
        <span v-if="record.deviceModelName">
          {{ record.deviceModelName }}
          <span class="muted">({{ record.deviceId }})</span>
        </span>
        <span v-else> {{ record.deviceId }} </span>
      </p>

      <p><strong>Status:</strong> {{ record.status }}</p>
      <p><strong>Reserved At:</strong> {{ record.reservedAt }}</p>

      <p v-if="record.collectedAt">
        <strong>Collected At:</strong> {{ record.collectedAt }}
      </p>

      <p v-if="record.returnedAt">
        <strong>Returned At:</strong> {{ record.returnedAt }}
      </p>

      <p><strong>Due Date:</strong> {{ record.dueDate }}</p>
    </div>

    <div v-else class="message message-notice">
      <p>Loan record not found.</p>
    </div>

    <p v-if="error" class="message message-error">{{ error }}</p>

    <div class="actions">
      <button @click="router.back()" class="btn btn--back">Back</button>

      <button
        @click="markAsCollected"
        class="btn btn--primary"
        :disabled="isSubmitting || record?.status !== 'reserved'"
      >
        Mark as Collected
      </button>

      <button
        @click="markAsReturned"
        class="btn btn--secondary"
        :disabled="isSubmitting || record?.status !== 'collected'"
      >
        Mark as Returned
      </button>
    </div>
  </div>
</template>
