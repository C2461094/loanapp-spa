import type { LoanRecordDTO } from '@/app/loanRecords/loan-record-service';
import type { LoanRecordService } from '@/config/appServices';

export class HttpLoanRecordService implements LoanRecordService {
  private baseUrl: string;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
  }

  async listLoanRecords(): Promise<{ records: LoanRecordDTO[] }> {
    const response = await fetch(`${this.baseUrl}/records`);
    if (!response.ok) {
      throw new Error('Failed to fetch loan records');
    }

    const records = await response.json();
    return { records };
  }
}
