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

/** Cached instance of the device service */
let _deviceService: DeviceService | undefined;

/** Cached instance of the loan record service */
let _loanRecordService: LoanRecordService | undefined;

// ------------------------------------------------------
// ENV HELPERS
// ------------------------------------------------------

/**
 * Returns the current environment variables.
 */
function getEnv(): Record<string, string | undefined> {
  return import.meta.env as Record<string, string | undefined>;
}

/**
 * Returns the base URL for API requests from environment variables.
 * @throws Will throw an error if VITE_API_BASE_URL is not defined.
 */
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

/**
 * Creates a device service based on the environment configuration.
 * - Uses FakeDeviceService if VITE_DEVICES_SERVICE=fake
 * - Falls back to HttpDeviceService
 */
function createDeviceServiceFromEnv(): DeviceService {
  const env = getEnv();
  const kind = (env.VITE_DEVICES_SERVICE || '').toLowerCase();
  const useSeed = env.VITE_USE_SEED === 'true';

  if (kind === 'fake') {
    return new FakeDeviceService(useSeed ? seedDevices : []);
  }

  return new HttpDeviceService({ baseUrl: getBaseUrl() });
}

/**
 * Returns a singleton instance of the device service.
 */
export function getDeviceService(): DeviceService {
  if (!_deviceService) {
    _deviceService = createDeviceServiceFromEnv();
  }
  return _deviceService;
}

// ------------------------------------------------------
// DEVICE USES
// ------------------------------------------------------

/**
 * Builds a function to list all devices using the injected service.
 */
export function makeListDevices(): () => Promise<ListDevicesResult> {
  const service = getDeviceService();
  return () => listDevices(service);
}

/**
 * Provides device-related operations as a service object.
 */
export function buildDeviceUses() {
  return {
    listDevices: makeListDevices(),
  };
}

/**
 * Type representing the object returned by `buildDeviceUses`.
 */
export type Devices = ReturnType<typeof buildDeviceUses>;

/**
 * Injection key for providing device-related services to components.
 */
export const DEVICE_KEY = 'Devices' as const;

// ------------------------------------------------------
// LOAN RECORD SERVICE INTERFACE
// ------------------------------------------------------

/**
 * Interface for services that fetch loan records.
 */
export interface LoanRecordService {
  /**
   * Fetches a list of loan records.
   * @returns Promise resolving to an object with a `records` array.
   */
  listLoanRecords(): Promise<{ records: LoanRecord[] }>;
}

/**
 * Injection symbol used for providing the loan record service.
 */
export const LOAN_RECORD_KEY = Symbol('LoanRecordService');

// ------------------------------------------------------
// LOAN RECORD SERVICE FACTORY
// ------------------------------------------------------

/**
 * Returns a singleton instance of the loan record service.
 */
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

/**
 * Provides loan record operations as a service object.
 */
export function buildLoanRecordUses() {
  const service = getLoanRecordService();
  return {
    listLoanRecords: () => service.listLoanRecords(),
  };
}

/**
 * Type representing the object returned by `buildLoanRecordUses`.
 */
export type LoanRecords = ReturnType<typeof buildLoanRecordUses>;
