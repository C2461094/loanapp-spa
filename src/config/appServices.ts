// src/config/appServices.ts

import { listDevices } from '@/app/devices/list-devices';
import { HttpDeviceService } from '@/infra/devices/http-device-service';
import { FakeDeviceService } from '@/infra/devices/fake-device-service';
import { seedDevices } from '@/seed/devices';
import type { DeviceService } from '@/app/devices/device-service';
import type { ListDevicesResult } from '@/app/devices/list-devices';

import type { LoanRecord } from '@/app/loanRecords/loan-record';
import { HttpLoanRecordService } from '@/infra/loanRecords/http-loan-record-service';

// ------------------------------------------------------
// INTERNAL SERVICE INSTANCES
// ------------------------------------------------------
let _deviceService: DeviceService | undefined;
let _loanRecordService: LoanRecordService | undefined;

// ------------------------------------------------------
// ENV HELPERS
// ------------------------------------------------------
function getEnv(): Record<string, string | undefined> {
  return import.meta.env as Record<string, string | undefined>;
}

function getBaseUrl(): string {
  const env = getEnv();
  const url = env.VITE_API_BASE_URL;
  if (!url) {
    throw new Error('VITE_API_BASE_URL is not defined');
  }
  return url;
}

// ------------------------------------------------------
// DEVICE SERVICE FACTORY
// ------------------------------------------------------
function createDeviceServiceFromEnv(): DeviceService {
  const env = getEnv();
  const kind = (env.VITE_DEVICES_SERVICE || '').toLowerCase();
  const useSeed = env.VITE_USE_SEED === 'true';

  if (kind === 'fake') {
    return new FakeDeviceService(useSeed ? seedDevices : []);
  }

  // Default to HTTP service
  return new HttpDeviceService({ baseUrl: getBaseUrl() });
}

export function getDeviceService(): DeviceService {
  if (!_deviceService) {
    _deviceService = createDeviceServiceFromEnv();
  }
  return _deviceService;
}

// ------------------------------------------------------
// DEVICE USES
// ------------------------------------------------------
export function makeListDevices(): () => Promise<ListDevicesResult> {
  const service = getDeviceService();
  return () => listDevices(service);
}

export function buildDeviceUses() {
  return {
    listDevices: makeListDevices(),
  };
}

export type Devices = ReturnType<typeof buildDeviceUses>;

export const DEVICE_KEY = 'Devices' as const;

// ------------------------------------------------------
// LOAN RECORD SERVICE INTERFACE
// ------------------------------------------------------
export interface LoanRecordService {
  listLoanRecords(): Promise<{ records: LoanRecord[] }>;
}

export const LOAN_RECORD_KEY = Symbol('LoanRecordService');

// ------------------------------------------------------
// LOAN RECORD SERVICE FACTORY
// ------------------------------------------------------
function getLoanRecordService(): LoanRecordService {
  if (!_loanRecordService) {
    _loanRecordService = new HttpLoanRecordService({
      baseUrl: getBaseUrl(),
    });
  }
  return _loanRecordService;
}

// ------------------------------------------------------
// LOAN RECORD USES
// ------------------------------------------------------
export function buildLoanRecordUses() {
  const service = getLoanRecordService();
  return {
    listLoanRecords: () => service.listLoanRecords(),
  };
}

export type LoanRecords = ReturnType<typeof buildLoanRecordUses>;
