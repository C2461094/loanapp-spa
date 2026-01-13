// src/infra/loanRecords/http-loan-record-service.ts

import type { LoanRecordDTO } from '@/app/loanRecords/loan-record-service';
import type { LoanRecordService } from '@/config/appServices';
import { getAccessToken } from '@/composables/use-auth'; // ✅ Import the token getter

/**
 * Options for configuring the HttpLoanRecordService.
 */
type HttpLoanRecordServiceOptions = {
  /** Base URL of the backend API */
  baseUrl: string;
};

/**
 * Service implementation that fetches loan records via HTTP.
 */
export class HttpLoanRecordService implements LoanRecordService {
  /** Base URL for the loan record API */
  private readonly baseUrl: string;

  /**
   * Creates a new HttpLoanRecordService.
   *
   * @param options - Configuration options including base URL
   */
  constructor(options: HttpLoanRecordServiceOptions) {
    this.baseUrl = options.baseUrl;
  }

  /**
   * Fetches all loan records from the backend API.
   *
   * @returns A promise resolving to an object containing an array of LoanRecordDTOs
   * @throws If the HTTP request fails or returns a non-OK status
   */
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
