// src/infra/loanRecords/http-loan-record-service.ts

import type { LoanRecordDTO } from '@/app/loanRecords/loan-record-service';
import type { LoanRecordService } from '@/config/appServices';
import { getAccessToken } from '@/composables/use-auth'; // ✅ Import the token getter

type HttpLoanRecordServiceOptions = {
  baseUrl: string;
};

export class HttpLoanRecordService implements LoanRecordService {
  private readonly baseUrl: string;

  constructor(options: HttpLoanRecordServiceOptions) {
    this.baseUrl = options.baseUrl;
  }

  async listLoanRecords(): Promise<{ records: LoanRecordDTO[] }> {
    const token = await getAccessToken(); // ✅ Fetch access token

    const response = await fetch(`${this.baseUrl}/records`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Add token to request
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch loan records: ${errorText}`);
    }

    const records: LoanRecordDTO[] = await response.json();
    return { records };
  }
}
