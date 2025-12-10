// src/infra/loanRecords/http-loan-record-service.ts

import type { LoanRecordDTO } from '@/app/loanRecords/loan-record-service';
import type { LoanRecordService } from '@/config/appServices';

export class HttpLoanRecordService implements LoanRecordService {
  async listLoanRecords(): Promise<{ records: LoanRecordDTO[] }> {
    const response = await fetch('/api/records'); // <-- use Vite proxy path
    if (!response.ok) {
      throw new Error('Failed to fetch loan records');
    }

    const records: LoanRecordDTO[] = await response.json();
    return { records };
  }
}
