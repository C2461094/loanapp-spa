export type LoanRecord = {
  id: string;
  userId: string;
  deviceId: string;
  deviceModelName?: string;
  status: string;
  reservedAt: string;
  collectedAt?: string;
  returnedAt?: string;
  dueDate: string;
};
