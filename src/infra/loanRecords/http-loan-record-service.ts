// src/infra/loanRecords/http-loan-record-service.ts

import type { LoanRecordDTO } from '@/app/loanRecords/loan-record-service';
import type { LoanRecordService } from '@/config/appServices';

type HttpLoanRecordServiceOptions = {
  baseUrl: string;
};

export class HttpLoanRecordService implements LoanRecordService {
  private readonly baseUrl: string;

  constructor(options: HttpLoanRecordServiceOptions) {
    this.baseUrl = options.baseUrl;
  }

  async listLoanRecords(): Promise<{ records: LoanRecordDTO[] }> {
    // IMPORTANT: use the configured base URL
    const response = await fetch(`${this.baseUrl}/records`);

    if (!response.ok) {
      throw new Error('Failed to fetch loan records');
    }

    const records: LoanRecordDTO[] = await response.json();
    return { records };
  }
}
