// src/seed/devices.ts

import type { DeviceDTO } from '@/app/devices/device-service';

/**
 * Predefined seed data for devices used in development or testing environments.
 * Each entry represents a device available in the inventory.
 */
export const seedDevices: DeviceDTO[] = [
  {
    id: 'tab-001',
    brand: 'Apple',
    modelName: 'iPad Air',
    category: 'Tablet',
    description: '10.9-inch display, M1 chip',
    stock: 3,
    createdAt: new Date(), // Current timestamp
  },
  {
    id: 'lap-002',
    brand: 'Dell',
    modelName: 'XPS 13',
    category: 'Laptop',
    description: 'Compact, high-res screen',
    stock: 2,
    createdAt: new Date(), // Current timestamp
  },
  // Add more seed devices below as needed
];
