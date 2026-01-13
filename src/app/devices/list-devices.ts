// Import the Device type and DeviceService interface
import type { Device } from './device';
import type { DeviceService } from './device-service';

/**
 * Represents the structure of the result returned by the listDevices function.
 */
export type ListDevicesResult = {
  /**
   * Array of devices returned from the service.
   */
  devices: Device[];
};

/**
 * Fetches a list of devices using the given DeviceService.
 *
 * @param deviceService - An implementation of the DeviceService interface.
 * @returns A promise that resolves to an object containing the list of devices.
 */
export async function listDevices(
  deviceService: DeviceService,
): Promise<ListDevicesResult> {
  const devices = await deviceService.list();
  return { devices };
}
