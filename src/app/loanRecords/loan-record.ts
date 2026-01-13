/**
 * Represents a loan record in the application.
 */
export type LoanRecord = {
  /**
   * Unique identifier for the loan record.
   */
  id: string;

  /**
   * ID of the user who made the loan.
   */
  userId: string;

  /**
   * ID of the device being loaned.
   */
  deviceId: string;

  /**
   * Optional: model name of the device (useful for display).
   */
  deviceModelName?: string;

  /**
   * Current status of the loan (e.g., 'reserved', 'collected', 'returned').
   */
  status: string;

  /**
   * Timestamp when the device was reserved (ISO 8601 format).
   */
  reservedAt: string;

  /**
   * Optional: timestamp when the device was collected.
   */
  collectedAt?: string;

  /**
   * Optional: timestamp when the device was returned.
   */
  returnedAt?: string;

  /**
   * Due date for returning the device.
   */
  dueDate: string;
};
