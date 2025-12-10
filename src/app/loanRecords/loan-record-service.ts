export type LoanRecordDTO = {
  id: string;
  userId: string;
  deviceId: string;
  status: string;
  reservedAt: string;
  collectedAt?: string;
  returnedAt?: string;
  dueDate: string;
};

export interface LoanRecordServiceService {
  list(): Promise<LoanRecordDTO[]>;
}
