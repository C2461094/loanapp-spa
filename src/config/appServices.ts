// src/config/appServices.ts
import { listDevices } from '@/app/devices/list-devices';
import { HttpDeviceService } from '@/infra/devices/http-device-service';
import { FakeDeviceService } from '@/infra/devices/fake-device-service';
import { seedDevices } from '@/seed/devices';
import type { DeviceService } from '@/app/devices/device-service';
import type { ListDevicesResult } from '@/app/devices/list-devices';
import type { LoanRecord} from '@/app/loanRecords/loan-record';

let _deviceService: DeviceService | undefined;

function createDeviceServiceFromEnv(): DeviceService {
  const env = import.meta.env as Record<string, string | undefined>;
  const kind = (env.VITE_DEVICES_SERVICE || '').toLowerCase(); // NEW
  const baseUrl = env.VITE_API_BASE_URL;
  const useSeed = env.VITE_USE_SEED === 'true';

  if (kind === 'fake') {
    return new FakeDeviceService(useSeed ? seedDevices : []);
  }

  if (baseUrl) {
    return new HttpDeviceService({ baseUrl });
  }

  // Fallback to fake for dev safety
  return new FakeDeviceService(useSeed ? seedDevices : []);
}

export function getDeviceService(): DeviceService {
  if (!_deviceService) {
    _deviceService = createDeviceServiceFromEnv();
  }
  return _deviceService;
}

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

export type LoanRecordService = {
  listLoanRecords: () => Promise<{ records: LoanRecord[] }>;
};

export const LOAN_RECORD_KEY = Symbol('LoanRecordService');
