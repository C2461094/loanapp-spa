// src/composables/use-devices.ts

import { ref, inject, onMounted } from 'vue';
import type { Devices } from '@/config/appServices';
import { DEVICE_KEY } from '@/config/appServices';
import type { Device } from '@/app/devices/device';

/**
 * Reactive array holding the list of devices.
 */
const devices = ref<Device[]>([]);

/**
 * Indicates whether the devices are currently being loaded.
 */
const isLoading = ref(true);

/**
 * Holds any error message encountered during loading.
 */
const error = ref<string | null>(null);

/**
 * Composition function for managing and fetching a list of devices.
 *
 * @returns An object containing the device list, loading state, error message, and reload function.
 */
export function useDevices() {
  const services = inject<Devices>(DEVICE_KEY);
  if (!services) throw new Error('Device services not provided');

  /**
   * Loads devices from the injected service and updates state.
   */
  const loadDevices = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const result = await services.listDevices();
      devices.value = result.devices;
    } catch (err) {
      console.error('Failed to load devices:', err);
      error.value = 'Failed to load devices.';
    } finally {
      isLoading.value = false;
    }
  };

  // Automatically load devices on component mount if not already loaded
  onMounted(() => {
    if (devices.value.length === 0) {
      loadDevices();
    }
  });

  return {
    devices,
    isLoading,
    error,
    reload: loadDevices,
  };
}
