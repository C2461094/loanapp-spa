// src/infra/devices/fake-device-service.ts

import type { DeviceService } from '@/app/devices/device-service';
import type { DeviceDTO } from '@/app/devices/device-service';

/**
 * A mock implementation of the DeviceService that uses in-memory data.
 * Useful for local development and testing without making real HTTP requests.
 */
export class FakeDeviceService implements DeviceService {
  /** Internal list of devices used by the fake service */
  private readonly devices: DeviceDTO[];

  /**
   * Constructs the fake service with optional seeded data.
   *
   * @param seed - An optional array of DeviceDTOs to initialize the service with
   */
  constructor(seed: DeviceDTO[] = []) {
    this.devices = seed.length > 0 ? [...seed] : [];
  }

  /**
   * Returns a list of available devices.
   * Simulates a short delay to mimic network latency.
   *
   * @returns A promise that resolves to an array of DeviceDTOs
   */
  async list(): Promise<DeviceDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.devices;
  }
}
