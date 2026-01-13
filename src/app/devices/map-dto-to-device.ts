// Import the DTO and domain model types
import type { DeviceDTO } from "./device-service";
import type { Device } from "./device";

/**
 * Maps a DeviceDTO (typically from an external source or API) to a Device domain model.
 *
 * @param dto - The Device Data Transfer Object
 * @returns A Device object suitable for use in the application
 */
export function mapDtoToDevice(dto: DeviceDTO): Device {
  return {
    id: dto.id,
    brand: dto.brand,
    modelName: dto.modelName,
    category: dto.category,
    description: dto.description,
    stock: dto.stock,
    createdAt: dto.createdAt,
  };
}
