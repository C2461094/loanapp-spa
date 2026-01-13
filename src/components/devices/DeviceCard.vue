<script setup lang="ts">
import type { Device } from '@/app/devices/device';
import { isAuthenticated } from '@/composables/use-auth';

/**
 * DeviceCard component props.
 *
 * @property device - The device to be displayed in the card.
 */
defineProps<{
  device: Device;
}>();
</script>

<template>
  <div class="device-card">
    <h3 class="card-title">{{ device.brand }} {{ device.modelName }}</h3>
    <p><strong>Category:</strong> {{ device.category }}</p>

    <p v-if="device.description">
      <strong>Description:</strong> {{ device.description }}
    </p>

    <p v-if="isAuthenticated">Stock: {{ device.stock }}</p>

    <p><strong>Created:</strong> {{ new Date(device.createdAt) }}</p>
  </div>
</template>
