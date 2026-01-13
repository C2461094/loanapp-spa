/**
 * Represents a Device entity used internally in the application domain.
 */
export type Device = {
  /** Unique identifier for the device */
  id: string;

  /** Manufacturer of the device (e.g., Apple, Dell) */
  brand: string;

  /** Specific model name (e.g., iPad Air, XPS 13) */
  modelName: string;

  /** Category of the device (e.g., Laptop, Tablet, Camera) */
  category: string;

  /** Optional description providing additional device details */
  description?: string;

  /** Available stock count for the device */
  stock: number;

  /** Timestamp indicating when the device was created or registered */
  createdAt: Date;
};
