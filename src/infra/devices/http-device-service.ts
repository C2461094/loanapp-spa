// src/infra/devices/http-device-service.ts

import type { DeviceDTO, DeviceService } from '@/app/devices/device-service';

type HttpDeviceServiceOptions = {
  /** The base URL of the backend API (e.g., https://api.example.com) */
  baseUrl: string;
};

/**
 * An implementation of the DeviceService that fetches device data from an HTTP API.
 */
export class HttpDeviceService implements DeviceService {
  /** Base URL for the backend API */
  private readonly baseUrl: string;

  /**
   * Creates a new instance of HttpDeviceService.
   *
   * @param options - Configuration options including the base URL
   */
  constructor(options: HttpDeviceServiceOptions) {
    this.baseUrl = options.baseUrl;
  }

  /**
   * Fetches a list of devices from the backend API.
   *
   * @returns A promise that resolves to an array of DeviceDTOs
   * @throws If the HTTP request fails or returns a non-OK response
   */
  async list(): Promise<DeviceDTO[]> {
    const res = await fetch(`${this.baseUrl}/devices`);
    if (!res.ok) throw new Error('Failed to fetch devices');
    return await res.json();
  }
}
