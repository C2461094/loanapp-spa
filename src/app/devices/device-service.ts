/**
 * Data Transfer Object (DTO) representing the structure of a device.
 */
export type DeviceDTO = {
  /**
   * Unique identifier for the device.
   */
  id: string;

  /**
   * Manufacturer or brand (e.g., Apple, Dell).
   */
  brand: string;

  /**
   * Specific model name (e.g., iPad Air, XPS 13).
   */
  modelName: string;

  /**
   * Category of device (e.g., Tablet, Laptop).
   */
  category: string;

  /**
   * Optional description or additional details.
   */
  description?: string;

  /**
   * Current available stock (number of units).
   */
  stock: number;

  /**
   * Timestamp when the device was added to the system.
   */
  createdAt: Date;
};

/**
 * Interface for a device service abstraction.
 */
export interface DeviceService {
  /**
   * Retrieves a list of all device DTOs.
   *
   * @returns A promise resolving to an array of DeviceDTO objects.
   */
  list(): Promise<DeviceDTO[]>;
}
