import { ref, inject, onMounted } from 'vue';
import type { LoanRecord } from '@/app/loanRecords/loan-record'; // Adjust this if your type is elsewhere
import { LOAN_RECORD_KEY } from '@/config/appServices';
import type { LoanRecordService } from '@/config/appServices';

const records = ref<LoanRecord[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

export function useLoanRecords() {
  const service = inject<LoanRecordService>(LOAN_RECORD_KEY);
  if (!service) throw new Error('Loan record service not provided');

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
