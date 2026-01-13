// src/composables/use-loan-records.ts

import { ref, inject, onMounted } from 'vue';
import type { LoanRecord } from '@/app/loanRecords/loan-record'; 
import { LOAN_RECORD_KEY } from '@/config/appServices';
import type { LoanRecordService } from '@/config/appServices';

/**
 * Reactive array holding the list of loan records.
 */
const records = ref<LoanRecord[]>([]);

/**
 * Indicates whether the loan records are currently being loaded.
 */
const isLoading = ref(true);

/**
 * Holds any error message encountered during the loading process.
 */
const error = ref<string | null>(null);

/**
 * Composition function for managing and fetching loan records.
 *
 * @returns An object containing the loan records, loading state, error message, and a reload function.
 */
export function useLoanRecords() {
  const service = inject<LoanRecordService>(LOAN_RECORD_KEY);
  if (!service) throw new Error('Loan record service not provided');

  /**
   * Loads loan records from the injected service and updates state accordingly.
   */
  const loadRecords = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const result = await service.listLoanRecords();
      records.value = result.records;
    } catch (err) {
      console.error('Failed to load loan records:', err);
      error.value = 'Failed to load loan records.';
    } finally {
      isLoading.value = false;
    }
  };

  // Automatically load records on component mount if not already loaded
  onMounted(() => {
    if (records.value.length === 0) {
      loadRecords();
    }
  });

  return {
    records,
    isLoading,
    error,
    reload: loadRecords,
  };
}
