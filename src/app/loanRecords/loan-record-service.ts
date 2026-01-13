/**
 * Data Transfer Object (DTO) representing the structure of a loan record.
 */
export type LoanRecordDTO = {
  /**
   * Unique ID for the loan record.
   */
  id: string;

  /**
   * ID of the user who made the loan.
   */
  userId: string;

  /**
   * ID of the loaned device.
   */
  deviceId: string;

  /**
   * Optional: model name of the device (can be used for display purposes).
   */
  deviceModelName?: string;

  /**
   * Current loan status (e.g., "reserved", "collected", "returned").
   */
  status: string;

  /**
   * ISO string when the loan was reserved.
   */
  reservedAt: string;

  /**
   * Optional: ISO string when the device was collected.
   */
  collectedAt?: string;

  /**
   * Optional: ISO string when the device was returned.
   */
  returnedAt?: string;

  /**
   * ISO string of the loan's due date.
   */
  dueDate: string;
};

/**
 * Interface for a service that retrieves loan records.
 */
export interface LoanRecordServiceService {
  /**
   * Fetches a list of loan records.
   * @returns Promise that resolves to an array of LoanRecordDTOs.
   */
  list(): Promise<LoanRecordDTO[]>;
}
